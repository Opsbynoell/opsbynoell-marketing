"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/constants";
import { heroSection } from "@/content/home";

// ─── Communication-era chat mockup ─────────────────────────────────────────────
function ChatMockup() {
  return (
    <div className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Phone-chrome outer shell */}
      <div className="relative rounded-[2.25rem] bg-[#1F1A1A] p-[3px] shadow-[0_24px_64px_rgba(31,26,26,0.18),0_4px_12px_rgba(31,26,26,0.12)]">
        {/* Screen */}
        <div className="rounded-[2rem] bg-[#FAF5F0] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-2">
            <span className="text-[10px] font-semibold text-[#1F1A1A]">9:41</span>
            <div className="flex gap-1">
              <span className="block w-3 h-1.5 rounded-sm bg-[#1F1A1A]" />
              <span className="block w-3 h-1.5 rounded-sm bg-[#1F1A1A]/40" />
            </div>
          </div>

          {/* Chat header */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-[#EDE3DE] bg-white">
            <div className="w-7 h-7 rounded-full bg-[#F0E4E8] flex items-center justify-center">
              <span className="text-[10px] font-semibold text-[#6A2C3E]">OBN</span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#1F1A1A]">Ops by Noell</p>
              <p className="text-[9px] text-[#6D6664]">Automated · responds instantly</p>
            </div>
          </div>

          {/* Chat messages */}
          <div className="px-3 py-4 flex flex-col gap-3 min-h-[220px] bg-[#FAF5F0]">
            {/* System trigger */}
            <div className="flex justify-center">
              <span className="text-[9px] text-[#6D6664] bg-[#EDE3DE] rounded-full px-2.5 py-0.5">
                Missed call from unknown
              </span>
            </div>

            {/* Auto-response */}
            <div className="flex justify-start">
              <div className="max-w-[78%] bubble-received px-3 py-2">
                <p className="text-[11px] leading-snug text-[#1F1A1A]">
                  Hi! You just called — I'm with a client but didn't want you to wait. How can I help?
                </p>
                <p className="text-[8px] text-[#6D6664] mt-1">Just now</p>
              </div>
            </div>

            {/* Lead replies */}
            <div className="flex justify-end">
              <div className="max-w-[72%] bubble-sent px-3 py-2">
                <p className="text-[11px] leading-snug text-white">
                  I wanted to book a massage for Saturday
                </p>
              </div>
            </div>

            {/* Follow-up */}
            <div className="flex justify-start">
              <div className="max-w-[78%] bubble-received px-3 py-2">
                <p className="text-[11px] leading-snug text-[#1F1A1A]">
                  Saturday works! I have 11am and 2pm open. Which would you prefer?
                </p>
                <p className="text-[8px] text-[#6D6664] mt-1">Instant</p>
              </div>
            </div>

            {/* Result badge */}
            <div className="flex justify-center mt-1">
              <span className="text-[9px] font-semibold text-[#6A2C3E] bg-[#F0E4E8] rounded-full px-3 py-1">
                ✓ Lead captured · booking confirmed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat card — polaroid-style */}
      <motion.div
        initial={{ opacity: 0, y: 12, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -2 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="polaroid absolute -bottom-6 -left-6 w-32 text-center"
        aria-hidden
      >
        <p className="text-2xl font-bold text-[#6A2C3E]">$960</p>
        <p className="text-[9px] text-[#6D6664] leading-tight mt-0.5">recovered in<br />14 days</p>
      </motion.div>

      {/* Floating review badge */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute -top-3 -right-4 bg-white border border-[#EDE3DE] rounded-2xl px-3 py-2 shadow-sm"
        aria-hidden
      >
        <div className="flex items-center gap-1">
          <span className="text-[10px]">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="text-[9px] text-[#6D6664] mt-0.5">+40 reviews · 8 weeks</p>
      </motion.div>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-28 lg:py-32 hero-texture"
      style={{
        background: "linear-gradient(135deg, #FFF0F5 0%, #EDE5FF 100%)",
      }}
    >
      {/* Subtle decorative orbs */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #E0D4E8 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #F0E4E8 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-5"
            >
              {heroSection.eyebrow}
            </motion.p>

            {/* Headline — editorial serif */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] text-[#1F1A1A]"
            >
              {heroSection.headline}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-6 text-base md:text-lg leading-relaxed text-[#6D6664] max-w-xl mx-auto lg:mx-0"
            >
              {heroSection.subhead}
            </motion.p>

            {/* Specificity line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-3 text-sm text-[#6D6664]/80"
            >
              {heroSection.specificityLine}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26 }}
              className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <Link
                href={ROUTES.book}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#6A2C3E] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#5a2233] transition-colors shadow-[0_2px_12px_rgba(106,44,62,0.25)]"
              >
                {heroSection.primaryCta}
              </Link>
              <Link
                href={ROUTES.systems}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#EDE3DE] bg-white/60 px-7 py-3.5 text-sm font-semibold text-[#1F1A1A] hover:border-[#6A2C3E]/40 hover:bg-white transition-all"
              >
                {heroSection.secondaryCta}
              </Link>
            </motion.div>

            {/* Micro-proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-5 text-xs text-[#6D6664]"
            >
              {heroSection.microProof}
            </motion.p>
          </div>

          {/* Right: Chat mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex justify-center lg:justify-end pb-8 lg:pb-0"
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
