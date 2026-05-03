/**
 * GET/POST /api/front-desk/whisper-confirm?clientId=santa
 *
 * Twilio posts here from the <Gather> in /api/front-desk/whisper.
 * If the operator pressed 1, return an empty <Response/> so Twilio
 * proceeds to bridge the legs (the original <Dial> takes over).
 * Any other input (or no input) returns <Hangup/> so this leg drops.
 */

import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function twimlResponse(xml: string): Response {
  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

async function readDigits(req: NextRequest): Promise<string> {
  const url = new URL(req.url);
  const fromQuery = url.searchParams.get("Digits");
  if (fromQuery) return fromQuery;
  if (req.method !== "POST") return "";
  const ct = req.headers.get("content-type") ?? "";
  if (!ct.includes("application/x-www-form-urlencoded")) return "";
  try {
    const text = await req.text();
    return new URLSearchParams(text).get("Digits") ?? "";
  } catch {
    return "";
  }
}

async function handle(req: NextRequest): Promise<Response> {
  const digits = (await readDigits(req)).trim();
  if (digits === "1") {
    // Empty response = Twilio bridges the legs (whisper completes).
    return twimlResponse(
      `<?xml version="1.0" encoding="UTF-8"?>\n<Response></Response>`
    );
  }
  return twimlResponse(
    `<?xml version="1.0" encoding="UTF-8"?>\n<Response><Hangup/></Response>`
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return handle(req);
}

export async function GET(req: NextRequest): Promise<Response> {
  return handle(req);
}
