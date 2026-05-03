/**
 * GET/POST /api/front-desk/whisper?clientId=santa
 *
 * Twilio fetches this URL on the called leg of a simultaneous-ring
 * <Dial> when the call is answered (via the <Number url="..."/>
 * attribute set by /api/front-desk/inbound-call). The caller hears
 * silence until one of the called legs presses 1; the rest hang up.
 *
 * Returns TwiML that:
 *   1. <Gather> a single digit with a 10s timeout, posting to
 *      /api/front-desk/whisper-confirm.
 *   2. Speaks "Incoming call for <brand>. Press 1 to accept."
 *   3. On no input, <Hangup/> so the leg drops cleanly without the
 *      caller ever being bridged to voicemail.
 *
 * GET is supported because Twilio's "Make a Test Call" tool defaults
 * to GET on configured webhook URLs.
 */

import { NextRequest } from "next/server";
import { getClientConfig } from "@/lib/agents/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function twimlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

function pickClientId(req: NextRequest): string | null {
  const url = new URL(req.url);
  return url.searchParams.get("clientId");
}

async function handle(req: NextRequest): Promise<Response> {
  const clientId = pickClientId(req);
  if (!clientId) {
    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Hangup/></Response>`
    );
  }

  let brandName = clientId;
  try {
    const cfg = await getClientConfig(clientId);
    brandName = cfg.brandName?.trim() || cfg.businessName?.trim() || clientId;
  } catch {
    // Fall back to the raw clientId for the prompt - never block the leg.
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    (() => {
      const u = new URL(req.url);
      return `${u.protocol}//${u.host}`;
    })();

  const confirmAction = `${baseUrl}/api/front-desk/whisper-confirm?clientId=${encodeURIComponent(
    clientId
  )}`;

  const prompt = `Incoming call for ${brandName}. Press 1 to accept.`;

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<Response>`,
    `  <Gather numDigits="1" timeout="10" action="${escapeXml(confirmAction)}" method="POST">`,
    `    <Say voice="Polly.Joanna">${escapeXml(prompt)}</Say>`,
    `  </Gather>`,
    `  <Hangup/>`,
    `</Response>`,
  ].join("\n");

  return twimlResponse(xml);
}

export async function POST(req: NextRequest): Promise<Response> {
  return handle(req);
}

export async function GET(req: NextRequest): Promise<Response> {
  return handle(req);
}
