import { IconWavesElectricity } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function PoolServicesVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Pool Services"
      title="Protect recurring revenue"
      accentTitle="with better follow-up."
      body="For pool service businesses that rely on repeat scheduling, reminders, local trust, and clean follow-up to keep routes and recurring revenue stable."
      trustLine="This page is built for pool-service traffic where repeat service scheduling, reminders, and reputation matter as much as the first lead capture."
      audienceLabel="Pool Services · Maintenance · Recurring Routes"
      problemTitle="A lot of the leak is in repeat scheduling and local trust."
      problemBody="When reminders are loose, follow-up is inconsistent, and reviews do not keep compounding, route density and recurring revenue become harder to hold."
      outcomes={[
        { label: "Scheduling", value: "Tighter", detail: "with clearer repeat-service communication" },
        { label: "Reviews", value: "More", detail: "through a steadier reputation system" },
        { label: "Repeat business", value: "Stronger", detail: "because follow-up stays active" },
      ]}
      systemSteps={[
        { title: "Keep recurring service organized", detail: "Reminder and scheduling flows help make repeat work feel more stable and less manual." },
        { title: "Re-engage inactive customers", detail: "Reactivation campaigns help bring back clients who fell off the route or stopped responding." },
        { title: "Build local trust faster", detail: "Review generation and payment flow support make the business easier to trust and easier to pay." },
      ]}
      proofCards={[
        { title: "Built for repeat service logic", detail: "This page is more useful for a recurring-service model than a general page focused mostly on one-time bookings." },
        { title: "Good fit for local-market traffic", detail: "Pool service buyers often need trust, clarity, and consistency cues quickly. This page speaks to those better." },
        { title: "Better backend story", detail: "The messaging makes it clearer that Ops by Noell supports reminders, reviews, reactivation, and payment flow — not just first response." },
      ]}
      faqItems={[
        { question: "Is this only for pool service companies?", answer: "This page is specifically tuned for pool-service campaigns, especially when recurring service and route stability matter." },
        { question: "Can this help bring back old customers?", answer: "Yes. Reactivation is one of the strongest use cases for this vertical." },
        { question: "Does this only help with new leads?", answer: "No. This page is intentionally more balanced between new lead capture and repeat-service retention." },
      ]}
      tone="charcoal"
      icon={<IconWavesElectricity size={18} />}
    />
  );
}
