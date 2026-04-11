import Link from "next/link";

export function Hero() {
  return (
    <section className="relative bg-cream pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy — Left */}
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-warm-gray mb-6">
              A systems agency &middot; Ops by Noell
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight text-charcoal">
              By the time you call back, they&rsquo;ve already booked{" "}
              <em className="not-italic text-wine">somewhere else.</em>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-warm-gray max-w-md">
              We build, install, and manage the system that catches missed
              calls, follows up instantly, and keeps your calendar full &mdash;
              so you can stay focused on the client in front of you.
            </p>
            <p className="mt-3 text-sm text-warm-gray/70">
              Built for massage therapists, med spas, salons, dental offices,
              and estheticians.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/book"
                className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-wine text-cream text-sm font-medium hover:bg-wine-dark transition-colors"
              >
                Get Your Free Audit
              </Link>
              <Link
                href="/#systems"
                className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-warm-border text-charcoal text-sm font-medium hover:bg-cream-dark transition-colors"
              >
                See What You&rsquo;re Missing
              </Link>
            </div>
          </div>

          {/* Proof Artifacts — Right */}
          <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] hidden md:block">
            {/* Chat notification artifact */}
            <div className="absolute top-4 right-0 bg-white rounded-2xl shadow-lg shadow-charcoal/5 p-5 w-72 -rotate-2 border border-warm-border/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-blush flex items-center justify-center text-wine text-xs font-bold">
                  SM
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Sarah M.</p>
                  <p className="text-xs text-warm-gray">2 min ago</p>
                </div>
              </div>
              <p className="text-sm text-charcoal leading-relaxed">
                Hi, do you still have availability this Saturday? I&rsquo;ve been
                trying to reach you&hellip;
              </p>
            </div>

            {/* Revenue callout artifact */}
            <div className="absolute top-44 right-16 bg-cream-dark rounded-xl shadow-md shadow-charcoal/5 px-7 py-5 rotate-1 border border-warm-border/50">
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray mb-1">
                Revenue recovered
              </p>
              <p className="font-serif text-5xl font-bold text-wine">$960</p>
              <p className="text-xs text-warm-gray mt-1">in 14 days</p>
            </div>

            {/* Missed-call recovery artifact */}
            <div className="absolute top-28 left-0 bg-charcoal text-cream rounded-xl shadow-lg p-4 rotate-2 w-64 border border-white/5">
              <p className="text-[10px] uppercase tracking-[0.15em] text-cream/40 mb-1.5">
                missed-call recovery &rarr; triggered
              </p>
              <p className="text-sm leading-relaxed text-cream/80">
                Auto-text sent to Sarah M. &mdash; &ldquo;I saw I missed your
                call&hellip;&rdquo;
              </p>
            </div>

            {/* System status artifact */}
            <div className="absolute bottom-8 right-4 bg-white rounded-lg shadow-md shadow-charcoal/5 px-5 py-3 -rotate-1 border border-warm-border/50">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs font-medium text-charcoal">
                  System active
                </span>
                <span className="text-xs text-warm-gray">&middot;</span>
                <span className="text-xs text-warm-gray">
                  auto-follow-up enabled
                </span>
              </div>
            </div>

            {/* Booking confirmed artifact */}
            <div className="absolute bottom-24 left-8 bg-blush-light rounded-lg shadow-sm p-4 -rotate-2 w-56 border border-warm-border/30">
              <p className="text-[10px] uppercase tracking-[0.15em] text-wine/60 mb-1">
                Appointment confirmed
              </p>
              <p className="text-sm font-medium text-charcoal">
                Saturday, 2:00 PM
              </p>
              <p className="text-xs text-warm-gray mt-0.5">
                Deep tissue &middot; 60 min
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
