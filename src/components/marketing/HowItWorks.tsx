import { howItWorksSection } from "@/content/services";
import { SectionShell } from "@/components/layout/SectionShell";

export function HowItWorks() {
  return (
    <SectionShell className="bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-3">
            Process
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight">
            {howItWorksSection.headline}
          </h2>
        </div>

        <ol className="flex flex-col gap-0">
          {howItWorksSection.steps.map((step, i) => (
            <li key={step.number} className="flex gap-5 items-start relative">
              {/* Vertical connector line */}
              {i < howItWorksSection.steps.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-gradient-to-b from-[#EDE3DE] to-transparent" />
              )}
              {/* Step number */}
              <span className="relative flex-shrink-0 w-10 h-10 rounded-full border border-[#EDE3DE] bg-[#F0E4E8] flex items-center justify-center text-sm font-bold text-[#6A2C3E] z-10">
                {step.number}
              </span>
              <div className="pt-1.5 pb-8">
                <h3 className="text-base font-semibold text-[#1F1A1A]">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#6D6664]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="text-center text-sm font-medium text-[#6D6664] bg-[#FAF5F0] rounded-xl px-6 py-4 border border-[#EDE3DE]">
          {howItWorksSection.supportingLine}
        </p>
      </div>
    </SectionShell>
  );
}
