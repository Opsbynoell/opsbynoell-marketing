import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Free Audit — Ops by Noell",
  description:
    "In 30 minutes, we'll show you where leads are slipping, where follow-up is breaking, and what's costing you revenue right now.",
};

export default function BookPage() {
  return (
    <>
      <Section variant="cream" className="pt-32 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Reassurance copy */}
          <div className="space-y-10">
            <div className="space-y-6">
              <AnimateIn>
                <Overline>Book Your Free Audit</Overline>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <Headline as="h1" size="hero">
                  Let&apos;s find what&apos;s leaking.
                </Headline>
              </AnimateIn>
              <AnimateIn delay={0.2}>
                <p className="text-lg text-charcoal/60 leading-relaxed max-w-md">
                  In 30 minutes, we&apos;ll walk through where leads are
                  slipping, where follow-up is breaking, and what&apos;s costing
                  you revenue right now. This is not a sales pitch. It&apos;s a
                  clarity call.
                </p>
              </AnimateIn>
            </div>

            {/* What we'll look at */}
            <AnimateIn delay={0.3}>
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
                  What we&apos;ll look at
                </span>
                <ul className="space-y-3">
                  {[
                    "Missed calls and slow response gaps",
                    "Follow-up breakdowns and no-show risk",
                    "Review and reactivation opportunities",
                    "The first system fix that would make the biggest difference",
                  ].map((item) => (
                    <li
                      key={item}
                      className="text-charcoal/70 leading-relaxed pl-4 border-l-2 border-wine/20"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateIn>

            {/* What happens after */}
            <AnimateIn delay={0.4}>
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
                  What happens after
                </span>
                <p className="text-charcoal/70 leading-relaxed max-w-md">
                  You&apos;ll leave with a clear picture of what&apos;s being
                  missed, what to fix first, and whether Ops by Noell is the
                  right fit.
                </p>
              </div>
            </AnimateIn>

            {/* Trust microcopy */}
            <AnimateIn delay={0.5}>
              <div className="bg-blush/50 rounded-xl px-6 py-5 max-w-md">
                <div className="space-y-1.5">
                  <p className="text-sm text-charcoal/60">No pitch deck.</p>
                  <p className="text-sm text-charcoal/60">No pressure.</p>
                  <p className="text-sm text-charcoal/60">No obligation.</p>
                  <p className="text-sm text-charcoal/70 mt-3">
                    Just a direct look at what&apos;s leaking and what it would
                    take to fix it.
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>

          {/* Right: Booking embed */}
          <div className="space-y-6">
            <AnimateIn delay={0.2}>
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
                Choose a time that works for you
              </span>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <div className="bg-white border border-charcoal/5 rounded-2xl min-h-[500px] flex flex-col items-center justify-center p-8">
                {/* GHL / Calendly embed placeholder */}
                <div className="text-center space-y-4 max-w-sm">
                  <div className="w-16 h-16 rounded-full bg-blush flex items-center justify-center mx-auto">
                    <span className="font-serif italic text-2xl text-wine">
                      N
                    </span>
                  </div>
                  <p className="font-serif italic text-xl text-charcoal/40">
                    Booking calendar
                  </p>
                  <p className="text-sm text-charcoal/30 leading-relaxed">
                    Replace this container with your GHL or Calendly embed.
                    Use the{" "}
                    <code className="font-mono text-xs bg-blush/50 px-1.5 py-0.5 rounded">
                      iframe
                    </code>{" "}
                    or script embed code from your booking platform.
                  </p>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn delay={0.4}>
              <p className="text-sm text-charcoal/40 leading-relaxed">
                If you don&apos;t see a time that fits, email{" "}
                <a
                  href="mailto:hello@opsbynoell.com"
                  className="text-wine hover:text-wine-light transition-colors"
                >
                  hello@opsbynoell.com
                </a>{" "}
                and we&apos;ll find one.
              </p>
            </AnimateIn>
          </div>
        </div>
      </Section>

      {/* Proof reinforcement */}
      <Section variant="blush" className="py-16 md:py-20">
        <AnimateIn>
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <p className="font-serif italic text-xl md:text-2xl text-charcoal/70 leading-relaxed">
              &ldquo;She didn&apos;t just fix our operations — she made us
              wonder how we&apos;d been running without them.&rdquo;
            </p>
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
              — Founder, Series B Med Spa
            </p>
          </div>
        </AnimateIn>
      </Section>
    </>
  );
}
