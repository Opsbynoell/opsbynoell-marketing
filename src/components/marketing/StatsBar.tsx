import { statsSection } from "@/content/home";

export function StatsBar() {
  return (
    <section className="bg-[#FFF7F4] border-y border-[#EDE3DE] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headlines */}
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1F1A1A] tracking-tight">
            {statsSection.headline}
          </h2>
          <p className="mt-1 text-sm text-[#6D6664]">{statsSection.supportingLine}</p>
        </div>

        {/* Stats grid */}
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {statsSection.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 rounded-2xl"
            >
              <dt className="font-display text-3xl md:text-4xl font-bold text-[#6A2C3E] tracking-tight">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#6D6664]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Closing line */}
        <p className="mt-8 text-center text-sm text-[#6D6664]">
          {statsSection.closingLine}
        </p>
      </div>
    </section>
  );
}
