import type { Metadata } from "next";
import { BookingEmbed } from "@/components/marketing/BookingEmbed";
import { ReassuranceCards } from "@/components/marketing/ReassuranceCards";
import { SectionShell } from "@/components/layout/SectionShell";
import { pageMetadata } from "@/lib/metadata";
import { reassuranceIntro } from "@/content/book";

export const metadata: Metadata = pageMetadata.book;

export default function BookPage() {
  return (
    <>
      {/* 1. Reassurance intro — reduce vulnerability before the calendar */}
      <SectionShell compact className="bg-[#FFF7F4] border-b border-[#EDE3DE]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-4">
            Free Audit
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#1F1A1A] leading-tight">
            {reassuranceIntro.headline}
          </h1>
          <p className="mt-4 text-base md:text-lg text-[#6D6664] leading-relaxed">
            {reassuranceIntro.subhead}
          </p>
          <p className="mt-3 text-sm font-medium text-[#6A2C3E]">
            {reassuranceIntro.reassuranceLine}
          </p>
          <p className="mt-1 text-sm text-[#6D6664]">
            {reassuranceIntro.trustLine}
          </p>
        </div>
      </SectionShell>

      {/* 2. Calendar embed — dominant action, no distractions */}
      <BookingEmbed />

      {/* 3. Reassurance cards — remove final objections */}
      <ReassuranceCards />
    </>
  );
}
