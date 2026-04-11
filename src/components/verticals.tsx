import Link from "next/link";

const verticals = [
  {
    name: "Massage Therapists",
    description:
      "Solo practitioners losing clients between sessions. We build the follow-up system so you never lose a rebooking.",
    icon: "01",
  },
  {
    name: "Med Spas",
    description:
      "High-ticket services with complex booking flows. Automated intake, reminders, and review collection built for your protocols.",
    icon: "02",
  },
  {
    name: "Salons & Studios",
    description:
      "Chair-side all day, no time to chase clients. Your system handles cancellations, waitlists, and rebooking automatically.",
    icon: "03",
  },
  {
    name: "Dental Offices",
    description:
      "Missed calls during procedures cost thousands. Instant response and automated recall systems keep chairs filled.",
    icon: "04",
  },
  {
    name: "Estheticians",
    description:
      "Building a client base one facial at a time. Automated follow-up turns one-time visits into recurring revenue.",
    icon: "05",
  },
  {
    name: "Service Businesses",
    description:
      "Any service business where a missed call means missed revenue. If your calendar is your lifeline, we can help.",
    icon: "06",
  },
];

export function Verticals() {
  return (
    <section id="verticals" className="bg-blush-light py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-wine mb-4">
            Built For Your World
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight">
            Systems designed for how you actually work.
          </h2>
          <p className="mt-4 text-warm-gray">
            Every vertical gets the same operational backbone, customized for
            the way your specific business runs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {verticals.map((v) => (
            <div
              key={v.name}
              className="bg-cream border border-warm-border/50 rounded-xl p-7 hover:shadow-md hover:shadow-charcoal/[0.03] transition-all group"
            >
              <p className="text-[10px] font-mono text-warm-gray/40 mb-4">
                {v.icon}
              </p>
              <h3 className="text-lg font-semibold text-charcoal mb-2 group-hover:text-wine transition-colors">
                {v.name}
              </h3>
              <p className="text-sm text-warm-gray leading-relaxed">
                {v.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-wine text-cream text-sm font-medium hover:bg-wine-dark transition-colors"
          >
            Find Your System
          </Link>
        </div>
      </div>
    </section>
  );
}
