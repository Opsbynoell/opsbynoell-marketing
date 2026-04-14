"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { IconAlertCircle, IconClockHour4, IconPhoneOff } from "@tabler/icons-react";

interface PainPoint {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const defaultPainPoints: PainPoint[] = [
  {
    icon: <IconPhoneOff size={22} />,
    title: "Missed calls become missed revenue",
    description:
      "Someone finds you, calls you, gets no answer, and moves on before you ever have a chance to follow up.",
  },
  {
    icon: <IconClockHour4 size={22} />,
    title: "Follow-up slips when the day gets full",
    description:
      "You mean to text them back, confirm the appointment, or ask for the review — but client work always comes first.",
  },
  {
    icon: <IconAlertCircle size={22} />,
    title: "No-shows are usually a system problem",
    description:
      "If reminders are inconsistent and communication is reactive, no-shows stay high even when demand is strong.",
  },
];

export function Features2({
  eyebrow = "The real problem",
  headlineStart = "Your marketing is working.",
  headlineAccent = "Your response time isn't.",
  body = "The problem usually isn't demand. It's what happens after someone reaches out.",
  painPoints = defaultPainPoints,
  closingLine = "This isn't a marketing problem. It's an operations problem, and it's fixable without hiring anyone.",
}: {
  eyebrow?: string;
  headlineStart?: string;
  headlineAccent?: string;
  body?: string;
  painPoints?: PainPoint[];
  closingLine?: string;
}) {
  return (
    <section
      id="systems"
      className="w-full max-w-7xl mx-auto rounded-3xl bg-charcoal px-6 py-16 md:py-20 my-10 md:my-16"
    >
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <p className="text-[11px] uppercase tracking-[0.25em] text-cream/40 mb-4">
          {eyebrow}
        </p>
        <h2 className="font-serif text-4xl md:text-6xl font-semibold text-cream leading-[1.02] tracking-tight">
          {headlineStart}{" "}
          <span className="italic text-wine-light">{headlineAccent}</span>
        </h2>
        <p className="mt-6 text-cream/55 max-w-2xl mx-auto text-base leading-relaxed">{body}</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-3">
        {painPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "rounded-[17px] border border-white/[0.08] bg-white/[0.04]",
              "p-6 md:p-7",
              "hover:bg-white/[0.06] transition-colors"
            )}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-wine/30 text-wine-light flex items-center justify-center">
                {point.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-cream mb-1.5">
                  {point.title}
                </h3>
                <p className="text-[15px] text-cream/55 leading-relaxed max-w-2xl">
                  {point.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-6 grid md:grid-cols-[1fr_auto] gap-4 items-center">
        <div className="rounded-[17px] bg-wine/25 border border-wine/35 px-6 py-5 text-center md:text-left">
          <p className="text-sm text-cream">
            {closingLine.split(/(fixable without hiring anyone\.)/).map((part, i) =>
              part === "fixable without hiring anyone." ? (
                <span key={i} className="font-semibold text-cream">
                  {part}
                </span>
              ) : (
                <span key={i} className="text-cream/80">
                  {part}
                </span>
              )
            )}
          </p>
        </div>
        <div className="rounded-[17px] border border-white/10 bg-white/[0.05] px-5 py-4 text-center min-w-[180px]">
          <p className="text-[10px] uppercase tracking-[0.22em] text-cream/45 mb-1">What it costs</p>
          <p className="font-serif text-3xl text-cream leading-none">Minutes</p>
          <p className="mt-2 text-xs text-cream/55">to fix what currently leaks all week</p>
        </div>
      </div>
    </section>
  );
}
