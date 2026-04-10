"use client";

import { AnimateIn } from "./animate-in";

const stats = [
  {
    number: "$960",
    label: "average revenue recovered per week",
  },
  {
    number: "4×",
    label: "review growth in 90 days",
  },
  {
    number: "0",
    label: "no-shows after system activation",
  },
  {
    number: "14",
    suffix: " days",
    label: "from audit to fully operational",
  },
];

export function ProofBand() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {stats.map((stat, i) => (
        <AnimateIn key={stat.label} delay={i * 0.1}>
          <div className="space-y-3">
            <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-normal text-wine tracking-tight">
              {stat.number}
              {stat.suffix && (
                <span className="text-2xl md:text-3xl">{stat.suffix}</span>
              )}
            </div>
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-[200px]">
              {stat.label}
            </p>
          </div>
        </AnimateIn>
      ))}
    </div>
  );
}
