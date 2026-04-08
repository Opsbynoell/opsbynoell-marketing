import { problemSection } from "@/content/home";
import { SectionShell } from "@/components/layout/SectionShell";

export function ProblemSection() {
  return (
    <SectionShell className="bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight">
            {problemSection.headline}
          </h2>
          <p className="mt-3 text-base text-[#6D6664] leading-relaxed">
            {problemSection.subhead}
          </p>
        </div>

        {/* Problem slides */}
        <ol className="flex flex-col gap-5">
          {problemSection.slides.map((slide, i) => (
            <li
              key={slide.title}
              className="flex gap-4 rounded-2xl border border-[#EDE3DE] bg-[#FAF5F0] p-6 hover:border-[#6A2C3E]/15 transition-colors"
            >
              {/* Number */}
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#F0E4E8] flex items-center justify-center text-xs font-bold text-[#6A2C3E]">
                {i + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-[#1F1A1A]">
                  {slide.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#6D6664]">
                  {slide.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Closing reframe */}
        <p className="mt-8 text-center text-sm font-medium text-[#1F1A1A] bg-[#F0E4E8] rounded-xl px-6 py-4 border border-[#6A2C3E]/10">
          {problemSection.closingLine}
        </p>
      </div>
    </SectionShell>
  );
}
