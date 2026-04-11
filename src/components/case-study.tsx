import Link from "next/link";

export function CaseStudy() {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-wine mb-4 text-center">
            Proof
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight text-center">
            4 no-shows a week.{" "}
            <em className="not-italic text-wine">Then almost none.</em>
          </h2>
          <p className="mt-4 text-warm-gray max-w-2xl mx-auto text-center">
            Sarah, a massage therapist in Lago Vista, went from digital
            patchwork to a system that followed up, reminded clients, and
            protected her calendar.
          </p>

          {/* Before / After */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-cream-dark border border-warm-border/50 rounded-xl p-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-warm-gray/60 mb-4">
                Before
              </p>
              <ul className="space-y-3">
                {[
                  "Missed calls with no follow-up system",
                  "No-show stress every single week",
                  "Inconsistent appointment reminders",
                  "Too much manual texting and chasing",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-warm-gray flex items-start gap-2.5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-warm-gray/30 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* After */}
            <div className="bg-blush-light border border-wine/10 rounded-xl p-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-wine/60 mb-4">
                After
              </p>
              <ul className="space-y-3">
                {[
                  "Automated reminders across text and email",
                  "Missed-call recovery running 24/7",
                  "Better reviews from happier clients",
                  "A calendar that felt under control again",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-charcoal flex items-start gap-2.5"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-wine flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-warm-border/50 rounded-lg p-5 text-center">
              <p className="font-serif text-2xl font-bold text-wine">
                4 &rarr; &lt;1
              </p>
              <p className="text-xs text-warm-gray mt-1">
                no-shows per week
              </p>
            </div>
            <div className="bg-white border border-warm-border/50 rounded-lg p-5 text-center">
              <p className="font-serif text-2xl font-bold text-wine">$960</p>
              <p className="text-xs text-warm-gray mt-1">
                revenue recovered in 14 days
              </p>
            </div>
            <div className="bg-white border border-warm-border/50 rounded-lg p-5 text-center">
              <p className="font-serif text-2xl font-bold text-wine">40+</p>
              <p className="text-xs text-warm-gray mt-1">
                Google reviews in 8 weeks
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/book"
              className="text-sm text-wine font-medium hover:text-wine-dark transition-colors"
            >
              See How It Works &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
