import React from "react";
import Link from "next/link";
import {
  IconHandStop,
  IconSparkles,
  IconScissors,
  IconDental,
  IconHeart,
  IconFlame,
  IconHomeBolt,
  IconWavesElectricity,
} from "@tabler/icons-react";

const verticals = [
  { name: "Med Spas", icon: <IconSparkles size={22} />, href: "/verticals/med-spas", note: "Consult conversion and nurture" },
  { name: "Salons", icon: <IconScissors size={22} />, href: "/verticals/salons", note: "Sharper booking and rebooking path" },
  { name: "Massage Therapy", icon: <IconHandStop size={22} />, href: "/verticals/massage", note: "Calm, trust-first booking flow" },
  { name: "Dental Offices", icon: <IconDental size={22} />, href: "/verticals/dental", note: "Trust-first scheduling page" },
  { name: "HVAC", icon: <IconFlame size={22} />, href: "/verticals/hvac", note: "Urgent-call, grounded service tone" },
  { name: "Home Services", icon: <IconHomeBolt size={22} />, href: "/verticals/home-services", note: "Broader service-led ad page" },
  { name: "Pool Services", icon: <IconWavesElectricity size={22} />, href: "/verticals/pool-services", note: "Recurring-service and reactivation focus" },
];

const products = [
  {
    name: "Noell Support",
    href: "/noell-support",
    tag: "New prospect intake",
    detail: "Website chat, lead qualification, contact capture, and triage to booking or your team.",
  },
  {
    name: "Noell Front Desk",
    href: "/noell-front-desk",
    tag: "Operations layer",
    detail: "Calls, scheduling, reminders, confirmations, reschedules, review capture, reactivation, and deeper front-desk workflow support.",
  },
  {
    name: "Done-for-you systems",
    href: "/book",
    tag: "Implementation path",
    detail: "Audit, setup, implementation, and managed optimization for businesses that want the full system handled for them.",
  },
];

export function LogoCloud() {
  return (
    <section id="verticals" className="w-full py-10 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[11px] uppercase tracking-[0.25em] text-charcoal/50 mb-3">
          The Noell system
        </p>
        <h2 className="text-center font-serif text-2xl md:text-4xl text-charcoal mb-4">
          Two products. One system. Built for your vertical.
        </h2>
        <p className="text-center text-charcoal/60 max-w-2xl mx-auto mb-8">
          The Noell system gives you two clear product layers and one implementation path. Noell Support catches new prospects. Noell Front Desk handles deeper operational follow-through. If you want it built for you, start with the audit and done-for-you path.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {products.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="flex flex-col gap-2 rounded-[20px] border border-warm-border bg-cream/70 py-5 px-5 hover:bg-white transition-colors shadow-[0px_12px_20px_-16px_rgba(28,25,23,0.18)]"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-wine/70">{p.tag}</span>
              <span className="font-serif text-xl text-charcoal">{p.name}</span>
              <span className="text-xs text-charcoal/55 leading-relaxed">{p.detail}</span>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {verticals.map((v, i) => (
            <Link
              key={i}
              href={v.href}
              className="flex items-start gap-4 rounded-[20px] border border-warm-border bg-cream/70 py-5 px-5 hover:bg-white transition-colors shadow-[0px_12px_20px_-16px_rgba(28,25,23,0.18)]"
            >
              <span className="text-wine/85 scale-110 mt-1">{v.icon}</span>
              <span className="block">
                <span className="block text-sm md:text-base text-charcoal/85 font-medium">
                  {v.name}
                </span>
                <span className="block mt-1 text-xs text-charcoal/55">
                  {v.note}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
