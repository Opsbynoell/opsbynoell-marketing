/**
 * POST /api/twilio/inbound-visitor-sms
 *
 * Direct Twilio inbound SMS webhook for LEADS / CUSTOMERS texting a
 * client's A2P-registered Twilio number. The Twilio-transport twin of
 * /api/ghl/inbound-visitor-sms — same downstream flow (runTurn +
 * frontDesk + outbound reply via MessagingIntegration), different
 * wire format.
 *
 * Use this route when the client's inbound SMS is wired directly to
 * Twilio (Messaging Service → "A message comes in" webhook) instead of
 * going through a GHL / LeadConnector workflow.
 *
 * Auth — Twilio request signature
 * --------------------------------
 * Twilio signs every webhook with
 *   HMAC-SHA1(authToken, fullUrl + sortedFormParams)
 * and sends the result as `X-Twilio-Signature`. We validate this
 * rather than using a query-param shared secret.
 *
 * Required env:
 *   TWILIO_AUTH_TOKEN                      — signing token (same account that owns the Messaging Service)
 *   TWILIO_INBOUND_VISITOR_PUBLIC_URL      — the public URL Twilio is calling, exactly as configured in
 *                                            the Messaging Service (no query string). Falls back to
 *                                            TWILIO_INBOUND_PUBLIC_URL if unset, so single-number
 *                                            installs that only use one webhook do not need two vars.
 *                                            Example:
 *                                              https://www.opsbynoell.com/api/twilio/inbound-visitor-sms
 *
 * Twilio webhook body (application/x-www-form-urlencoded):
 *   From:        "+17145550123"   — visitor / lead                → fromPhone
 *   To:          "+19499973915"   — client's Twilio number        → toPhone
 *   Body:        "hi, any openings today?"
 *   MessageSid:  "SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *   MessagingServiceSid / AccountSid / NumMedia / ...             — ignored
 *
 * Response
 * --------
 * Always returns HTTP 200. If the reply is non-empty and
 * human_takeover is off, we send it back to the visitor via the
 * client's configured SMS integration (Twilio API) — NOT via TwiML
 * <Message> in the response body. Reasons:
 *   - The outbound sender is selected by the integration registry
 *     (MessagingServiceSid / fromNumber) so sticky sender + A2P
 *     compliance continue to work the same way as the runner path.
 *   - Keeps send-observability, error handling, and sessionId
 *     linkage identical between the GHL and Twilio transports.
 *   - Avoids a race where TwiML <Message> fires before we've
 *     persisted the outbound row.
 *
 * The response body is therefore always empty TwiML (<Response/>)
 * so Twilio treats the webhook as successful and does not auto-reply.
 *
 * Loop safety
 * -----------
 *   1. Signature validation — only Twilio can trigger this route.
 *   2. Server-side loop guard — refuses to reply when fromPhone
 *      equals the client's own sms_config.fromNumber (shared with
 *      the GHL route).
 */

import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/agents/env";
import { getClientConfig } from "@/lib/agents/config";
import {
  buildOutboundVisitorReplyPayload,
  dispatchVisitorReply,
  extractInboundVisitorPayload,
  isOwnNumberLoop,
  resolveClientForInboundVisitorSms,
} from "@/lib/agents/inbound-visitor-sms-handler";
import { getSmsIntegration } from "@/lib/agents/integrations/registry";
import { RunTurnError, runTurn } from "@/lib/agents/runner";
import { validateTwilioSignature } from "@/lib/agents/twilio-signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TWIML_OK =
  '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

const twimlResponse = (status = 200): Response =>
  new Response(TWIML_OK, {
    status,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });

