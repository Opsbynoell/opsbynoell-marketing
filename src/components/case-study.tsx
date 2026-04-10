"use client";

import { AnimateIn } from "./animate-in";
import { Headline } from "./headline";
import { Overline } from "./overline";

export function CaseStudy() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      {/* Story side */}
      <AnimateIn>
        <div className="space-y-8">
          <Overline>Case Study</Overline>
          <Headline as="h2" size="section">
            4 no-shows a week.
            <br />
            Then none.
          </Headline>
          <div className="space-y-4 text-charcoal/70 leading-relaxed max-w-lg">
            <p>
              A med-spa owner was losing $3,800 a month to missed appointments.
              Clients would book and never show. The front desk would call — if
              they had time. Most days, they didn&apos;t.
            </p>
            <p>
              We built an automated confirmation and reminder sequence that
              texts, follows up, and reschedules — without anyone touching it.
              Within two weeks, no-shows dropped to zero.
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* Evidence artifact */}
      <AnimateIn delay={0.2}>
        <div className="bg-cream border border-wine/10 rounded-2xl p-8 md:p-10 space-y-8">
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
              Before
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-5xl text-charcoal/30 line-through decoration-wine/40">
                4
              </span>
              <span className="text-sm text-charcoal/40">
                no-shows per week
              </span>
            </div>
          </div>

          <div className="h-px bg-wine/10" />

          <div className="space-y-1">
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-wine">
              After
            </span>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-5xl text-wine">0</span>
              <span className="text-sm text-charcoal/70">
                no-shows — fully automated
              </span>
            </div>
          </div>

          <div className="h-px bg-wine/10" />

          <div className="space-y-1">
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/40">
              Revenue recovered
            </span>
            <div className="font-mono text-3xl text-wine">$3,800/mo</div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
