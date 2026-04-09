import { problemSection } from "@/content/home";

export function ProblemSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-12 md:gap-16 items-start">

          {/* Left: Thesis statement */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6D6664] mb-4">
              The Real Problem
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#1F1A1A] leading-tight tracking-tight">
              {problemSection.headline}
            </h2>
            <div className="mt-5 w-8 h-0.5 bg-[#6A2C3E]" />
            <p className="mt-5 text-base text-[#6D6664] leading-relaxed">
              {problemSection.subhead}
            </p>
          </div>

          {/* Right: Bare problem statements with wine left-rule */}
          <div className="flex flex-col gap-8 md:pt-1">
            {problemSection.slides.map((slide, i) => (
              <div key={slide.title} className="flex gap-5">
                <div className="flex-shrink-0 w-px self-stretch bg-gradient-to-b from-[#6A2C3E]/40 via-[#6A2C3E]/20 to-transparent" />
                <div>
                  <span className="font-mono text-[9px] text-[#6A2C3E]/50 tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-[#1F1A1A]">
                    {slide.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#6D6664]">
                    {slide.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-[#EDE3DE]">
              <p className="text-sm font-semibold text-[#1F1A1A] leading-snug">
                {problemSection.closingLine}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
