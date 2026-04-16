/**
 * Admin session auth helpers.
 *
 * Uses the Web Crypto API (crypto.subtle) — works in both Edge Runtime
 * (middleware) and Node.js >= 18 (API routes). The previous version used
 * Node.js `createHmac` which is NOT available in Edge Runtime, causing
 * verifyToken to always return false in middleware (silently caught by
 * try/catch), which broke post-login redirects.
 *
 * All exported functions are async.
 *
 * Required env vars:
 *   ADMIN_PASSWORD — plain-text password checked at login
 *   ADMIN_SECRET   — 32+ char secret for signing session tokens
 */

const COOKIE_NAME = "admin_session";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const s = process.env.ADMIN_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("ADMIN_SECRET or ADMIN_PASSWORD env var required");
  return s;
}

// base64url helpers that work in both Edge and Node.js
function toBase64url(buf: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function strToBase64url(str: string): string {
  return btoa(unescape(encodeURIComponent(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function base64urlToStr(b64: string): string {
  const padded = b64.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const padded2 = pad ? padded + "=".repeat(4 - pad) : padded;
  return decodeURIComponent(escape(atob(padded2)));
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

export async function createToken(): Promise<string> {
  const payload = strToBase64url(
    JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS })
  );
  const sig = await hmacSign(getSecret(), payload);
  return `${payload}.${sig}`;
}

export async function verifyToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  try {
    const expected = await hmacSign(getSecret(), payload);
    if (expected !== sig) return false;
    const { exp } = JSON.parse(base64urlToStr(payload));
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
