import Link from "next/link";

const footerLinks = [
  { label: "Systems", href: "/systems" },
  { label: "Verticals", href: "/verticals" },
  { label: "Pricing", href: "/pricing" },
  { label: "Nova", href: "/nova" },
  { label: "About", href: "/about" },
  { label: "Book Free Audit", href: "/book" },
];

export function Footer() {
  return (
    <footer className="bg-cream border-t border-wine/15">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Wordmark + tagline */}
          <div className="space-y-4">
            <Link
              href="/"
              className="font-serif italic text-2xl text-charcoal hover:text-wine transition-colors"
            >
              Ops by Noell
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Done-for-you AI automation that handles lead capture, booking,
              follow-up, and reviews — so you never lose another customer.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="space-y-3">
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Navigate
              </span>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
                Contact
              </span>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@opsbynoell.com"
                    className="text-sm text-charcoal/70 hover:text-charcoal transition-colors"
                  >
                    hello@opsbynoell.com
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50">
          <p className="font-mono text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Ops by Noell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
