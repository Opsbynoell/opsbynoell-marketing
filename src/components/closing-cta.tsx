import Link from "next/link";

export function ClosingCta() {
  return (
    <section className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-wine mb-4">
            The First Step
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            See exactly where leads are falling through.
          </h2>
          <p className="mt-4 text-warm-gray max-w-lg mx-auto">
            No pitch. No pressure. Just a clear look at what&rsquo;s costing
            you clients &mdash; and what a system could recover.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-wine text-cream text-sm font-medium hover:bg-wine-dark transition-colors"
            >
              Book Your Free Audit
            </Link>
            <Link
              href="/nova"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-warm-border text-charcoal text-sm font-medium hover:bg-cream transition-colors gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lilac-dark" />
              Try Nova Instead
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-warm-gray/60">
            <span>Free 15-minute audit</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>No contracts required</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Live in 14 days or less</span>
          </div>
        </div>
      </div>
    </section>
  );
}
