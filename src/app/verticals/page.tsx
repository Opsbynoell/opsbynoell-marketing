import Link from "next/link";

const verticals = [
  {
    title: "Med Spas",
    href: "/verticals/med-spas",
    note: "Premium consult-conversion page built for aesthetic traffic.",
  },
  {
    title: "Salons",
    href: "/verticals/salons",
    note: "Sharper booking and rebooking path for high-chair-utilization teams.",
  },
  {
    title: "Massage Therapy",
    href: "/verticals/massage",
    note: "Calm, trust-first booking flow for solo and lean practices.",
  },
  {
    title: "Dental Offices",
    href: "/verticals/dental",
    note: "Trust-first scheduling page for callback and reminder-sensitive patient traffic.",
  },
  {
    title: "HVAC",
    href: "/verticals/hvac",
    note: "More grounded, urgent-call page for service-led traffic.",
  },
  {
    title: "Home Services",
    href: "/verticals/home-services",
    note: "Broader service-business landing page for estimates, callbacks, and booked jobs.",
  },
  {
    title: "Pool Services",
    href: "/verticals/pool-services",
    note: "Recurring-service, review, and reactivation-focused landing page.",
  },
  {
    title: "Estheticians",
    href: "/verticals/estheticians",
    note: "Premium but practical page for solo or small skin-focused businesses.",
  },
];

export default function VerticalsHubPage() {
  return (
    <div>
      <section className="relative flex max-w-7xl rounded-b-3xl my-2 md:my-20 mx-auto flex-col items-center justify-center overflow-hidden px-4 md:px-8 pt-32 pb-20 bg-gradient-to-t from-[rgba(107,45,62,0.46)] via-[rgba(240,224,214,0.72)] to-[rgba(250,246,241,1)]">
        <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/60 mb-6 text-center">
          Verticals
        </p>
        <h1 className="max-w-5xl text-center font-serif text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-charcoal leading-[0.98]">
          One brand world. <span className="italic bg-gradient-to-b from-wine-light to-wine bg-clip-text text-transparent">Different landing pages</span> for different traffic.
        </h1>
        <p className="mt-6 max-w-2xl text-center text-charcoal/70 text-base md:text-lg leading-relaxed">
          Ads should land on pages that sound like the business they clicked on. This is the vertical system for Ops by Noell.
        </p>
      </section>

      <section className="py-16 md:py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {verticals.map((vertical) => (
            <Link
              key={vertical.href}
              href={vertical.href}
              className="rounded-[24px] border border-warm-border bg-white p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.1)] hover:bg-cream/70 transition-colors"
            >
              <p className="text-lg font-semibold text-charcoal mb-2">{vertical.title}</p>
              <p className="text-sm text-charcoal/60 leading-relaxed">{vertical.note}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
