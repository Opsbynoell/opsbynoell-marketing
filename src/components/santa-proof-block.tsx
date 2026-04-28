import { cn } from "@/lib/utils";

interface SantaProofBlockProps {
  className?: string;
}

/**
 * Homepage social proof block (copy pack Section 5).
 * Editorial card on cream, max-w-2xl. Wine accent on the recovered-revenue
 * figure. No quote marks, no testimonial schema, no aggregateRating. The
 * copy is operational, not endorsement language.
 */
export function SantaProofBlock({ className }: SantaProofBlockProps) {
  return (
    <section className={cn("w-full px-4 py-14 md:py-16", className)}>
      <div className="mx-auto max-w-2xl rounded-[22px] border border-warm-border bg-cream-dark p-7 md:p-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-wine mb-4">
          Case study
        </p>
        <p className="font-serif text-xl md:text-2xl text-charcoal leading-snug">
          Healing Hands by Santa. Solo massage practice in Laguna Niguel. In
          fourteen days, four missed calls turned into booked appointments and{" "}
          <span className="text-wine">nine hundred sixty dollars</span> in
          recovered revenue. Front desk no longer goes quiet when Santa is with
          a client.
        </p>
      </div>
    </section>
  );
}
