/**
 * Tests for the two-way SMS reply bridge.
 *
 * Tests handleInboundSms() and extractInboundPayload() from
 * inbound-sms-handler.ts - the pure logic layer, decoupled from the
 * Next.js route wrapper.
 *
 * Phone semantic verification (the most common bug in two-way bridges):
 *   Outbound alert:  from = fromNumber  ->  to = <one of alertSmsTo[]>
 *   Operator reply:  from = <that operator>  ->  to = fromNumber
 *   Table key:       from_phone = operator (REPLIER)
 *                    to_phone   = fromNumber (shared client number)
 */

import { strict as assert } from "node:assert";
import { mock, test } from "node:test";

// Mocks

const sbSelectCalls: Array<{ table: string; params: Record<string, unknown> }> = [];
const sbInsertCalls: Array<{ table: string; row: Record<string, unknown> }> = [];
const sbUpdateCalls: Array<{
  table: string;
  filter: Record<string, unknown>;
  patch: Record<string, unknown>;
}> = [];

let mockMapping: Record<string, unknown> | null = {
  from_phone: "+19497849726",
  to_phone: "+19499973915",
  session_id: "sess-uuid-001",
  agent: "support",
  client_id: "opsbynoell",
};

// Per-client config returned by getClientConfig mock.
let mockClientCfg: Record<string, Record<string, unknown>> = {
  opsbynoell: {
    smsConfig: {
      operators: { "+19497849726": "Nikki" },
    },
  },
  santa: {
    smsConfig: {
      operators: {
        "+19497849726": "Nikki",
        "+19493030798": "Santa",
      },
      clientLabel: "Santa",
    },
  },
};

mock.module("./supabase.ts", {
  namedExports: {
    sbSelect: async (table: string, params: Record<string, unknown>) => {
      sbSelectCalls.push({ table, params });
      if (table === "sms_alert_sessions" && mockMapping) {
        return [mockMapping];
      }
      return [];
    },
    sbInsert: async (table: string, row: Record<string, unknown>) => {
      sbInsertCalls.push({ table, row });
      return { id: "new-msg-id", ...row };
    },
    sbUpdate: async (
      table: string,
      filter: Record<string, unknown>,
      patch: Record<string, unknown>
    ) => {
      sbUpdateCalls.push({ table, filter, patch });
      return [patch];
    },
    sbUpsert: async () => ({}),
  },
});

mock.module("./config.ts", {
  namedExports: {
    getClientConfig: async (clientId: string) => {
      const cfg = mockClientCfg[clientId];
      if (!cfg) throw new Error(`Unknown clientId: ${clientId}`);
      return {
        clientId,
        businessName: clientId,
        vertical: "test",
        agents: { support: true, frontDesk: true, care: true },
        active: true,
        ...cfg,
      };
    },
  },
});

const { handleInboundSms, extractInboundPayload, resolveTables } =
  await import("./inbound-sms-handler.ts");

// Helpers

function resetCalls() {
  sbSelectCalls.length = 0;
  sbInsertCalls.length = 0;
  sbUpdateCalls.length = 0;
}

// extractInboundPayload

test("extractInboundPayload: primary GHL shape (phone / toNumber / body)", () => {
  const result = extractInboundPayload({
    phone: "+19497849726",
    toNumber: "+19499973915",
    body: "Heyyyyyy",
  });
  assert.ok(result);
  assert.equal(result.fromPhone, "+19497849726");
  assert.equal(result.toPhone, "+19499973915");
  assert.equal(result.messageText, "Heyyyyyy");
});

test("extractInboundPayload: LC workflow alias shape (from / to / message)", () => {
  const result = extractInboundPayload({
    from: "+19497849726",
    to: "+19499973915",
    message: "Using aliases",
  });
  assert.ok(result);
  assert.equal(result.fromPhone, "+19497849726");
  assert.equal(result.toPhone, "+19499973915");
  assert.equal(result.messageText, "Using aliases");
});

test("extractInboundPayload: returns null when fromPhone is missing", () => {
  assert.equal(extractInboundPayload({ body: "no phones" }), null);
  assert.equal(extractInboundPayload({ toNumber: "+19499973915", body: "hi" }), null);
});

test("extractInboundPayload: returns payload with toPhone=null when toNumber is omitted", () => {
  const result = extractInboundPayload({ phone: "+19497849726", body: "hello" });
  assert.ok(result, "should return a payload even without toNumber");
  assert.equal(result.fromPhone, "+19497849726");
  assert.equal(result.toPhone, null);
  assert.equal(result.messageText, "hello");
});

// resolveTables

test("resolveTables: support -> chatSessions / chatMessages (camelCase)", () => {
  const t = resolveTables("support");
  assert.equal(t.sessionsTable, "chatSessions");
  assert.equal(t.messagesTable, "chatMessages");
  assert.equal(t.humanTakeoverField, "humanTakeover");
  assert.equal(t.sessionIdField, "sessionId");
});

