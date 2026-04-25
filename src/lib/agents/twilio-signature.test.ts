/**
 * Tests for the Twilio webhook signature validator.
 *
 * The algorithm is specified by Twilio:
 *   base64(HMAC-SHA1(authToken, url + sorted(key+value).join("")))
 *
 * We build the expected signature by hand, feed it through the helper,
 * and assert it validates. We also cover the rejection paths (missing
 * header, wrong token, tampered body).
 */

import { strict as assert } from "node:assert";
import { createHmac } from "node:crypto";
import { test } from "node:test";

import { validateTwilioSignature } from "./twilio-signature.ts";

const AUTH_TOKEN = "test-auth-token";
const URL = "https://www.opsbynoell.com/api/twilio/inbound-visitor-sms";

function sign(
  token: string,
  url: string,
  params: URLSearchParams
): string {
  const sorted = [...params.keys()].sort();
  let data = url;
  for (const k of sorted) {
    data += k + (params.get(k) ?? "");
  }
  return createHmac("sha1", token).update(data).digest("base64");
}

test("validateTwilioSignature: accepts correctly signed request", () => {
  const params = new URLSearchParams({
    From: "+17145550123",
    To: "+19499973915",
    Body: "hi, any openings today?",
    MessageSid: "SM123",
  });
  const sig = sign(AUTH_TOKEN, URL, params);
  assert.equal(validateTwilioSignature(AUTH_TOKEN, URL, params, sig), true);
});

test("validateTwilioSignature: rejects missing header", () => {
  const params = new URLSearchParams({ From: "+1", Body: "x" });
  assert.equal(validateTwilioSignature(AUTH_TOKEN, URL, params, null), false);
});

test("validateTwilioSignature: rejects wrong auth token", () => {
  const params = new URLSearchParams({ From: "+1", Body: "x" });
  const sig = sign("other-token", URL, params);
  assert.equal(validateTwilioSignature(AUTH_TOKEN, URL, params, sig), false);
});

test("validateTwilioSignature: rejects tampered body", () => {
  const params = new URLSearchParams({ From: "+1", Body: "original" });
  const sig = sign(AUTH_TOKEN, URL, params);
  const tampered = new URLSearchParams({ From: "+1", Body: "tampered" });
  assert.equal(
    validateTwilioSignature(AUTH_TOKEN, URL, tampered, sig),
    false
  );
});

test("validateTwilioSignature: rejects mismatched URL", () => {
  const params = new URLSearchParams({ From: "+1", Body: "x" });
  const sig = sign(AUTH_TOKEN, URL, params);
  const wrongUrl = URL.replace("opsbynoell.com", "evil.example");
  assert.equal(
    validateTwilioSignature(AUTH_TOKEN, wrongUrl, params, sig),
    false
  );
});

test("validateTwilioSignature: key order in params does not matter (sorted by validator)", () => {
  // Build params in different insertion order; Twilio sorts by key name.
  const a = new URLSearchParams();
  a.set("To", "+19499973915");
  a.set("From", "+17145550123");
  a.set("Body", "hi");
  const sig = sign(AUTH_TOKEN, URL, a);

  const b = new URLSearchParams();
  b.set("From", "+17145550123");
  b.set("Body", "hi");
  b.set("To", "+19499973915");

  assert.equal(validateTwilioSignature(AUTH_TOKEN, URL, b, sig), true);
});
