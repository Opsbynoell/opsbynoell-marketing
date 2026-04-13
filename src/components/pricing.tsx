import React from "react";
import { Button } from "./button";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  tier: string;
  priceFrom: string;
  cadence: string;
  tagline: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isHighlighted?: boolean;
  note?: string;
}

const tiers: PricingTier[] = [
  {
    tier: "Essentials",
    priceFrom: "$497",
    cadence: "/mo",
    tagline: "The entry layer. Catch missed prospects and open the door to the Noell system.",
    features: [
      "Noell Support entry layer",
      "Missed-call text-back",
      "Website chat response",
      "Basic contact capture + smart routing",
      "Core reminder flow",
      "One vertical configuration",
    ],
    ctaLabel: "Start with Essentials",
    ctaHref: "/book",
    note: "Pricing confirmed at audit",
  },
  {
    tier: "Growth",
    priceFrom: "$997",
    cadence: "/mo",
    tagline: "Most practices start here. Noell Support plus the Noell Front Desk operations layer.",
    features: [
      "Everything in Essentials",
      "Full Noell Support coverage",
      "Noell Front Desk layer",
      "Advanced reminders + follow-up sequences",
      "Review capture + filter routing",
      "Reactivation workflows",
      "Smart booking logic + custom booking paths",
    ],
    ctaLabel: "Get Growth",
    ctaHref: "/book",
    isHighlighted: true,
    note: "Most popular · Pricing confirmed at audit",
  },
  {
    tier: "Custom Ops",
    priceFrom: "Custom",
    cadence: "",
    tagline: "Multi-location or deeper workflow needs. The full Noell system, tuned to you.",
    features: [
      "Everything in Growth",
      "Custom Noell system buildout",
      "Multi-location or custom routing",
      "Deeper front-desk workflow support",
      "Dedicated implementation support",
      "White-glove install + ongoing optimization",
    ],
    ctaLabel: "Book a scoping call",
    ctaHref: "/book",
    note: "Quoted at audit",
  },
];

const PricingCard = ({ tier }: { tier: PricingTier }) => {
  return (
    <div
      className={cn(
        "relative rounded-[37px] flex flex-col gap-3 p-4",
        tier.isHighlighted
          ? "border border-white bg-gradient-to-b from-wine-light via-wine to-wine-dark"
          : "bg-warm-border/70"
      )}
    >
      <div className="space-y-6 p-5 bg-cream rounded-[28px] shadow-[0px_95px_27px_0px_rgba(28,25,23,0.00),_0px_61px_24px_0px_rgba(28,25,23,0.03),_0px_34px_21px_0px_rgba(28,25,23,0.08),_0px_15px_15px_0px_rgba(28,25,23,0.12),_0px_4px_8px_0px_rgba(28,25,23,0.15)] pb-8 px-5">
        <div className="flex flex-col">
          <h3 className="text-sm w-fit font-medium text-charcoal rounded-full border border-warm-border bg-white flex justify-center items-center px-4 py-1">
            {tier.tier}
          </h3>
          <div className="mt-3 flex items-baseline">
            <span className="font-serif text-4xl font-bold text-charcoal">
              {tier.priceFrom}
            </span>
            {tier.cadence && (
              <span className="ml-1 text-sm text-charcoal/50">
                {tier.cadence}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-charcoal/60 leading-relaxed">
            {tier.tagline}
          </p>
        </div>

        <Button
          href={tier.ctaHref}
          variant={tier.isHighlighted ? "primary" : "secondary"}
          className="w-full py-3"
        >
          {tier.ctaLabel}
        </Button>

        <ul className="space-y-3 pt-2">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span
                className={cn(
                  "flex-shrink-0 mt-0.5 w-4 h-4 rounded-full flex items-center justify-center",
                  tier.isHighlighted ? "bg-wine text-cream" : "bg-blush text-wine"
                )}
              >
                <IconCheck size={11} strokeWidth={3} />
              </span>
              <span className="text-sm text-charcoal/80 leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {tier.note && (
          <p className="text-[11px] text-charcoal/40 italic mt-2">
            {tier.note}
          </p>
        )}
      </div>
    </div>
  );
};

export default function Pricing() {
  return (
    <div id="pricing" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.25em] text-wine mb-4">
          Packages
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal mb-4">
          One system.
          <br className="hidden md:block" />
          <span className="italic text-wine">Three</span> ways to run it.
        </h2>
        <p className="text-charcoal/60 max-w-xl mx-auto">
          The packages stay simple. What changes is how much Noell Support
          coverage, smart automation, and implementation support you want
          running behind the scenes for your business.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-5 items-start">
        {tiers.map((tier) => (
          <PricingCard key={tier.tier} tier={tier} />
        ))}
      </div>
      <p className="text-center text-xs text-charcoal/50 mt-10 max-w-2xl mx-auto">
        Your audit is where we confirm the right package, establish fit, and
        quote the install clearly. No bait pricing, no mystery scope.
      </p>
    </div>
  );
}
