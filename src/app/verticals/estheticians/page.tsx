import { IconHeart } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function EstheticiansVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Estheticians"
      title="Turn more inquiries into"
      accentTitle="booked appointments."
      body="For estheticians and skin-focused practices where demand is there, but missed calls, weak reminders, and inconsistent follow-up keep the calendar leakier than it should be."
      trustLine="This page is designed for esthetician traffic that should feel premium and calming while still speaking directly to inquiry handling and calendar protection."
      audienceLabel="Estheticians · Skin Studios · Solo Practices"
      problemTitle="The calendar leak is usually not demand — it is follow-up."
      problemBody="The inquiry comes in, the practitioner is with a client, and the response waits until later. That lag is often enough to lose the booking."
      outcomes={[
        { label: "Missed leads", value: "Less", detail: "because the response starts right away" },
        { label: "Bookings", value: "More", detail: "from the same level of interest" },
        { label: "Admin load", value: "Lower", detail: "with better reminders and post-visit follow-up" },
      ]}
      systemSteps={[
        { title: "Catch the inquiry while you work", detail: "Calls and messages get a timely response while you stay focused on the treatment in front of you." },
        { title: "Protect the booked visit", detail: "Confirmations and reminders reduce quiet drop-off before the appointment." },
        { title: "Build post-visit momentum", detail: "Review and follow-up logic helps happy clients come back and refer more consistently." },
      ]}
      proofCards={[
        { title: "Specific to solo and small teams", detail: "The page is made for practices where the practitioner is also the operator and admin burden stacks fast." },
        { title: "Message match for ads", detail: "Esthetician traffic gets a page that sounds more like the business it clicked on." },
        { title: "Still premium", detail: "The design stays clean and high-trust while the copy becomes more useful and direct." },
      ]}
      faqItems={[
        { question: "Is this different from the homepage?", answer: "Yes. It is narrower and more relevant for esthetician traffic, especially when used with ads or local campaigns." },
        { question: "Can this work for solo operators?", answer: "Yes. In fact, solo and lean teams usually feel the benefit fastest because follow-up tends to be the first thing that slips." },
        { question: "Does Noell Support fit here too?", answer: "Yes. Noell Support can support the first-response layer where it makes sense for the booking path." },
      ]}
      icon={<IconHeart size={18} />}
    />
  );
}
