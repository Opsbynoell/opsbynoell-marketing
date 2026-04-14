import type { ReactNode } from "react";
import { Button } from "@/components/button";
import { FAQ } from "@/components/faq";
import CTA from "@/components/cta";

type VerticalPageProps = {
  eyebrow: string;
  title: string;
  accentTitle: string;
  body: string;
  trustLine: string;
  audienceLabel: string;
  problemTitle: string;
  problemBody: string;
  outcomes: { label: string; value: string; detail: string }[];
  systemSteps: { title: string; detail: string }[];
  proofCards: { title: string; detail: string }[];
  faqItems: { question: string; answer: string }[];
  proofEyebrow?: string;
  proofHeadlineStart?: string;
  proofHeadlineAccent?: string;
  tone?: "wine" | "charcoal";
  icon?: ReactNode;
};

export function VerticalPage({
  eyebrow,
  title,
  accentTitle,
  body,
  trustLine,
  audienceLabel,
  problemTitle,
  problemBody,
  outcomes,
  systemSteps,
  proofCards,
  faqItems,
  proofEyebrow = "Why businesses choose this",
  proofHeadlineStart = "The message matches",
  proofHeadlineAccent = "the click.",
  tone = "wine",
  icon,
}: VerticalPageProps) {
  const isCharcoal = tone === "charcoal";

  return (
    <div>
      <section
        className={[
          "relative flex max-w-7xl rounded-b-3xl my-2 md:my-20 mx-auto flex-col items-center justify-center overflow-hidden px-4 md:px-8 pt-32 pb-18 md:pb-20",
          isCharcoal
            ? "bg-gradient-to-t from-[rgba(72,64,58,0.82)] via-[rgba(225,218,211,0.72)] to-[rgba(250,246,241,1)]"
            : "bg-gradient-to-t from-[rgba(107,45,62,0.52)] via-[rgba(240,224,214,0.72)] to-[rgba(250,246,241,1)]",
        ].join(" ")}
      >
        <p className="relative z-20 text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-6 text-center">
          {eyebrow}
        </p>
        <h1 className="relative z-20 max-w-5xl text-center font-serif text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-charcoal leading-[0.98]">
          {title}{" "}
          <span
            className={[
              "italic bg-clip-text text-transparent",
              isCharcoal
                ? "bg-gradient-to-b from-[rgba(86,74,66,1)] to-[rgba(52,44,39,1)]"
                : "bg-gradient-to-b from-wine-light to-wine",
            ].join(" ")}
          >
            {accentTitle}
          </span>
        </h1>
        <p className="relative z-20 mt-6 max-w-2xl text-center text-charcoal/70 text-base md:text-lg leading-relaxed">
          {body}
        </p>
        <div className="relative z-20 mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-charcoal/50">
          <span>{audienceLabel}</span>
          <span>·</span>
          <span>Installed for you</span>
          <span>·</span>
          <span>Audit first, then scope</span>
        </div>
        <div className="relative z-20 mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button href="/book" variant={isCharcoal ? "dark" : "primary"} className="h-12 px-8 w-full sm:w-auto font-semibold">
            Book Your Free Audit
          </Button>
          <Button href="/noell-support" variant="secondary" className="h-12 px-7 w-full sm:w-auto">
            See Noell Support
          </Button>
        </div>
        <div className="relative z-20 mt-8 rounded-[22px] border border-white/60 bg-white/85 p-4 md:p-5 shadow-[0px_24px_60px_-18px_rgba(28,25,23,0.18)] max-w-xl w-full">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={[
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isCharcoal ? "bg-charcoal/8 text-charcoal" : "bg-wine/10 text-wine",
              ].join(" ")}
            >
              {icon ?? <span className="text-lg">•</span>}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45">
                What this fixes
              </p>
              <p className="text-sm font-semibold text-charcoal">
                Faster follow-up, cleaner conversion path
              </p>
            </div>
          </div>
          <p className="text-sm text-charcoal/65 leading-relaxed">
            {trustLine}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-6 md:gap-8 items-stretch">
          <div className="rounded-[26px] border border-warm-border bg-charcoal px-6 py-7 md:p-8 text-cream shadow-[0px_34px_21px_0px_rgba(28,25,23,0.08),0px_15px_15px_0px_rgba(28,25,23,0.08),0px_4px_8px_0px_rgba(28,25,23,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.24em] text-cream/45 mb-4">
              The real problem
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold leading-tight">
              {problemTitle}
            </h2>
            <p className="mt-5 text-base text-cream/60 leading-relaxed max-w-xl">
              {problemBody}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {outcomes.map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-warm-border bg-white p-5 md:p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.12)]"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/45 mb-2">
                  {item.label}
                </p>
                <p className="font-serif text-3xl md:text-4xl text-charcoal leading-none">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-charcoal/55 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 px-4">
        <div className="max-w-6xl mx-auto rounded-[30px] border border-warm-border bg-white shadow-[0px_61px_24px_0px_rgba(28,25,23,0.00),0px_34px_21px_0px_rgba(28,25,23,0.04),0px_15px_15px_0px_rgba(28,25,23,0.06),0px_4px_8px_0px_rgba(28,25,23,0.08)] overflow-hidden">
          <div className="px-6 md:px-8 pt-8 pb-6 border-b border-warm-border text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-3">
              What we install
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal leading-tight">
              A vertical-ready system, <span className="italic text-wine">not a generic funnel.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {systemSteps.map((step, index) => (
              <div
                key={step.title}
                className={[
                  "p-6 md:p-7",
                  index < systemSteps.length - 1 ? "border-b md:border-b-0 md:border-r border-warm-border" : "",
                ].join(" ")}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/35 mb-3">
                  0{index + 1}
                </p>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-3">
              {proofEyebrow}
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal leading-tight">
              {proofHeadlineStart} <span className="italic text-wine">{proofHeadlineAccent}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {proofCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[22px] border border-warm-border bg-cream/60 p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.1)]"
              >
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ
        eyebrow="Questions"
        headlineStart="Straight"
        headlineAccent="answers."
        body="The things people usually need to know before they let us install this for their vertical."
        faqs={faqItems}
      />

      <CTA
        eyebrow="The next step"
        headlineStart="See what this would look like"
        headlineAccent="for your business."
        body="Book the audit and we’ll map the missed calls, follow-up gaps, and booking leaks specific to your vertical before we quote anything."
        trustLine="Free audit · Scoped to your vertical · Installed for you"
      />
    </div>
  );
}
