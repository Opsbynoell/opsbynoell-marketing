"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type SectionVariant = "cream" | "blush" | "charcoal" | "lilac" | "nova";

const bgMap: Record<SectionVariant, string> = {
  cream: "bg-cream text-charcoal",
  blush: "bg-blush text-charcoal",
  charcoal: "bg-charcoal text-cream",
  lilac: "bg-lilac text-charcoal",
  nova: "bg-nova-purple text-cream",
};

export function Section({
  children,
  variant = "cream",
  className,
  id,
  animate = true,
}: {
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
  animate?: boolean;
}) {
  const Wrapper = animate ? motion.section : "section";
  const animateProps = animate
    ? {
        initial: { opacity: 0 } as const,
        whileInView: { opacity: 1 } as const,
        viewport: { once: true, margin: "-100px" } as const,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } as const,
      }
    : {};

  return (
    <Wrapper
      id={id}
      className={cn(
        "px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40",
        bgMap[variant],
        className
      )}
      {...animateProps}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </Wrapper>
  );
}
