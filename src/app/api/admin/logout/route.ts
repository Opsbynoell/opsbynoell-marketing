import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(): Promise<Response> {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
