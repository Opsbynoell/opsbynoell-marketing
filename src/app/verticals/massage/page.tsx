import { IconHandStop } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function MassageVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Massage Therapy"
      title="Keep more of the clients"
      accentTitle="already trying to book."
      body="For massage therapists and small bodywork studios losing leads to missed calls, weak reminders, and inconsistent follow-up."
      trustLine="This page is tuned for massage traffic where the booking path needs to feel calm, premium, and trustworthy without becoming vague." 
      audienceLabel="Massage Therapy · Bodywork · Wellness Studios"
      problemTitle="Most of the leak is operational, not promotional."
      problemBody="The ad or referral works, the call comes in, and then the admin burden takes over. That is where booked sessions get lost."
      outcomes={[
        { label: "Missed calls", value: "Recovered", detail: "with immediate follow-up" },
        { label: "No-shows", value: "Reduced", detail: "through confirmation and reminders" },
        { label: "Reviews", value: "More", detail: "from clients already happy with the visit" },
      ]}
      systemSteps={[
        { title: "Recover the missed lead", detail: "A missed call triggers the right message while you are still with a client." },
        { title: "Protect the session calendar", detail: "Reminder flows reduce silent drop-off and no-shows before the appointment." },
        { title: "Compound trust after the visit", detail: "Review requests and clean follow-up help the practice keep growing without extra admin effort." },
      ]}
      proofCards={[
        { title: "Made for solo or lean teams", detail: "This is especially useful for practices where client work always comes first and admin spills into the evening." },
        { title: "Calm, not generic", detail: "The page stays aligned to the softer Ops by Noell world while being more direct than the general homepage." },
        { title: "Better ad destination", detail: "Paid or local traffic can land on a page that sounds like massage therapy instead of a catch-all services page." },
      ]}
      faqItems={[
        { question: "Is this only for massage businesses?", answer: "This page is tuned specifically for massage and bodywork traffic, which is why the message is more focused than the homepage." },
        { question: "Do I have to change my booking tool?", answer: "No. The system is designed to sit on top of the tools already running the practice where possible." },
        { question: "Can this still feel premium?", answer: "Yes. The vertical approach narrows the message without dropping the overall visual quality or brand world." },
      ]}
      icon={<IconHandStop size={18} />}
    />
  );
}
