/**
 * GET/POST /api/front-desk/inbound-call?clientId=santa
 *
 * Twilio Voice webhook. Twilio hits this URL when a call arrives at
 * the client's customer-facing Twilio number, and we respond with
 * TwiML that:
 *
 *   - In sequential mode (default, opsbynoell):
 *       Stacks <Dial> verbs so each leg is rung in turn until one
 *       answers, then voicemail.
 *
 *   - In simultaneous mode (santa):
 *       Emits one <Dial> with multiple <Number> children so all
 *       configured operator cells ring at the same time. The first
 *       to accept connects; the rest drop. Optionally each <Number>
 *       gets a whisper URL (press-1-to-accept) so accidental answers
 *       (voicemail, "Hello?") don't grab the call.
 *
 *   - In all modes:
 *       Records voicemail and POSTs to /api/front-desk/voicemail-complete
 *       which fires the missed-call webhook.
 *
 * The list of cells to ring and the recording behavior are read from
 * the client's `sms_config.voiceRouting` Supabase column so we don't
 * have to redeploy to swap a phone number.
 *
 * This endpoint is unauthenticated - Twilio cannot send a Bearer
 * header. We protect it with optional Twilio request signature
 * validation (TWILIO_AUTH_TOKEN env var) and by requiring a known
 * clientId. Even without the signature check, the only thing this
 * route does is return a TwiML script - it has no side effects.
 */

import { NextRequest, NextResponse } from "next/server";
import { getClientConfig } from "@/lib/agents/config";
import { validateTwilioSignature } from "@/lib/agents/twilio-signature";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RingTarget = {
  number: string; // E.164, e.g. +16502246484
  timeoutSeconds: number; // how long to ring this leg before falling through
};

type VoiceRouting = {
  ringTargets: RingTarget[];
  voicemailMaxLengthSeconds?: number; // defaults to 180
  voicemailGreeting?: string; // spoken before the beep
  callerIdMode?: "original" | "twilio_number"; // who appears on the cell phone caller ID
  /** "sequential" (default - one leg at a time) or "simultaneous" (ring all). */
  ringMode?: "sequential" | "simultaneous";
  /** When true (simultaneous only), each leg gets a press-1-to-accept whisper. */
  whisperEnabled?: boolean;
};

const DEFAULT_VOICEMAIL_GREETING =
  "Sorry we missed your call. Please leave a short message after the beep and we will text you right back.";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function clampTimeout(t: number): number {
  return Math.max(5, Math.min(60, Math.floor(t)));
}

function buildSequentialDials(
  targets: RingTarget[],
  callerNumber: string
): string {
  const callerAttr = callerNumber
    ? ` callerId="${escapeXml(callerNumber)}"`
    : "";
  return targets
    .map(
      (t) =>
        `  <Dial timeout="${clampTimeout(t.timeoutSeconds)}" answerOnBridge="true"${callerAttr}>` +
        `<Number>${escapeXml(t.number)}</Number></Dial>`
    )
    .join("\n");
}

function buildSimultaneousDial(
  targets: RingTarget[],
  baseUrl: string,
  clientId: string,
  callerNumber: string,
  whisperEnabled: boolean
): string {
  const maxTimeout = clampTimeout(
    targets.reduce((m, t) => Math.max(m, t.timeoutSeconds || 0), 0) || 20
  );
  const callerAttr = callerNumber
    ? ` callerId="${escapeXml(callerNumber)}"`
    : "";
  const whisperUrl = `${baseUrl}/api/front-desk/whisper?clientId=${encodeURIComponent(clientId)}`;
  const whisperAttr = whisperEnabled
    ? ` url="${escapeXml(whisperUrl)}"`
    : "";
  const numbers = targets
    .map((t) => `    <Number${whisperAttr}>${escapeXml(t.number)}</Number>`)
    .join("\n");
  return [
    `  <Dial timeout="${maxTimeout}" answerOnBridge="true"${callerAttr}>`,
    numbers,
    `  </Dial>`,
  ].join("\n");
}

