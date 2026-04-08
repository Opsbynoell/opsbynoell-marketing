import { reassuranceCards, callTestimonialLine } from "@/content/book";

export function ReassuranceCards() {
  return (
    <section className="py-12 bg-[#FAF5F0] border-t border-[#EDE3DE]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reassuranceCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl bg-white border border-[#EDE3DE] p-5"
            >
              <h3 className="text-sm font-semibold text-[#1F1A1A]">
                {card.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6D6664]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-[#6D6664] italic">
          {callTestimonialLine}
        </p>
      </div>
    </section>
  );
}
