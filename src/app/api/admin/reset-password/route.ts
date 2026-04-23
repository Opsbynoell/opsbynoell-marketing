import { NextResponse, type NextRequest } from "next/server";
import { hashPassword } from "@/lib/admin-password";
import { hashResetToken } from "@/lib/admin-password-reset";
import { sbSelect, sbUpdate } from "@/lib/agents/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ResetRow {
  id: string;
  user_id: string;
  expires_at: string;
  used_at: string | null;
}

interface UserRow {
  id: string;
  email: string;
}

async function lookupValidReset(
  rawToken: string
): Promise<{ reset: ResetRow; user: UserRow } | null> {
  if (!rawToken) return null;
  const tokenHash = await hashResetToken(rawToken);

  let resetRows: ResetRow[] = [];
  try {
    resetRows = await sbSelect<ResetRow>(
      "admin_password_resets",
      { token_hash: `eq.${tokenHash}` },
      { select: "id,user_id,expires_at,used_at", limit: 1 }
    );
  } catch {
    return null;
  }

  const reset = resetRows[0];
  if (!reset) return null;
  if (reset.used_at) return null;
  if (new Date(reset.expires_at).getTime() <= Date.now()) return null;

  let userRows: UserRow[] = [];
  try {
    userRows = await sbSelect<UserRow>(
      "admin_users",
      { id: `eq.${reset.user_id}` },
      { select: "id,email", limit: 1 }
    );
  } catch {
    return null;
  }

  const user = userRows[0];
  if (!user) return null;
  return { reset, user };
}

/** GET /api/admin/reset-password?token=... — validate and reveal the email. */
export async function GET(req: NextRequest): Promise<Response> {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const found = await lookupValidReset(token);
  if (!found) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired." },
      { status: 400 }
    );
  }
  return NextResponse.json({ email: found.user.email });
}

/** POST /api/admin/reset-password — body { token, password }. */
export async function POST(req: Request): Promise<Response> {
  let body: { token?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const token = typeof body.token === "string" ? body.token : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const found = await lookupValidReset(token);
  if (!found) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired." },
      { status: 400 }
    );
  }

  const newHash = await hashPassword(password);

  try {
    await sbUpdate(
      "admin_users",
      { id: `eq.${found.user.id}` },
      { password_hash: newHash }
    );
  } catch (err) {
    console.error("[reset-password] user update failed:", err);
    return NextResponse.json(
      { error: "Could not reset password. Try again." },
      { status: 500 }
    );
  }

  try {
    await sbUpdate(
      "admin_password_resets",
      { id: `eq.${found.reset.id}` },
      { used_at: new Date().toISOString() }
    );
  } catch (err) {
    // Password was updated; log but don't fail the request.
    console.error("[reset-password] marking used failed:", err);
  }

  return NextResponse.json({ ok: true });
}
