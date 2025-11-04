const steps = [
  {
    title: "Subscribe",
    description:
      "Issuer mints a permissioned ERC-3643 token. Investors subscribe with identity proofs and receive an allowlisted wallet.",
  },
  {
    title: "Fund",
    description:
      "Cash moves on a regulated rail (SEPA, Fedwire, RTGS). ISO 20022 payment events are ingested into the register.",
  },
  {
    title: "Verify",
    description:
      "Deterministic joins between token transfers and cash movements confirm delivery-versus-payment alignment in seconds.",
  },
  {
    title: "Settle",
    description:
      "Matched events settle automatically. Any breaks are surfaced for operations teams and exported in recon reports.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-midnight py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">How KBB settles DvP</h2>
          <p className="mt-4 text-base text-cloud/70">
            Four deterministic steps orchestrate issuance, cash, and reconciliation. Every step is observable through events and schema validation.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-sm font-semibold text-cyan">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm text-cloud/70">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
