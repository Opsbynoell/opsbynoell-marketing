/**
 * POST /api/front-desk/voicemail-complete?clientId=santa&from=%2B16505551234
 *
 * Called by Twilio after a <Record> finishes (caller hangs up or
 * maxLength is reached). Twilio sends form-encoded fields like
 * RecordingUrl, RecordingDuration, From, CallSid, etc.
 *
 * We:
 *   1. Hand off to /api/front-desk/missed-call internally with the
 *      Bearer secret so the existing missed-call pipeline runs:
 *      session row + SMS textback + Telegram alert.
 *   2. Return a short TwiML "thanks" so Twilio plays it to the caller
 *      before hanging up.
 *
 * If the missed-call call fails we still return TwiML — we don't want
 * the caller to hear an error. The Telegram alert in missed-call is
 * how we'd notice anyway.
 */

import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function twiml(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

async function readForm(req: NextRequest): Promise<URLSearchParams> {
  try {
    const text = await req.text();
    return new URLSearchParams(text);
  } catch {
    return new URLSearchParams();
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const form = await readForm(req);

  const clientId =
    url.searchParams.get("clientId") ?? form.get("clientId") ?? "";
  const from =
    url.searchParams.get("from") ??
    form.get("From") ??
    form.get("from") ??
    "";
  const callSid = form.get("CallSid") ?? undefined;
  const recordingUrl = form.get("RecordingUrl") ?? undefined;
  const recordingDuration = form.get("RecordingDuration") ?? undefined;

  if (clientId && from) {
    const secret = process.env.AGENT_ACTION_SECRET;
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
      `${url.protocol}//${url.host}`;

    if (secret) {
      try {
        await fetch(`${baseUrl}/api/front-desk/missed-call`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secret}`,
          },
          body: JSON.stringify({
            clientId,
            from,
            callSid,
            metadata: {
              source: "twilio_voicemail",
              recordingUrl,
              recordingDuration,
            },
          }),
          // Don't let a slow downstream hold the caller. The fetch
          // itself races against Twilio's wait for our TwiML.
          signal: AbortSignal.timeout(8000),
        });
      } catch {
        // Swallow — we still want to return clean TwiML.
      }
    }
  }

  return twiml(
    `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Say voice="Polly.Joanna">Thanks. We will text you right back. Goodbye.</Say><Hangup/></Response>`,
  );
}
