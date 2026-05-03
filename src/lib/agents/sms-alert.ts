/**
 * Owner SMS alert sender.
 *
 * Sends a qualified-lead SMS to the owner(s) via whatever SMS provider
 * the client is configured for (GHL LC Phone, Twilio, etc.). Destination
 * number(s) are read from `cfg.smsConfig.alertSmsTo` (E.164). Accepts
 * either a single string (legacy / single-operator clients like
 * opsbynoell) or an array of strings (multi-operator clients like
 * santa).
 *
 * Optional `cfg.smsConfig.clientLabel` (e.g. "Santa") is prepended to
 * the message body as `[Label] ` so multi-tenant operators can tell at
 * a glance which client a relayed message belongs to. When the label is
 * missing or empty the message body is unchanged (preserves the
 * opsbynoell single-tenant experience).
 *
 * Fails soft per recipient: if one operator's send fails, log and
 * continue with the rest. Returns `{ ok: true }` if at least one send
 * succeeded; `{ ok: false }` only when every recipient failed (or none
 * were configured).
 *
 * Two-way reply bridge
 * --------------------
 * When optional `sessionContext` is provided AND `fromNumber` is set,
 * each successful send upserts a row into `sms_alert_sessions` keyed by
 * (from_phone=<this operator>, to_phone=fromNumber). Each operator gets
 * their own mapping row, so a reply from any operator routes back to
 * the same originating visitor session.
 *
 * Phone semantics:
 *   outbound:  from=cfg.smsConfig.fromNumber  ->  to=<each alertSmsTo>
 *   inbound reply:  from=<that operator>  ->  to=fromNumber
 * So we store (from_phone=<operator>, to_phone=fromNumber) as the PK,
 * matching exactly how Twilio/GHL deliver the reply to our inbound
 * webhook.
 */

import { getSmsIntegration } from "./integrations/registry";
import { sbUpsert } from "./supabase";
import type { AgentKind, ClientConfig } from "./types";

export interface SmsAlertSessionContext {
  sessionId: string;
  agent: AgentKind;
}

export interface SmsAlertRecipientResult {
  to: string;
  ok: boolean;
  messageId?: string;
  error?: string;
}

export interface SmsAlertResult {
  ok: boolean;
  /** Legacy: messageId of the first successful send. Kept for callers that ignore the array. */
  messageId?: string;
  error?: string;
  results?: SmsAlertRecipientResult[];
}

function normalizeRecipients(raw: unknown): string[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw
      .filter((v): v is string => typeof v === "string")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    return trimmed.length > 0 ? [trimmed] : [];
  }
  return [];
}

export async function sendOwnerSmsAlert(params: {
  cfg: ClientConfig;
  message: string;
  /** When supplied the send is correlated to a session for reply routing. */
  sessionContext?: SmsAlertSessionContext;
}): Promise<SmsAlertResult> {
  const recipients = normalizeRecipients(params.cfg.smsConfig?.alertSmsTo);
  if (recipients.length === 0) {
    console.warn(
      `[sms-alert] No alertSmsTo configured for client=${params.cfg.clientId} - SMS alert skipped`
    );
    return { ok: false, error: "no_alert_sms_to" };
  }

  // Optional client label prefix for multi-tenant operators. When the
  // label is absent or blank, leave the body untouched so single-tenant
  // clients (opsbynoell) see the exact same payload as before.
  const rawLabel = params.cfg.smsConfig?.clientLabel;
  const clientLabel =
    typeof rawLabel === "string" && rawLabel.trim().length > 0
      ? rawLabel.trim()
      : null;
  const body = clientLabel ? `[${clientLabel}] ${params.message}` : params.message;

  const sms = getSmsIntegration(params.cfg);
  const fromNumber =
    (params.cfg.smsConfig?.fromNumber as string | undefined) ?? undefined;

  const results: SmsAlertRecipientResult[] = [];

  for (const to of recipients) {
    try {
      const { messageId } = await sms.sendSMS(to, body);
      results.push({ to, ok: true, messageId });

      // Two-way reply bridge: persist the session mapping so the inbound
      // webhook can correlate this operator's reply back to this session.
      // PK is (from_phone, to_phone), so each operator gets their own row.
      if (params.sessionContext && fromNumber) {
        void sbUpsert(
          "sms_alert_sessions",
          {
            from_phone: to,
            to_phone: fromNumber,
            session_id: params.sessionContext.sessionId,
            agent: params.sessionContext.agent,
            client_id: params.cfg.clientId,
            created_at: new Date().toISOString(),
          },
          "from_phone,to_phone"
        ).catch((err: unknown) => {
          console.error(
            `[sms-alert] failed to upsert sms_alert_sessions for session=${params.sessionContext!.sessionId} operator=${to}:`,
            err instanceof Error ? err.message : err
          );
        });
      } else if (params.sessionContext && !fromNumber) {
        console.warn(
          `[sms-alert] sessionContext supplied but smsConfig.fromNumber is missing - reply routing skipped for client=${params.cfg.clientId}`
        );
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "unknown";
      console.error(
        `[sms-alert] send failed for client=${params.cfg.clientId} operator=${to}:`,
        message
      );
      results.push({ to, ok: false, error: message });
    }
  }

  const successes = results.filter((r) => r.ok);
  if (successes.length === 0) {
    return {
      ok: false,
      error: results[0]?.error ?? "all_recipients_failed",
      results,
    };
  }

  return {
    ok: true,
    messageId: successes[0].messageId,
    results,
  };
}
