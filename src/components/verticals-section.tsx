"use client";

import Link from "next/link";
import { AnimateIn } from "./animate-in";
import { ArrowRight } from "lucide-react";

const verticals = [
  {
    title: "Med Spas & Aesthetics",
    description:
      "Automated booking confirmations, no-show prevention, and review generation for high-ticket appointments.",
  },
  {
    title: "Home Services",
    description:
      "Instant lead response, smart scheduling, and follow-up that turns estimates into booked jobs.",
  },
  {
    title: "Dental & Health Clinics",
    description:
      "Patient reactivation, appointment reminders, and review flows that build trust on autopilot.",
  },
  {
    title: "Legal & Professional Services",
    description:
      "Lead qualification, intake automation, and follow-up sequences that convert consultations.",
  },
];

export function VerticalsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {verticals.map((vertical, i) => (
        <AnimateIn key={vertical.title} delay={i * 0.1}>
          <Link
            href="/verticals"
            className="group block p-8 md:p-10 rounded-2xl border border-charcoal/5 hover:border-wine/15 bg-cream/50 hover:bg-blush/30 transition-all duration-500"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-xl md:text-2xl text-charcoal group-hover:text-wine transition-colors">
                {vertical.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {vertical.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-wine opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </AnimateIn>
      ))}
    </div>
  );
}
