"use client";

import Link from "next/link";
import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import { ProofBand } from "@/components/proof-band";
import { CaseStudy } from "@/components/case-study";
import { VerticalsSection } from "@/components/verticals-section";
import { SystemsSection } from "@/components/systems-section";
import { NovaSection } from "@/components/nova-section";
import { AboutSection } from "@/components/about-section";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* ─── HERO — Recognition ─── */}
      <section className="relative min-h-screen flex flex-col justify-center bg-cream px-6 md:px-12 lg:px-20 pt-20">
        <div className="mx-auto max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              <AnimateIn>
                <Overline>AI Automation for Local Businesses</Overline>
              </AnimateIn>

              <AnimateIn delay={0.1}>
                <Headline as="h1" size="hero" className="max-w-xl">
                  By the time you call back, they&apos;ve already booked
                  somewhere else.
                </Headline>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <p className="text-lg md:text-xl text-charcoal/60 leading-relaxed max-w-md">
                  One system change can recover the revenue your team is losing
                  every week to missed calls, slow follow-up, and forgotten
                  leads.
                </p>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center bg-wine text-cream text-sm tracking-wide px-8 py-4 rounded-full hover:bg-wine-light transition-colors"
                  >
                    Book Free Audit
                  </Link>
                  <Link
                    href="/systems"
                    className="inline-flex items-center justify-center border border-charcoal/15 text-charcoal text-sm tracking-wide px-8 py-4 rounded-full hover:border-charcoal/30 hover:bg-charcoal/3 transition-colors"
                  >
                    See How It Works
                  </Link>
                </div>
              </AnimateIn>
            </div>

            {/* Right: System proof visual — the communication bridge */}
            <AnimateIn delay={0.3} direction="left">
              <div className="relative">
                {/* Layered system artifact */}
                <div className="bg-white border border-charcoal/5 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-wine/10 flex items-center justify-center">
                          <span className="text-wine text-xs font-mono">N</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">Nova Assistant</p>
                          <p className="text-xs text-charcoal/40">Active now</p>
                        </div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>

                    {/* Status log */}
                    <div className="space-y-3 border-t border-charcoal/5 pt-5">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-charcoal/30 mt-0.5 shrink-0">
                          2:14 PM
                        </span>
                        <p className="text-sm text-charcoal/70">
                          New lead from Google — responded in{" "}
                          <span className="text-wine font-medium">8 seconds</span>
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-charcoal/30 mt-0.5 shrink-0">
                          2:15 PM
                        </span>
                        <p className="text-sm text-charcoal/70">
                          Appointment booked — Tuesday 3:00 PM
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-charcoal/30 mt-0.5 shrink-0">
                          2:15 PM
                        </span>
                        <p className="text-sm text-charcoal/70">
                          Confirmation sent via SMS + email
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10px] text-charcoal/30 mt-0.5 shrink-0">
                          2:16 PM
                        </span>
                        <p className="text-sm text-charcoal/70">
                          Team notified in Slack
                        </p>
                      </div>
                    </div>

                    {/* Bottom stat */}
                    <div className="border-t border-charcoal/5 pt-5 flex items-baseline gap-3">
                      <span className="font-mono text-3xl text-wine">$960</span>
                      <span className="text-sm text-charcoal/50">
                        recovered this week
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating accent — nostalgic bridge cue */}
                <div className="absolute -bottom-4 -left-4 bg-blush border border-wine/10 rounded-xl px-4 py-3 shadow-sm">
                  <p className="text-xs text-charcoal/50 italic">
                    &ldquo;Before this, I was calling back hours later — if at all.&rdquo;
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
            Scroll
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </section>

      {/* ─── PROOF BAND — Recognition → Tension ─── */}
      <Section variant="blush" className="py-16 md:py-24">
        <ProofBand />
      </Section>

      {/* ─── DARK INTERRUPTION — Tension ─── */}
      <Section variant="charcoal" className="py-32 md:py-44 lg:py-56">
        <div className="max-w-3xl">
          <AnimateIn>
            <Headline as="h2" size="hero" className="text-cream">
              Your marketing is working.
              <br />
              <span className="text-blush">Your response time isn&apos;t.</span>
            </Headline>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="mt-8 text-lg text-cream/50 leading-relaxed max-w-xl">
              Every hour a lead waits, the chance of conversion drops by 80%.
              You&apos;re paying to fill the top of the funnel — and watching it
              leak out the bottom.
            </p>
          </AnimateIn>
        </div>
      </Section>

      {/* ─── CASE STUDY — Proof ─── */}
      <Section variant="cream" id="proof">
        <CaseStudy />
      </Section>

      {/* ─── VERTICALS — Proof → Relief ─── */}
      <Section variant="cream" id="verticals">
        <div className="space-y-12">
          <div className="max-w-2xl">
            <AnimateIn>
              <Overline>Verticals</Overline>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <Headline as="h2" size="section" className="mt-4">
                Built for businesses where every missed call costs real money
              </Headline>
            </AnimateIn>
          </div>
          <VerticalsSection />
        </div>
      </Section>

      {/* ─── SYSTEMS — Relief ─── */}
      <Section variant="blush" id="systems">
        <div className="space-y-16">
          <div className="max-w-2xl">
            <AnimateIn>
              <Overline>The System</Overline>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <Headline as="h2" size="section" className="mt-4">
                From AI chaos to systems that run themselves
              </Headline>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="mt-6 text-charcoal/60 leading-relaxed max-w-xl">
                We used to reach people by picking up the phone.
                Now AI handles it — but only if the system is built right.
                We bridge the gap between how communication used to work and how
                AI makes it effortless.
              </p>
            </AnimateIn>
          </div>
          <SystemsSection />
          <AnimateIn>
            <Link
              href="/systems"
              className="inline-flex items-center justify-center bg-wine text-cream text-sm tracking-wide px-8 py-4 rounded-full hover:bg-wine-light transition-colors"
            >
              Explore Our Systems
            </Link>
          </AnimateIn>
        </div>
      </Section>

      {/* ─── NOVA — Relief ─── */}
      <Section variant="nova" id="nova">
        <NovaSection />
      </Section>

      {/* ─── ABOUT — Relief → Action ─── */}
      <Section variant="cream" id="about">
        <AboutSection />
      </Section>

      {/* ─── CLOSING CTA — Action ─── */}
      <Section variant="blush" className="text-center">
        <AnimateIn>
          <Headline as="h2" size="hero" className="max-w-2xl mx-auto">
            Let&apos;s find what&apos;s leaking.
          </Headline>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-6 text-lg text-charcoal/60 leading-relaxed max-w-lg mx-auto">
            In 30 minutes, we&apos;ll show you exactly where leads are slipping
            and what it&apos;s costing you. No pitch deck. No pressure.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.25}>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-wine text-cream text-sm tracking-wide px-10 py-4 rounded-full hover:bg-wine-light transition-colors"
            >
              Book Your Free Audit
            </Link>
          </div>
        </AnimateIn>
      </Section>
    </>
  );
}
