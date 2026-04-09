import { statsSection } from "@/content/home";

// Context refs per stat
const statContext = [
  { ref: "case · santa_m",     window: "14d window" },
  { ref: "google · verified",  window: "8wk window" },
  { ref: "avg · post-deploy",  window: "ongoing"    },
  { ref: "audit → live",       window: "avg deploy" },
];

export function StatsBar() {
  return (
    <section className="bg-[#1F1A1A] py-14 md:py-20 relative grain-overlay overflow-hidden">
      {/* Wine glow from top */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[52rem] h-56 opacity-[0.09]"
        style={{ background: "radial-gradient(ellipse, #6A2C3E 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#6D6664] mb-2">
            Real Outcomes
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
            {statsSection.headline}
          </h2>
          <p className="mt-1 text-sm text-[#6D6664]">{statsSection.supportingLine}</p>
        </div>

        {/* Bento stats grid — dark chrome */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {statsSection.stats.map((stat, i) => {
            const ctx = statContext[i];
            const isFeatured = i === 0;
            return (
              <div
                key={stat.label}
                className={`rounded-[0.875rem] overflow-hidden flex flex-col ${
                  isFeatured ? "md:col-span-2 border border-[#6A2C3E]/25" : "border border-[#2A2020]"
                }`}
                style={{
                  background: isFeatured ? "#2A1820" : "#1A1616",
                  boxShadow: isFeatured
                    ? "0 2px 24px rgba(106,44,62,0.18)"
                    : "0 2px 8px rgba(0,0,0,0.25)",
                }}
              >
                {/* Metric window bar */}
                <div
                  className="flex items-center gap-1.5 px-3.5 py-2 border-b border-[#2A2020]"
                  style={{ background: "#171415" }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#6A2C3E]/50" />
                  <span className="w-2 h-2 rounded-full bg-[#2A2020]" />
                  <span className="w-2 h-2 rounded-full bg-[#2A2020]" />
                  <span className="ml-1 font-mono text-[9px] text-[#6D6664] tracking-widest">
                    {ctx.window}
                  </span>
                </div>

                {/* Value */}
                <div
                  className={`flex flex-col flex-1 ${
                    isFeatured ? "p-6 md:p-8" : "p-5 items-center text-center"
                  }`}
                >
                  <dt
                    className={`font-display font-bold leading-none tabular-nums ${
                      isFeatured
                        ? "text-6xl md:text-8xl text-white"
                        : "text-3xl md:text-4xl text-[#E8D0D6]"
                    }`}
                  >
                    {stat.value}
                  </dt>
                  <dd className="mt-3 text-[10px] font-semibold uppercase tracking-widest text-[#6D6664]">
                    {stat.label}
                  </dd>
                  <span className="font-mono text-[9px] text-[#6D6664]/50 mt-2 tracking-wide block">
                    {ctx.ref}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing line */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="block h-px w-8 bg-[#2A2020]" />
          <p className="font-mono text-[11px] text-[#6D6664] text-center">
            {statsSection.closingLine}
          </p>
          <span className="block h-px w-8 bg-[#2A2020]" />
        </div>
      </div>
    </section>
  );
}
