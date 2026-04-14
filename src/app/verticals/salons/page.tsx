import { IconScissors } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function SalonsVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Salons"
      title="Keep more of the clients"
      accentTitle="already trying to book."
      body="For salons dealing with missed calls, rebooking gaps, and follow-up that only happens when someone has time at the end of the day."
      trustLine="This page is tuned for salon traffic where the booking path needs to feel polished, premium, and clear without becoming vague or over-soft."
      audienceLabel="Salons · Stylists · Color Specialists"
      problemTitle="The leak happens in the gap between service and follow-up."
      problemBody="The chair is full, the phone rings, and the admin work gets pushed later. That is where rebooks, new clients, and review momentum quietly fall off."
      outcomes={[
        { label: "Missed calls", value: "Recovered", detail: "with immediate follow-up" },
        { label: "Rebooks", value: "More", detail: "with cleaner reminder and nurture flow" },
        { label: "Reviews", value: "More", detail: "from clients already happy with the visit" },
      ]}
      systemSteps={[
        { title: "Catch the missed inquiry", detail: "Calls and messages get a next step even when the team is with clients." },
        { title: "Protect the appointment", detail: "Reminder logic reduces no-shows and keeps the day tighter." },
        { title: "Encourage return visits", detail: "Follow-up and rebooking prompts help the salon keep momentum without more admin work." },
      ]}
      proofCards={[
        { title: "Built for service businesses with a full chair", detail: "This is especially useful when the best stylists are too busy working to keep chasing the inbox and missed calls." },
        { title: "Clearer than a generic homepage", detail: "Salon traffic lands on message and imagery that feel closer to the actual booking context." },
        { title: "Premium but operational", detail: "The page stays visually polished while speaking more directly about how the calendar gets protected." },
      ]}
      faqItems={[
        { question: "Is this different from the main homepage?", answer: "Yes. The vertical page is narrower and more relevant for salon traffic, especially from ads or local campaigns." },
        { question: "Can this help with rebooking too?", answer: "Yes. The system can support both first booking and rebooking by tightening reminders and follow-up paths." },
        { question: "Will this still feel on-brand?", answer: "Yes. The design stays inside the same authored world while making the page more specific to salon behavior." },
      ]}
      icon={<IconScissors size={18} />}
    />
  );
}
