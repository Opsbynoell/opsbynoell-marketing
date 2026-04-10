"use client";

import Link from "next/link";
import { AnimateIn } from "./animate-in";
import { Headline } from "./headline";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <AnimateIn>
        <div className="space-y-8">
          <Headline as="h2" size="section">
            Built by operators,
            <br />
            not just developers.
          </Headline>
          <div className="space-y-4 text-charcoal/70 leading-relaxed max-w-lg">
            <p>
              Nikki and James built Ops by Noell after watching local business
              owners drown in the gap between great marketing and broken
              follow-through. The leads were coming in. The systems weren&apos;t
              keeping up.
            </p>
            <p>
              They&apos;ve spent years building the operational infrastructure that
              turns marketing spend into booked revenue — for med spas, home
              service companies, clinics, and professional firms across the
              country.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-sm text-wine hover:text-wine-light transition-colors group"
          >
            <span>Read our story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <div className="bg-blush/50 rounded-2xl aspect-[4/3] flex items-center justify-center">
          <div className="text-center space-y-3">
            <p className="font-serif italic text-2xl text-charcoal/40">
              Nikki &amp; James
            </p>
            <p className="font-mono text-xs tracking-[0.15em] uppercase text-charcoal/30">
              Founders, Ops by Noell
            </p>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
