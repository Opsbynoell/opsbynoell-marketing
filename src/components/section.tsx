import { cn } from "@/lib/utils";

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
}: {
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40",
        bgMap[variant],
        className
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
