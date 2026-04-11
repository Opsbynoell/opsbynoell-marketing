import { cn } from "@/lib/utils";

const stats = [
  { number: "$960", label: "revenue recovered per week", timestamp: "Last 7 days" },
  { number: "4×", label: "review growth in 90 days", timestamp: "Since activation" },
  { number: "0", label: "no-shows after system launch", timestamp: "30-day average" },
  { number: "14", suffix: " days", label: "from audit to fully operational", timestamp: "Median client" },
];

export function ProofBand() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto px-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "relative p-6 rounded-xl border border-charcoal/8 bg-white/50 backdrop-blur-sm",
            "hover:shadow-lg transition-all duration-300",
            "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-12",
            "before:bg-gradient-to-r before:from-wine/60 before:to-wine/20"
          )}
        >
          <div className="relative">
            <span className="font-mono text-[9px] tracking-wider uppercase text-charcoal/25 block mb-3">
              {stat.timestamp}
            </span>
            <div className="font-mono text-4xl font-bold text-charcoal mb-2">
              {stat.number}
              {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
            </div>
            <p className="text-sm text-charcoal/45">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
