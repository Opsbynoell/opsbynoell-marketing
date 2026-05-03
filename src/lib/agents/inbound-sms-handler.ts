/**
 * Two-way SMS reply bridge - core handler logic.
 *
 * Extracted from the Next.js route so it can be unit-tested without
 * needing the Next.js runtime or a bundler.
 *
 * Phone semantics (CRITICAL):
 *   Outbound alert:  from = fromNumber (shared client number)  ->  to = <one of alertSmsTo[]> (operator)
 *   Operator reply:  from = <that operator>                    ->  to = fromNumber
 *   Table key:       from_phone = operator (the REPLIER)
 *                    to_phone   = fromNumber (the shared client number)
 *
 * Multi-operator: one client may have several operator phones in
 * cfg.smsConfig.alertSmsTo. Each operator gets its own row in
 * sms_alert_sessions, keyed by (from_phone, to_phone). cfg.smsConfig.operators
 * maps operator phone -> display name (e.g. "Nikki", "Santa") so the
 * inserted message attributes correctly.
 */

import { getClientConfig } from "./config";
import { sbInsert, sbSelect, sbUpdate } from "./supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SmsAlertSessionRow {
  from_phone: string;
  to_phone: string;
  session_id: string;
  agent: "support" | "frontDesk" | "care";
  client_id: string;
}

export interface InboundSmsPayload {
  /** Sender phone (E.164) - the operator. Maps to from_phone in table. */
  fromPhone: string;
  /**
   * Receiving shared client number (E.164) - the fromNumber used for
   * outbound. Maps to to_phone. Optional: when absent the handler falls
   * back to the most recent session row matching from_phone (ORDER BY
   * created_at DESC LIMIT 1).
   */
  toPhone: string | null;
  /** The SMS body text sent by the operator. */
  messageText: string;
}

export type InboundSmsResult =
  | { ok: true; sessionId: string }
  | { ok: false; reason: string };

// ---------------------------------------------------------------------------
// Table routing
// ---------------------------------------------------------------------------

export function resolveTables(agent: string): {
  sessionsTable: string;
  messagesTable: string;
  humanTakeoverField: string;
  updatedAtField: string;
  sessionIdField: string;
} {
  switch (agent) {
    case "frontDesk":
      return {
        sessionsTable: "front_desk_sessions",
        messagesTable: "front_desk_messages",
        humanTakeoverField: "human_takeover",
        updatedAtField: "updated_at",
        sessionIdField: "session_id",
      };
    case "care":
      return {
        sessionsTable: "care_sessions",
        messagesTable: "care_messages",
        humanTakeoverField: "human_takeover",
        updatedAtField: "updated_at",
        sessionIdField: "session_id",
      };
    default:
      // "support" -> chatSessions / chatMessages (legacy camelCase columns)
      return {
        sessionsTable: "chatSessions",
        messagesTable: "chatMessages",
        humanTakeoverField: "humanTakeover",
        updatedAtField: "updatedAt",
        sessionIdField: "sessionId",
      };
  }
}

// ---------------------------------------------------------------------------
// Operator attribution + label stripping
// ---------------------------------------------------------------------------

/**
 * Resolve the human-readable operator name for a given sender phone by
 * looking up cfg.smsConfig.operators[fromPhone]. Falls back to
 * "Operator" when the phone is not in the map (and never crashes).
 *
 * Returns also the optional clientLabel so the caller can strip a
 * leading "[Label] " prefix the operator may have echoed back from the
 * relayed message body.
 */
async function resolveOperatorContext(
  clientId: string,
  fromPhone: string
): Promise<{ operatorName: string; clientLabel: string | null }> {
  try {
    const cfg = await getClientConfig(clientId);
    const operatorsRaw = cfg.smsConfig?.operators;
    let operatorName = "Operator";
    if (operatorsRaw && typeof operatorsRaw === "object" && !Array.isArray(operatorsRaw)) {
      const map = operatorsRaw as Record<string, unknown>;
      const candidate = map[fromPhone];
      if (typeof candidate === "string" && candidate.trim().length > 0) {
        operatorName = candidate.trim();
      }
    }
    const labelRaw = cfg.smsConfig?.clientLabel;
    const clientLabel =
      typeof labelRaw === "string" && labelRaw.trim().length > 0
        ? labelRaw.trim()
        : null;
    return { operatorName, clientLabel };
  } catch (err) {
    console.warn(
      `[inbound-sms] could not load client config for ${clientId} - falling back to "Operator":`,
      err instanceof Error ? err.message : err
    );
    return { operatorName: "Operator", clientLabel: null };
  }
}

