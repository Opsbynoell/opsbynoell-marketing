import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Systems — Ops by Noell",
  description:
    "AI automation systems that handle lead response, booking, follow-up, and reviews for local businesses.",
};

const systems = [
  {
    number: "01",
    title: "Instant Lead Response",
    subtitle: "Respond in seconds — not hours",
    description:
      "When a new lead comes in from Google, Facebook, your website, or a missed call, the system responds immediately — via text, email, or voice. Before they have time to call your competitor. Before your front desk even sees the notification.",
    details: [
      "Multi-channel response (SMS, email, voice)",
      "Under 60-second average response time",
      "Intelligent routing based on lead source and intent",
      "After-hours coverage that feels human",
    ],
  },
  {
    number: "02",
    title: "Automated Booking & Confirmation",
    subtitle: "Self-serve scheduling that actually works",
    description:
      "Leads book themselves into your real calendar — no back-and-forth. The system sends confirmations, reminders, and handles reschedules automatically. Your team gets time back. Your no-show rate drops to near zero.",
    details: [
      "Calendar sync with your existing tools",
      "Smart confirmation sequences (SMS + email)",
      "Automated reminders at 24h, 2h, and 30min",
      "One-tap rescheduling for clients",
    ],
  },
  {
    number: "03",
    title: "Follow-Up & Reactivation",
    subtitle: "The system remembers everyone your team forgot",
    description:
      "Leads that didn't book get nurtured with personalized sequences. Past clients who haven't returned in 60, 90, or 120 days get re-engaged. Estimates that went cold get revived. Nothing falls through the cracks.",
    details: [
      "Drip sequences tailored by service and stage",
      "Dormant client reactivation campaigns",
      "Cold estimate follow-up automation",
      "Win-back offers timed to buying cycles",
    ],
  },
  {
    number: "04",
    title: "Review & Reputation Engine",
    subtitle: "Turn happy clients into public proof",
    description:
      "After a successful appointment or completed job, the system asks for a review — at the right moment, on the right platform. Negative sentiment is caught privately before it hits Google. Positive reviews are amplified.",
    details: [
      "Post-service review request automation",
      "Platform-specific routing (Google, Yelp, industry sites)",
      "Private feedback capture for negative experiences",
      "Review response templates for your team",
    ],
  },
];

export default function SystemsPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="cream" className="pt-32 md:pt-40">
        <div className="max-w-3xl">
          <AnimateIn>
            <Overline>Systems</Overline>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Headline as="h1" size="hero" className="mt-4">
              From AI chaos to systems that run themselves
            </Headline>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-charcoal/60 leading-relaxed max-w-2xl">
              We used to reach people by picking up the phone, checking the
              rolodex, leaving a voicemail. Now AI handles it — but only if the
              system is built right. We bridge the gap between how communication
              used to work and how it needs to work now.
            </p>
          </AnimateIn>
        </div>
      </Section>

      {/* System detail sections */}
      {systems.map((system, i) => (
        <Section
          key={system.number}
          variant={i % 2 === 0 ? "cream" : "blush"}
          className="py-20 md:py-28"
        >
          <AnimateIn>
            <div className="grid grid-cols-1 lg:grid-cols-[100px_1fr] gap-8 lg:gap-16">
              <span className="font-mono text-5xl md:text-6xl text-stone/40">
                {system.number}
              </span>
              <div className="space-y-8 max-w-3xl">
                <div className="space-y-3">
                  <Headline as="h2" size="sub">
                    {system.title}
                  </Headline>
                  <p className="font-serif italic text-lg text-charcoal/50">
                    {system.subtitle}
                  </p>
                </div>
                <p className="text-charcoal/70 leading-relaxed">
                  {system.description}
                </p>
                <ul className="space-y-3 border-l-2 border-wine/15 pl-6">
                  {system.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-sm text-charcoal/60 leading-relaxed"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimateIn>
        </Section>
      ))}

      {/* Closing CTA */}
      <Section variant="charcoal" className="text-center">
        <AnimateIn>
          <Headline as="h2" size="section" className="text-cream max-w-2xl mx-auto">
            Ready to see what a real system looks like?
          </Headline>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-6 text-cream/50 leading-relaxed max-w-lg mx-auto">
            We&apos;ll audit your current setup and show you exactly where
            leads are leaking — and what to fix first.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.25}>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-cream text-charcoal text-sm tracking-wide px-10 py-4 rounded-full hover:bg-white transition-colors"
            >
              Book Your Free Audit
            </Link>
          </div>
        </AnimateIn>
      </Section>
    </>
  );
}
