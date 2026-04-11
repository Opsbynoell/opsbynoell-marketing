"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Systems", href: "/systems" },
  { label: "Verticals", href: "/verticals" },
  { label: "Pricing", href: "/pricing" },
  { label: "Nova", href: "/nova" },
  { label: "About", href: "/about" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="md:hidden p-2 text-charcoal"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed inset-0 z-50 bg-cream flex flex-col data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right duration-300">
          <div className="flex items-center justify-between px-6 h-16">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="font-serif italic text-xl text-charcoal"
            >
              Ops by Noell
            </Link>
            <Dialog.Close asChild>
              <button className="p-2 text-charcoal" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-col items-start px-6 pt-12 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl text-charcoal hover:text-wine transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto px-6 pb-12">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex bg-wine text-cream text-sm tracking-wide px-8 py-4 rounded-full hover:bg-wine-light transition-colors"
            >
              Book Free Audit
            </Link>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
