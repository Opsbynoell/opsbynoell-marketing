import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-cream tracking-tight"
            >
              Noell
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/50">
              Systems that catch missed calls, follow up instantly, and keep
              your calendar full.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cream/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-cream transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#systems"
                  className="text-sm hover:text-cream transition-colors"
                >
                  Systems
                </Link>
              </li>
              <li>
                <Link
                  href="/#verticals"
                  className="text-sm hover:text-cream transition-colors"
                >
                  Verticals
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-sm hover:text-cream transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cream/40 mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/nova"
                  className="text-sm hover:text-cream transition-colors flex items-center gap-1.5"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-lilac-dark" />
                  Nova
                </Link>
              </li>
              <li>
                <Link
                  href="/book"
                  className="text-sm hover:text-cream transition-colors"
                >
                  Book an Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-cream/40 mb-4">
              Connect
            </h4>
            <p className="text-sm text-cream/50">
              Based in Texas. Serving service businesses everywhere.
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} Ops by Noell. All rights reserved.
          </p>
          <p className="text-xs text-cream/30">
            Systems that run themselves.
          </p>
        </div>
      </div>
    </footer>
  );
}