test("resolveTables: frontDesk -> front_desk_sessions / front_desk_messages", () => {
  const t = resolveTables("frontDesk");
  assert.equal(t.sessionsTable, "front_desk_sessions");
  assert.equal(t.messagesTable, "front_desk_messages");
  assert.equal(t.humanTakeoverField, "human_takeover");
  assert.equal(t.sessionIdField, "session_id");
});

test("resolveTables: care -> care_sessions / care_messages", () => {
  const t = resolveTables("care");
  assert.equal(t.sessionsTable, "care_sessions");
  assert.equal(t.messagesTable, "care_messages");
  assert.equal(t.humanTakeoverField, "human_takeover");
  assert.equal(t.sessionIdField, "session_id");
});

// handleInboundSms

test("phone semantics: looks up (from_phone=operator, to_phone=fromNumber)", async () => {
  resetCalls();
  await handleInboundSms({
    fromPhone: "+19497849726",
    toPhone: "+19499973915",
    messageText: "Heyyyyyy",
  });

  assert.equal(sbSelectCalls.length, 1);
  assert.equal(sbSelectCalls[0].table, "sms_alert_sessions");
  const params = sbSelectCalls[0].params as Record<string, string>;
  assert.equal(params.from_phone, "eq.+19497849726");
  assert.equal(params.to_phone, "eq.+19499973915");
});

test("known sender (opsbynoell): author resolves to 'Nikki (human)' from operators map", async () => {
  resetCalls();
  const result = await handleInboundSms({
    fromPhone: "+19497849726",
    toPhone: "+19499973915",
    messageText: "Heyyyyyy",
  });

  assert.equal(result.ok, true);
  if (!result.ok) throw new Error("expected ok");
  assert.equal(result.sessionId, "sess-uuid-001");
  assert.equal(sbInsertCalls.length, 1);
  assert.equal(sbUpdateCalls.length, 1);

  const msg = sbInsertCalls[0].row;
  assert.equal(msg.content, "Heyyyyyy");
  assert.equal(msg.role, "human");
  assert.equal(msg.author, "Nikki (human)");
  assert.equal(sbInsertCalls[0].table, "chatMessages");
});

test("known sender (support): flips humanTakeover=true on chatSessions (camelCase)", async () => {
  resetCalls();
  await handleInboundSms({
    fromPhone: "+19497849726",
    toPhone: "+19499973915",
    messageText: "I'm here",
  });

  const update = sbUpdateCalls[0];
  assert.equal(update.table, "chatSessions");
  assert.equal(update.patch.humanTakeover, true);
});

test("known sender (frontDesk): uses front_desk_messages and human_takeover", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+19497849726",
    to_phone: "+19499973915",
    session_id: "sess-fd-002",
    agent: "frontDesk",
    client_id: "opsbynoell",
  };
  try {
    const result = await handleInboundSms({
      fromPhone: "+19497849726",
      toPhone: "+19499973915",
      messageText: "Be there in 5",
    });
    assert.equal(result.ok, true);
    if (!result.ok) throw new Error("expected ok");
    assert.equal(result.sessionId, "sess-fd-002");

    const insert = sbInsertCalls[0];
    assert.equal(insert.table, "front_desk_messages");
    assert.equal(insert.row.session_id, "sess-fd-002");
    assert.equal(insert.row.role, "human");
    assert.equal(insert.row.author, "Nikki (human)");

    const update = sbUpdateCalls[0];
    assert.equal(update.table, "front_desk_sessions");
    assert.equal(update.patch.human_takeover, true);
  } finally {
    mockMapping = saved;
  }
});

test("known sender (care): uses care_messages and human_takeover", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+19497849726",
    to_phone: "+19499973915",
    session_id: "sess-care-003",
    agent: "care",
    client_id: "opsbynoell",
  };
  try {
    await handleInboundSms({
      fromPhone: "+19497849726",
      toPhone: "+19499973915",
      messageText: "On my way",
    });
    assert.equal(sbInsertCalls[0].table, "care_messages");
    assert.equal(sbUpdateCalls[0].table, "care_sessions");
    assert.equal(sbUpdateCalls[0].patch.human_takeover, true);
  } finally {
    mockMapping = saved;
  }
});

test("unknown sender: returns no_mapping, zero DB writes", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = null;
  try {
    const result = await handleInboundSms({
      fromPhone: "+10000000000",
      toPhone: "+19499973915",
      messageText: "spam",
    });
    assert.equal(result.ok, false);
    if (result.ok) throw new Error("expected not ok");
    assert.equal(result.reason, "no_mapping");
    assert.equal(sbInsertCalls.length, 0);
    assert.equal(sbUpdateCalls.length, 0);
  } finally {
    mockMapping = saved;
  }
});

test("empty message body is stored as '(empty)'", async () => {
  resetCalls();
  await handleInboundSms({
    fromPhone: "+19497849726",
    toPhone: "+19499973915",
    messageText: "   ",
  });
  assert.equal(sbInsertCalls[0].row.content, "(empty)");
});

