export function UseCase() {
  return (
    <section id="use-case" className="bg-ink py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan/80">Use case</p>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Georgian SMEs, Eurobond discipline</h2>
          <p className="mt-5 text-base text-cloud/70">
            KBB is built for Kartvelian businesses that can service debt but lack efficient cross-border credit channels. The platform packages familiar Eurobond-like terms with tokenized registers and ISO 20022 reconciliation so global allocators gain trust immediately.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li className="rounded-2xl border border-white/10 bg-ink/60 p-5">
              <p className="text-sm font-semibold text-cyan">Investors</p>
              <p className="mt-2 text-sm text-cloud/70">Professional allocators see deterministic coupons, settlement evidence, and day-count math identical to their internal tools.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-ink/60 p-5">
              <p className="text-sm font-semibold text-cyan">Operators</p>
              <p className="mt-2 text-sm text-cloud/70">Issuer and transfer agent share a single operational truth: same references, same reconciliations, no shadow spreadsheets.</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
