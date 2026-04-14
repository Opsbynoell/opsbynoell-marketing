import type { ClientConfig } from "../types";

/**
 * Default client used by this marketing site itself. When we install the
 * Noell system at a real client, a new ClientConfig is added alongside
 * this one and selected at runtime.
 *
 * This config exercises every operational field — so the runtime has real
 * values to interpolate while we build, and so it stands as a reference
 * shape for new installs.
 */
export const defaultClient: ClientConfig = {
  clientId: "opsbynoell-marketing",
  businessName: "Ops by Noell",
  vertical: "generic",
  bookingUrl: "/book",
  phone: "",
  email: "hello@opsbynoell.com",
  hours: "By appointment",
  services: ["Free operations audit"],
  team: [{ name: "Noell", role: "owner" }],
  locations: [
    {
      id: "hq",
      label: "Ops by Noell HQ",
      address: "Remote-first · Austin, TX",
      parking: "Virtual audits — no parking needed.",
      arrivalInstructions:
        "Your audit runs on Google Meet. The link arrives with your confirmation text.",
    },
  ],
  knowledgeBase: [
    {
      key: "audit-format",
      label: "Audit format",
      answer:
        "The free audit is 30 minutes over video. We review your lead flow, missed-call recovery, scheduling, and follow-up.",
      keywords: ["audit", "format", "video", "meet"],
    },
    {
      key: "policies",
      label: "Cancellation",
      answer:
        "Reschedule anytime from your confirmation text. No fees for the free audit.",
      keywords: ["cancel", "reschedule", "fees"],
    },
  ],
  missedCallTextback: {
    template:
      "Hi {{callerNameGuess}} — this is {{businessName}}, sorry we missed your call. Here's the direct booking link: {{bookingUrl}}",
    slaSeconds: 10,
  },
  reviewCapture: {
    minPublicRating: 4,
    platform: "google",
    postVisitTemplate:
      "Thanks for working with {{businessName}}. If you have 30 seconds, a review helps more than you'd think: {{reviewLink}}",
  },
  reactivation: {
    dormancyThresholdDays: 90,
    template:
      "Hi {{capturedName}} — it's been a while since your last visit to {{businessName}}. Want to lock in a rebooking? {{bookingUrl}}",
  },
  reminderCadence: "48h email + 2h SMS",
  webhooks: {
    // onCapture:   "<wire to CRM / Supabase chatLeads>",
    // onEscalate:  "<wire to Telegram / Slack>",
    // onResolved:  "<wire to analytics>",
    // onWorkflow:  "<wire to workflow runner (GHL / internal queue)>",
  },
};
