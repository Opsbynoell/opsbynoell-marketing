/**
 * PBKDF2 password hashing for admin users.
 *
 * Intentionally in its own file so it is NEVER imported by src/proxy.ts
 * (Edge Runtime). Only admin API routes (Node.js runtime) import this.
 *
 * Hash format: pbkdf2:100000:SHA-256:<salt_hex>:<hash_hex>
 */

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const buffer = new ArrayBuffer(hex.length / 2);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const saltBuffer = new ArrayBuffer(16);
  const salt = new Uint8Array(saltBuffer);
  crypto.getRandomValues(salt);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100_000, hash: "SHA-256" },
    keyMaterial,
    256
  );
  return `pbkdf2:100000:SHA-256:${bytesToHex(saltBuffer)}:${bytesToHex(bits)}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const parts = stored.split(":");
  if (parts.length !== 5 || parts[0] !== "pbkdf2") return false;
  const [, iterStr, hashAlgo, saltHex, expectedHex] = parts;
  const iterations = parseInt(iterStr, 10);
  if (!iterations || hashAlgo !== "SHA-256") return false;

  const enc = new TextEncoder();
  const salt = hexToBytes(saltHex);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    256
  );
  const candidateHex = bytesToHex(bits);

  if (candidateHex.length !== expectedHex.length) return false;
  let diff = 0;
  for (let i = 0; i < candidateHex.length; i++) {
    diff |= candidateHex.charCodeAt(i) ^ expectedHex.charCodeAt(i);
  }
  return diff === 0;
}
