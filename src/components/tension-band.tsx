export function TensionBand() {
  const painPoints = [
    {
      title: "Missed calls become missed revenue",
      detail:
        "Someone finds you, calls you, gets no answer, and moves on before you ever have a chance to follow up.",
    },
    {
      title: "Follow-up slips when the day gets full",
      detail:
        "You mean to text them back, confirm the appointment, or ask for the review — but client work always comes first.",
    },
    {
      title: "No-shows are usually a system problem",
      detail:
        "If reminders are inconsistent and communication is reactive, no-shows stay high even when demand is strong.",
    },
  ];

  return (
    <section id="systems" className="bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/30 mb-4">
            The Real Problem
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight">
            Your marketing is working.{" "}
            <br className="hidden md:block" />
            Your response time isn&rsquo;t.
          </h2>
          <p className="mt-4 text-cream/50 max-w-lg mx-auto">
            The problem usually isn&rsquo;t demand. It&rsquo;s what happens
            after someone reaches out.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {painPoints.map((point) => (
            <div
              key={point.title}
              className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-wine" />
                <div>
                  <h3 className="text-lg font-semibold text-cream mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-cream/50 leading-relaxed">
                    {point.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-wine/20 border border-wine/30 rounded-xl px-6 py-4 text-center">
            <p className="text-sm text-cream/80">
              This isn&rsquo;t a marketing problem. It&rsquo;s an operations
              problem, and it&rsquo;s{" "}
              <span className="text-cream font-medium">
                fixable without hiring anyone.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