/**
 * Strip a leading `[clientLabel] ` prefix from the message body, only
 * when the label matches exactly. Operators sometimes hit reply on the
 * relayed prefixed message; we don't want that prefix echoed back into
 * the visitor session.
 */
function stripClientLabelPrefix(text: string, clientLabel: string | null): string {
  if (!clientLabel) return text;
  const prefix = `[${clientLabel}] `;
  if (text.startsWith(prefix)) {
    return text.slice(prefix.length);
  }
  return text;
}

// ---------------------------------------------------------------------------
// Core handler
// ---------------------------------------------------------------------------

export async function handleInboundSms(
  payload: InboundSmsPayload
): Promise<InboundSmsResult> {
  const { fromPhone, toPhone, messageText } = payload;

  // 1. Look up session mapping
  let mapping: SmsAlertSessionRow | null = null;
  try {
    if (toPhone) {
      const rows = await sbSelect<SmsAlertSessionRow>(
        "sms_alert_sessions",
        {
          from_phone: `eq.${fromPhone}`,
          to_phone: `eq.${toPhone}`,
        },
        { limit: 1 }
      );
      mapping = rows[0] ?? null;
    } else {
      console.info(
        `[inbound-sms] toPhone missing for ${fromPhone} - falling back to most recent session`
      );
      const rows = await sbSelect<SmsAlertSessionRow>(
        "sms_alert_sessions",
        {
          from_phone: `eq.${fromPhone}`,
        },
        { limit: 1, order: "created_at.desc" }
      );
      mapping = rows[0] ?? null;
    }
  } catch (err) {
    console.error("[inbound-sms] Supabase lookup failed:", err);
    return { ok: false, reason: "db_error" };
  }

  if (!mapping) {
    console.warn(
      `[inbound-sms] No session mapping for from=${fromPhone} to=${toPhone} - no-op`
    );
    return { ok: false, reason: "no_mapping" };
  }

  const { session_id, agent, client_id } = mapping;

  // 2. Resolve operator name + client label so we can attribute the
  // message and strip an echoed-back prefix.
  const { operatorName, clientLabel } = await resolveOperatorContext(
    client_id,
    fromPhone
  );

  const stripped = stripClientLabelPrefix(messageText, clientLabel);
  const text = stripped.trim() || "(empty)";

  console.info(
    `[inbound-sms] Reply from ${fromPhone} (${operatorName}) -> session=${session_id} agent=${agent}: "${text.slice(0, 80)}"`
  );

  // 3. Resolve tables for the agent
  const {
    sessionsTable,
    messagesTable,
    humanTakeoverField,
    updatedAtField,
    sessionIdField,
  } = resolveTables(agent);

  // 4. Insert message + flip takeover
  const messageRow: Record<string, unknown> = {
    [sessionIdField]: session_id,
    role: "human",
    content: text,
    author: `${operatorName} (human)`,
  };

  const sessionPatch: Record<string, unknown> = {
    [humanTakeoverField]: true,
    [updatedAtField]: new Date().toISOString(),
  };

  try {
    await Promise.all([
      sbInsert(messagesTable, messageRow),
      sbUpdate(sessionsTable, { id: `eq.${session_id}` }, sessionPatch),
    ]);
  } catch (err) {
    console.error(
      `[inbound-sms] Failed to write message/takeover for session=${session_id}:`,
      err
    );
    return { ok: false, reason: "db_write_error" };
  }

  return { ok: true, sessionId: session_id };
}

// ---------------------------------------------------------------------------
// Payload extractor - normalises GHL/LC/Twilio webhook variants
// ---------------------------------------------------------------------------

export function extractInboundPayload(
  body: Record<string, unknown>
): { fromPhone: string; toPhone: string | null; messageText: string } | null {
  const fromPhone =
    (body.phone as string | undefined) ??
    (body.from as string | undefined) ??
    null;

  const toPhone =
    (body.toNumber as string | undefined) ??
    (body.to as string | undefined) ??
    null;

  const messageText =
    (body.body as string | undefined) ??
    (body.message as string | undefined) ??
    "";

  if (!fromPhone) return null;
  return { fromPhone, toPhone: toPhone ?? null, messageText };
}
