import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nova — AI First-Response Assistant — Ops by Noell",
  description:
    "Nova handles first response, qualification, contact capture, routing, and booking handoff so you never lose a lead to a missed call again.",
};

const capabilities = [
  {
    title: "First Response",
    detail:
      "When someone reaches out and you can\u2019t pick up, Nova sends an instant text or chat reply so the lead never goes cold.",
    index: "01",
  },
  {
    title: "Qualification",
    detail:
      "Nova asks the right questions to understand what the prospect needs \u2014 service type, availability, urgency \u2014 before passing them to you.",
    index: "02",
  },
  {
    title: "Contact Capture",
    detail:
      "Name, phone, email, service interest. Nova collects the information you need and logs it directly into your system.",
    index: "03",
  },
  {
    title: "Smart Routing",
    detail:
      "Different service? Different location? Nova routes the conversation to the right person or workflow automatically.",
    index: "04",
  },
  {
    title: "Booking-Link Handoff",
    detail:
      "When the prospect is ready, Nova shares your scheduling link so they can book directly \u2014 no back-and-forth required.",
    index: "05",
  },
  {
    title: "Human Handoff",
    detail:
      "Anything Nova can\u2019t handle gets escalated to you immediately with full context. You pick up right where Nova left off.",
    index: "06",
  },
];

export default function NovaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-cream pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-lilac-dark" />
                <p className="text-xs uppercase tracking-[0.2em] text-lilac-dark">
                  Nova Prospect
                </p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-charcoal">
                Your AI{" "}
                <em className="not-italic text-lilac-dark">
                  first-response
                </em>{" "}
                assistant.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-warm-gray max-w-md">
                Nova catches the leads you can&rsquo;t get to. It responds
                instantly, qualifies the prospect, captures their info, and
                hands them off to you or your booking link.
              </p>
              <p className="mt-3 text-sm text-warm-gray/70">
                Not a full AI receptionist. Not a replacement for your team.
                The fastest first response you&rsquo;ve ever had.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-lilac-dark text-white text-sm font-medium hover:bg-lilac-dark/90 transition-colors"
                >
                  Get Nova for Your Business
                </Link>
                <Link
                  href="/#systems"
                  className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-warm-border text-charcoal text-sm font-medium hover:bg-cream-dark transition-colors"
                >
                  See the Full System
                </Link>
              </div>
            </div>

            {/* Nova Demo Panel */}
            <div className="relative hidden md:block">
              <div className="bg-white rounded-2xl shadow-xl shadow-lilac-dark/5 border border-warm-border overflow-hidden max-w-sm ml-auto">
                {/* Panel Header */}
                <div className="bg-lilac-dark px-5 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">N</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Nova</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <p className="text-[10px] text-white/60">Online</p>
                    </div>
                  </div>
                </div>

                {/* Mock Conversation */}
                <div className="p-4 space-y-3 bg-cream/30">
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white border border-warm-border rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-charcoal leading-relaxed">
                      Hi! I&rsquo;m Nova. Are you looking to book an
                      appointment, ask about services, or something else?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[85%] bg-lilac-dark text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm leading-relaxed">
                      I need a facial this weekend
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] bg-white border border-warm-border rounded-2xl rounded-bl-md px-4 py-2.5 text-sm text-charcoal leading-relaxed">
                      Great choice! Can I grab your name and best number? I&rsquo;ll
                      send you the booking link right away.
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-warm-border bg-white">
                  <div className="h-9 px-3 bg-cream-dark rounded-lg border border-warm-border flex items-center">
                    <span className="text-sm text-warm-gray/50">
                      Type a message...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-cream-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-lilac-dark mb-4">
              What Nova Does
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
              Six things, done well.
            </h2>
            <p className="mt-4 text-warm-gray">
              Nova is not trying to be everything. It handles the critical first
              minutes of every lead &mdash; the window where most revenue is
              lost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap) => (
              <div
                key={cap.index}
                className="bg-cream border border-warm-border/50 rounded-xl p-7 group"
              >
                <p className="text-[10px] font-mono text-lilac-dark/50 mb-4">
                  {cap.index}
                </p>
                <h3 className="text-lg font-semibold text-charcoal mb-2">
                  {cap.title}
                </h3>
                <p className="text-sm text-warm-gray leading-relaxed">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Nova Is Not */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-lilac/60 mb-4">
            Honest Positioning
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-cream leading-tight">
            Nova is your first response, not your entire front desk.
          </h2>
          <p className="mt-6 text-cream/40 max-w-xl mx-auto text-sm leading-relaxed">
            Nova Prospect handles the critical first minutes: responding,
            qualifying, capturing, routing, and handing off. It does not manage
            appointments, run your calendar, or replace your team. That&rsquo;s a
            different product &mdash; and we&rsquo;ll tell you when it&rsquo;s
            ready.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-lilac/40 mb-3">
                Nova does
              </p>
              <ul className="space-y-2">
                {[
                  "Instant first response",
                  "Lead qualification",
                  "Contact capture",
                  "Booking-link handoff",
                  "Human escalation",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-cream/70 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-lilac" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-cream/20 mb-3">
                Nova does not
              </p>
              <ul className="space-y-2">
                {[
                  "Manage your calendar",
                  "Reschedule appointments",
                  "Process payments",
                  "Replace your staff",
                  "Run autonomously",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-cream/30 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-cream/20" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight">
            See Nova in action during your free audit.
          </h2>
          <p className="mt-4 text-warm-gray max-w-lg mx-auto">
            We&rsquo;ll show you exactly how Nova would handle your missed calls
            and what it would recover.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-lilac-dark text-white text-sm font-medium hover:bg-lilac-dark/90 transition-colors"
            >
              Book Your Free Audit
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center h-12 px-7 rounded-full border border-warm-border text-charcoal text-sm font-medium hover:bg-cream-dark transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
