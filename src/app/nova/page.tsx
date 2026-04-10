import { Section } from "@/components/section";
import { Headline } from "@/components/headline";
import { Overline } from "@/components/overline";
import { AnimateIn } from "@/components/animate-in";
import { NovaChatDemo } from "@/components/nova-chat-demo";
import Link from "next/link";
import { Sparkles, MessageSquare, Clock, Shield } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nova — Ops by Noell",
  description:
    "Meet Nova — your always-on AI operations assistant that answers inquiries, books appointments, and handles follow-up 24/7.",
};

const capabilities = [
  {
    icon: MessageSquare,
    title: "Answers inquiries instantly",
    description:
      "Nova responds to texts, emails, and web inquiries within seconds — in your brand voice. Leads never wait.",
  },
  {
    icon: Clock,
    title: "Books appointments 24/7",
    description:
      "After hours, weekends, holidays. Nova qualifies leads and books them directly into your calendar.",
  },
  {
    icon: Shield,
    title: "Qualifies before it connects",
    description:
      "Nova asks the right questions, filters out tire-kickers, and only sends qualified leads to your team.",
  },
  {
    icon: Sparkles,
    title: "Learns your business",
    description:
      "Trained on your services, pricing, and policies. Nova sounds like your best team member — because it knows what they know.",
  },
];

export default function NovaPage() {
  return (
    <>
      {/* Hero — purple world */}
      <Section variant="nova" className="pt-32 md:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <AnimateIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm text-cream/80">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Assistant</span>
              </div>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <Headline as="h1" size="hero" className="text-cream">
                Meet Nova.
              </Headline>
            </AnimateIn>
            <AnimateIn delay={0.15}>
              <p className="font-serif italic text-2xl text-cream/60">
                Your always-on operations assistant.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.2}>
              <p className="text-lg text-cream/50 leading-relaxed max-w-md">
                Nova answers inquiries, qualifies leads, books appointments,
                and handles follow-up — 24/7, in your brand voice. Like hiring
                the best front desk person who never sleeps, never forgets, and
                never puts a caller on hold.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center bg-cream text-nova-purple text-sm tracking-wide px-8 py-4 rounded-full hover:bg-white transition-colors"
                >
                  Get Nova for Your Business
                </Link>
              </div>
            </AnimateIn>
          </div>

          {/* Chat demo */}
          <AnimateIn delay={0.2} direction="left">
            <NovaChatDemo />
          </AnimateIn>
        </div>
      </Section>

      {/* Capabilities */}
      <Section variant="cream">
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <AnimateIn>
              <Overline className="text-nova-purple">What Nova Does</Overline>
            </AnimateIn>
            <AnimateIn delay={0.1}>
              <Headline as="h2" size="section" className="mt-4">
                Everything your front desk does — without the overhead
              </Headline>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {capabilities.map((cap, i) => (
              <AnimateIn key={cap.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-xl border border-charcoal/5 hover:border-nova-purple/15 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-nova-purple/10 flex items-center justify-center shrink-0">
                    <cap.icon className="w-5 h-5 text-nova-purple" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-lg text-charcoal">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section variant="blush">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center">
            <AnimateIn>
              <Headline as="h2" size="section">
                How Nova works
              </Headline>
            </AnimateIn>
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "We train Nova on your business",
                description:
                  "Your services, pricing, policies, and voice. Nova learns how you talk to clients — and mirrors it.",
              },
              {
                step: "02",
                title: "Nova goes live on your channels",
                description:
                  "Website chat, SMS, email, social DMs. Nova handles first contact, qualification, and booking on every channel.",
              },
              {
                step: "03",
                title: "Your team handles what matters",
                description:
                  "Nova routes qualified leads to your calendar and alerts your team when a human touch is needed. No busywork. Just the conversations that count.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.step} delay={i * 0.1}>
                <div className="grid grid-cols-[60px_1fr] gap-6 items-start">
                  <span className="font-mono text-2xl text-nova-purple/50">
                    {item.step}
                  </span>
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl text-charcoal">
                      {item.title}
                    </h3>
                    <p className="text-charcoal/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section variant="nova" className="text-center">
        <AnimateIn>
          <Headline as="h2" size="section" className="text-cream max-w-2xl mx-auto">
            Ready to stop losing leads after hours?
          </Headline>
        </AnimateIn>
        <AnimateIn delay={0.15}>
          <p className="mt-6 text-cream/50 leading-relaxed max-w-lg mx-auto">
            Nova can be live on your channels in 14 days. Let&apos;s talk about
            what it would look like for your business.
          </p>
        </AnimateIn>
        <AnimateIn delay={0.25}>
          <div className="mt-10">
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-cream text-nova-purple text-sm tracking-wide px-10 py-4 rounded-full hover:bg-white transition-colors"
            >
              Book Your Free Audit
            </Link>
          </div>
        </AnimateIn>
      </Section>
    </>
  );
}
