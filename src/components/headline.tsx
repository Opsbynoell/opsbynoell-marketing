import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headlineVariants = cva("font-serif tracking-tight", {
  variants: {
    size: {
      hero: "text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95]",
      section: "text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]",
      sub: "text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15]",
    },
  },
  defaultVariants: {
    size: "section",
  },
});

type HeadlineElement = "h1" | "h2" | "h3" | "h4" | "p" | "span";

export function Headline({
  children,
  as: Tag = "h2",
  size,
  className,
  italic = false,
}: {
  children: React.ReactNode;
  as?: HeadlineElement;
  size?: VariantProps<typeof headlineVariants>["size"];
  className?: string;
  italic?: boolean;
}) {
  return (
    <Tag
      className={cn(
        headlineVariants({ size }),
        italic && "italic",
        className
      )}
    >
      {children}
    </Tag>
  );
}
