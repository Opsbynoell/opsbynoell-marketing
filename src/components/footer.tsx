import Link from "next/link";

const pages = [
  { title: "Systems", href: "/systems" },
  { title: "Verticals", href: "/verticals" },
  { title: "Pricing", href: "/pricing" },
  { title: "Nova", href: "/nova" },
  { title: "About", href: "/about" },
  { title: "Book Free Audit", href: "/book" },
];

const legal = [
  { title: "Privacy Policy", href: "#" },
  { title: "Terms of Service", href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto rounded-xl m-4 md:m-10 bg-blush/30">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex items-start flex-col">
            <Link
              href="/"
              className="font-serif italic text-2xl text-charcoal hover:text-wine transition-colors"
            >
              Ops by Noell
            </Link>
            <p className="text-charcoal/45 mt-6 max-w-xs leading-relaxed">
              Done-for-you AI automation that handles lead capture, booking,
              follow-up, and reviews — so you never lose another customer.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-charcoal">Pages</h3>
              <ul className="space-y-3">
                {pages.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/45 hover:text-charcoal transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-charcoal">Contact</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@opsbynoell.com"
                    className="text-sm text-charcoal/45 hover:text-charcoal transition-colors"
                  >
                    hello@opsbynoell.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-charcoal">Legal</h3>
              <ul className="space-y-3">
                {legal.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/45 hover:text-charcoal transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-charcoal/5">
          <p className="text-sm text-charcoal/30">
            &copy; {new Date().getFullYear()} Ops by Noell
          </p>
        </div>
      </div>
    </footer>
  );
}
