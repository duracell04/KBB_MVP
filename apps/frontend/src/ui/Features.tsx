const features = [
  {
    title: "Operational truth",
    description:
      "Deterministic reconciliation across rails. Events are stored, versioned, and exported for audit as JSON schemas.",
  },
  {
    title: "Permissioned transfers",
    description:
      "ERC-3643-compatible allowlists let you enforce identity-based controls while still using open token standards.",
  },
  {
    title: "Rail-agnostic cash",
    description:
      "Integrates with regulated payment rails (SEPA, Fedwire, RTGS). Cash events arrive in ISO 20022 formats and map 1:1 to token state.",
  },
  {
    title: "Audit-ready events",
    description:
      "Each event is validated through schemas shipped in the repo. CI exercises the same path investors use locally.",
  },
  {
    title: "Day-count math",
    description:
      "Built-in ACT/360 and 30/360 US accrual math keeps coupons accurate and repeatable for fixed-income teams.",
  },
  {
    title: "Batteries-included demo",
    description:
      "The `pnpm run demo` script mints, funds, reconciles, and outputs the final recon report in under a minute.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-ink py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Why teams choose KBB</h2>
          <p className="mt-4 text-base text-cloud/70">
            Focused on institutional debt workflows from day one - deterministic DvP, reconciled state, and zero-ambiguity reporting.
          </p>
        </div>
        <dl className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/5 bg-white/5 p-6 transition hover:border-cyan/40"
            >
              <dt className="text-lg font-semibold text-white">{feature.title}</dt>
              <dd className="mt-3 text-sm text-cloud/70">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
