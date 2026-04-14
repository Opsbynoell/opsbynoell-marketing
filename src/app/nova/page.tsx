"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NovaRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/noell-support");
  }, [router]);

  return (
    <main className="max-w-3xl mx-auto px-4 pt-32 pb-20 text-center">
      <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-4">
        Redirecting
      </p>
      <h1 className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-6">
        Taking you to Noell Support.
      </h1>
      <p className="text-charcoal/65 max-w-xl mx-auto mb-8">
        The current first-response product now lives under Noell Support.
      </p>
      <Link
        href="/noell-support"
        className="inline-flex items-center justify-center rounded-full bg-wine px-6 py-3 text-sm font-semibold text-cream"
      >
        Open Noell Support
      </Link>
    </main>
  );
}
