import type { Metadata } from "next";
import {
  IconBolt,
  IconListCheck,
  IconAddressBook,
  IconRoute,
  IconLink,
  IconUserCheck,
} from "@tabler/icons-react";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Features3 } from "@/components/features3";
import { FAQ } from "@/components/faq";
import CTA from "@/components/cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Noell Support — First-Response Product — Ops by Noell",
  description:
    "Noell Support handles first response, qualification, contact capture, routing, and booking-link handoff. It is the first-response product inside the Noell system, not the full front-desk layer.",
};

const supportStats = [
  { value: "<10s", label: "First response", detail: "average text or chat reply" },
  { value: "Name + phone", label: "Captured", detail: "before handoff or booking-link send" },
  { value: "1 thread", label: "Logged", detail: "so every lead has context attached" },
  { value: "24/7", label: "Coverage", detail: "for missed-call and site-chat windows" },
];

const supportCapabilities = [
  {
    icon: <IconBolt size={22} />,
    title: "First response",
    description:
      "When a call goes unanswered or a chat opens, Noell Support responds in under ten seconds with a warm, on-brand message.",
  },
  {
    icon: <IconListCheck size={22} />,
    title: "Qualification",
    description:
      "Noell Support asks the right questions — service type, timing, urgency — to understand what the prospect actually needs.",
  },
  {
    icon: <IconAddressBook size={22} />,
    title: "Contact capture",
    description:
      "Name, phone, email, service interest. Noell Support collects what you need and logs it straight into your system.",
  },
  {
    icon: <IconRoute size={22} />,
    title: "Routing",
    description:
      "Different service? Different location? Noell Support routes the conversation to the right person or workflow automatically.",
  },
  {
    icon: <IconLink size={22} />,
    title: "Booking-link handoff",
    description:
      "When the prospect is ready, Noell Support shares your scheduling link so they can book directly. No back-and-forth.",
  },
  {
    icon: <IconUserCheck size={22} />,
    title: "Human handoff",
    description:
      "Anything Noell Support cannot resolve escalates to you immediately with full context. You pick up right where the system left off.",
  },
];

const supportFaqs = [
  {
    question: "Is Noell Support a full AI receptionist?",
    answer:
      "No, and we're careful about that line. Noell Support is a first-response assistant. It handles the critical first minutes — responding, qualifying, capturing, routing, handing off. A full AI front desk is a separate product track.",
  },
  {
    question: "Where does Noell Support live?",
    answer:
      "Embedded on your website and wired into your missed-call recovery flow. The same first-response product handles chat and post-missed-call SMS replies.",
  },
  {
    question: "Can I customize what Noell Support says?",
    answer:
      "Yes. During install, we write the opening message, starter chips, qualification questions, and handoff copy in your voice. Updates are included in managed ops.",
  },
  {
    question: "What happens if Noell Support gets asked something unusual?",
    answer:
      "Noell Support escalates. Anything outside its scripted scope goes to you with full transcript and context. It does not make up answers. That is the entire point of honest positioning.",
  },
  {
    question: "How is this different from Noell Front Desk?",
    answer:
      "Noell Front Desk is a separate, deeper product track that handles calendar management, rescheduling, and more autonomous operation. It is not the same as Noell Support and we do not blur the two.",
  },
];

const supportScreen = (
  <div className="flex w-full flex-col items-stretch px-3">
    <div className="flex justify-between items-center w-full px-2 pb-2">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
        <span className="text-xs text-charcoal/70 font-medium">
          Noell Support · Live
        </span>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-charcoal/40">
        11:28 pm
      </span>
    </div>

    <div className="bg-white rounded-[18px] p-3 mx-1 border border-warm-border/60 shadow-sm mb-2">
      <p className="text-[9px] uppercase tracking-[0.18em] text-lilac-dark mb-2 font-medium">
        Missed call detected
      </p>
      <div className="flex items-center justify-between text-[10px] text-charcoal/55">
        <span>New prospect</span>
        <span>2 min ago</span>
      </div>
    </div>

    <div className="bg-white rounded-2xl rounded-bl-md p-3 mx-1 border border-warm-border/60 shadow-sm text-[11px] text-charcoal leading-snug">
      Hi — this is Noell Support. I saw you missed our call. Want help booking, or do you want to ask a quick question first?
    </div>

    <div className="flex justify-end mt-2 mx-1">
      <div className="bg-gradient-to-b from-lilac via-lilac-dark to-[#6b4f80] text-white rounded-2xl rounded-br-md p-3 text-[11px] leading-snug max-w-[78%] shadow-sm">
        I need a massage this week and usually call on my break.
      </div>
    </div>

    <div className="bg-white rounded-2xl rounded-bl-md p-3 mx-1 mt-2 border border-warm-border/60 shadow-sm text-[11px] text-charcoal leading-snug">
      Got it. Can I grab your name and best number so I can route this correctly and send the right booking link?
    </div>

    <div className="bg-lilac-light rounded-2xl p-2 mx-1 mt-2 border border-lilac-dark/20 text-center">
      <p className="text-[9px] uppercase tracking-widest text-lilac-dark font-medium">
        Contact captured · handoff ready
      </p>
    </div>
  </div>
);

