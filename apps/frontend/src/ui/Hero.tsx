export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-ink pb-20 pt-24 sm:pt-28">
      <div className="absolute inset-0 bg-hero-grid opacity-70" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-cyan/40 bg-cyan/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan/90">
            Rail-agnostic DvP
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Token-registered private debt. Cash on regulated rails.
          </h1>
          <p className="mt-6 text-lg text-cloud/80">
            KBB keeps issuance, cash, and reconciliation deterministic. Permissioned transfers on token rails, funds on any regulated payment rail. Audit-ready events in ISO 20022 format.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:bg-teal"
            >
              Run the 60-second demo
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View architecture
            </a>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
            <p className="text-sm font-semibold text-cyan">Operational truth</p>
            <p className="mt-2 text-sm text-cloud/70">
              Every cash and token event is reconciled through deterministic joins. Breaks and matches land in <code className="rounded bg-ink/60 px-1 py-0.5">out/recon.report.json</code>.
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-6">
            <p className="text-sm font-semibold text-cyan">Permissioned transfers</p>
            <p className="mt-2 text-sm text-cloud/70">
              ERC-3643 compatible allowlists ensure tokens only move between KYCd wallets while keeping cash rail-agnostic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
