"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { label: "Systems", href: "/systems" },
  { label: "Verticals", href: "/verticals" },
  { label: "Pricing", href: "/pricing" },
  { label: "Nova", href: "/nova" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 md:px-12 lg:px-20 h-16 md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif italic text-xl md:text-2xl text-charcoal hover:text-wine transition-colors"
        >
          Ops by Noell
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-charcoal/70 hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            className="bg-wine text-cream text-sm tracking-wide px-5 py-2.5 rounded-full hover:bg-wine-light transition-colors"
          >
            Book Free Audit
          </Link>
        </div>

        {/* Mobile nav trigger */}
        <MobileNav />
      </nav>
    </header>
  );
}
