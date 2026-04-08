import { foundersSection } from "@/content/home";
import { SectionShell } from "@/components/layout/SectionShell";

export function FoundersSection() {
  return (
    <SectionShell className="bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-3">
            Who We Are
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight">
            {foundersSection.headline}
          </h2>
          <p className="mt-3 text-base text-[#6D6664] leading-relaxed max-w-2xl">
            {foundersSection.subhead}
          </p>
        </div>

        {/* Value cards — 2×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {foundersSection.valueCards.map((card, i) => (
            <div
              key={card.title}
              className={`rounded-2xl border border-[#EDE3DE] p-6 ${
                i === 0 ? "bg-[#F0E4E8]" : "bg-[#FAF5F0]"
              }`}
            >
              <h3 className="text-sm font-semibold text-[#1F1A1A]">
                {card.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6D6664]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
