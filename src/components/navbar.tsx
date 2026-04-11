"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-warm-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl font-bold text-charcoal tracking-tight"
          >
            Noell
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#systems"
              className="text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              Systems
            </Link>
            <Link
              href="/#verticals"
              className="text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              Verticals
            </Link>
            <Link
              href="/nova"
              className="text-sm text-warm-gray hover:text-charcoal transition-colors flex items-center gap-1.5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-lilac-dark" />
              Nova
            </Link>
            <Link
              href="/#about"
              className="text-sm text-warm-gray hover:text-charcoal transition-colors"
            >
              About
            </Link>
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/book"
              className="hidden sm:inline-flex items-center justify-center h-9 px-5 rounded-full bg-wine text-cream text-sm font-medium hover:bg-wine-dark transition-colors"
            >
              Get Your Free Audit
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-warm-border bg-cream px-6 py-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-charcoal"
            >
              Home
            </Link>
            <Link
              href="/#systems"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-charcoal"
            >
              Systems
            </Link>
            <Link
              href="/#verticals"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-charcoal"
            >
              Verticals
            </Link>
            <Link
              href="/nova"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-charcoal flex items-center gap-1.5"
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-lilac-dark" />
              Nova
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-charcoal"
            >
              About
            </Link>
            <Link
              href="/book"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-wine text-cream text-sm font-medium mt-2"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
