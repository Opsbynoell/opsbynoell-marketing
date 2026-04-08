import { calendarEmbed } from "@/content/book";

export function BookingEmbed() {
  return (
    <section className="py-12 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-[#6D6664] mb-6">
          {calendarEmbed.helperLine}
        </p>

        {calendarEmbed.embedUrl ? (
          <div className="w-full rounded-2xl overflow-hidden border border-[#EDE3DE]" style={{ minHeight: 600 }}>
            <iframe
              src={calendarEmbed.embedUrl}
              width="100%"
              height="700"
              frameBorder="0"
              title="Book a free audit"
              className="w-full"
            />
          </div>
        ) : (
          /* Intentional placeholder — swap when Calendly/Cal.com URL is configured */
          <div className="rounded-2xl border border-dashed border-[#EDE3DE] bg-[#FAF5F0] flex items-center justify-center py-24">
            <div className="text-center px-8">
              <div className="w-12 h-12 rounded-full bg-[#F0E4E8] flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="#6A2C3E" strokeWidth="1.5"/>
                  <path d="M7 2v3M13 2v3M3 8h14" stroke="#6A2C3E" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#1F1A1A]">
                Calendar coming soon
              </p>
              <p className="mt-1 text-xs text-[#6D6664]">
                Configure{" "}
                <code className="font-mono text-[10px] bg-[#EDE3DE] px-1.5 py-0.5 rounded">calendarEmbed.embedUrl</code>{" "}
                in{" "}
                <code className="font-mono text-[10px] bg-[#EDE3DE] px-1.5 py-0.5 rounded">src/content/book.ts</code>
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
