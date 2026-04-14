import type { Metadata } from "next";
import { IconBellRinging, IconCalendarCheck, IconRefresh, IconStar, IconMessage2, IconRoute } from "@tabler/icons-react";
import { Hero } from "@/components/hero";
import { Features3 } from "@/components/features3";
import { FAQ } from "@/components/faq";
import CTA from "@/components/cta";

export const metadata: Metadata = {
  title: "Noell Front Desk — Ops by Noell",
  description:
    "Noell Front Desk is the deeper front-desk automation layer for reminders, follow-up, reviews, reactivation, and ongoing workflow support.",
};

const faqItems = [
  {
    question: "How is Noell Front Desk different from Noell Support?",
    answer:
      "Noell Support handles new prospect intake through website chat, qualification, capture, and triage. Noell Front Desk goes deeper into calls, scheduling, confirmations, reminders, reschedules, review capture, reactivation, and broader workflow support.",
  },
  {
    question: "Is Noell Front Desk already a separate product path?",
    answer:
      "Yes. It is part of the Noell system and should be treated as its own product path, even when a business starts first with Noell Support.",
  },
  {
    question: "Do I need both products?",
    answer:
      "Not always. Some businesses only need Noell Support first. Others need the deeper operational layer because the leak is happening in calls, scheduling, reminders, follow-up, reviews, or reactivation after the first conversation.",
  },
];

export default function NoellFrontDeskPage() {
  return (
    <div>
      <Hero
        variant="wine"
        eyebrow="Noell Front Desk · Deeper automation layer"
        headlineLine1Start="The follow-up system"
        headlineLine1Accent="behind the booking."
        headlineLine2Start="Not just response."
        headlineLine2Accent="Front desk momentum."
        body="Noell Front Desk is the deeper operational layer inside the Noell system. It handles calls, scheduling, confirmations, reminders, reschedules, review capture, reactivation, and workflow follow-through so more of your booked work actually stays booked."
        footnote="Built by Ops by Noell. For businesses where the leak happens after the first inquiry, not just before it."
        primaryCta={{ label: "Book Your Free Audit", href: "/book" }}
        secondaryCta={{ label: "See Noell Support", href: "/noell-support" }}
      />

      <section className="py-20 md:py-24 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            [<IconMessage2 size={24} />, "Calls", "Handle inbound calls and keep first contact moving instead of sending everything to voicemail."],
            [<IconCalendarCheck size={24} />, "Scheduling", "Book, confirm, and organize appointments through the front-desk layer."],
            [<IconBellRinging size={24} />, "Reminders + confirmations", "Protect appointments before they disappear from the calendar."],
            [<IconRoute size={24} />, "Reschedules", "Move clients to the right next slot instead of forcing manual back-and-forth."],
            [<IconRefresh size={24} />, "Reactivation", "Bring quiet leads and old customers back into motion."],
            [<IconStar size={24} />, "Reviews", "Turn happy outcomes into social proof without making it another admin chore."],
          ].map(([icon, title, detail], i) => (
            <div key={i} className="rounded-[20px] border border-warm-border bg-white p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.12)]">
              <div className="w-11 h-11 rounded-xl bg-wine/10 text-wine flex items-center justify-center mb-4">{icon}</div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">{title}</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <Features3
        accent="wine"
        eyebrow="What it changes"
        headlineStart="Less chasing."
        headlineAccent="More follow-through."
        body="Noell Front Desk is for the operational drag that happens after the first lead response — the reminders, the follow-up, the reviews, and the tasks that quietly decide whether revenue compounds or leaks."
        capabilities={[
          {
            icon: <IconCalendarCheck size={28} />,
            number: "01",
            title: "Protect booked work",
            description: "Reminder and confirmation flows help stop the quiet drop-off that happens after someone already intended to book.",
            points: ["Reminder cadence", "Confirmation support", "Fewer silent no-shows"],
          },
          {
            icon: <IconRefresh size={28} />,
            number: "02",
            title: "Re-open dormant demand",
            description: "Reactivation logic gives old leads and quiet contacts a clean path back in instead of staying lost in the database.",
            points: ["Reactivation campaigns", "Return-client nudges", "Better list value"],
          },
          {
            icon: <IconStar size={28} />,
            number: "03",
            title: "Compound trust over time",
            description: "Reviews and follow-through systems keep social proof and operational consistency moving even when your team is busy.",
            points: ["Review requests", "Post-visit follow-up", "More stable reputation growth"],
          },
        ]}
      />

      <FAQ
        accent="wine"
        eyebrow="Front Desk questions"
        headlineStart="Straight"
        headlineAccent="answers."
        body="What businesses ask when they need more than a first-response layer."
        faqs={faqItems}
      />

      <CTA
        accent="wine"
        eyebrow="Noell system"
        headlineStart="Start with Noell Support."
        headlineAccent="Grow into Noell Front Desk."
        body="The point is not to force both products on every business. The point is to make the right layer visible at the right time — and give you a path to expand when your operation is ready for it."
        primaryCta={{ label: "Book Your Free Audit", href: "/book" }}
        secondaryCta={{ label: "See Noell Support", href: "/noell-support" }}
        trustLine="Noell system · Built by Ops by Noell · Product + implementation path"
      />
    </div>
  );
}
