"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "motion/react";

interface StatCard {
  value: string;
  label: string;
  detail: string;
}

const defaultStats: StatCard[] = [
  { value: "<8s", label: "Response time", detail: "average time from missed call to auto-text reply" },
  { value: "40+", label: "Reviews", detail: "added in six weeks with post-visit asks" },
  { value: "3 hrs", label: "Saved", detail: "each week by removing manual reminder texts" },
  { value: "14d", label: "Installed", detail: "from audit to live system" },
];

export function Features({
  eyebrow = "Proof",
  headlineStart = "The fix is operational,",
  headlineAccent = "not theoretical.",
  body = "What shifts when response, reminders, and review capture stop living in your head.",
  stats = defaultStats,
  accent = "wine",
}: {
  eyebrow?: string;
  headlineStart?: string;
  headlineAccent?: string;
  body?: string;
  stats?: StatCard[];
  accent?: "wine" | "lilac";
}) {
  const accentClasses = {
    wine: "from-wine to-wine-light",
    lilac: "from-lilac-dark to-lilac",
  };

  return (
    <div className="w-full py-20 relative">
      <div className="text-center mb-12 px-4">
        <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/50 mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal mb-4 max-w-3xl mx-auto">
          {headlineStart}{" "}
          <span className={cn(
            "bg-gradient-to-b bg-clip-text text-transparent italic",
            accentClasses[accent]
          )}>
            {headlineAccent}
          </span>
        </h2>
        <p className="text-charcoal/60 max-w-xl mx-auto">{body}</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 mb-10">
        <div className="rounded-[24px] border border-warm-border bg-white/80 backdrop-blur-sm px-6 py-5 md:px-8 md:py-6 shadow-[0px_34px_21px_0px_rgba(28,25,23,0.04),0px_15px_15px_0px_rgba(28,25,23,0.06),0px_4px_8px_0px_rgba(28,25,23,0.05)]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-charcoal/45 mb-2">
            One client snapshot
          </p>
          <p className="font-serif text-2xl md:text-3xl text-charcoal leading-tight">
            Four missed calls. Two appointments recovered. One calmer front desk.
          </p>
          <p className="mt-3 text-sm text-charcoal/60 max-w-3xl">
            The point is not a flashy dashboard. It&apos;s that the right follow-up system turns quiet leaks into booked revenue without adding admin to your day.
          </p>
        </div>
      </div>

      <div
        style={{ zIndex: 10 }}
        className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className={cn(
              "relative p-6 rounded-xl border border-warm-border bg-cream/50 backdrop-blur-sm",
              "hover:shadow-xl transition-all duration-300",
              "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-12",
              accent === "wine"
                ? "before:bg-gradient-to-r before:from-wine before:to-wine-light"
                : "before:bg-gradient-to-r before:from-lilac-dark before:to-lilac",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
            )}
          >
            <BackgroundGrid className="absolute rounded-xl inset-0 z-0" />
            <div className="absolute z-0 inset-0 rounded-xl h-full bg-gradient-radial from-white/50 via-white/60 to-cream" />
            <div className="relative">
              <p className="text-[10px] font-mono uppercase tracking-widest text-charcoal/40 mb-2">
                {stat.label}
              </p>
              <h3 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-charcoal">
                {stat.value}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {stat.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const BackgroundGrid = ({ className }: { className?: string }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1 },
      });
    }
  }, [controls, inView]);

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, #E7DFD6 1px, transparent 1px),
          linear-gradient(to bottom, #E7DFD6 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        className="absolute w-full h-full"
      />
    </div>
  );
};
