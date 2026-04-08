import Link from "next/link";
import { pricingGrid } from "@/content/pricing";
import { ROUTES } from "@/lib/constants";

export function PricingGrid() {
  return (
    <section className="py-16 md:py-20 bg-[#FAF5F0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight mb-10 text-center">
          {pricingGrid.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingGrid.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-2xl border p-7 flex flex-col ${
                tier.isPopular
                  ? "bg-white border-[#6A2C3E] shadow-[0_4px_24px_rgba(106,44,62,0.12)] ring-1 ring-[#6A2C3E]/15"
                  : "bg-white border-[#EDE3DE]"
              }`}
            >
              {/* Popular badge */}
              {tier.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6A2C3E] px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}

              {/* Tier name */}
              <h3 className="text-lg font-bold text-[#1F1A1A]">{tier.name}</h3>

              {/* Price */}
              <div className="mt-3">
                <span className="font-display text-3xl font-bold text-[#1F1A1A]">
                  ${tier.monthlyPrice}
                </span>
                <span className="text-sm text-[#6D6664]">/mo</span>
                <p className="text-xs text-[#6D6664] mt-0.5">
                  + ${tier.setupFee} setup
                </p>
              </div>

              {/* Best for */}
              <p className="mt-3 text-xs text-[#6D6664] leading-relaxed border-t border-[#EDE3DE] pt-3">
                Best for: {tier.bestFor}
              </p>

              {/* Features */}
              <ul className="mt-4 flex flex-col gap-2 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[#6D6664]">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-[#F0E4E8] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6A2C3E]" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={ROUTES.book}
                className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  tier.isPopular
                    ? "bg-[#6A2C3E] text-white hover:bg-[#5a2233]"
                    : "border border-[#EDE3DE] text-[#1F1A1A] hover:border-[#6A2C3E]/40"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
