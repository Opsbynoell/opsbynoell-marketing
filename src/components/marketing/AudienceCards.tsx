import { audienceSection } from "@/content/home";
import { SectionShell } from "@/components/layout/SectionShell";

export function AudienceCards() {
  return (
    <SectionShell className="bg-[#FAF5F0]">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight">
          {audienceSection.headline}
        </h2>
        <p className="mt-3 text-base text-[#6D6664] max-w-2xl mx-auto leading-relaxed">
          {audienceSection.subhead}
        </p>
      </div>

      {/* Bento-style grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {audienceSection.cards.map((card, i) => (
          <div
            key={card.title}
            className={`group rounded-2xl border border-[#EDE3DE] p-6 hover:border-[#6A2C3E]/20 hover:shadow-[0_4px_20px_rgba(106,44,62,0.06)] transition-all duration-200 ${
              i % 2 === 0 ? "bg-white" : "bg-[#FFF7F4]"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-2">
              Industry
            </p>
            <h3 className="text-base font-semibold text-[#1F1A1A]">
              {card.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6D6664]">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
