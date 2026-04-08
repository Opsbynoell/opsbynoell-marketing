import type { Metadata } from "next";
import { DarkCtaBand } from "@/components/marketing/DarkCtaBand";
import { SectionShell } from "@/components/layout/SectionShell";
import { pageMetadata } from "@/lib/metadata";
import { founderStory, whyOpsSection, founderImageBlock, aboutDarkCta } from "@/content/about";

export const metadata: Metadata = pageMetadata.about;

export default function AboutPage() {
  return (
    <>
      {/* 1. Founder story */}
      <SectionShell className="bg-[#FFF7F4] border-b border-[#EDE3DE]">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-4">
            Our Story
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F1A1A] leading-tight">
            {founderStory.headline}
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#6D6664] leading-relaxed">
            {founderStory.subhead}
          </p>
          <div className="mt-6 flex flex-col gap-4 border-l-2 border-[#6A2C3E]/20 pl-5">
            {founderStory.paragraphs.map((para, i) => (
              <p key={i} className="text-base text-[#6D6664] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 2. Why Ops by Noell */}
      <SectionShell className="bg-[#FAF5F0]">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-3">
            Why Us
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight mb-8">
            {whyOpsSection.headline}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyOpsSection.cards.map((card, i) => (
              <div
                key={card.title}
                className={`rounded-2xl border border-[#EDE3DE] p-6 ${
                  i === 0 ? "bg-[#F0E4E8]" : "bg-white"
                }`}
              >
                <h3 className="text-base font-semibold text-[#1F1A1A]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6D6664]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* 3. Founder image placeholder — intentional until photography is available */}
      <SectionShell compact className="bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-[#FAF5F0] border border-[#EDE3DE] aspect-[16/7] flex items-center justify-center relative overflow-hidden">
            {/* Subtle decorative gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 60%, rgba(240,228,232,0.6) 0%, transparent 60%)",
              }}
            />
            {founderImageBlock.imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={founderImageBlock.imageSrc}
                alt={founderImageBlock.imageAlt}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center px-8 relative">
                <p className="text-sm font-semibold text-[#1F1A1A]">
                  {founderImageBlock.captionHeadline}
                </p>
                <p className="mt-1 text-xs text-[#6D6664] max-w-xs mx-auto">
                  {founderImageBlock.captionBody}
                </p>
              </div>
            )}
          </div>
        </div>
      </SectionShell>

      {/* 4. Dark CTA */}
      <DarkCtaBand
        headline={aboutDarkCta.headline}
        subhead={aboutDarkCta.subhead}
        primaryCta={aboutDarkCta.primaryCta}
      />
    </>
  );
}
