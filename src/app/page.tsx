import { Hero } from "@/components/hero";
import { Testimonials } from "@/components/testimonials";
import { Systems } from "@/components/systems";
import CTA from "@/components/cta";
import { PickYourPath } from "@/components/pick-your-path";
import { FullSystemFeatures } from "@/components/full-system-features";
import { PredictiveIntelligence } from "@/components/predictive-intelligence";
import { ROICalculator } from "@/components/roi-calculator";
import { ProofBar } from "@/components/proof-bar";
import { SantaProofBlock } from "@/components/santa-proof-block";
import { PciBand } from "@/components/pci-band";
import { IntegrationBand } from "@/components/integration-band";
import { FAQ, type FaqItem } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/seo";
import {
  servicePageSchema,
  homepageLocalBusinessSchema,
  faqPageSchema,
} from "@/lib/schema";

export const metadata = pageMetadata({
  path: "/",
  title: "AI Front Desk for Local Service Businesses — Ops by Noell",
  description:
    "Done-for-you AI front desk for massage therapists, dental practices, med spas, and local service businesses. Missed-call recovery, booking automation, client reactivation — installed in 14 days.",
  ogTitle: "Ops by Noell — AI Front Desk That Keeps Your Business Moving",
  ogDescription:
    "$960 recovered in 14 days. 75% fewer no-shows. We build the front desk layer your business needs.",
});

const homepageFaqs: FaqItem[] = [
  {
    id: "is-this-a-sales-pitch",
    question: "Is this a sales pitch?",
    answer:
      "No. It is a working call. You will leave with a clear picture of what is leaking at the front of your business and whether a done-for-you AI front desk is a fit. If it is not, we will say so.",
  },
  {
    id: "switch-booking-systems",
    question: "Do I need to switch booking systems?",
    answer:
      "No. We install the AI front desk around the booking system you already use. Your booking system stays the system of record.",
  },
  {
    id: "who-is-this-for",
    question: "Who is this for?",
    answer:
      "Dental practices, med spas, salons, massage therapists, estheticians, and HVAC companies. Solo operators and small teams whose front desk has gone quiet while the owner is with a client.",
  },
  {
    id: "what-does-it-cost",
    question: "What does it cost?",
    answer:
      "Done-for-you pricing. We share specifics on the working call once we understand what your front desk needs. We do not quote in advance because the install depends on what we find.",
  },
  {
    id: "pci-extra-charge",
    question: "Is Predictive Customer Intelligence an extra charge?",
    answer:
      "No. It is built into every Ops by Noell install. The front desk that answers your calls is the same front desk that watches your patterns. They are one system, not two.",
  },
];

export default function Home() {
  return (
    <div>
      <JsonLd
        data={servicePageSchema({
          name: "The Ops by Noell AI front desk",
          description:
            "The done-for-you AI front desk for local service businesses. Built, installed, and managed around the booking system you already use, so missed calls, consults, reminders, reviews, and reactivation keep moving.",
          path: "/",
        })}
        id="home-service"
      />
      <JsonLd
        data={homepageLocalBusinessSchema()}
        id="home-localbusiness"
      />
      <JsonLd
        data={faqPageSchema(homepageFaqs)}
        id="home-faq"
      />

      {/* 1. Hero */}
      <Hero
        headlineLine1Start="You’re losing clients between"
        headlineLine1Accent="appointments."
        headlineLine2Start="We build the systems"
        headlineLine2Accent="that stop that."
        headlineLine2Smaller={false}
        body="Every missed call, every no-show, every slow follow-up is revenue walking out the door. We build done-for-you AI front desks for massage therapists, dental practices, med spas, and local service businesses — installed in 14 days, running in the background while you do the work you’re actually good at."
        footnote="Done for you. Built around the booking and practice management software your business already uses."
        primaryCta={{ label: "See What You’re Losing", href: "/resources/revenue-calculator" }}
        secondaryCta={{ label: "Book a Free Audit", href: "/book" }}
        showProofBar={false}
      />

      {/* 2. Santa proof block */}
      <SantaProofBlock />

      {/* 3. PCI band */}
      <PciBand />

      {/* 4. ProofBar / #live-recovery */}
      <section className="w-full flex justify-center px-4 pb-12 md:pb-16">
        <ProofBar />
      </section>

      {/* 5. Pick your path */}
      <PickYourPath />

      {/* 6. Integration band */}
      <IntegrationBand />

      {/* 7. ROI Calculator */}
      <section className="w-full py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <ROICalculator />
        </div>
      </section>

      {/* 8. Systems. Three agents, tight. */}
      <Systems />

      {/* 9. Full system features (kept from prior layout) */}
      <FullSystemFeatures />

      {/* 10. Predictive Customer Intelligence detail */}
      <PredictiveIntelligence />

      {/* 11. Proof. Santa case study block. */}
      <Testimonials />

      {/* 12. Homepage FAQ */}
      <FAQ
        faqs={homepageFaqs}
        eyebrow="Questions"
        headlineStart="Straight"
        headlineAccent="answers."
        body="Real questions from service business owners before they book a working call."
      />

      {/* 13. Final CTA band */}
      <CTA
        eyebrow="The first step"
        headlineStart="Start with a"
        headlineAccent="working call."
        body="No pitch. No pressure. We walk your front desk and show you where warm intent is cooling off in your business."
        trustLine="Twenty focused minutes. Personally scheduled."
        sourcePage="home"
      />
    </div>
  );
}