test("falls back to most recent row when toNumber is omitted", async () => {
  resetCalls();
  const result = await handleInboundSms({
    fromPhone: "+19497849726",
    toPhone: null,
    messageText: "Calling without toNumber",
  });

  assert.equal(result.ok, true);
  if (!result.ok) throw new Error("expected ok");
  assert.equal(result.sessionId, "sess-uuid-001");

  assert.equal(sbSelectCalls.length, 1);
  const params = sbSelectCalls[0].params as Record<string, string>;
  assert.equal(params.from_phone, "eq.+19497849726");
  assert.equal(params.to_phone, undefined);

  assert.equal(sbInsertCalls.length, 1);
  assert.equal(sbUpdateCalls.length, 1);
  assert.equal(sbInsertCalls[0].row.content, "Calling without toNumber");
  assert.equal(sbInsertCalls[0].row.author, "Nikki (human)");
});

// Multi-operator (santa) cases

test("santa: Nikki replying gets attributed 'Nikki (human)'", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+19497849726",
    to_phone: "+19499196118",
    session_id: "sess-santa-001",
    agent: "support",
    client_id: "santa",
  };
  try {
    await handleInboundSms({
      fromPhone: "+19497849726",
      toPhone: "+19499196118",
      messageText: "Got it",
    });
    assert.equal(sbInsertCalls[0].row.author, "Nikki (human)");
  } finally {
    mockMapping = saved;
  }
});

test("santa: Santa replying gets attributed 'Santa (human)'", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+19493030798",
    to_phone: "+19499196118",
    session_id: "sess-santa-002",
    agent: "support",
    client_id: "santa",
  };
  try {
    await handleInboundSms({
      fromPhone: "+19493030798",
      toPhone: "+19499196118",
      messageText: "On my way",
    });
    assert.equal(sbInsertCalls[0].row.author, "Santa (human)");
  } finally {
    mockMapping = saved;
  }
});

test("unknown operator phone falls back to 'Operator (human)' (does not crash)", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+15550009999",
    to_phone: "+19499196118",
    session_id: "sess-santa-003",
    agent: "support",
    client_id: "santa",
  };
  try {
    const result = await handleInboundSms({
      fromPhone: "+15550009999",
      toPhone: "+19499196118",
      messageText: "Who am I",
    });
    assert.equal(result.ok, true);
    assert.equal(sbInsertCalls[0].row.author, "Operator (human)");
  } finally {
    mockMapping = saved;
  }
});

test("santa: leading [Santa] prefix is stripped before insert", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+19497849726",
    to_phone: "+19499196118",
    session_id: "sess-santa-004",
    agent: "support",
    client_id: "santa",
  };
  try {
    await handleInboundSms({
      fromPhone: "+19497849726",
      toPhone: "+19499196118",
      messageText: "[Santa] sure, see you Friday",
    });
    assert.equal(sbInsertCalls[0].row.content, "sure, see you Friday");
  } finally {
    mockMapping = saved;
  }
});

test("santa: prefix that does not match clientLabel is left intact", async () => {
  resetCalls();
  const saved = mockMapping;
  mockMapping = {
    from_phone: "+19497849726",
    to_phone: "+19499196118",
    session_id: "sess-santa-005",
    agent: "support",
    client_id: "santa",
  };
  try {
    await handleInboundSms({
      fromPhone: "+19497849726",
      toPhone: "+19499196118",
      messageText: "[Other] not stripped",
    });
    assert.equal(sbInsertCalls[0].row.content, "[Other] not stripped");
  } finally {
    mockMapping = saved;
  }
});

test("opsbynoell: no clientLabel means [anything] is left untouched", async () => {
  resetCalls();
  // opsbynoell mock has no clientLabel.
  await handleInboundSms({
    fromPhone: "+19497849726",
    toPhone: "+19499973915",
    messageText: "[Santa] should remain",
  });
  assert.equal(sbInsertCalls[0].row.content, "[Santa] should remain");
});

test("getClientConfig failure does not crash; falls back to 'Operator (human)' and unstripped body", async () => {
  resetCalls();
  const savedCfg = mockClientCfg;
  const savedMap = mockMapping;
  mockClientCfg = {}; // any lookup throws
  mockMapping = {
    from_phone: "+19497849726",
    to_phone: "+19499196118",
    session_id: "sess-fallback-001",
    agent: "support",
    client_id: "ghost",
  };
  try {
    const result = await handleInboundSms({
      fromPhone: "+19497849726",
      toPhone: "+19499196118",
      messageText: "[Santa] still goes through",
    });
    assert.equal(result.ok, true);
    assert.equal(sbInsertCalls[0].row.author, "Operator (human)");
    assert.equal(sbInsertCalls[0].row.content, "[Santa] still goes through");
  } finally {
    mockClientCfg = savedCfg;
    mockMapping = savedMap;
  }
});
