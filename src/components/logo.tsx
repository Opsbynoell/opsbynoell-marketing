"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LogoIcon = ({ className }: { className?: string }) => (
  <div className={className}>
    <Image
      src="/branding/ops-by-noell-icon.png"
      alt="Ops by Noell icon"
      width={40}
      height={40}
      className="w-full h-full object-contain"
      priority
    />
  </div>
);

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={cn(
        "font-normal flex gap-2 justify-center items-center text-sm text-charcoal px-2 py-1 shrink-0 relative z-20",
        className
      )}
    >
      <Image
        src="/branding/ops-by-noell-lockup.png"
        alt="Ops by Noell"
        width={260}
        height={72}
        className="h-8 w-auto object-contain shrink-0"
        priority
      />
    </Link>
  );
};