export async function POST(req: NextRequest): Promise<Response> {
  const authToken = env.twilioAuthToken();
  // Accept either a visitor-specific public URL or fall back to the
  // single-number TWILIO_INBOUND_PUBLIC_URL. A misconfigured URL here
  // is the #1 cause of silent 200 no-ops.
  const publicUrl =
    process.env.TWILIO_INBOUND_VISITOR_PUBLIC_URL ??
    process.env.TWILIO_INBOUND_PUBLIC_URL;

  if (!authToken || !publicUrl) {
    console.error(
      "[twilio-inbound-visitor] Missing TWILIO_AUTH_TOKEN or TWILIO_INBOUND_VISITOR_PUBLIC_URL/TWILIO_INBOUND_PUBLIC_URL"
    );
    // 200 TwiML so Twilio does not retry against a misconfigured deploy.
    return twimlResponse(200);
  }

  // ── Parse form body ───────────────────────────────────────────────────────
  const rawBody = await req.text();
  const params = new URLSearchParams(rawBody);

  // ── Validate signature ────────────────────────────────────────────────────
  const headerSig = req.headers.get("x-twilio-signature");
  const valid = validateTwilioSignature(authToken, publicUrl, params, headerSig);
  if (!valid) {
    console.warn(
      "[twilio-inbound-visitor] Rejected — invalid signature",
      { headerSig, publicUrl }
    );
    return twimlResponse(200);
  }

  // ── Translate Twilio fields into our generic visitor-SMS shape ───────────
  const generic: Record<string, unknown> = {
    phone: params.get("From") ?? undefined,
    toNumber: params.get("To") ?? undefined,
    body: params.get("Body") ?? undefined,
  };
  const payload = extractInboundVisitorPayload(generic);
  if (!payload) {
    console.warn(
      "[twilio-inbound-visitor] missing visitor phone in payload",
      { From: params.get("From"), To: params.get("To") }
    );
    return twimlResponse(200);
  }

  // ── Resolve client ────────────────────────────────────────────────────────
  let resolution;
  try {
    resolution = await resolveClientForInboundVisitorSms({
      toPhone: payload.toPhone,
      locationId: payload.locationId,
    });
  } catch (err) {
    console.error("[twilio-inbound-visitor] client lookup failed:", err);
    return twimlResponse(200);
  }

  if (resolution.kind === "ambiguous") {
    console.error(
      `[twilio-inbound-visitor] ambiguous client resolution — candidates=${resolution.candidates.join(
        ","
      )} toPhone=${payload.toPhone ?? "-"}`
    );
    return twimlResponse(200);
  }
  if (resolution.kind === "none") {
    console.warn(
      `[twilio-inbound-visitor] no client configured for toPhone=${
        payload.toPhone ?? "-"
      } — ignoring`
    );
    return twimlResponse(200);
  }

  const clientId = resolution.clientId;

  // ── Loop guard — refuse if visitor phone equals our own Twilio number ────
  const cfg = await getClientConfig(clientId);
  if (isOwnNumberLoop(cfg, payload.fromPhone)) {
    console.warn(
      `[twilio-inbound-visitor] loop guard tripped — fromPhone=${payload.fromPhone} matches own Twilio number for client=${clientId}`
    );
    return twimlResponse(200);
  }

  // ── Generate the reply via the shared runner ──────────────────────────────
  let runResult;
  try {
    runResult = await runTurn({
      agent: "frontDesk",
      payload: {
        clientId,
        agent: "frontDesk",
        channel: "sms",
        from: { phone: payload.fromPhone },
        message: payload.messageText,
      },
      tables: {
        sessions: "front_desk_sessions",
        messages: "front_desk_messages",
      },
      defaultTriggerType: "inbound_text",
    });
  } catch (err) {
    if (err instanceof RunTurnError) {
      console.error(
        `[twilio-inbound-visitor] runTurn precondition failed — code=${err.code} client=${clientId}: ${err.message}`
      );
    } else {
      console.error(
        `[twilio-inbound-visitor] runTurn failed — client=${clientId}:`,
        err
      );
    }
    return twimlResponse(200);
  }

  // ── Dispatch outbound reply (when appropriate) ────────────────────────────
  const out = buildOutboundVisitorReplyPayload({
    cfg,
    agent: "frontDesk",
    sessionId: runResult.sessionId,
    visitorPhone: payload.fromPhone,
    replyText: runResult.reply,
  });

  if (out.body) {
    await dispatchVisitorReply(out, cfg, { getSms: getSmsIntegration });
  }

  // Empty TwiML — outbound send happened via the Twilio API above (or was
  // intentionally skipped) so there is nothing to auto-reply with here.
  return twimlResponse(200);
}

// Twilio sends form-encoded; reject anything else explicitly.
export async function GET(): Promise<Response> {
  return NextResponse.json(
    {
      ok: true,
      hint: "POST application/x-www-form-urlencoded from Twilio webhook only",
    },
    { status: 200 }
  );
}
