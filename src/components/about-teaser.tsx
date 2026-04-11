import Link from "next/link";

export function AboutTeaser() {
  return (
    <section id="about" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-blush rounded-2xl overflow-hidden border border-warm-border/50">
              <div className="absolute inset-0 flex items-end p-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-warm-border/50">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-warm-gray mb-1">
                    Founder
                  </p>
                  <p className="font-serif text-lg font-semibold text-charcoal">
                    Noell
                  </p>
                  <p className="text-xs text-warm-gray">
                    Operations &middot; Systems &middot; Texas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-[0.2em] text-wine mb-4">
              The Founder
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight">
              I built this because I watched it happen.
            </h2>
            <p className="mt-6 text-warm-gray leading-relaxed">
              Service businesses don&rsquo;t have a marketing problem. They have
              an operations gap. The leads come in. The calls come in. But when
              you&rsquo;re mid-appointment, mid-facial, mid-session &mdash;
              nobody picks up.
            </p>
            <p className="mt-4 text-warm-gray leading-relaxed">
              I&rsquo;ve seen the same pattern in every vertical: talented
              people losing revenue to response time. Not because they
              don&rsquo;t care, but because the day doesn&rsquo;t leave room to
              care fast enough.
            </p>
            <p className="mt-4 text-warm-gray leading-relaxed">
              Ops by Noell exists to close that gap. We install the systems.
              We manage the follow-up. You stay focused on your craft.
            </p>
            <div className="mt-8">
              <Link
                href="/book"
                className="text-sm text-wine font-medium hover:text-wine-dark transition-colors"
              >
                Let&rsquo;s talk about your system &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
