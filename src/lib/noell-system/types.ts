/**
 * Core type definitions for the Noell system.
 *
 * This file is the contract shared by all agents (Support, Front Desk, Care),
 * all clients (tenant installs), and all verticals (defaults per business type).
 *
 * The guiding rule when adding types: if a piece of behavior varies per agent,
 * per client, or per vertical, it belongs in config — never hardcoded in
 * the runtime or UI layers.
 */

// ---------------------------------------------------------------------------
// Conversation primitives
// ---------------------------------------------------------------------------

export type MessageFrom = "agent" | "visitor" | "system";

export type Message = {
  from: MessageFrom;
  text: string;
  timestamp?: string;
  /** Optional structured metadata (e.g. routing destination, captured fields) */
  meta?: Record<string, unknown>;
};

/**
 * Conversation stage. Each agent declares which stages it supports.
 *
 * - intro:     agent has greeted, visitor hasn't engaged yet.
 * - qualified: visitor expressed a handled intent; next message is capture of
 *              whatever the top-of-stack AwaitingSlot asked for.
 * - captured:  all slots filled; routed/handed off.
 * - escalated: out of scope; flagged for human.
 * - resolved:  agent self-resolved (e.g. Care answered a quick question).
 */
export type Stage =
  | "intro"
  | "qualified"
  | "captured"
  | "escalated"
  | "resolved";

// ---------------------------------------------------------------------------
// Multi-slot capture — the primitive that turns "named intents" into real flows
// ---------------------------------------------------------------------------

/**
 * One piece of info the agent is waiting for. Intents declare a list of slots
 * in the order they should be collected. The runtime asks for each, parses
 * the visitor's reply, and advances. When the stack is empty, the intent's
 * completion payload (responses + route) fires.
 */
export type AwaitingSlot = {
  /** Slot key. Captured value is stored under this key on state.captured. */
  key: string;
  /** What the agent asks the visitor to provide this turn. */
  prompt: string;
  /** Parser to apply to the visitor's reply. */
  parser?: "contact" | "free_text" | "time_window" | "appointment_id";
  /** Optional validation hint (human-readable, used in retry prompts). */
  hint?: string;
};

/**
 * Output of a completed intent flow — what the agent says + where it routes
 * after the last slot is filled (or immediately, if no slots are declared).
 */
export type IntentCompletion = {
  responses: Message[];
  nextStage?: Stage;
  route?: RouteTarget;
};

// ---------------------------------------------------------------------------
// Intent + routing + escalation
// ---------------------------------------------------------------------------

export type IntentHandler = {
  /** Canonical intent key, e.g. "booking_intent" or "reschedule_existing". */
  intent: string;
  /** Lowercased phrases that trigger this intent (starter chips + keyword seeds). */
  matchers: string[];
  /**
   * Agent responses pushed immediately when the intent fires (before any
   * slot collection). Typically a warm acknowledgement + the first slot's
   * prompt if slots are declared.
   */
  responses: Message[];
  /** Ordered slots to collect from the visitor before completion. */
  collect?: AwaitingSlot[];
  /**
   * Fired after the last slot fills (or immediately if `collect` is empty).
   * If omitted, the intent ends with just `responses`.
   */
  completion?: IntentCompletion;

  // ---- Back-compat shortcuts (used by the legacy single-turn contact flow) ----

  /** @deprecated Use `collect` + `completion` for multi-turn flows. */
  nextStage?: Stage;
  /** @deprecated Use `collect: [{ key: "contact", parser: "contact" }]`. */
  capture?: boolean;
  /** Top-level route. Prefer `completion.route` when using slots. */
  route?: RouteTarget;
};

export type RouteTarget =
  | { kind: "booking_link" }
  | { kind: "human"; role: "owner" | "front_desk" | "support" | "care" }
  | { kind: "workflow"; workflowKey: WorkflowKey }
  | { kind: "knowledge_base"; sourceKey: string };

/**
 * Named workflows the product owns. Each corresponds to a concrete operational
 * capability the client's install must support. The runtime emits a workflow
 * routing target; the host app decides how to execute it.
 */
export type WorkflowKey =
  // Front Desk
  | "missed_call_textback"
  | "schedule_new"
  | "send_confirmations"
  | "reminders_run"
  | "reschedule_existing"
  | "review_capture_post_visit"
  | "reactivation_cohort"
  // Care
  | "rebook_from_last_visit"
  | "change_appointment"
  | "account_update"
  // Support
  | "vertical_qualification";

