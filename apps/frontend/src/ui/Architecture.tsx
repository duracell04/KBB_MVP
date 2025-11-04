const pillars = [
  {
    title: "Rails",
    description: "SEPA, Fedwire, RTGS, or whitelisted stablecoins. Settlement adapters normalize events into ISO 20022 payloads.",
  },
  {
    title: "Register",
    description: "Permissioned ERC-3643-compatible token keeps the official ledger and enforces eligibility.",
  },
  {
    title: "Events",
    description: "Lifecycle events emit the same settlement references banks rely on — deterministic joins back to statements.",
  },
  {
    title: "Math",
    description: "ACT/360 and 30/360 US accrual engines mirror fixed-income desks, preventing rounding disputes.",
  },
  {
    title: "CI",
    description: "GitHub Actions runs the 60-second demo on every push, validating events and reconciliation artifacts.",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="bg-midnight py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Architecture</h2>
            <p className="mt-4 text-base text-cloud/70">
              Every component is purpose-built for institutional debt workflows: regulated cash rails, permissioned tokens, and audit-ready events stitched together through reconciliation.
            </p>
            <ul className="mt-8 space-y-4">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-cyan">{pillar.title}</p>
                  <p className="mt-2 text-sm text-cloud/70">{pillar.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-cyan/30 bg-ink/80 p-6 shadow-glow">
            <p className="text-sm font-semibold text-cyan">Event signature</p>
            <pre className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-black/40 p-4 text-xs text-cloud/80">
{`SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)
CouponPaid(periodId, grossAmount, withholding, netAmount, settlementRef, settlementNetwork)
RedemptionPaid(amount, settlementRef, settlementNetwork)

settlementNetwork: "ISO20022" | "SWIFT" | "SEPA" | "ACH" | "FPS" | "ONCHAIN_STABLECOIN"`}
            </pre>
            <p className="mt-4 text-xs text-cloud/60">
              Schema validators ship in <code>ops/</code>. CI ensures local runs and GitHub builds stay aligned.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
