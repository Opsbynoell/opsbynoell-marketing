import { IconFlame } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function HvacVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Home Services / HVAC"
      title="Stop losing booked jobs"
      accentTitle="between the call and the callback."
      body="For HVAC, plumbing, and electrical shops where leads call once, do not leave a voicemail, and book the next company that texts back. The gap between the missed call and the callback is where the job goes."
      trustLine="Built for ad traffic that should land on a page speaking directly to home-service urgency, missed calls, dispatch reality, and booked-job value instead of a general beauty-service homepage."
      audienceLabel="HVAC · Plumbing · Electrical · Home Services"
      problemTitle="When the phone gets missed, the job usually goes somewhere else."
      problemBody="Home-service leads are high intent and time-sensitive. If the callback is late, the estimate gets delayed, the dispatch window gets lost, and the revenue leak is immediate."
      outcomes={[
        { label: "Missed-call text", value: "<10s", detail: "fires while your tech is still on the job" },
        { label: "After-hours leads", value: "Captured", detail: "instead of lost when the office is closed" },
        { label: "Callback queue", value: "Shorter", detail: "because the system pre-qualifies before dispatch picks up" },
      ]}
      systemSteps={[
        {
          title: "Catch the missed call",
          detail: "If a prospect calls while your team is on-site, the system triggers an immediate text with the right next step instead of leaving the lead cold.",
        },
        {
          title: "Route by service type",
          detail: "Install requests, emergencies, maintenance, and estimate requests can follow different logic so the response actually fits the job.",
        },
        {
          title: "Convert to booked work",
          detail: "The lead gets pushed toward the right booking path, dispatcher handoff, or human callback with context already captured.",
        },
      ]}
      proofCards={[
        {
          title: "Every missed call is a job estimate you did not give",
          detail: "At typical HVAC ticket values, one recovered call a week can cover the system cost quickly. The math is simpler than the leak feels.",
        },
        {
          title: "Built for the field, not the office",
          detail: "When your techs are on-site and the phone is ringing at the shop, the system handles the response so no lead waits more than a few seconds for a next step.",
        },
        {
          title: "No dispatch replacement, just a cleaner handoff",
          detail: "We close the gap between the missed call and your CSR. Your team still scopes, schedules, and dispatches — they just work with warmer, pre-qualified leads.",
        },
      ]}
      faqItems={[
        {
          question: "We already use ServiceTitan, Jobber, or Housecall Pro. Does this conflict?",
          answer: "No. This is the layer before your field-management software. It handles the first response and routing so that by the time a job hits your dispatch board, the lead has already been replied to and qualified." },
        {
          question: "Does this replace dispatch or CSR staff?",
          answer: "No. It closes the first-response gap. It catches missed leads, routes cleaner, and reduces callback lag. Your team still handles the work and human judgment." },
        {
          question: "Can ads go straight to this page?",
          answer: "Yes. That is the point of the vertical landing page approach. Home-service traffic should land here instead of the generic homepage." },
        {
          question: "Can this work for plumbing or electrical too?",
          answer: "Yes. This page is intentionally broad enough for home services while still being useful for HVAC-specific campaigns." },
      ]}
      proofEyebrow="Why home-service shops trust this"
      proofHeadlineStart="Built for"
      proofHeadlineAccent="the field."
      tone="charcoal"
      icon={<IconFlame size={18} />}
    />
  );
}