function buildTwiml(
  routing: VoiceRouting,
  clientId: string,
  baseUrl: string,
  callerNumber: string
): string {
  const targets =
    Array.isArray(routing.ringTargets) && routing.ringTargets.length > 0
      ? routing.ringTargets
      : [];
  const vmAction = `${baseUrl}/api/front-desk/voicemail-complete?clientId=${encodeURIComponent(
    clientId
  )}&from=${encodeURIComponent(callerNumber)}`;
  const vmMaxLen = routing.voicemailMaxLengthSeconds ?? 180;
  const greeting = routing.voicemailGreeting ?? DEFAULT_VOICEMAIL_GREETING;

  const ringMode = routing.ringMode === "simultaneous" ? "simultaneous" : "sequential";
  const whisperEnabled = routing.whisperEnabled === true;

  let dials = "";
  if (targets.length > 0) {
    dials =
      ringMode === "simultaneous"
        ? buildSimultaneousDial(
            targets,
            baseUrl,
            clientId,
            callerNumber,
            whisperEnabled
          )
        : buildSequentialDials(targets, callerNumber);
  }

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<Response>`,
    dials,
    `  <Say voice="Polly.Joanna">${escapeXml(greeting)}</Say>`,
    `  <Record action="${escapeXml(vmAction)}" method="POST" maxLength="${vmMaxLen}" playBeep="true" trim="trim-silence" timeout="5"/>`,
    `  <Say voice="Polly.Joanna">We did not receive a recording. Goodbye.</Say>`,
    `</Response>`,
  ]
    .filter((line) => line.length > 0)
    .join("\n");
}

function twimlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

async function readForm(req: NextRequest): Promise<URLSearchParams> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    return new URLSearchParams(text);
  }
  return new URLSearchParams();
}

function pickClientId(url: URL, form: URLSearchParams): string | null {
  return url.searchParams.get("clientId") ?? form.get("clientId") ?? null;
}

async function handle(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const form = req.method === "POST" ? await readForm(req) : new URLSearchParams();

  // Optional signature check. We accept unsigned requests too (e.g.
  // Twilio's "Make a Test Call" tool, or while debugging) because
  // the route only emits TwiML - no DB writes, no SMS sends.
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const sigHeader = req.headers.get("x-twilio-signature");
  if (authToken && sigHeader) {
    const publicUrl =
      (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
        `${url.protocol}//${url.host}`) +
      url.pathname +
      url.search;
    const ok = validateTwilioSignature(authToken, publicUrl, form, sigHeader);
    if (!ok) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }
  }

  const clientId = pickClientId(url, form);
  if (!clientId) {
    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Say>Configuration error. Missing client identifier.</Say><Hangup/></Response>`
    );
  }

  let cfg;
  try {
    cfg = await getClientConfig(clientId);
  } catch {
    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Say>Configuration error. Unknown client.</Say><Hangup/></Response>`
    );
  }

  if (!cfg.active || !cfg.agents.frontDesk) {
    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Say>This number is not currently active.</Say><Hangup/></Response>`
    );
  }

  const routing = (cfg.smsConfig?.voiceRouting ?? {}) as VoiceRouting;
  if (!routing.ringTargets || routing.ringTargets.length === 0) {
    routing.ringTargets = [];
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    `${url.protocol}//${url.host}`;

  // Original caller (used as callerId on the dial leg so the operator
  // sees the customer's real number on their cell).
  const fallbackCallerId =
    (cfg.smsConfig?.fromNumber as string | undefined) ?? "";
  const callerNumber =
    form.get("From") ??
    url.searchParams.get("From") ??
    fallbackCallerId ??
    "";

  const xml = buildTwiml(routing, clientId, baseUrl, callerNumber);
  return twimlResponse(xml);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handle(req);
}

export async function GET(req: NextRequest): Promise<Response> {
  return handle(req);
}
