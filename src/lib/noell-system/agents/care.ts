import type { AgentConfig } from "../types";

/**
 * Noell Care
 *
 * Existing-client support layer. Handles the noise that would otherwise
 * clog new-business intake: rebookings, service questions, account help,
 * directions/parking, appointment change requests.
 *
 * v1 shape per intent:
 *   - multi-turn collect of just the info Care needs
 *   - clean handoff either to the booking link (rebook), to Front Desk
 *     (change_appointment), to client.knowledgeBase (service questions,
 *     policies, parking), or to a human (account update, anything unusual)
 *
 * Explicit non-scope:
 *   - new-prospect intake → Noell Support
 *   - operational workflow execution (the scheduling engine itself) → Noell Front Desk
 */
export const careAgent: AgentConfig = {
  identity: {
    id: "care",
    displayName: "Noell Care",
    persona: "Existing client support",
    eyebrow: "Existing client support",
    launcherColor: "blush",
    initial: "N",
    scope: {
      does: [
        "Rebooking existing clients",
        "Service + policy questions",
        "Account-level support",
        "Directions, parking, arrival instructions",
        "Appointment change requests (routed to Front Desk)",
        "Quick how-tos",
      ],
      doesNot: [
        "Handle brand-new prospects (that's Noell Support)",
        "Run scheduling workflows directly (that's Noell Front Desk)",
        "Process payments or refunds",
        "Give clinical advice",
      ],
    },
  },
  greeting: {
    from: "agent",
    text: "Hi again — I'm Noell Care. I help existing {{businessName}} clients with rebooking, account questions, and quick how-tos. What do you need?",
  },
  starterChips: [
    "Rebook me",
    "Change my appointment",
    "Where do I park?",
    "I have a service question",
  ],
  intents: [
    // ---- Rebook from last visit --------------------------------------------
    {
      intent: "rebook",
      matchers: [
        "rebook me",
        "rebook",
        "book again",
        "same as last time",
      ],
      responses: [
        {
          from: "agent",
          text: "Love that. I'll pull your last visit and send a direct rebooking link.",
        },
      ],
      collect: [
        {
          key: "contact",
          prompt:
            "What's the name and phone/email on your account? (That's how I find your last visit.)",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Thanks {{capturedName}} — pulling your last visit at {{businessName}}. I'll text the rebooking link to {{capturedPhone}} shortly.",
          },
          {
            from: "agent",
            text: "Direct booking link: {{bookingUrl}}",
          },
        ],
        nextStage: "captured",
        route: { kind: "workflow", workflowKey: "rebook_from_last_visit" },
      },
    },

    // ---- Change an appointment --------------------------------------------
    {
      intent: "change_appointment",
      matchers: [
        "change my appointment",
        "change appointment",
        "move my appointment",
        "reschedule my appointment",
        "can't make it",
      ],
      responses: [
        {
          from: "agent",
          text: "No problem. I'll route this to Front Desk so we don't double-book you.",
        },
      ],
      collect: [
        {
          key: "appointmentRef",
          prompt:
            "Which appointment? Share the date or what service it was for.",
          parser: "appointment_id",
        },
        {
          key: "newWindow",
          prompt:
            "What window works instead? (Day, time range, or 'as soon as possible'.)",
          parser: "time_window",
        },
        {
          key: "contact",
          prompt:
            "Last thing — your name and best number so Front Desk can confirm.",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Got it, {{capturedName}}. Passing \"{{appointmentRef}} → {{newWindow}}\" to Front Desk. You'll get a confirmation text to {{capturedPhone}} as soon as we lock the new slot.",
          },
        ],
        nextStage: "captured",
        route: { kind: "workflow", workflowKey: "change_appointment" },
      },
    },

    // ---- Directions / parking ---------------------------------------------
    {
      intent: "directions",
      matchers: [
        "where do i park",
        "parking",
        "directions",
        "where are you",
        "how do i find you",
        "address",
      ],
      responses: [
        {
          from: "agent",
          text: "Arrival info for {{businessName}}: {{primaryLocationAddress}}. Parking: {{primaryLocationParking}}",
        },
      ],
      collect: [
        {
          key: "needsMore",
          prompt:
            "Want me to text this to your phone too? Share a number, or reply 'no thanks'.",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Done. If you shared a number, the address + parking details are on their way. See you soon.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "knowledge_base", sourceKey: "parking" },
      },
    },

    // ---- Service / policy question (knowledge base) ------------------------
    {
      intent: "service_question",
      matchers: [
        "i have a service question",
        "service question",
        "what is included",
        "how long",
        "do you offer",
        "policy",
        "cancellation",
      ],
      responses: [
        {
          from: "agent",
          text: "Ask away — I'll answer from {{businessName}}'s service notes. If it's outside my scope I'll loop in a human with the context.",
        },
      ],
      collect: [
        {
          key: "question",
          prompt: "What specifically would you like to know?",
          parser: "free_text",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Captured: \"{{question}}\". I'm checking our service notes and will reply here with the answer — if it needs a human, I'll flag it to the team at {{businessName}}.",
          },
        ],
        nextStage: "resolved",
        route: { kind: "knowledge_base", sourceKey: "services" },
      },
    },

    // ---- Account update ----------------------------------------------------
    {
      intent: "account_update",
      matchers: [
        "update my info",
        "change my number",
        "change my email",
        "email on file",
        "account",
      ],
      responses: [
        {
          from: "agent",
          text: "Happy to route an account update to the team at {{businessName}}.",
        },
      ],
      collect: [
        {
          key: "updateDetails",
          prompt:
            "What needs to change? (e.g. 'new phone: 555-1212', 'new email: x@y.com'.)",
          parser: "free_text",
        },
        {
          key: "contact",
          prompt:
            "And the name on your account + a number I can confirm on?",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Queued: \"{{updateDetails}}\" for {{capturedName}}. The team will apply it and confirm back at {{capturedPhone}}.",
          },
        ],
        nextStage: "captured",
        route: { kind: "workflow", workflowKey: "account_update" },
      },
    },
  ],
  captureResponse: [
    {
      from: "agent",
      text: "Got it, {{capturedName}} — routed to the right place at {{businessName}}. You'll hear back shortly.",
    },
  ],
  fallbackResponse: [
    {
      from: "agent",
      text: "I'm here for existing-client questions. If you're trying to book for the first time, that's Noell Support's job — I can hand you over. Otherwise, what do you need?",
    },
  ],
  escalationRules: [
    {
      trigger: "human_requested",
      message:
        "Sure — flagging this for the team at {{businessName}}. They'll follow up directly.",
      handoffTarget: { kind: "human", role: "care" },
    },
    {
      trigger: "keyword",
      keywords: ["refund", "complaint", "injury", "reaction", "allergic"],
      message:
        "That needs a human. I'm flagging it to the team now and they'll reach out directly.",
      handoffTarget: { kind: "human", role: "owner" },
    },
    {
      trigger: "unresolved_after_n",
      afterTurns: 2,
      message:
        "Let me hand this to the team so nothing gets lost. Share your name + best number and we'll take it from here.",
      handoffTarget: { kind: "human", role: "care" },
    },
  ],
  knowledgeSources: [
    {
      key: "parking",
      label: "Parking + directions",
      questions: ["parking", "directions", "where do i park", "address"],
      answerTemplate:
        "{{businessName}} — {{primaryLocationAddress}}. Parking: {{primaryLocationParking}}",
    },
    {
      key: "policies",
      label: "Cancellation + late policy",
      questions: ["cancellation", "late", "policy", "fees"],
      answerTemplate:
        "Policies for {{businessName}} are in your welcome email. Short version: please give as much notice as you can for changes.",
    },
    {
      key: "services",
      label: "Service notes",
      questions: ["service", "what is included", "how long"],
      answerTemplate:
        "For service-specific questions at {{businessName}}, I pull from the client knowledge base. If it's not covered, I route to a human with full context.",
    },
  ],
  followUpRules: [
    {
      trigger: "resolved",
      channel: "sms",
      delayMinutes: 0,
      template:
        "{{businessName}} here — confirming the info I just shared. Reply if you need anything else.",
    },
    {
      trigger: "capture",
      channel: "email",
      delayMinutes: 5,
      template:
        "Noell Care logged a request for {{capturedName}}. Dashboard link in this email.",
    },
  ],
  stages: ["intro", "qualified", "captured", "escalated", "resolved"],
};
