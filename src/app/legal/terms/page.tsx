export default function LegalTermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 pt-32 pb-20">
      <p className="text-[11px] uppercase tracking-[0.24em] text-charcoal/45 mb-4">Legal</p>
      <h1 className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-6">
        Terms of Service
      </h1>
      <div className="prose prose-neutral max-w-none text-charcoal/70">
        <p>
          By using this site or booking an audit, you agree that Ops by Noell may review your
          inquiry, communicate with you, and provide recommendations or services based on your request.
        </p>
        <p>
          Any implementation scope, pricing, timelines, or deliverables are confirmed separately during
          the audit and proposal process. Nothing on this website guarantees a specific result.
        </p>
        <p>
          Ops by Noell may update these terms as the business evolves. Continued use of the site means
          you accept the current version.
        </p>
      </div>
    </main>
  );
}
