export function ProofBand() {
  const stats = [
    {
      label: "The Revenue",
      value: "$960",
      detail: "recovered in 14 days",
      index: "01",
    },
    {
      label: "The Reviews",
      value: "40+",
      detail: "Google reviews doubled in 6 weeks",
      index: "02",
    },
    {
      label: "The Follow-Up",
      value: "<1",
      detail: "no-shows per week",
      index: "03",
    },
    {
      label: "The Speed",
      value: "14",
      detail: "days to get the system live",
      index: "04",
    },
  ];

  return (
    <section className="bg-cream-dark py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-wine mb-4">
            Real Outcomes
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            One system change can change the whole week.
          </h2>
          <p className="mt-4 text-warm-gray max-w-lg mx-auto">
            Real numbers from a real service business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.index}
              className="bg-white rounded-xl p-6 border border-warm-border/50 shadow-sm shadow-charcoal/[0.02] relative group"
            >
              <p className="text-[10px] font-mono text-warm-gray/50 mb-4">
                {stat.index} &middot; {stat.label}
              </p>
              <p className="font-serif text-5xl md:text-6xl font-bold text-wine leading-none">
                {stat.value}
              </p>
              <p className="mt-3 text-sm text-warm-gray leading-relaxed">
                {stat.detail}
              </p>
              <div className="absolute top-0 left-0 w-full h-0.5 bg-wine/10 group-hover:bg-wine/30 transition-colors rounded-t-xl" />
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-sm text-warm-gray italic">
          From one practice. 14 days. One system change.
        </p>
      </div>
    </section>
  );
}
