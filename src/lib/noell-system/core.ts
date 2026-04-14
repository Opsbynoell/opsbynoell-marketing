/**
 * Core runtime for the Noell system.
 *
 * Intentionally UI-agnostic. This module exposes:
 *   - intent matching (map visitor input → IntentHandler)
 *   - multi-slot capture ("collect" slots per intent, filled over N turns)
 *   - escalation evaluation (decide when to hand off to a human)
 *   - token interpolation ({{businessName}}, {{bookingUrl}}, captured fields)
 *   - a reducer-style conversation step function
 *
 * The generic chat widget (components/noell-chat.tsx) drives state + timing;
 * this module decides what happens given a message.
 */

import type {
  AgentConfig,
  AwaitingSlot,
  ClientConfig,
  EscalationRule,
  IntentHandler,
  Message,
  RouteTarget,
  Stage,
  VerticalConfig,
} from "./types";

// ---------------------------------------------------------------------------
// Token interpolation
// ---------------------------------------------------------------------------

/**
 * Resolve {{token}} placeholders in a string using ClientConfig + vertical
 * defaults + ad-hoc fields.
 *
 * Supported tokens:
 *   - businessName, bookingUrl, phone, email, hours
 *   - reminderCadence (client override then vertical default)
 *   - dormancyThresholdDays
 *   - reviewPlatform
 *   - primaryLocationParking, primaryLocationAddress
 *   - any keys passed in `extra` (e.g. capturedName, capturedPhone, apptWhen)
 */
export function interpolate(
  template: string,
  client: ClientConfig,
  extra: Record<string, string> = {},
  vertical?: VerticalConfig
): string {
  const primary = client.locations?.[0];
  const reminderCadence =
    client.reminderCadence ?? vertical?.reminderCadence ?? "";
  const dormancyThresholdDays = String(
    client.reactivation?.dormancyThresholdDays ??
      vertical?.dormancyThresholdDays ??
      90
  );
  const reviewPlatform =
    client.reviewCapture?.platform ?? vertical?.reviewPlatform ?? "google";

  const bag: Record<string, string> = {
    businessName: client.businessName,
    bookingUrl: client.bookingUrl,
    phone: client.phone ?? "",
    email: client.email ?? "",
    hours: client.hours ?? "",
    reminderCadence,
    dormancyThresholdDays,
    reviewPlatform,
    primaryLocationParking: primary?.parking ?? "",
    primaryLocationAddress: primary?.address ?? "",
    ...extra,
  };
  return template.replace(/\{\{(\w+)\}\}/g, (_m, key) => bag[key] ?? "");
}

export function interpolateMessage(
  msg: Message,
  client: ClientConfig,
  extra: Record<string, string> = {},
  vertical?: VerticalConfig
): Message {
  return { ...msg, text: interpolate(msg.text, client, extra, vertical) };
}

// ---------------------------------------------------------------------------
// Intent matching
// ---------------------------------------------------------------------------

/**
 * Deterministic, script-based matcher. Lowercased exact phrase first, then
 * keyword substring fallback. Swap to an LLM classifier later by replacing
 * this function only — the interface is stable.
 */
