import { IconDental } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function DentalVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Dental Offices"
      title="Stop losing new patients"
      accentTitle="to a voicemail they won't leave."
      body="For dental offices where missed calls, delayed callbacks, and reminder gaps quietly turn high-intent patient demand into an empty chair later in the week."
      trustLine="This page is built for dental traffic that needs to feel trustworthy, clean, and operationally competent from the first click."
      audienceLabel="Dental Offices · Hygiene · Consults"
      problemTitle="Patients do not wait long for a callback."
      problemBody="If the office is busy, the call is missed, and the response lags, the patient often books somewhere else before the staff gets back to them."
      outcomes={[
        { label: "Missed-call response", value: "< 2 min", detail: "automated text when the front desk cannot pick up" },
        { label: "No-show rate", value: "Down", detail: "with a 3-touch reminder sequence before every appointment" },
        { label: "New patient callbacks", value: "Same-day", detail: "instead of next-business-day when staff catch up" },
      ]}
      systemSteps={[
        { title: "Recover the missed patient call", detail: "An automated text fires within minutes of a missed call — before the patient dials the next office on their list." },
        { title: "Protect the hygiene schedule", detail: "Reminder sequences run before every appointment so hygienists are not sitting idle because someone forgot." },
        { title: "Free the front desk from callback loops", detail: "Confirmations, reschedule requests, and intake questions get handled in the system so staff can focus on the patient in the chair." },
      ]}
      proofCards={[
        { title: "Built around the front desk reality", detail: "One person handling phones, check-ins, and billing simultaneously. The system covers first response so nothing falls through when it is busy." },
        { title: "Appointment-specific, not generic automation", detail: "Reminders can be paced differently for hygiene recalls, new-patient consults, and follow-up visits instead of one blanket cadence." },
        { title: "Operational without feeling clinical", detail: "This is the layer between the ad click and the confirmed appointment — designed to make the schedule more stable, not just prettier." },
      ]}
      faqItems={[
        { question: "My front desk already does callbacks. What's actually different?", answer: "The system handles the first-response window — the first minutes after a missed call where the patient decides whether to wait or book elsewhere. Your team still handles everything that needs human judgment." },
        { question: "We're already using practice management software. Does this layer on top?", answer: "Yes. This does not replace scheduling or charting software. It closes the communication gap between when a patient calls and when your staff can get back to them." },
        { question: "Can this help reduce no-shows specifically?", answer: "Yes. Reminder logic is one of the clearest wins here. We map your appointment types during the audit and set sequences that fit hygiene, consult, and recall timing more precisely." },
      ]}
      proofEyebrow="Why dental practices choose this"
      proofHeadlineStart="Built for"
      proofHeadlineAccent="the front desk reality."
      icon={<IconDental size={18} />}
    />
  );
}