export type EscalationRule = {
  /** What triggers escalation. */
  trigger:
    | "out_of_scope"           // unmatched input after N attempts
    | "human_requested"         // visitor asks for a person
    | "unresolved_after_n"      // agent couldn't answer after N turns
    | "keyword";                // specific keyword in visitor input
  keywords?: string[];
  /** Attempts before escalation fires (for unresolved_after_n). */
  afterTurns?: number;
  /** What to tell the visitor when escalating. */
  message: string;
  /** Who picks up. */
  handoffTarget: RouteTarget;
};

// ---------------------------------------------------------------------------
// Knowledge + follow-up
// ---------------------------------------------------------------------------

export type KnowledgeSource = {
  key: string;
  label: string;
  /** Seed questions that map to this source. */
  questions: string[];
  /**
   * Templated answer. May include {{tokens}} that resolve from ClientConfig
   * (e.g. "{{businessName}}", "{{hours}}", "{{phone}}", "{{locationParking}}").
   */
  answerTemplate: string;
};

export type FollowUpRule = {
  trigger: "capture" | "resolved" | "escalated";
  channel: "sms" | "email" | "none";
  /** Delay before the follow-up fires. */
  delayMinutes?: number;
  /** Templated message body. Uses {{tokens}} from ClientConfig + capture. */
  template: string;
};

// ---------------------------------------------------------------------------
// Agent identity + config
// ---------------------------------------------------------------------------

export type AgentId = "support" | "front_desk" | "care";

export type AgentIdentity = {
  id: AgentId;
  /** Display name, e.g. "Noell Support". */
  displayName: string;
  /** One-line persona. Used in chat header subtitle and scope reminders. */
  persona: string;
  /** Short eyebrow copy for UI ("New prospect intake"). */
  eyebrow: string;
  /** Accent color token resolved by the client/theme layer. */
  launcherColor: "lilac" | "wine" | "blush";
  /** Avatar glyph (single character). */
  initial: string;
  /** Explicit scope. Rendered in /product pages and used as honesty guardrails. */
  scope: {
    does: string[];
    doesNot: string[];
  };
};

export type AgentConfig = {
  identity: AgentIdentity;
  /** First message(s) the agent emits on open. */
  greeting: Message;
  /** Quick-reply chips shown before the first visitor message. */
  starterChips: string[];
  /** Intent handlers (matched by chip text or keyword). */
  intents: IntentHandler[];
  /**
   * Messages pushed after a contact-capture slot resolves. Legacy hook —
   * multi-slot intents should prefer `intent.completion.responses` instead.
   */
  captureResponse: Message[];
  /** Fallback pushed when no intent matches and no escalation fires. */
  fallbackResponse: Message[];
  /** Rules that route the conversation to a human or workflow. */
  escalationRules: EscalationRule[];
  /** Knowledge sources the agent can answer from. */
  knowledgeSources: KnowledgeSource[];
  /** Post-conversation follow-ups. */
  followUpRules: FollowUpRule[];
  /** Stages this agent can enter. */
  stages: Stage[];
};

// ---------------------------------------------------------------------------
// Client (tenant) + vertical config
// ---------------------------------------------------------------------------

export type VerticalKey =
  | "massage"
  | "med_spa"
  | "salon"
  | "dental"
  | "esthetics"
  | "generic";

export type VerticalConfig = {
  key: VerticalKey;
  label: string;
  /** Common services offered in this vertical. */
  commonServices: string[];
  /** Qualifying questions tuned to this vertical. Used by Support vertical_qualification. */
  qualifyingQuestions: string[];
  /** Starter chip presets tuned to this vertical. Overrides agent defaults when set. */
  starterChipPresets?: Partial<Record<AgentId, string[]>>;
  /** Reminder cadence human-readable default (e.g. "48h SMS + 2h SMS"). */
  reminderCadence?: string;
  /** Days of client inactivity before Reactivation eligibility. */
  dormancyThresholdDays?: number;
  /** Review platform this vertical prefers to route 5-star reviews to. */
  reviewPlatform?: "google" | "yelp" | "vagaro" | "other";
};

export type BrandTokens = {
  primary: string;
  accent: string;
};

