import type { AgentConfig } from "../types";

/**
 * Noell Front Desk
 *
 * Operations layer. Runs the full receptionist workflow for the client's
 * business: inbound calls, missed-call text-back, scheduling, confirmations,
 * reminders, reschedules, review capture, and reactivation.
 *
 * This agent is operator-facing (Nikki / the client's front-desk human / the
 * Ops by Noell team). It is NOT a visitor-facing chat — it's the control
 * surface for the operational workflows the Noell system runs on their behalf.
 *
 * Every operational intent declares:
 *   - what inputs it needs (slots)
 *   - what template/config it consumes from ClientConfig
 *   - what workflow it routes to when complete
 *
 * Host apps implement the actual execution via the `NoellLookups` contracts
 * and the `onWorkflow` webhook. What is shipped here is the deterministic
 * "conversation protocol" that every workflow obeys.
 *
 * Explicit non-scope:
 *   - website chat for brand-new prospects → Noell Support
 *   - existing-client service/account questions → Noell Care
 */
export const frontDeskAgent: AgentConfig = {
  identity: {
    id: "front_desk",
    displayName: "Noell Front Desk",
    persona: "Operations layer — full receptionist workflow",
    eyebrow: "Operations layer",
    launcherColor: "wine",
    initial: "N",
    scope: {
      does: [
        "Inbound call handling + routing",
        "Missed-call text-back in under 10 seconds",
        "Scheduling (smart booking logic)",
        "Appointment confirmations (SMS/email)",
        "Reminder cadence",
        "Reschedules (self-serve + assisted)",
        "Review capture with filter routing",
        "Reactivation workflows for dormant clients",
      ],
      doesNot: [
        "Catch new website prospects (that's Noell Support)",
        "Answer existing-client service/account questions (that's Noell Care)",
        "Replace your staff",
        "Process payments",
      ],
    },
  },
  greeting: {
    from: "agent",
    text: "Front Desk for {{businessName}}. Cadence: {{reminderCadence}}. Dormancy threshold: {{dormancyThresholdDays}} days. What workflow do you need?",
  },
  starterChips: [
    "Send missed-call text-back",
    "Reschedule a client",
    "Confirm tomorrow's appointments",
    "Run reactivation cohort",
  ],
  intents: [
    // ---- Missed-call text-back ---------------------------------------------
    {
      intent: "missed_call_textback",
      matchers: [
        "send missed-call text-back",
        "missed call",
        "missed a call",
        "textback",
        "text back",
      ],
      responses: [
        {
          from: "agent",
          text: "On it. The text-back will go out using the configured template with an SLA of {{businessName}}'s setting.",
        },
      ],
      collect: [
        {
          key: "callerPhone",
          prompt:
            "What number did the call come from? (The text-back goes here.)",
          parser: "contact",
        },
        {
          key: "callerNameGuess",
          prompt:
            "Any name or context we have on this caller? Say 'none' if unknown.",
          parser: "free_text",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Queued text-back to {{callerPhone}}. Template preview: \"Hi {{callerNameGuess}} — sorry we missed you. Book here: {{bookingUrl}}\". I'll log the send on the dashboard.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "workflow", workflowKey: "missed_call_textback" },
      },
    },

    // ---- Reschedule --------------------------------------------------------
    {
      intent: "reschedule",
      matchers: [
        "reschedule a client",
        "reschedule",
        "move appointment",
        "change appointment",
      ],
      responses: [
        {
          from: "agent",
          text: "Got it — let's move an appointment without double-booking.",
        },
      ],
      collect: [
        {
          key: "clientIdentifier",
          prompt:
            "Which client? Share name, phone, or appointment ID — whichever you have handy.",
          parser: "appointment_id",
        },
        {
          key: "newWindow",
          prompt:
            "What's the new window they'd prefer? (e.g. 'Thursday after 3pm', 'this weekend', a specific date.)",
          parser: "time_window",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Queued: {{clientIdentifier}} → {{newWindow}}. I'll offer them self-serve reschedule options matching that window and hold their slot until they confirm.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "workflow", workflowKey: "reschedule_existing" },
      },
    },

    // ---- Send confirmations for tomorrow -----------------------------------
    {
      intent: "send_confirmations",
      matchers: [
        "confirm tomorrow's appointments",
        "send confirmations",
        "confirm appointments",
        "confirmations",
      ],
      responses: [
        {
          from: "agent",
          text: "Pulling tomorrow's appointments now (via upcomingAppointments lookup) and queueing confirmations on the {{reminderCadence}} cadence.",
        },
      ],
      collect: [
        {
          key: "channel",
          prompt:
            "Which channel — SMS, email, or both? (Default is the vertical's cadence.)",
          parser: "free_text",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Queued: confirmations via {{channel}} on the {{reminderCadence}} cadence. I'll post the delivery report tomorrow.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "workflow", workflowKey: "send_confirmations" },
      },
    },

    // ---- Reminders run (read-only summary) ---------------------------------
    {
      intent: "reminders_run",
      matchers: [
        "reminders",
        "remind clients",
        "what reminders are going out",
        "reminder status",
      ],
      responses: [
        {
          from: "agent",
          text: "Reminder cadence for {{businessName}} is {{reminderCadence}}. It runs continuously — I'll surface delivery + response rates once today's batch completes.",
        },
      ],
      completion: {
        responses: [],
        nextStage: "resolved",
        route: { kind: "workflow", workflowKey: "reminders_run" },
      },
    },

    // ---- Review capture ----------------------------------------------------
    {
      intent: "review_capture",
      matchers: [
        "review capture",
        "reviews",
        "review",
        "capture reviews",
      ],
      responses: [
        {
          from: "agent",
          text: "Post-visit review requests are active with filter routing. 4-star and above route to {{reviewPlatform}}; 3-star and below route to you first.",
        },
      ],
      collect: [
        {
          key: "trigger",
          prompt:
            "Send a one-off review ask to a specific client, or just confirm the ongoing post-visit workflow? (Reply 'client <identifier>' or 'workflow'.)",
          parser: "free_text",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Handled: \"{{trigger}}\". I'll log the review capture event and report back when results come in.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "workflow", workflowKey: "review_capture_post_visit" },
      },
    },

    // ---- Reactivation cohort -----------------------------------------------
    {
      intent: "reactivation",
      matchers: [
        "run reactivation cohort",
        "reactivation",
        "dormant clients",
        "come back",
      ],
      responses: [
        {
          from: "agent",
          text: "Reactivation uses a {{dormancyThresholdDays}}-day dormancy threshold for this vertical. I'll identify eligible clients and queue the re-engagement template.",
        },
      ],
      collect: [
        {
          key: "thresholdOverride",
          prompt:
            "Use the default threshold, or specify a different day count? (Reply 'default' or a number.)",
          parser: "free_text",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Queued reactivation cohort for {{businessName}} with threshold \"{{thresholdOverride}}\". Cohort size will come through the countReactivationCohort lookup; I'll report back with the number and preview message.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "workflow", workflowKey: "reactivation_cohort" },
      },
    },
  ],
  captureResponse: [
    {
      from: "agent",
      text: "Got it — logged. You'll see the task in the dashboard and I'll report back when it's done.",
    },
  ],
  fallbackResponse: [
    {
      from: "agent",
      text: "I handle missed-call text-back, scheduling, confirmations, reminders, reschedules, review capture, and reactivation. Which one do you need?",
    },
  ],
  escalationRules: [
    {
      trigger: "human_requested",
      message:
        "Flagging this for you directly. I'll leave the full workflow context in the dashboard.",
      handoffTarget: { kind: "human", role: "front_desk" },
    },
    {
      trigger: "keyword",
      keywords: ["complaint", "refund", "angry", "lawyer", "injury"],
      message:
        "This needs a human. I'm flagging it to you now and pausing the rest of the automation until you confirm.",
      handoffTarget: { kind: "human", role: "owner" },
    },
    {
      trigger: "unresolved_after_n",
      afterTurns: 2,
      message:
        "Let me loop you in directly — I don't guess on operations decisions.",
      handoffTarget: { kind: "human", role: "front_desk" },
    },
  ],
  knowledgeSources: [
    {
      key: "hours",
      label: "Business hours",
      questions: ["hours", "when are we open"],
      answerTemplate: "{{businessName}} is open {{hours}}.",
    },
    {
      key: "reminder_cadence",
      label: "Reminder cadence",
      questions: ["reminder cadence", "when are reminders sent"],
      answerTemplate:
        "Reminder cadence for {{businessName}}: {{reminderCadence}}.",
    },
    {
      key: "review_routing",
      label: "Review routing policy",
      questions: ["review routing", "where do reviews go"],
      answerTemplate:
        "4+ star reviews route to {{reviewPlatform}}. 3 and below route to the owner before anywhere public.",
    },
  ],
  followUpRules: [
    {
      trigger: "capture",
      channel: "sms",
      delayMinutes: 0,
      template:
        "{{businessName}}: this is a confirmation for your appointment. Reply R to reschedule.",
    },
    {
      trigger: "resolved",
      channel: "email",
      delayMinutes: 60,
      template:
        "Front Desk summary for {{businessName}}: workflow resolved. Dashboard link in this email.",
    },
  ],
  stages: ["intro", "qualified", "captured", "escalated", "resolved"],
};
