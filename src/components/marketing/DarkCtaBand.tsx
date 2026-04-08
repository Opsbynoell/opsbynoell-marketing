import Link from "next/link";
import { ROUTES } from "@/lib/constants";

type DarkCtaBandProps = {
  headline: string;
  subhead: string;
  primaryCta: string;
  reassurance?: string;
  ctaHref?: string;
};

export function DarkCtaBand({
  headline,
  subhead,
  primaryCta,
  reassurance,
  ctaHref = ROUTES.book,
}: DarkCtaBandProps) {
  return (
    <section className="bg-[#171415] py-16 md:py-24 relative overflow-hidden">
      {/* Subtle warm gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(106,44,62,0.12) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative rule */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="block h-px w-12 bg-[#EDE3DE]/20" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C8C4C0]">
            Ops by Noell
          </span>
          <span className="block h-px w-12 bg-[#EDE3DE]/20" />
        </div>

        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
          {headline}
        </h2>
        <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
          {subhead}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-full bg-[#6A2C3E] px-8 py-3.5 text-sm font-semibold text-white hover:bg-[#5a2233] transition-colors shadow-[0_2px_16px_rgba(106,44,62,0.35)] w-full sm:w-auto"
          >
            {primaryCta}
          </Link>
        </div>
        {reassurance && (
          <p className="mt-5 text-sm text-white/35">{reassurance}</p>
        )}
      </div>
    </section>
  );
}
