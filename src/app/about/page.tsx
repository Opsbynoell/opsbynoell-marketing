import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Ops by Noell",
  description:
    "Built by operators, not just developers. Meet the team behind Ops by Noell.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="cream" className="pt-32 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <AnimateIn>
              <Overline>About</Overline>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <Headline as="h1" size="hero">
                Built by operators, not just developers.
              </Headline>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-lg text-charcoal/60 leading-relaxed max-w-lg">
                Ops by Noell started with a simple observation: local businesses
                were spending thousands on marketing and losing half the leads
                to slow follow-up. The problem wasn&apos;t the ads. It was what
                happened after someone clicked.
              </p>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.3}>
            <div className="bg-blush rounded-2xl aspect-[4/3] flex items-center justify-center">
              <div className="text-center space-y-3">
                <p className="font-serif italic text-3xl text-charcoal/30">
                  Nikki &amp; James
                </p>
                <p className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/20">
                  Founders
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </Section>

      {/* Story */}
      <Section variant="blush">
        <div className="max-w-3xl mx-auto space-y-8">
          <AnimateIn>
            <Headline as="h2" size="section">
              The gap nobody was fixing
            </Headline>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="space-y-6 text-charcoal/70 leading-relaxed">
              <p>
                Nikki and James spent years working inside the operational
                trenches of growing businesses. They saw the same pattern
                everywhere: talented people drowning in admin, promising leads
                going cold, and revenue leaking through the cracks of manual
                processes.
              </p>
              <p>
                Marketing agencies could drive traffic. CRMs could store
                contacts. But nobody was building the system that connected the
                two — the invisible infrastructure that turns a click into a
                booked appointment, a missed call into a recovered lead, a happy
                client into a five-star review.
              </p>
              <p>
                That&apos;s the gap Ops by Noell fills. Not more software. Not
                more dashboards. A done-for-you system that handles the
                operational work your team doesn&apos;t have time for — and does
                it better than a human could at 2 AM on a Saturday.
              </p>
            </div>
          </AnimateIn>
        </div>
      </Section>

      {/* Values */}
      <Section variant="cream">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <Headline as="h2" size="section" className="text-center mb-16">
              How we work
            </Headline>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              {
                title: "Operators first",
                description:
                  "We think like business owners, not technologists. Every system is designed around real workflow, not theoretical automation.",
              },
              {
                title: "Done-for-you",
                description:
                  "We don't hand you a login and wish you luck. We build it, test it, optimize it, and make sure it works before you touch it.",
              },
              {
                title: "Proof, not promises",
                description:
                  "We measure revenue recovered, time saved, and no-shows prevented. If the system isn't working, we fix it. No excuses.",
              },
            ].map((value, i) => (
              <AnimateIn key={value.title} delay={i * 0.1}>
                <div className="space-y-4">
                  <h3 className="font-serif text-xl text-charcoal">
                    {value.title}
                  </h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section variant="charcoal" className="text-center">
        <AnimateIn>
          <Headline as="h2" size="section" className="text-cream max-w-2xl mx-auto">
            Ready to stop losing revenue to slow response?
          </Headline>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-6 text-cream/50 leading-relaxed max-w-lg mx-auto">
            Let&apos;s look at your operations and find the first fix that
            makes the biggest difference.
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
