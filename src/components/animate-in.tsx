import { cn } from "@/lib/utils";

export function AnimateIn({
  children,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  return <div className={cn(className)}>{children}</div>;
}
