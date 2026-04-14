import Link from "next/link";

const products = [
  {
    title: "Noell Support",
    eyebrow: "Product 01",
    body: "The first-response product for missed calls, website chats, qualification, contact capture, routing, and booking-path handoff.",
    href: "/noell-support",
    cta: "See Noell Support",
  },
  {
    title: "Noell Front Desk",
    eyebrow: "Product 02",
    body: "The deeper front-desk automation layer for reminders, follow-up, reviews, reactivation, and ongoing workflow support.",
    href: "/noell-front-desk",
    cta: "See Noell Front Desk",
  },
  {
    title: "Done-for-you systems",
    eyebrow: "Service path",
    body: "Ops by Noell handles the audit, setup, implementation, and managed optimization if you want the full system done for you.",
    href: "/book",
    cta: "Book Your Free Audit",
  },
];

export function ProductFamily() {
  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[11px] uppercase tracking-[0.25em] text-charcoal/45 mb-3">
            The Noell system
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight mb-4">
            One system world. <span className="italic text-wine">Three clear paths.</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto">
            Start with the product you need now, then expand into the deeper layer or let Ops by Noell handle the full implementation path for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product.title}
              className="rounded-[24px] border border-warm-border bg-white p-6 shadow-[0px_20px_16px_-14px_rgba(28,25,23,0.12)]"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-charcoal/40 mb-3">
                {product.eyebrow}
              </p>
              <h3 className="font-serif text-2xl text-charcoal mb-3 leading-tight">
                {product.title}
              </h3>
              <p className="text-sm text-charcoal/60 leading-relaxed mb-6">
                {product.body}
              </p>
              <Link
                href={product.href}
                className="inline-flex items-center rounded-full border border-warm-border bg-cream px-4 py-2 text-sm font-medium text-charcoal hover:bg-white transition-colors"
              >
                {product.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
