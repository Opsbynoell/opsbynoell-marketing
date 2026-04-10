import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verticals — Ops by Noell",
  description:
    "AI automation systems built for specific industries — med spas, home services, dental clinics, and professional services.",
};

const verticals = [
  {
    title: "Med Spas & Aesthetics",
    tagline: "High-ticket appointments demand instant attention",
    problems: [
      "Leads from Instagram and Google expect immediate responses",
      "No-shows on $300+ treatments destroy weekly revenue",
      "Front desk is overwhelmed during peak hours",
      "Reviews are the #1 driver of new clients — but nobody asks",
    ],
    solution:
      "We build systems that respond to every inquiry in seconds, confirm and remind before appointments, and ask for reviews at the perfect moment. Your front desk handles in-room experience. The system handles everything else.",
    stat: { number: "$3,800", label: "average monthly revenue recovered" },
  },
  {
    title: "Home Services",
    tagline: "The estimate that gets there first wins the job",
    problems: [
      "Missed calls during jobs mean missed revenue",
      "Estimates sent but never followed up on",
      "Seasonal spikes overwhelm your scheduling",
      "Competitors are responding faster",
    ],
    solution:
      "Instant lead capture and response — even when your team is on a job. Automated estimate follow-up, booking, and review collection. The system works while your crew works.",
    stat: { number: "4×", label: "review growth in 90 days" },
  },
  {
    title: "Dental & Health Clinics",
    tagline: "Patient trust is built before they walk in the door",
    problems: [
      "New patient inquiries sit unanswered for hours",
      "Cancellations and no-shows leave gaps in the schedule",
      "Reactivation of dormant patients is manual and slow",
      "Online reputation matters more every year",
    ],
    solution:
      "Automated new-patient welcome sequences, smart appointment reminders, and dormant-patient reactivation campaigns. Your hygienists and providers focus on care. The system fills the chair.",
    stat: { number: "0", label: "no-shows after system activation" },
  },
  {
    title: "Legal & Professional Services",
    tagline: "First response wins the consultation",
    problems: [
      "Potential clients call after hours and never call back",
      "Intake forms are tedious and create friction",
      "Follow-up after consultations is inconsistent",
      "Referral networks aren't being systematically nurtured",
    ],
    solution:
      "AI-powered intake qualification, instant after-hours response, and consultation follow-up sequences that convert without being pushy. Professional, thorough, and always on.",
    stat: { number: "14", suffix: " days", label: "from audit to operational" },
  },
];

export default function VerticalsPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="cream" className="pt-32 md:pt-40">
        <div className="max-w-3xl">
          <AnimateIn>
            <Overline>Verticals</Overline>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Headline as="h1" size="hero" className="mt-4">
              Built for businesses where every missed call costs real money
            </Headline>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-8 text-lg md:text-xl text-charcoal/60 leading-relaxed max-w-2xl">
              We don&apos;t do generic automation. Every system is designed
              for the specific pressure points, buying cycles, and client
              expectations of your industry.
            </p>
          </AnimateIn>
        </div>
      </Section>

      {/* Vertical sections */}
      {verticals.map((vertical, i) => (
        <Section
          key={vertical.title}
          variant={i % 2 === 0 ? "blush" : "cream"}
        >
          <AnimateIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {/* Content side */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <Headline as="h2" size="section">
                    {vertical.title}
                  </Headline>
                  <p className="font-serif italic text-lg text-charcoal/50">
                    {vertical.tagline}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
                    The pressure points
                  </span>
                  <ul className="space-y-2">
                    {vertical.problems.map((problem) => (
                      <li
                        key={problem}
                        className="text-sm text-charcoal/60 leading-relaxed pl-4 border-l-2 border-wine/15"
                      >
                        {problem}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-charcoal/70 leading-relaxed">
                  {vertical.solution}
                </p>
              </div>

              {/* Evidence side */}
              <div className="flex items-center justify-center">
                <div className="bg-cream border border-wine/10 rounded-2xl p-10 text-center space-y-3">
                  <div className="font-mono text-5xl md:text-6xl text-wine">
                    {vertical.stat.number}
                    {vertical.stat.suffix && (
                      <span className="text-3xl">{vertical.stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal/50">
                    {vertical.stat.label}
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>
        </Section>
      ))}

      {/* Closing CTA */}
      <Section variant="charcoal" className="text-center">
        <AnimateIn>
          <Headline as="h2" size="section" className="text-cream max-w-2xl mx-auto">
            Don&apos;t see your industry?
          </Headline>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-6 text-cream/50 leading-relaxed max-w-lg mx-auto">
            If your business depends on appointments, follow-up, or reputation
            — we can build a system for it. Let&apos;s talk.
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
