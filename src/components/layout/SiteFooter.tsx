import Link from "next/link";
import { ROUTES, SITE_META, CTA } from "@/lib/constants";

const footerLinks = [
  { label: "Systems", href: ROUTES.systems },
  { label: "Verticals", href: ROUTES.verticals },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Nova AI", href: ROUTES.nova },
  { label: "About", href: ROUTES.about },
  { label: "Book a Free Audit", href: ROUTES.book },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#EDE3DE] bg-[#FFF7F4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href={ROUTES.home}
              className="text-base font-semibold tracking-tight text-[#1F1A1A]"
            >
              Ops by Noell
            </Link>
            <p className="mt-2 text-sm leading-relaxed text-[#6D6664]">
              {SITE_META.tagline}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6D6664] hover:text-[#1F1A1A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <Link
            href={ROUTES.book}
            className="self-start inline-flex items-center justify-center rounded-full bg-[#6A2C3E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a2233] transition-colors"
          >
            {CTA.primary}
          </Link>
        </div>

        <div className="mt-10 border-t border-[#EDE3DE] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-[#6D6664]">
            © {new Date().getFullYear()} {SITE_META.name}. All rights reserved.
          </p>
          <p className="text-xs text-[#C8C4C0]">
            Done-for-you operations for service businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
