/**
 * Admin session auth helpers.
 *
 * Intentionally minimal — this file is imported by src/proxy.ts (Edge Runtime).
 * ONLY token creation and verification live here. Password hashing lives in
 * admin-password.ts (Node.js only, never imported by proxy).
 *
 * Uses the Web Crypto API (crypto.subtle) throughout.
 * Uses TextEncoder / TextDecoder for base64url — NO escape() / unescape(),
 * which are NOT available in Vercel Edge Runtime.
 *
 * Token format:  base64url(JSON payload).base64url(HMAC-SHA256 signature)
 *
 * Payload shape:
 *   { userId, email, isSuperAdmin, accessibleClients[], exp }
 *
 * Required env vars:
 *   ADMIN_SECRET  — 32+ char secret for signing tokens
 *   ADMIN_PASSWORD — (legacy) plain-text fallback password
 */

export const COOKIE_NAME = "admin_session";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface AdminTokenPayload {
  userId: string;
  email: string;
  isSuperAdmin: boolean;
  accessibleClients: string[];
  exp: number;
}

// ----------------------------------------------------------------
// Base64url — Edge Runtime safe (TextEncoder / TextDecoder only)
// ----------------------------------------------------------------

function toBase64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function strToBase64url(str: string): string {
  // TextEncoder gives UTF-8 bytes; convert to binary string for btoa
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64urlToStr(b64: string): string {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const padded2 = pad ? padded + "=".repeat(4 - pad) : padded;
  const binary = atob(padded2);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

// ----------------------------------------------------------------
// HMAC signing
// ----------------------------------------------------------------

function getSecret(): string {
  const s = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SECRET env var required");
  return s;
}

async function hmacSign(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return toBase64url(sig);
}

// ----------------------------------------------------------------
// Token creation / verification
// ----------------------------------------------------------------

export async function createToken(
  payload: Omit<AdminTokenPayload, "exp">
): Promise<string> {
  const full: AdminTokenPayload = { ...payload, exp: Date.now() + TOKEN_TTL_MS };
  const encoded = strToBase64url(JSON.stringify(full));
  const sig = await hmacSign(getSecret(), encoded);
  return `${encoded}.${sig}`;
}

export async function verifyToken(
  token: string | undefined
): Promise<AdminTokenPayload | null> {
  if (!token) return null;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;
  const encoded = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  try {
    const expected = await hmacSign(getSecret(), encoded);
    if (expected !== sig) return null;
    const payload = JSON.parse(base64urlToStr(encoded)) as AdminTokenPayload;
    if (typeof payload.exp !== "number" || Date.now() >= payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------
// Legacy plain-text password fallback
// ----------------------------------------------------------------

export function checkLegacyPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return false;
  return input === pw;
}