export function matchIntent(
  input: string,
  agent: AgentConfig
): IntentHandler | null {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  for (const intent of agent.intents) {
    if (intent.matchers.some((m) => m.toLowerCase() === normalized)) {
      return intent;
    }
  }
  for (const intent of agent.intents) {
    if (intent.matchers.some((m) => normalized.includes(m.toLowerCase()))) {
      return intent;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Escalation evaluation
// ---------------------------------------------------------------------------

export type EscalationContext = {
  unmatchedTurns: number;
  lastVisitorInput: string;
  humanRequested: boolean;
};

export function evaluateEscalation(
  agent: AgentConfig,
  ctx: EscalationContext
): EscalationRule | null {
  const input = ctx.lastVisitorInput.toLowerCase();
  for (const rule of agent.escalationRules) {
    switch (rule.trigger) {
      case "human_requested":
        if (ctx.humanRequested) return rule;
        if (/\b(human|person|someone real|talk to (noell|a human))\b/.test(input)) {
          return rule;
        }
        break;
      case "keyword":
        if (rule.keywords?.some((k) => input.includes(k.toLowerCase()))) {
          return rule;
        }
        break;
      case "unresolved_after_n":
        if (ctx.unmatchedTurns >= (rule.afterTurns ?? 2)) return rule;
        break;
      case "out_of_scope":
        if (ctx.unmatchedTurns >= 1) return rule;
        break;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Slot parsers
// ---------------------------------------------------------------------------

/**
 * Extract name + phone + email from a free-text capture message.
 */
export function parseContact(input: string): Record<string, string> {
  const captured: Record<string, string> = {};
  const phoneMatch = input.match(/(\+?\d[\d\s().-]{7,}\d)/);
  if (phoneMatch) captured.capturedPhone = phoneMatch[1].trim();

  const emailMatch = input.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (emailMatch) captured.capturedEmail = emailMatch[0];

  const nameMatch = input
    .replace(phoneMatch?.[0] ?? "", "")
    .replace(emailMatch?.[0] ?? "", "")
    .trim()
    .match(/^([A-Za-z][A-Za-z\s'.-]{1,40})/);
  if (nameMatch) {
    captured.capturedName = nameMatch[1].trim().replace(/[,.]$/, "");
  }
  return captured;
}

/** @deprecated kept for back-compat with earlier code. */
export const parseCapture = parseContact;

/** Parse a loose time window like "Thursday after 3pm" or "this weekend". */
export function parseTimeWindow(input: string): Record<string, string> {
  const trimmed = input.trim();
  if (!trimmed) return {};
  return { capturedTimeWindow: trimmed.slice(0, 120) };
}

/** Parse an appointment identifier — number, date, or visitor's own description. */
export function parseAppointmentId(input: string): Record<string, string> {
  const trimmed = input.trim();
  if (!trimmed) return {};
  return { capturedAppointmentId: trimmed.slice(0, 120) };
}

export function runSlotParser(
  slot: AwaitingSlot,
  input: string
): Record<string, string> {
  switch (slot.parser) {
    case "contact":
      return { ...parseContact(input), [slot.key]: input.trim() };
    case "time_window":
      return { ...parseTimeWindow(input), [slot.key]: input.trim() };
    case "appointment_id":
      return { ...parseAppointmentId(input), [slot.key]: input.trim() };
    case "free_text":
    default:
      return { [slot.key]: input.trim() };
  }
}

// ---------------------------------------------------------------------------
// Conversation state + step
// ---------------------------------------------------------------------------

export type ConversationState = {
  stage: Stage;
  unmatchedTurns: number;
  /** Captured fields accumulate here. */
  captured: Record<string, string>;
  /** Active multi-turn intent + remaining slots + completion payload. */
  awaiting?: {
    intent: string;
    slots: AwaitingSlot[];
    completion: {
      responses: Message[];
      nextStage?: Stage;
      route?: RouteTarget;
    };
  };
};

export type ConversationStep = {
  agentResponses: Message[];
  nextState: ConversationState;
  sideEffect?:
    | { kind: "route"; target: RouteTarget }
    | { kind: "capture"; fields: Record<string, string> }
    | { kind: "escalate"; target: RouteTarget }
    | { kind: "none" };
};

/**
 * Advance the conversation by one visitor turn. Deterministic + pure.
 */
export function step(params: {
  agent: AgentConfig;
  client: ClientConfig;
  vertical?: VerticalConfig;
  state: ConversationState;
  visitorInput: string;
}): ConversationStep {
  const { agent, client, vertical, state, visitorInput } = params;

  // --- Slot-fill branch: an intent is mid-collection --------------------------
  if (state.awaiting && state.awaiting.slots.length > 0) {
    const [slot, ...rest] = state.awaiting.slots;
    const parsed = runSlotParser(slot, visitorInput);
    const newCaptured = { ...state.captured, ...parsed };

    if (rest.length > 0) {
      // More slots to collect — ask for the next one.
      const nextSlot = rest[0];
      return {
        agentResponses: [
          {
            from: "agent",
            text: interpolate(nextSlot.prompt, client, newCaptured, vertical),
          },
        ],
        nextState: {
          ...state,
          captured: newCaptured,
          unmatchedTurns: 0,
          awaiting: { ...state.awaiting, slots: rest },
        },
        sideEffect: { kind: "capture", fields: parsed },
      };
    }

    // All slots filled — fire completion.
    const completion = state.awaiting.completion;
    const responses = completion.responses.map((m) =>
      interpolateMessage(m, client, newCaptured, vertical)
    );
    return {
      agentResponses: responses,
      nextState: {
        ...state,
        captured: newCaptured,
        stage: completion.nextStage ?? "captured",
        unmatchedTurns: 0,
        awaiting: undefined,
      },
      sideEffect: completion.route
        ? { kind: "route", target: completion.route }
        : { kind: "capture", fields: parsed },
    };
  }

  // --- Legacy capture branch (capture: true on intent) ------------------------
  if (state.stage === "qualified" && !state.awaiting) {
    const captured = parseContact(visitorInput);
    return {
      agentResponses: agent.captureResponse.map((m) =>
        interpolateMessage(m, client, captured, vertical)
      ),
      nextState: {
        ...state,
        stage: "captured",
        captured: { ...state.captured, ...captured },
        unmatchedTurns: 0,
      },
      sideEffect: { kind: "capture", fields: captured },
    };
  }

  // --- Intent match branch ----------------------------------------------------
  const intent = matchIntent(visitorInput, agent);
  if (intent) {
    const initialResponses = intent.responses.map((m) =>
      interpolateMessage(m, client, {}, vertical)
    );
    const slots =
      intent.collect && intent.collect.length > 0
        ? intent.collect
        : intent.capture
        ? [
            {
              key: "contact",
              prompt:
                "Can you share your name and best number? I'll make sure it reaches the right place.",
              parser: "contact" as const,
            },
          ]
        : undefined;

    if (slots && slots.length > 0) {
      // Multi-turn flow: emit initial responses + first slot prompt.
      const responses = [
        ...initialResponses,
        {
          from: "agent" as const,
          text: interpolate(slots[0].prompt, client, {}, vertical),
        },
      ];
      return {
        agentResponses: responses,
        nextState: {
          ...state,
          stage: intent.nextStage ?? "qualified",
          unmatchedTurns: 0,
          awaiting: {
            intent: intent.intent,
            slots,
            completion: intent.completion ?? {
              responses: agent.captureResponse,
              nextStage: "captured",
              route: intent.route,
            },
          },
        },
        sideEffect: { kind: "none" },
      };
    }

    // Zero-slot intent (info-only or immediate route).
    return {
      agentResponses: initialResponses,
      nextState: {
        ...state,
        stage: intent.completion?.nextStage ?? intent.nextStage ?? state.stage,
        unmatchedTurns: 0,
      },
      sideEffect:
        intent.completion?.route || intent.route
          ? {
              kind: "route",
              target: (intent.completion?.route ?? intent.route) as RouteTarget,
            }
          : { kind: "none" },
    };
  }

  // --- Escalation branch ------------------------------------------------------
  const escalation = evaluateEscalation(agent, {
    unmatchedTurns: state.unmatchedTurns + 1,
    lastVisitorInput: visitorInput,
    humanRequested: false,
  });
  if (escalation) {
    return {
      agentResponses: [
        {
          from: "agent",
          text: interpolate(escalation.message, client, {}, vertical),
        },
      ],
      nextState: {
        ...state,
        stage: "escalated",
        unmatchedTurns: state.unmatchedTurns + 1,
        awaiting: undefined,
      },
      sideEffect: { kind: "escalate", target: escalation.handoffTarget },
    };
  }

  // --- Fallback ---------------------------------------------------------------
  return {
    agentResponses: agent.fallbackResponse.map((m) =>
      interpolateMessage(m, client, {}, vertical)
    ),
    nextState: {
      ...state,
      unmatchedTurns: state.unmatchedTurns + 1,
    },
    sideEffect: { kind: "none" },
  };
}

// ---------------------------------------------------------------------------
// Initial state factory
// ---------------------------------------------------------------------------

export function initialState(): ConversationState {
  return { stage: "intro", unmatchedTurns: 0, captured: {} };
}
