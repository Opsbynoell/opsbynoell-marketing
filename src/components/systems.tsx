import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconBolt, IconPhoneCall, IconHeartHandshake } from "@tabler/icons-react";

interface AgentCard {
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const agents: AgentCard[] = [
  {
    title: "Noell Support",
    eyebrow: "New prospect intake",
    description:
      "Website chat, lead qualification, contact capture, and triage to booking or your team.",
    href: "/noell-support",
    icon: <IconBolt size={22} />,
  },
  {
    title: "Noell Front Desk",
    eyebrow: "Operations layer",
    description:
      "Calls, scheduling, reminders, confirmations, reschedules, review capture, reactivation, and everything a receptionist handles.",
    href: "/noell-front-desk",
    icon: <IconPhoneCall size={22} />,
  },
  {
    title: "Noell Care",
    eyebrow: "Existing client support",
    description:
      "Rebooking, service questions, account help, and support for clients already in your system. Keeps your front desk clear for new business.",
    href: "/#systems",
    icon: <IconHeartHandshake size={22} />,
  },
];

export function Systems() {
  return (
    <section id="systems" className="w-full py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-wine mb-4">
            The Noell system
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal leading-tight">
            Three agents. One system.{" "}
            <span className="italic bg-gradient-to-b from-wine to-wine-light bg-clip-text text-transparent">
              Built for your vertical.
            </span>
          </h2>
          <p className="mt-5 text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            The Noell system covers your entire client lifecycle. Noell Support
            catches new prospects. Noell Front Desk runs your operations. Noell
            Care takes care of your existing clients. Start with the layer you
            need, expand when you are ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <Link
              key={index}
              href={agent.href}
              className={cn(
                "group relative rounded-[22px] border border-warm-border bg-white",
                "p-7 md:p-8 transition-all duration-200",
                "shadow-[0px_34px_21px_0px_rgba(28,25,23,0.04),0px_15px_15px_0px_rgba(28,25,23,0.06),0px_4px_8px_0px_rgba(28,25,23,0.05)]",
                "hover:-translate-y-1 hover:shadow-[0px_44px_24px_0px_rgba(28,25,23,0.06),0px_18px_18px_0px_rgba(28,25,23,0.08),0px_6px_10px_0px_rgba(28,25,23,0.06)]"
              )}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-wine/10 text-wine flex items-center justify-center">
                  {agent.icon}
                </div>
                <span className="text-[10px] font-mono text-charcoal/30">
                  0{index + 1}
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-wine/70 mb-2">
                {agent.eyebrow}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-charcoal mb-3">
                {agent.title}
              </h3>
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {agent.description}
              </p>
              <p className="mt-6 text-xs text-wine font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                Learn more &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
