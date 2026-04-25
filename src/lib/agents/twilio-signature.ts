/**
 * Twilio webhook signature validation.
 *
 * Algorithm: HMAC-SHA1 of `url + sorted(key+value).join("")`, base64
 * encoded, compared in constant time against `X-Twilio-Signature`.
 *
 * The `url` argument must match the public URL Twilio is calling EXACTLY
 * (scheme + host + path, no query string). Mismatches here are the most
 * common cause of silent 403-equivalent rejections on inbound webhooks,
 * so routes always log the `publicUrl` used when a signature fails.
 *
 * See: https://www.twilio.com/docs/usage/webhooks/webhooks-security
 */

import { createHmac, timingSafeEqual } from "node:crypto";

export function validateTwilioSignature(
  authToken: string,
  url: string,
  params: URLSearchParams,
  headerSig: string | null
): boolean {
  if (!headerSig) return false;
  const sortedKeys = [...params.keys()].sort();
  let data = url;
  for (const k of sortedKeys) {
    data += k + (params.get(k) ?? "");
  }
  const expected = createHmac("sha1", authToken).update(data).digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(headerSig);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
