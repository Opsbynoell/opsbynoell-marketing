import { cn } from "@/lib/utils";

interface IntegrationBandProps {
  className?: string;
}

/**
 * PMS and booking integration band (copy pack Section 4).
 * Plain text only in this PR. Logo marquee is a deferred follow-up.
 * Headline + body + footnote. Place between PickYourPath and ROICalculator.
 */
export function IntegrationBand({ className }: IntegrationBandProps) {
  return (
    <section className={cn("w-full px-4 py-14 md:py-16", className)}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] uppercase tracking-[0.25em] text-wine mb-4">
          Integration
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal leading-tight">
          Built around the booking workflows you already use.
        </h2>
        <p className="mt-5 text-base text-charcoal/80 leading-relaxed">
          Designed to support service businesses using tools like Boulevard,
          Mangomint, Vagaro, Mindbody, Square, Square Appointments, Acuity,
          Jane, Dentrix, Eaglesoft, Open Dental, and Curve. Your booking system
          stays the system of record. We build the front desk layer around it
          and run it every day.
        </p>
        <p className="mt-5 text-xs text-muted-strong leading-relaxed max-w-2xl mx-auto">
          We are not a native partner or certified integration of these
          systems. We design the front desk layer around the booking workflows
          they support. If you do not see your system listed, ask on the
          working call. Most front desk workflows can be built around it.
        </p>
      </div>
    </section>
  );
}
