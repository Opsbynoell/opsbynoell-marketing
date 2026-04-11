import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Book Your Free Audit — Ops by Noell",
  description:
    "See exactly where leads are falling through. No pitch, no pressure. Just clarity on what your systems could recover.",
};

export default function BookPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-wine mb-4">
            The First Step
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal leading-[1.1]">
            Your free operations audit.
          </h1>
          <p className="mt-6 text-lg text-warm-gray max-w-xl mx-auto leading-relaxed">
            15 minutes. No pitch, no pressure. We look at where leads are
            falling through, how your follow-up works today, and what a system
            could recover.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-cream-dark py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Book a time",
                detail:
                  "Pick a 15-minute slot that works. You\u2019ll get a confirmation text and a reminder the day before.",
              },
              {
                step: "02",
                title: "We audit your systems",
                detail:
                  "We review your current follow-up flow, response time, booking process, and communication gaps.",
              },
              {
                step: "03",
                title: "Get your action plan",
                detail:
                  "You\u2019ll walk away with a clear map of what\u2019s leaking and exactly what to fix \u2014 whether you work with us or not.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center md:text-left">
                <p className="text-[10px] font-mono text-wine/50 mb-3">
                  {item.step}
                </p>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Embed */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-warm-border shadow-sm shadow-charcoal/[0.02] overflow-hidden">
            {/* Embed Header */}
            <div className="px-8 pt-8 pb-4">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Pick a time that works.
              </h2>
              <p className="text-sm text-warm-gray mt-1">
                All times are Central Time (CT).
              </p>
            </div>

            {/* Embed Placeholder */}
            <div className="px-8 pb-8">
              <div className="bg-cream-dark rounded-xl border border-warm-border h-[400px] flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-blush mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-wine"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-charcoal mb-1">
                    Scheduling widget loads here
                  </p>
                  <p className="text-xs text-warm-gray">
                    GHL / Calendly embed &mdash; connects to your live calendar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Microcopy */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-charcoal">
                Free &amp; no obligation
              </p>
              <p className="text-xs text-warm-gray mt-1">
                The audit is yours whether you work with us or not.
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-charcoal">
                15 minutes, max
              </p>
              <p className="text-xs text-warm-gray mt-1">
                We respect your time. This is focused and fast.
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-medium text-charcoal">
                Instant confirmation
              </p>
              <p className="text-xs text-warm-gray mt-1">
                You&rsquo;ll get a text and email confirmation immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-cream-dark py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-charcoal leading-tight">
            Not ready to book?
          </h2>
          <p className="mt-4 text-warm-gray">
            That&rsquo;s fine. You can ask Nova a question first, or keep
            exploring the site. When you&rsquo;re ready, the audit is here.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/nova"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-warm-border text-charcoal text-sm font-medium hover:bg-cream transition-colors gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-lilac-dark" />
              Talk to Nova
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-warm-border text-charcoal text-sm font-medium hover:bg-cream transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
