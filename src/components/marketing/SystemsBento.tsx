import { systemsSection } from "@/content/services";
import { SectionShell } from "@/components/layout/SectionShell";

export function SystemsBento() {
  return (
    <SectionShell className="bg-[#FAF5F0]">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A1A] tracking-tight">
          {systemsSection.headline}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {systemsSection.systems.map((system) => (
          <div
            key={system.id}
            className={`rounded-2xl border p-6 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(31,26,26,0.07)] ${
              system.isNova
                ? "bg-white border-[#7C5CFC]/20 hover:border-[#7C5CFC]/40"
                : "bg-white border-[#EDE3DE] hover:border-[#6A2C3E]/20"
            }`}
          >
            <h3
              className={`text-base font-semibold ${
                system.isNova ? "text-[#7C5CFC]" : "text-[#1F1A1A]"
              }`}
            >
              {system.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6D6664]">
              {system.body}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
