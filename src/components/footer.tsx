import Link from "next/link";
import { Logo } from "./logo";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandFacebook,
} from "@tabler/icons-react";

export function Footer() {
  const pages = [
    { title: "Home", href: "/" },
    { title: "Systems", href: "/#systems" },
    { title: "Pricing", href: "/#pricing" },
    { title: "Book", href: "/book" },
  ];

  const products = [
    { title: "Noell Support", href: "/noell-support" },
    { title: "Noell Front Desk", href: "/noell-front-desk" },
    { title: "Book Your Audit", href: "/book" },
    { title: "Med Spas", href: "/verticals/med-spas" },
    { title: "Salons", href: "/verticals/salons" },
    { title: "Massage Therapy", href: "/verticals/massage" },
    { title: "Dental Offices", href: "/verticals/dental" },
    { title: "HVAC", href: "/verticals/hvac" },
    { title: "Home Services", href: "/verticals/home-services" },
    { title: "Pool Services", href: "/verticals/pool-services" },
    { title: "Estheticians", href: "/verticals/estheticians" },
  ];

  const legal = [
    { title: "Privacy Policy", href: "/legal/privacy" },
    { title: "Terms of Service", href: "/legal/terms" },
    { title: "Cookie Policy", href: "/legal/cookies" },
  ];

  return (
    <footer className="w-full max-w-7xl mx-auto rounded-3xl mb-10 mx-auto bg-cream-dark border border-warm-border">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex items-start flex-col max-w-sm">
            <Logo />
            <h2 className="font-serif text-xl md:text-2xl font-medium text-charcoal mt-6 leading-snug">
              Systems that catch missed calls, follow up instantly, and keep
              your calendar full.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-5">
              <h3 className="text-[11px] uppercase tracking-widest text-charcoal/40">
                Pages
              </h3>
              <ul className="space-y-3">
                {pages.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/70 hover:text-charcoal"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[11px] uppercase tracking-widest text-charcoal/40">
                Verticals + Product
              </h3>
              <ul className="space-y-3">
                {products.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/70 hover:text-charcoal flex items-center gap-1.5"
                    >
                      {(item.title === "Noell Support" || item.title === "Noell Front Desk") && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-lilac-dark" />
                      )}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[11px] uppercase tracking-widest text-charcoal/40">
                Legal
              </h3>
              <ul className="space-y-3">
                {legal.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-sm text-charcoal/70 hover:text-charcoal"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 mt-12 border-t border-warm-border">
          <p className="text-xs text-charcoal/50">
            &copy; {new Date().getFullYear()} Ops by Noell. Quiet operations for
            service businesses.
          </p>

        </div>
      </div>
    </footer>
  );
}
