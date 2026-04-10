"use client";

import { AnimateIn } from "./animate-in";

const capabilities = [
  {
    number: "01",
    title: "Instant Lead Response",
    description:
      "When a lead comes in — from a form, a missed call, or a DM — the system responds in seconds, not hours. Text, email, or voice. Before they have time to call your competitor.",
  },
  {
    number: "02",
    title: "Automated Booking & Confirmation",
    description:
      "Self-serve scheduling that syncs with your calendar, sends confirmations, and follows up before appointments. No-shows drop. Your front desk gets their time back.",
  },
  {
    number: "03",
    title: "Follow-Up & Reactivation",
    description:
      "Leads that didn't book get nurtured. Past clients get re-engaged. The system remembers everyone your team forgot — and brings them back.",
  },
  {
    number: "04",
    title: "Review & Reputation Engine",
    description:
      "Happy clients are asked to review at the right moment, on the right platform. Negative feedback is caught privately before it goes public.",
  },
];

export function SystemsSection() {
  return (
    <div className="space-y-16 md:space-y-20">
      {capabilities.map((cap, i) => (
        <AnimateIn key={cap.number} delay={i * 0.1}>
          <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-12">
            <span className="font-mono text-3xl md:text-4xl text-stone/60">
              {cap.number}
            </span>
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-serif text-xl md:text-2xl text-charcoal">
                {cap.title}
              </h3>
              <p className="text-charcoal/60 leading-relaxed">
                {cap.description}
              </p>
            </div>
          </div>
        </AnimateIn>
      ))}
    </div>
  );
}
