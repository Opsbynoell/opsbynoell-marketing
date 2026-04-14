import { LogoOptionEditorialSeal, LogoOptionMonogram, LogoOptionWordmark } from "@/components/logo-options";

const options = [
  {
    name: "Option A · Monogram Tile",
    description: "Clean, product-ready, and easiest to scale into nav, favicon, and internal app contexts.",
    component: <LogoOptionMonogram />,
  },
  {
    name: "Option B · Editorial Seal",
    description: "Most premium and branded. Best if you want the mark to feel more like a crafted house seal.",
    component: <LogoOptionEditorialSeal />,
  },
  {
    name: "Option C · Wordmark Block",
    description: "Boldest and most immediately distinct from a distance. Best if you want stronger first-glance recognition.",
    component: <LogoOptionWordmark />,
  },
];

function MockHeader({ logo }: { logo: React.ReactNode }) {
  return (
    <div className="rounded-[26px] border border-warm-border bg-cream/80 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.12)] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-warm-border bg-white/70">
        <div className="flex items-center gap-3">
          {logo}
          <span className="font-serif text-xl text-charcoal tracking-tight">Ops by Noell</span>
        </div>
        <div className="hidden md:flex items-center gap-5 text-sm text-charcoal/60">
          <span>Systems</span>
          <span>Verticals</span>
          <span>Noell</span>
          <span>Book</span>
        </div>
      </div>
      <div className="px-6 pt-10 pb-12 bg-gradient-to-t from-[rgba(107,45,62,0.45)] via-[rgba(240,224,214,0.72)] to-[rgba(250,246,241,1)] text-center">
        <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-4">Homepage first impression</p>
        <h2 className="font-serif text-4xl leading-tight text-charcoal max-w-3xl mx-auto">
          By the time you call back, <span className="italic text-wine">they&apos;ve already booked</span> somewhere else.
        </h2>
        <p className="mt-4 text-charcoal/60 max-w-xl mx-auto text-sm">
          The logo has to feel like it belongs in this exact visual world — not like it was dragged in from another brand system.
        </p>
      </div>
    </div>
  );
}

export default function LogoMockupsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-4">Logo mockups</p>
      <h1 className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-4">
        Logo directions in site context.
      </h1>
      <p className="text-charcoal/60 max-w-2xl mb-10">
        These are not random logo symbols. They are quick context mockups to judge which mark actually feels native to the website and premium enough to be the final tie bow.
      </p>

      <div className="space-y-8">
        {options.map((option) => (
          <section key={option.name} className="space-y-4">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">{option.name}</h2>
              <p className="text-sm text-charcoal/60 mt-1">{option.description}</p>
            </div>
            <MockHeader logo={option.component} />
          </section>
        ))}
      </div>
    </main>
  );
}
