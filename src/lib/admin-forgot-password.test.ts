import { strict as assert } from "node:assert";
import { mock, test } from "node:test";

interface SbSelectCall {
  table: string;
  params: Record<string, unknown>;
}

interface SbInsertCall {
  table: string;
  row: Record<string, unknown>;
}

interface SendCall {
  toEmail: string;
  rawToken: string;
}

const sbSelectCalls: SbSelectCall[] = [];
const sbInsertCalls: SbInsertCall[] = [];
const sendCalls: SendCall[] = [];

let userRowsForNextSelect: Array<{ id: string; email: string }> = [];
let sbSelectShouldThrow = false;
let sbInsertShouldThrow = false;

mock.module("./agents/supabase.ts", {
  namedExports: {
    sbSelect: async (
      table: string,
      params: Record<string, unknown>
    ) => {
      sbSelectCalls.push({ table, params });
      if (sbSelectShouldThrow) throw new Error("db down");
      return userRowsForNextSelect;
    },
    sbInsert: async (table: string, row: Record<string, unknown>) => {
      sbInsertCalls.push({ table, row });
      if (sbInsertShouldThrow) throw new Error("insert failed");
      return row;
    },
    sbUpdate: async () => [],
    sbUpsert: async () => ({}),
    sbRpc: async () => ({}),
  },
});

mock.module("./admin-password-reset.ts", {
  namedExports: {
    RESET_TOKEN_TTL_MS: 60 * 60 * 1000,
    generateResetToken: () => "raw-token-123",
    hashResetToken: async (t: string) => `hash:${t}`,
    buildResetUrl: (t: string) => `https://example.com/reset?token=${t}`,
    sendResetEmail: async (params: {
      toEmail: string;
      rawToken: string;
    }) => {
      sendCalls.push(params);
      return { ok: true };
    },
  },
});

const { handleForgotPassword } = await import("./admin-forgot-password.ts");

function resetState() {
  sbSelectCalls.length = 0;
  sbInsertCalls.length = 0;
  sendCalls.length = 0;
  userRowsForNextSelect = [];
  sbSelectShouldThrow = false;
  sbInsertShouldThrow = false;
}

test("always resolves ok for an unknown email — no token, no email", async () => {
  resetState();
  userRowsForNextSelect = [];

  const result = await handleForgotPassword("ghost@example.com");

  assert.deepEqual(result, { ok: true });
  assert.equal(sbSelectCalls.length, 1);
  assert.equal(sbSelectCalls[0].table, "admin_users");
  assert.equal(
    sbSelectCalls[0].params.email,
    "eq.ghost@example.com",
    "email should be lowercased and used as eq filter"
  );
  assert.equal(sbInsertCalls.length, 0, "no token row inserted for unknown user");
  assert.equal(sendCalls.length, 0, "no email sent for unknown user");
});

test("creates reset token + sends email when email matches an admin user", async () => {
  resetState();
  userRowsForNextSelect = [
    { id: "user-abc", email: "hello@opsbynoell.com" },
  ];

  const result = await handleForgotPassword("Hello@OpsByNoell.com");

  assert.deepEqual(result, { ok: true });

  assert.equal(sbInsertCalls.length, 1, "one token row inserted");
  const insert = sbInsertCalls[0];
  assert.equal(insert.table, "admin_password_resets");
  assert.equal(insert.row.user_id, "user-abc");
  assert.equal(insert.row.token_hash, "hash:raw-token-123");
  assert.ok(
    typeof insert.row.expires_at === "string" &&
      !Number.isNaN(new Date(insert.row.expires_at).getTime()),
    "expires_at is an ISO timestamp"
  );
  const expiresMs = new Date(insert.row.expires_at as string).getTime();
  const delta = expiresMs - Date.now();
  assert.ok(
    delta > 55 * 60 * 1000 && delta <= 60 * 60 * 1000 + 1000,
    `expires_at should be ~1 hour out (got ${delta}ms)`
  );

  assert.equal(sendCalls.length, 1, "one email sent");
  assert.deepEqual(sendCalls[0], {
    toEmail: "hello@opsbynoell.com",
    rawToken: "raw-token-123",
  });
});

test("returns ok with the same shape for known and unknown emails — no enumeration signal", async () => {
  resetState();
  userRowsForNextSelect = [];
  const unknown = await handleForgotPassword("nobody@example.com");

  resetState();
  userRowsForNextSelect = [
    { id: "user-abc", email: "hello@opsbynoell.com" },
  ];
  const known = await handleForgotPassword("hello@opsbynoell.com");

  assert.deepEqual(unknown, known);
});

test("still resolves ok when the DB lookup throws — no email sent", async () => {
  resetState();
  sbSelectShouldThrow = true;

  const result = await handleForgotPassword("hello@opsbynoell.com");

  assert.deepEqual(result, { ok: true });
  assert.equal(sbInsertCalls.length, 0);
  assert.equal(sendCalls.length, 0);
});

test("empty email short-circuits without hitting the DB", async () => {
  resetState();

  const result = await handleForgotPassword("   ");

  assert.deepEqual(result, { ok: true });
  assert.equal(sbSelectCalls.length, 0);
  assert.equal(sbInsertCalls.length, 0);
  assert.equal(sendCalls.length, 0);
});
