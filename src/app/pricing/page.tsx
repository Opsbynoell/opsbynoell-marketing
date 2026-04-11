import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import Link from "next/link";
import { Check } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Ops by Noell",
  description:
    "Transparent pricing for AI automation systems. From launch to full operational infrastructure.",
};

const tiers = [
  {
    name: "Launch",
    price: "2,500",
    period: "one-time setup",
    monthly: "297",
    description:
      "For businesses ready to stop losing leads to slow response. The essentials — built and running in 14 days.",
    features: [
      "Instant lead response (SMS + email)",
      "Automated booking & confirmations",
      "Appointment reminders (24h + 2h)",
      "Basic review request automation",
      "Calendar integration",
      "14-day setup and launch",
    ],
    cta: "Book Free Audit",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "4,500",
    period: "one-time setup",
    monthly: "497",
    description:
      "The full system. Lead response, booking, follow-up, reactivation, and reputation — all automated.",
    features: [
      "Everything in Launch",
      "Multi-channel follow-up sequences",
      "Dormant client reactivation",
      "Cold estimate revival campaigns",
      "Advanced review & reputation engine",
      "Nova AI assistant integration",
      "Monthly performance reporting",
      "Priority support",
    ],
    cta: "Book Free Audit",
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    monthly: "Custom",
    description:
      "For multi-location businesses or complex operations. Custom system architecture, dedicated support, and ongoing optimization.",
    features: [
      "Everything in Growth",
      "Multi-location system design",
      "Custom workflow architecture",
      "Team training & onboarding",
      "Dedicated account manager",
      "Weekly optimization calls",
      "Custom integrations",
    ],
    cta: "Talk to Us",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Section variant="cream" className="pt-32 md:pt-40">
        <div className="text-center max-w-3xl mx-auto">
          <AnimateIn>
            <Overline>Pricing</Overline>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <Headline as="h1" size="hero" className="mt-4">
              One system.
              <br />
              Clear pricing.
            </Headline>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-8 text-lg text-charcoal/60 leading-relaxed">
              Every plan includes a complete done-for-you build. You don&apos;t
              configure anything — we build it, test it, and hand you the keys.
            </p>
          </AnimateIn>
        </div>
      </Section>

      {/* Pricing grid */}
      <Section variant="cream" className="pt-0 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, i) => (
            <AnimateIn key={tier.name} delay={i * 0.1}>
              <div
                className={`relative flex flex-col h-full rounded-2xl border p-8 md:p-10 transition-all ${
                  tier.highlighted
                    ? "border-wine/20 bg-white shadow-sm"
                    : "border-charcoal/5 bg-cream"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-8 bg-wine text-cream text-xs tracking-[0.1em] uppercase px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="space-y-4 mb-8">
                  <h3 className="font-serif text-2xl text-charcoal">
                    {tier.name}
                  </h3>
                  <div>
                    {tier.price !== "Custom" ? (
                      <>
                        <span className="font-mono text-4xl text-charcoal">
                          ${tier.price}
                        </span>
                        <span className="text-sm text-charcoal/40 ml-2">
                          {tier.period}
                        </span>
                        <p className="text-sm text-charcoal/40 mt-1">
                          + ${tier.monthly}/mo ongoing
                        </p>
                      </>
                    ) : (
                      <span className="font-mono text-4xl text-charcoal">
                        Custom
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-charcoal/70"
                    >
                      <Check className="w-4 h-4 text-wine shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/book"
                  className={`inline-flex items-center justify-center text-sm tracking-wide px-8 py-3.5 rounded-full transition-colors ${
                    tier.highlighted
                      ? "bg-wine text-cream hover:bg-wine-light"
                      : "border border-charcoal/15 text-charcoal hover:border-charcoal/30"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Section>

      {/* FAQ / Trust */}
      <Section variant="blush">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <AnimateIn>
            <Headline as="h2" size="sub">
              What&apos;s included in every plan
            </Headline>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                {
                  title: "Done-for-you build",
                  desc: "We build everything. You don't touch a dashboard.",
                },
                {
                  title: "14-day launch",
                  desc: "From audit to fully operational in two weeks.",
                },
                {
                  title: "No long-term contracts",
                  desc: "Month-to-month after setup. Stay because it works.",
                },
                {
                  title: "Ongoing optimization",
                  desc: "We monitor, adjust, and improve continuously.",
                },
              ].map((item) => (
                <div key={item.title} className="space-y-2">
                  <h4 className="font-serif text-lg text-charcoal">
                    {item.title}
                  </h4>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </Section>
    </>
  );
}
