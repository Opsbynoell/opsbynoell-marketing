import type { AgentConfig } from "../types";

/**
 * Noell Support
 *
 * New-prospect intake layer. Catches brand-new visitors on the website
 * (chat widget + post-missed-call SMS replies), qualifies them using
 * vertical-appropriate questions, captures contact, and hands off to
 * booking or the right human.
 *
 * v1 flow shape (all three intents):
 *   1. Warm acknowledgement of what the visitor said
 *   2. Vertical-aware qualifying question (what service / urgency / timing)
 *   3. Contact capture (name + phone + email, parsed from one reply)
 *   4. Completion: confirm capture, route to booking_link + follow-up SMS
 *
 * Explicit non-scope:
 *   - missed inbound calls / call routing → Noell Front Desk
 *   - existing-client questions → Noell Care
 */
export const supportAgent: AgentConfig = {
  identity: {
    id: "support",
    displayName: "Noell Support",
    persona: "New-prospect intake assistant",
    eyebrow: "New prospect intake",
    launcherColor: "lilac",
    initial: "N",
    scope: {
      does: [
        "Instant first response on website chat",
        "Lead qualification (service, timing, urgency)",
        "Contact capture (name, phone, email)",
        "Smart routing to the right booking or team member",
        "Booking-link handoff",
        "Human escalation with full context",
      ],
      doesNot: [
        "Handle inbound missed calls (that's Noell Front Desk)",
        "Answer existing-client account questions (that's Noell Care)",
        "Manage your calendar or reschedule appointments",
        "Process payments",
        "Pretend to be a full AI receptionist",
      ],
    },
  },
  greeting: {
    from: "agent",
    text: "Hi — I'm Noell Support, the new-prospect intake layer for {{businessName}}. Looking to book, ask about services, or something else?",
  },
  starterChips: [
    "I'm new — book me in",
    "What do you offer?",
    "How does this work?",
  ],
  intents: [
    {
      intent: "booking_new",
      matchers: [
        "i'm new — book me in",
        "book me",
        "book an appointment",
        "i want to book",
        "schedule",
      ],
      responses: [
        {
          from: "agent",
          text: "Great — let me grab a couple things so I route you to the right booking link for {{businessName}}.",
        },
      ],
      collect: [
        {
          key: "qualification",
          prompt:
            "First: which service are you looking for, and is there a timing window that works best?",
          parser: "free_text",
        },
        {
          key: "contact",
          prompt:
            "Got it. Share your name and best number (or email) and I'll send the booking link and flag it to the team.",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Thanks {{capturedName}} — captured. I'll text the booking link to {{capturedPhone}} and the team will follow up on \"{{qualification}}\" within the hour.",
          },
          {
            from: "agent",
            text: "Direct booking link: {{bookingUrl}}",
          },
        ],
        nextStage: "captured",
        route: { kind: "booking_link" },
      },
    },
    {
      intent: "services_question",
      matchers: ["what do you offer", "services", "what do you do"],
      responses: [
        {
          from: "agent",
          text: "Happy to walk you through the services {{businessName}} offers.",
        },
      ],
      collect: [
        {
          key: "interest",
          prompt:
            "Which are you curious about — or what outcome are you hoping for? I'll tailor what I share.",
          parser: "free_text",
        },
        {
          key: "contact",
          prompt:
            "Perfect. Share your name and best number and I'll text over the relevant service menu + booking link.",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Thanks {{capturedName}} — I've flagged \"{{interest}}\" for the team. You'll get a text shortly with the service menu and a direct booking link.",
          },
        ],
        nextStage: "captured",
        route: { kind: "knowledge_base", sourceKey: "services" },
      },
    },
    {
      intent: "how_it_works",
      matchers: ["how does this work", "how it works"],
      responses: [
        {
          from: "agent",
          text: "Easy: I collect a couple details, route you to the right booking link, and you get a confirmation immediately.",
        },
      ],
      collect: [
        {
          key: "contact",
          prompt:
            "Share your name + best number and I'll text the direct booking link.",
          parser: "contact",
        },
      ],
      completion: {
        responses: [
          {
            from: "agent",
            text: "Captured, {{capturedName}}. Booking link going to {{capturedPhone}} now: {{bookingUrl}}",
          },
        ],
        nextStage: "captured",
        route: { kind: "booking_link" },
      },
    },
  ],
  captureResponse: [
    {
      from: "agent",
      text: "Got it {{capturedName}} — captured and routed to the team at {{businessName}}. Direct booking: {{bookingUrl}}",
    },
  ],
  fallbackResponse: [
    {
      from: "agent",
      text: "I'm focused on helping new visitors get to the right place for {{businessName}}. If you share your name and best number, I'll route this to the team.",
    },
  ],
  escalationRules: [
    {
      trigger: "human_requested",
      message:
        "Of course — I'll flag this for the team at {{businessName}}. Share your name and best number so they can follow up.",
      handoffTarget: { kind: "human", role: "owner" },
    },
    {
      trigger: "unresolved_after_n",
      afterTurns: 2,
      message:
        "I don't want to keep you guessing — let me hand this to a person. Share your name + best number and they'll reach out shortly.",
      handoffTarget: { kind: "human", role: "owner" },
    },
  ],
  knowledgeSources: [
    {
      key: "services",
      label: "Services menu",
      questions: ["what do you offer", "services", "what do you do"],
      answerTemplate:
        "{{businessName}} offers the services on our site. Share your number and I can text a tailored menu.",
    },
    {
      key: "hours",
      label: "Business hours",
      questions: ["hours", "open", "when are you open"],
      answerTemplate: "We're open {{hours}}. Booking link: {{bookingUrl}}",
    },
  ],
  followUpRules: [
    {
      trigger: "capture",
      channel: "sms",
      delayMinutes: 1,
      template:
        "Hi {{capturedName}} — this is {{businessName}}. Here's your booking link: {{bookingUrl}}. Reply with any questions.",
    },
  ],
  stages: ["intro", "qualified", "captured", "escalated"],
};
