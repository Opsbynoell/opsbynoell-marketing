import { IconHomeBolt } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function HomeServicesVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Home Services"
      title="Turn more local leads into"
      accentTitle="booked jobs."
      body="For service businesses losing momentum between the first inquiry, the estimate, and the booked job because follow-up happens too slowly or too inconsistently."
      trustLine="This page is made for home-service traffic that needs a slightly more grounded tone, clearer next steps, and stronger operational trust without leaving the Ops by Noell brand system."
      audienceLabel="Home Services · Local Service Businesses"
      problemTitle="The demand is there. The follow-up path is what leaks."
      problemBody="Calls, forms, and DMs come in, but if the next step is slow or messy, the estimate never happens or the lead goes with someone who responded faster."
      outcomes={[
        { label: "Response path", value: "Cleaner", detail: "from first inquiry to estimate or booking" },
        { label: "Estimate flow", value: "Faster", detail: "with clearer next-step routing" },
        { label: "Lost leads", value: "Less", detail: "because warm traffic gets handled sooner" },
      ]}
      systemSteps={[
        { title: "Catch inbound demand", detail: "Forms, chats, and calls get funneled into one cleaner response path instead of living across disconnected tools." },
        { title: "Route by service need", detail: "The next step can differ depending on whether the lead needs a quote, consultation, callback, or appointment." },
        { title: "Move interest toward booked work", detail: "The system helps bridge the gap between the first hand raise and a real estimate or booked job." },
      ]}
      proofCards={[
        { title: "Built for paid traffic", detail: "This is the kind of page local ads should land on when the visitor expects a more service-led message than the general homepage provides." },
        { title: "Grounded, not macho", detail: "The design stays in the same world, but uses stronger contrast, plainer language, and more operational framing." },
        { title: "More useful than generic", detail: "The page is tuned to the way home-service leads actually behave instead of making them decode a broad umbrella message." },
      ]}
      faqItems={[
        { question: "Is this different from the HVAC page?", answer: "Yes. HVAC is one specific home-service category. This page is broader and better for campaigns that need to cover multiple service types." },
        { question: "Can this support estimates and callbacks?", answer: "Yes. That is one of the key reasons this page exists — to make the first-response and next-step path more specific to home-service behavior." },
        { question: "Will it still feel like Ops by Noell?", answer: "Yes. The tone gets slightly more grounded, but the page still belongs to the same visual and strategic system." },
      ]}
      tone="charcoal"
      icon={<IconHomeBolt size={18} />}
    />
  );
}