export type LocationInfo = {
  id: string;
  label: string;
  address: string;
  parking: string;
  arrivalInstructions?: string;
};

export type KnowledgeBaseEntry = {
  key: string;
  label: string;
  answer: string;
  keywords: string[];
};

export type MissedCallTextbackConfig = {
  /**
   * Template sent within seconds of an unanswered call. Supports tokens:
   * {{businessName}}, {{bookingUrl}}, {{callerName}}.
   */
  template: string;
  /** Max seconds between missed call and text-back send. Used in reporting. */
  slaSeconds: number;
};

export type ReviewCaptureConfig = {
  /** Minimum star rating that routes to the public review platform. */
  minPublicRating: 4 | 5;
  /** Platform 4-5 star reviews route to. Inherits from vertical if unset. */
  platform?: "google" | "yelp" | "vagaro" | "other";
  /** Template for the post-visit ask. */
  postVisitTemplate: string;
};

export type ReactivationConfig = {
  /** Days of inactivity before a client enters the reactivation cohort. */
  dormancyThresholdDays: number;
  /** Template for the re-engagement message. */
  template: string;
};

export type ClientConfig = {
  clientId: string;
  businessName: string;
  vertical: VerticalKey;
  /** Public booking URL used in booking-link handoffs. */
  bookingUrl: string;
  phone?: string;
  email?: string;
  hours?: string;
  /** Services offered by this specific client (narrower than vertical defaults). */
  services?: string[];
  /** Team members used for routing ("route to Sam for med spa bookings"). */
  team?: { name: string; role: string }[];
  /** Physical locations. Powers directions/parking answers in Care. */
  locations?: LocationInfo[];
  /** Client-specific knowledge base. Powers Care service/policy answers. */
  knowledgeBase?: KnowledgeBaseEntry[];
  /** Missed-call text-back config (Front Desk). */
  missedCallTextback?: MissedCallTextbackConfig;
  /** Review capture config (Front Desk). */
  reviewCapture?: ReviewCaptureConfig;
  /** Reactivation config (Front Desk). */
  reactivation?: ReactivationConfig;
  /** Reminder cadence override for this client. */
  reminderCadence?: string;
  /** Optional brand color overrides. */
  brandOverrides?: Partial<BrandTokens>;
  /** Webhook endpoints for external systems. */
  webhooks?: {
    onCapture?: string;
    onEscalate?: string;
    onResolved?: string;
    onWorkflow?: string;
  };
};

// ---------------------------------------------------------------------------
// Lookup contracts — what the host app must implement for full v1 behavior
// ---------------------------------------------------------------------------

/**
 * Contracts the host app must implement to make each workflow actually
 * execute. The runtime declares *what* the agent needs; the host fulfills
 * *how* it happens (GHL API / Supabase / manual ops).
 *
 * Every field is optional. If a lookup is missing, the agent still completes
 * the flow with a clean "we'll handle this off-system" fallback message.
 */
export type NoellLookups = {
  /** Return the visitor's last visit summary. Used by Care.rebook. */
  lastVisit?: (args: { clientId: string; contact: string }) => Promise<{
    service?: string;
    provider?: string;
    lastVisitedAt?: string;
  } | null>;

  /** Resolve an appointment for change/reschedule. Used by Care.change_appointment + FrontDesk.reschedule. */
  findAppointment?: (args: {
    clientId: string;
    identifier: string;
  }) => Promise<{
    id: string;
    when: string;
    service: string;
    customerName: string;
  } | null>;

  /** Count dormant clients in the reactivation cohort. Used by FrontDesk.reactivation. */
  countReactivationCohort?: (args: {
    clientId: string;
    thresholdDays: number;
  }) => Promise<number>;

  /** Fetch tomorrow's appointments for Front Desk reminder/confirmation runs. */
  upcomingAppointments?: (args: {
    clientId: string;
    withinHours: number;
  }) => Promise<
    Array<{ id: string; when: string; customerName: string; customerPhone?: string }>
  >;
};

// ---------------------------------------------------------------------------
// Runtime bundle passed to the generic chat widget
// ---------------------------------------------------------------------------

export type AgentRuntime = {
  agent: AgentConfig;
  client: ClientConfig;
  vertical: VerticalConfig;
  lookups?: NoellLookups;
};
