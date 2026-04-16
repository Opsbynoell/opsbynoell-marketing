/**
 * Admin session auth helpers.
 *
 * Uses Node.js built-in crypto (no external deps). Token format:
 *   base64url(payload JSON) . HMAC-SHA256(payload, secret)
 *
 * Required env vars:
 *   ADMIN_PASSWORD — plain-text password checked at login
 *   ADMIN_SECRET   — 32+ char secret for signing session tokens
 *                    (falls back to ADMIN_PASSWORD if not set, not ideal but works)
 */

import { createHmac } from "crypto";

const COOKIE_NAME = "admin_session";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function secret(): string {
  const s = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SECRET or ADMIN_PASSWORD env var required");
  return s;
}

export function createToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })
  ).toString("base64url");
  const sig = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  try {
    const expected = createHmac("sha256", secret())
      .update(payload)
      .digest("base64url");
    if (expected !== sig) return false;
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return input === pw;
}

export { COOKIE_NAME };
