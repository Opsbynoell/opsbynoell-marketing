"use client";
import { IconCheck, IconQuote } from "@tabler/icons-react";
import { motion } from "motion/react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const defaultFeatures = [
  "Massage: dropped no-shows from 4/week to less than 1",
  "Med Spa: faster consult follow-up while the lead is still warm",
  "Home Services: after-hours leads captured instead of lost to the next company",
];

const orbitingNodes = [
  { initials: "AM", label: "⭐️⭐️⭐️⭐️⭐️", role: "Esthetician" },
  { initials: "JR", label: "⭐️⭐️⭐️⭐️⭐️", role: "Massage" },
  { initials: "LN", label: "⭐️⭐️⭐️⭐️⭐️", role: "Med Spa" },
  { initials: "SM", label: "⭐️⭐️⭐️⭐️⭐️", role: "Salon" },
  { initials: "DK", label: "⭐️⭐️⭐️⭐️⭐️", role: "Dental" },
  { initials: "TH", label: "⭐️⭐️⭐️⭐️⭐️", role: "Studio" },
];

export function Testimonials({
  accent = "wine",
}: {
  accent?: "wine" | "lilac";
}) {
  const accentBg = accent === "wine" ? "bg-wine/10" : "bg-lilac-dark/10";
  const accentText = accent === "wine" ? "text-wine" : "text-lilac-dark";
  const accentSolid = accent === "wine" ? "bg-wine" : "bg-lilac-dark";
  const accentGrad =
    accent === "wine"
      ? "from-wine to-wine-light"
      : "from-lilac-dark to-lilac";

  return (
    <section className="relative w-full py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-7">
            <p
              className={cn(
                "text-[11px] uppercase tracking-[0.25em]",
                accentText
              )}
            >
              Proof
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal leading-tight">
              4 no-shows a week.{" "}
              <span
                className={cn(
                  "bg-gradient-to-b bg-clip-text text-transparent italic",
                  accentGrad
                )}
              >
                Then almost none.
              </span>
            </h2>

            <div className={cn("rounded-[22px] p-6 relative", accentBg)}>
              <IconQuote
                className={cn("absolute top-4 right-4 opacity-20", accentText)}
                size={32}
              />
              <p className="text-charcoal/80 leading-relaxed italic">
                “I thought my booking flow was fine. The audit showed me three places I was losing people every single week — and once the system was live, the difference was immediate.”
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white",
                    accentSolid
                  )}
                >
                  SE
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">Santa E.</p>
                  <p className="text-xs text-charcoal/50">
Massage therapist · Client story
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {defaultFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      accentBg
                    )}
                  >
                    <IconCheck
                      className={cn("w-3 h-3", accentText)}
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-charcoal/80">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              href="/book"
              variant={accent === "lilac" ? "lilac" : "primary"}
              className="px-6 py-3"
            >
              Book your free audit
            </Button>
          </div>

          {/* Right — clearer proof cluster */}
          <div className="grid grid-cols-2 gap-4 md:gap-5 items-stretch">
            {[
              ["Massage", "4 → <1", "No-shows / week"],
              ["Med Spa", "<5 min", "Consult follow-up"],
              ["HVAC", "After-hours", "Lead captured"],
              ["Reviews", "40+", "in 8 weeks"],
            ].map(([label, value, detail], i) => (
              <div
                key={i}
                className="rounded-[22px] border border-warm-border bg-white p-5 md:p-6 shadow-[0px_34px_21px_0px_rgba(28,25,23,0.04),0px_15px_15px_0px_rgba(28,25,23,0.06),0px_4px_8px_0px_rgba(28,25,23,0.05)]"
              >
                <p className={cn("text-[10px] uppercase tracking-[0.2em] mb-2", accentText)}>{label}</p>
                <p className="font-serif text-3xl md:text-4xl text-charcoal leading-none">{value}</p>
                <p className="mt-2 text-sm text-charcoal/55">{detail}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-[22px] border border-warm-border bg-gradient-to-r from-cream to-white p-5 md:p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.12)]">
              <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/45 mb-2">What changed</p>
              <p className="text-sm md:text-base text-charcoal/70 leading-relaxed">
                Different verticals leak revenue in different places. The system works because the response, reminders, and follow-through are tuned to the business model instead of forced into one generic flow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OrbitingIcons({
  centerNode,
  nodes,
  radius = 190,
  speed = 28,
}: {
  centerNode: React.ReactNode;
  nodes: React.ReactNode[];
  radius?: number;
  speed?: number;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center */}
      <div className="absolute z-20">{centerNode}</div>

      {/* Orbital ring */}
      <div
        className="absolute rounded-full border border-warm-border/50"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Orbiting nodes */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * 2 * Math.PI;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {node}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
