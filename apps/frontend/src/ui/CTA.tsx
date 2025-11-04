const commands = [
  "forge build",
  "forge test -vv",
  "npm ci",
  "npm run demo"
];

export function CTA() {
  return (
    <section id="demo" className="bg-midnight py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl border border-cyan/40 bg-ink/90 p-8 shadow-glow sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan/80">60-second demo</p>
          <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Prove it locally</h2>
          <p className="mt-4 text-base text-cloud/70">
            Run the same path our CI executes. Mint the note, ingest settlement evidence, reconcile, and export <code>out/recon.report.json</code>.
          </p>
          <div className="mt-8 grid gap-3">
            {commands.map((command) => (
              <code
                key={command}
                className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-cloud/80"
              >
                {command}
              </code>
            ))}
          </div>
          <p className="mt-6 text-xs text-cloud/50">
            Tip: `npm run demo` chains the whole flow and writes <code>out/recon.report.json</code>. Share that artifact with auditors or investors.
          </p>
        </div>
      </div>
    </section>
  );
}