export default function NoellSupportPage() {
  return (
    <div>
      <Hero
        variant="lilac"
        eyebrow="Noell Support · First-response product"
        headlineLine1Start="Your first"
        headlineLine1Accent="response."
        headlineLine2Start="Inside the"
        headlineLine2Accent="Noell system."
        body="Noell Support catches the leads you can&apos;t get to in the first critical minute. It replies instantly, asks the right questions, captures contact details, routes the conversation, and hands off cleanly to booking or your team."
        footnote="Noell Support is the first-response product. Noell Front Desk is the deeper front-desk automation layer."
        primaryCta={{ label: "Get Noell Support", href: "/book" }}
        secondaryCta={{ label: "See the workflow", href: "#capabilities" }}
        mockScreen={supportScreen}
      />

      {/* Response stats */}
      <Features
        eyebrow="What Noell Support catches"
        headlineStart="Every lead gets"
        headlineAccent="a response."
        body="The operating signals Noell Support is built to improve on a real install."
        stats={supportStats}
        accent="lilac"
      />

      {/* 6 capabilities */}
      <section id="capabilities" className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-lilac-dark mb-4">
              What Noell Support does
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal leading-tight">
              Six things,{" "}
              <span className="italic bg-gradient-to-b from-lilac-dark to-lilac bg-clip-text text-transparent">
                done well.
              </span>
            </h2>
            <p className="mt-5 text-charcoal/60 max-w-2xl mx-auto">
              Noell Support is intentionally narrow. It handles the critical first minutes of every lead — the part most businesses either miss entirely or handle inconsistently between appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportCapabilities.map((cap, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-[17px] border border-warm-border bg-white p-6",
                  "shadow-[0px_15px_15px_0px_rgba(28,25,23,0.04),0px_4px_8px_0px_rgba(28,25,23,0.04)]"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-lilac-dark/12 text-lilac-dark flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    {cap.icon}
                  </div>
                  <span className="text-[10px] font-mono text-charcoal/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-charcoal mb-1.5">
                  {cap.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Does / Does Not honesty band */}
      <section className="w-full max-w-7xl mx-auto rounded-3xl bg-charcoal px-6 py-20 md:py-28 my-10 md:my-16">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-lilac/60 mb-4">
            Honest positioning
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-cream leading-tight">
            First response,{" "}
            <span className="italic text-lilac">not full front desk.</span>
          </h2>
          <p className="mt-5 text-cream/50 max-w-xl mx-auto">
            Noell Support handles the first minutes. A complete AI front desk
            is a separate product track — and we'll tell you when it's ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Does */}
          <div className="rounded-[17px] border border-lilac-dark/30 bg-lilac-dark/10 p-6 md:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-lilac mb-4 font-semibold">
              Noell Support does
            </p>
            <ul className="space-y-3">
              {[
                "Instant first response",
                "Lead qualification",
                "Contact capture",
                "Smart routing",
                "Booking-link handoff",
                "Human escalation with context",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm text-cream flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-lilac" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Does Not */}
          <div className="rounded-[17px] border border-white/10 bg-white/[0.05] p-6 md:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-cream/40 mb-4 font-semibold">
              Noell Support does not
            </p>
            <ul className="space-y-3">
              {[
                "Manage your calendar",
                "Reschedule appointments",
                "Process payments",
                "Replace your staff",
                "Run fully autonomously",
                "Pretend to be Noell Front Desk",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm text-cream/50 flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cream/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-6 rounded-[17px] bg-lilac-dark/20 border border-lilac-dark/30 px-6 py-5 text-center">
          <p className="text-sm text-cream/85">
            <span className="font-semibold text-cream">Noell Front Desk</span> is
            a separate product track, not a marketing rebrand. If you need full
            front-desk automation, we'll tell you when it's live.
          </p>
        </div>
      </section>

      {/* Response workflow proof */}
      <section className="py-20 md:py-24 px-4">
        <div className="max-w-6xl mx-auto rounded-[30px] border border-warm-border bg-white shadow-[0px_61px_24px_0px_rgba(28,25,23,0.00),0px_34px_21px_0px_rgba(28,25,23,0.04),0px_15px_15px_0px_rgba(28,25,23,0.06),0px_4px_8px_0px_rgba(28,25,23,0.08)] overflow-hidden">
          <div className="px-8 pt-8 pb-6 border-b border-warm-border text-center">
            <p className="text-[11px] uppercase tracking-[0.24em] text-lilac-dark mb-3">
              What a real handoff looks like
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-charcoal leading-tight">
              From missed call to <span className="italic bg-gradient-to-b from-lilac-dark to-lilac bg-clip-text text-transparent">qualified lead.</span>
            </h2>
            <p className="mt-4 text-charcoal/60 max-w-2xl mx-auto">
              Noell Support is not magic. It follows a tight operational path that makes the first minute useful instead of lost.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
            <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-warm-border bg-cream/55">
              <div className="space-y-4">
                {[
                  ["01", "Missed call hits", "A prospect calls during an appointment and gets no answer."],
                  ["02", "Noell Support replies instantly", "A branded text or chat response goes out in under ten seconds."],
                  ["03", "Noell Support qualifies", "Service type, urgency, and contact details are captured before the lead cools off."],
                  ["04", "Right next step is sent", "Noell Support routes the thread to you or sends the correct booking link based on the workflow."],
                  ["05", "Human sees full context", "If the lead needs you, the transcript and captured details are already attached."],
                ].map(([num, title, detail]) => (
                  <div key={num} className="rounded-[18px] border border-warm-border bg-white px-5 py-4 shadow-sm">
                    <div className="flex items-start gap-4">
                      <span className="text-[10px] font-mono text-lilac-dark/70 mt-1">{num}</span>
                      <div>
                        <p className="text-sm font-semibold text-charcoal">{title}</p>
                        <p className="mt-1 text-sm text-charcoal/60 leading-relaxed">{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white">
              <div className="rounded-[22px] border border-lilac-dark/20 bg-gradient-to-br from-lilac-light/60 via-white to-white p-6">
                <p className="text-[11px] uppercase tracking-[0.22em] text-lilac-dark mb-4">
                  Noell Support watches for
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    "Missed calls",
                    "Website chats",
                    "After-hours leads",
                    "Service-specific routing",
                  ].map((item) => (
                    <div key={item} className="rounded-[14px] border border-warm-border bg-white px-4 py-3 text-sm text-charcoal/75 shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="rounded-[18px] bg-charcoal px-5 py-5 text-cream shadow-[0px_18px_22px_-18px_rgba(28,25,23,0.45)]">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-lilac/70 mb-2">
                    Honest product boundary
                  </p>
                  <p className="text-sm leading-relaxed text-cream/85">
                    Noell Support handles the first-response layer. Calendar management, reschedules, and deeper front-desk autonomy remain outside this product until Noell Front Desk is live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relief — what life looks like with Noell Support */}
      <Features3
        accent="lilac"
        eyebrow="What it feels like"
        headlineStart="You stop worrying"
        headlineAccent="about the phone."
        body="Noell Support runs in the background. You do the work in front of you. Leads still get caught."
        capabilities={[
          {
            icon: <IconBolt size={28} />,
            number: "01",
            title: "Never miss the first minute",
            description:
              "The moment someone reaches out, Noell Support is already talking to them. No more dead windows.",
            points: [
              "<10s response time",
              "Runs 24/7",
              "Missed-call and chat coverage",
            ],
          },
          {
            icon: <IconListCheck size={28} />,
            number: "02",
            title: "Qualified leads land on your phone",
            description:
              "Noell Support filters the noise and only hands you contacts who are actually ready to book or need you directly.",
            points: [
              "Service + urgency captured",
              "Contact info verified",
              "Full transcript included",
            ],
          },
          {
            icon: <IconUserCheck size={28} />,
            number: "03",
            title: "Nothing slips through",
            description:
              "Every lead is logged. Every handoff is recorded. Nothing gets lost between someone reaching out and you hearing about it.",
            points: [
              "Audit trail for every lead",
              "Routing rules per vertical",
              "Managed + monitored by us",
            ],
          },
        ]}
      />

      <FAQ
        accent="lilac"
        eyebrow="Noell Support questions"
        headlineStart="Honest"
        headlineAccent="answers about Noell Support."
        body="What people ask before they install the first-response product inside the Noell system."
        faqs={supportFaqs}
      />

      <CTA
        accent="lilac"
        eyebrow="Noell system"
        headlineStart="Start with Noell Support."
        headlineAccent="Grow into Noell Front Desk."
        body="Book a free audit and we&apos;ll show you exactly how Noell Support fits your current missed-call and site-chat flow — and whether you should also move toward Noell Front Desk."
        primaryCta={{ label: "Book Your Free Audit", href: "/book" }}
        secondaryCta={{ label: "Back to home", href: "/" }}
        trustLine="Free audit · No contracts · Installed in 14 days"
      />
    </div>
  );
}
