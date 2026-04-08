"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ROUTES, CTA } from "@/lib/constants";

const navLinks = [
  { label: "Systems", href: ROUTES.systems },
  { label: "Verticals", href: ROUTES.verticals },
  { label: "Pricing", href: ROUTES.pricing },
  { label: "Nova", href: ROUTES.nova },
  { label: "About", href: ROUTES.about },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-full bg-[#FAF5F0]/92 backdrop-blur-md border border-[#EDE3DE] px-5 py-3 shadow-[0_1px_8px_rgba(31,26,26,0.06)]">
          {/* Wordmark */}
          <Link
            href={ROUTES.home}
            className="text-[15px] font-semibold tracking-tight text-[#1F1A1A] hover:text-[#6A2C3E] transition-colors"
          >
            Ops by Noell
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#6A2C3E]"
                        : "text-[#6D6664] hover:text-[#1F1A1A]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href={ROUTES.book}
            className="hidden md:inline-flex items-center justify-center rounded-full bg-[#6A2C3E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a2233] transition-colors"
          >
            {CTA.primary}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden p-1 text-[#6D6664] hover:text-[#1F1A1A] transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <>
                <span className="block w-5 h-0.5 bg-current rotate-45 translate-y-[3px]" />
                <span className="block w-5 h-0.5 bg-current -rotate-45 -translate-y-[3px]" />
              </>
            ) : (
              <>
                <span className="block w-5 h-0.5 bg-current mb-1" />
                <span className="block w-5 h-0.5 bg-current mb-1" />
                <span className="block w-5 h-0.5 bg-current" />
              </>
            )}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl bg-[#FAF5F0] border border-[#EDE3DE] shadow-md px-5 py-4">
            <ul className="flex flex-col gap-4 mb-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-sm font-medium text-[#6D6664] hover:text-[#1F1A1A] transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={ROUTES.book}
              className="block w-full text-center rounded-full bg-[#6A2C3E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a2233] transition-colors"
              onClick={() => setOpen(false)}
            >
              {CTA.primary}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
