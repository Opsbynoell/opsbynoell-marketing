import { cn } from "@/lib/utils";

export function Overline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
