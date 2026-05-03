import { strict as assert } from "node:assert";
import { mock, test } from "node:test";
import type { ClientConfig } from "./types";

let sendSMS: (to: string, body: string) => Promise<{ messageId: string }> =
  async () => ({ messageId: "default" });
const calls: Array<[string, string]> = [];

const upsertCalls: Array<{
  table: string;
  row: Record<string, unknown>;
  conflict: string | undefined;
}> = [];

mock.module("./integrations/registry.ts", {
  namedExports: {
    getSmsIntegration: () => ({
      sendSMS: async (to: string, body: string) => {
        calls.push([to, body]);
        return sendSMS(to, body);
      },
    }),
  },
});

mock.module("./supabase.ts", {
  namedExports: {
    sbUpsert: async (
      table: string,
      row: Record<string, unknown>,
      conflict?: string
    ) => {
      upsertCalls.push({ table, row, conflict });
      return [row];
    },
  },
});

const { sendOwnerSmsAlert } = await import("./sms-alert.ts");

const baseCfg = (smsConfig: Record<string, unknown> = {}): ClientConfig =>
  ({
    clientId: "c1",
    businessName: "Biz",
    vertical: "internal",
    agents: { support: true, frontDesk: false, care: false },
    smsProvider: "ghl",
    smsConfig,
    active: true,
  }) as unknown as ClientConfig;

function resetAll() {
  calls.length = 0;
  upsertCalls.length = 0;
  sendSMS = async () => ({ messageId: "default" });
}

test("returns no_alert_sms_to when alertSmsTo missing", async () => {
  resetAll();
  const r = await sendOwnerSmsAlert({ cfg: baseCfg(), message: "hi" });
  assert.deepEqual(r, { ok: false, error: "no_alert_sms_to" });
  assert.equal(calls.length, 0);
});

test("legacy: single-string alertSmsTo sends one message and reports ok", async () => {
  resetAll();
  sendSMS = async () => ({ messageId: "mX" });
  const r = await sendOwnerSmsAlert({
    cfg: baseCfg({ alertSmsTo: "+15551230000" }),
    message: "lead!",
  });
  assert.equal(r.ok, true);
  assert.equal(r.messageId, "mX");
  assert.deepEqual(calls, [["+15551230000", "lead!"]]);
});

test("legacy: missing clientLabel does not prefix the body", async () => {
  resetAll();
  sendSMS = async () => ({ messageId: "m1" });
  await sendOwnerSmsAlert({
    cfg: baseCfg({ alertSmsTo: "+15551230000" }),
    message: "lead!",
  });
  assert.equal(calls[0][1], "lead!");
});

test("array alertSmsTo: sends N messages in order, ok=true", async () => {
  resetAll();
  sendSMS = async (to: string) => ({ messageId: `mid-${to}` });
  const r = await sendOwnerSmsAlert({
    cfg: baseCfg({
      alertSmsTo: ["+15551110001", "+15551110002"],
    }),
    message: "lead!",
  });
  assert.equal(r.ok, true);
  assert.equal(calls.length, 2);
  assert.equal(calls[0][0], "+15551110001");
  assert.equal(calls[1][0], "+15551110002");
  assert.equal(r.results?.length, 2);
  assert.equal(r.results?.[0].ok, true);
  assert.equal(r.results?.[1].ok, true);
});

test("clientLabel prefixes the body for every recipient", async () => {
  resetAll();
  sendSMS = async () => ({ messageId: "m" });
  await sendOwnerSmsAlert({
    cfg: baseCfg({
      alertSmsTo: ["+15551110001", "+15551110002"],
      clientLabel: "Santa",
    }),
    message: "Hot lead at 555-1212",
  });
  assert.equal(calls[0][1], "[Santa] Hot lead at 555-1212");
  assert.equal(calls[1][1], "[Santa] Hot lead at 555-1212");
});

test("blank clientLabel does not add a prefix", async () => {
  resetAll();
  sendSMS = async () => ({ messageId: "m" });
  await sendOwnerSmsAlert({
    cfg: baseCfg({
      alertSmsTo: "+15551110001",
      clientLabel: "   ",
    }),
    message: "no prefix please",
  });
  assert.equal(calls[0][1], "no prefix please");
});

test("array alertSmsTo + sessionContext: writes one upsert per operator", async () => {
  resetAll();
  sendSMS = async () => ({ messageId: "m" });
  await sendOwnerSmsAlert({
    cfg: baseCfg({
      alertSmsTo: ["+15551110001", "+15551110002"],
      fromNumber: "+19499196118",
    }),
    message: "lead!",
    sessionContext: { sessionId: "sess-A", agent: "support" },
  });
  // Allow microtasks to flush since upsert is fire-and-forget.
  await new Promise((r) => setImmediate(r));
  assert.equal(upsertCalls.length, 2);
  assert.equal(upsertCalls[0].table, "sms_alert_sessions");
  assert.equal(upsertCalls[0].row.from_phone, "+15551110001");
  assert.equal(upsertCalls[0].row.to_phone, "+19499196118");
  assert.equal(upsertCalls[1].row.from_phone, "+15551110002");
  assert.equal(upsertCalls[1].row.to_phone, "+19499196118");
  assert.equal(upsertCalls[0].conflict, "from_phone,to_phone");
});

test("one recipient failing does not block the others; ok=true overall", async () => {
  resetAll();
  let i = 0;
  sendSMS = async () => {
    i += 1;
    if (i === 1) throw new Error("op-1 down");
    return { messageId: "ok-2" };
  };
  const r = await sendOwnerSmsAlert({
    cfg: baseCfg({
      alertSmsTo: ["+15551110001", "+15551110002"],
    }),
    message: "lead!",
  });
  assert.equal(r.ok, true);
  assert.equal(r.results?.length, 2);
  assert.equal(r.results?.[0].ok, false);
  assert.equal(r.results?.[0].error, "op-1 down");
  assert.equal(r.results?.[1].ok, true);
  assert.equal(r.messageId, "ok-2");
});

test("all recipients failing returns ok=false with first error", async () => {
  resetAll();
  sendSMS = async () => {
    throw new Error("everyone down");
  };
  const r = await sendOwnerSmsAlert({
    cfg: baseCfg({
      alertSmsTo: ["+15551110001", "+15551110002"],
    }),
    message: "x",
  });
  assert.equal(r.ok, false);
  assert.equal(r.error, "everyone down");
});

test("legacy single-string + sendSMS throws still returns ok:false (does not re-throw)", async () => {
  resetAll();
  sendSMS = async () => {
    throw new Error("boom");
  };
  const r = await sendOwnerSmsAlert({
    cfg: baseCfg({ alertSmsTo: "+15551230000" }),
    message: "x",
  });
  assert.equal(r.ok, false);
  assert.equal(r.error, "boom");
});
