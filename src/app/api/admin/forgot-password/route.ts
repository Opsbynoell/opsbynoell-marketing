import { NextResponse } from "next/server";
import { handleForgotPassword } from "@/lib/admin-forgot-password";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  await handleForgotPassword(email);

  // Always neutral — prevents enumeration. The UI renders the same
  // confirmation whether the email matches a user or not.
  return NextResponse.json({ ok: true });
}
