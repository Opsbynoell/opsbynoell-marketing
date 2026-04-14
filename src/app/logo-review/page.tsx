import { LogoOptionEditorialSeal, LogoOptionMonogram, LogoOptionWordmark } from "@/components/logo-options";

const options = [
  {
    name: "Option A · Monogram Tile",
    description: "Cleanest and most product-ready. Strong for nav, favicon, and app contexts.",
    component: <LogoOptionMonogram />,
  },
  {
    name: "Option B · Editorial Seal",
    description: "Most premium and authored. Best if you want the logo to feel more like a crafted brand seal.",
    component: <LogoOptionEditorialSeal />,
  },
  {
    name: "Option C · Wordmark Block",
    description: "Most distinct from a first-glance perspective. Feels slightly bolder and more modern.",
    component: <LogoOptionWordmark />,
  },
];

export default function LogoReviewPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 pt-32 pb-20">
      <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-4">Logo review</p>
      <h1 className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-4">
        Three logo directions for Ops by Noell.
      </h1>
      <p className="text-charcoal/60 max-w-2xl mb-10">
        These are designed to fit the existing website palette and typography so the mark feels native to the site instead of bolted on.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {options.map((option) => (
          <div key={option.name} className="rounded-[24px] border border-warm-border bg-white p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.12)]">
            <div className="h-32 rounded-[20px] bg-cream/70 border border-warm-border flex items-center justify-center mb-5">
              {option.component}
            </div>
            <h2 className="font-serif text-2xl text-charcoal mb-2">{option.name}</h2>
            <p className="text-sm text-charcoal/60 leading-relaxed">{option.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
