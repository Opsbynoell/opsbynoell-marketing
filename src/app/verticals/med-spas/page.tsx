import { IconSparkles } from "@tabler/icons-react";
import { VerticalPage } from "@/components/vertical-page";

export default function MedSpaVerticalPage() {
  return (
    <VerticalPage
      eyebrow="Verticals · Med Spas"
      title="Turn inquiry traffic into"
      accentTitle="booked consults."
      body="For med spas where someone clicks the ad, fills the form — and then nothing happens fast enough. They cool off. They go somewhere else. The consult never books."
      trustLine="Designed for med-spa traffic that needs a premium, high-trust page aligned to consult booking, lead nurture, and response speed."
      audienceLabel="Med Spas · Injectables · Aesthetics"
      problemTitle="The leak usually happens after the lead raises their hand."
      problemBody="Someone clicks the ad, fills the form, or calls the practice. Then the follow-up lags, the consult stays unbooked, and warm intent cools off quietly."
      outcomes={[
        { label: "First follow-up", value: "< 5 min", detail: "after a form fill or missed call while the lead is still warm" },
        { label: "Consult conversion", value: "Higher", detail: "from leads who were already interested when they raised their hand" },
        { label: "Cooling leads", value: "Fewer", detail: "because nurture sequences keep intent moving toward the booking link" },
      ]}
      systemSteps={[
        { title: "First response before the lead goes cold", detail: "Form fills and missed calls trigger an immediate, on-brand reply so the practice looks responsive while the lead is still in motion." },
        { title: "Nurture that fits the consult timeline", detail: "Aesthetic inquiries rarely convert in one touch. The sequence is paced to match how this audience decides, not a generic drip cadence." },
        { title: "Protect the consult calendar", detail: "Once booked, confirmation and reminder logic reduces no-shows and rescheduling friction without putting more on the front desk." },
      ]}
      proofCards={[
        { title: "Revenue per lead, not just volume", detail: "A single booked consult in aesthetics often covers the system cost many times over. The goal is captured value, not just more form fills." },
        { title: "Built for high-consideration buyers", detail: "Aesthetic clients research, compare, and delay. The follow-up system is paced for that buying behavior instead of a generic service-business sequence." },
        { title: "Response speed is part of the brand", detail: "In this vertical, how fast you respond affects how premium you feel. Slow follow-up is both a conversion leak and a trust leak." },
      ]}
      faqItems={[
        { question: "We already have an EMR or portal. Where does this fit?", answer: "This works upstream of the chart system. It handles the first response, nurture, and consult-booking movement before someone is even entered into the deeper patient workflow." },
        { question: "What does the follow-up actually say to the lead?", answer: "We scope the messaging during the audit. It is written to match your practice tone and the specific service they inquired about, not a generic autoresponder." },
        { question: "Can Noell Support qualify consult leads?", answer: "Yes. Noell Support can handle the initial qualification layer, answer common service questions, and route toward the booking path so the front desk gets warmer consult traffic." },
      ]}
      proofEyebrow="Why high-performing practices use this"
      proofHeadlineStart="The consult path"
      proofHeadlineAccent="stays warm."
      icon={<IconSparkles size={18} />}
    />
  );
}
