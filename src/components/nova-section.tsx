"use client";

import Link from "next/link";
import { AnimateIn } from "./animate-in";
import { Headline } from "./headline";
import { Sparkles } from "lucide-react";

export function NovaSection() {
  return (
    <div className="text-center space-y-10">
      <AnimateIn>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-cream/80">
          <Sparkles className="w-4 h-4" />
          <span>Powered by AI</span>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.1}>
        <Headline as="h2" size="section" className="text-cream max-w-3xl mx-auto">
          Meet Nova — your always-on
          <br />
          operations assistant
        </Headline>
      </AnimateIn>

      <AnimateIn delay={0.2}>
        <p className="text-lg text-cream/70 max-w-2xl mx-auto leading-relaxed">
          Nova answers inquiries, qualifies leads, books appointments, and
          handles follow-up — 24/7, in your brand voice. Like hiring the
          best front desk person who never sleeps.
        </p>
      </AnimateIn>

      <AnimateIn delay={0.3}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/nova"
            className="inline-flex items-center justify-center bg-cream text-nova-purple text-sm tracking-wide px-8 py-3.5 rounded-full hover:bg-white transition-colors"
          >
            Explore Nova
          </Link>
          <Link
            href="/book"
            className="inline-flex items-center justify-center border border-cream/30 text-cream text-sm tracking-wide px-8 py-3.5 rounded-full hover:bg-cream/10 transition-colors"
          >
            See It In Action
          </Link>
        </div>
      </AnimateIn>
    </div>
  );
}
