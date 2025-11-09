# Quickstart (60 seconds)

> Requires Foundry & Node 20. CI runs the same steps and uploads artifacts.

```bash
forge build && forge test -vv
npm ci
npm run demo:all      # → simulates DvP, runs the indexer, recon, and validators
```

### Generated artifacts

- `out/events.latest.json`: Indexer materialized events (falls back to the sample when no RPC is set).
- `out/events.sample.json`: Demo lifecycle events (DvP simulation).
- `out/recon.report.json`: Deterministic join results (`matched[]`, `breaks[]`).
- `out/events.validation.json` & `out/recon.validation.json`: AJV validation results.

### Where things live

- [Event schema](specs/events.schema.json)
- [Recon schema](specs/recon.report.schema.json)
- Rails evidence sample: [`ops/recon/rails.sample.csv`](https://github.com/duracell04/KBB_MVP/blob/main/ops/recon/rails.sample.csv)
- Demo generator: [`ops/examples/simulate-dvp.ts`](https://github.com/duracell04/KBB_MVP/blob/main/ops/examples/simulate-dvp.ts)

### Troubleshooting

- Delete `out/` if you need a clean run.
- Ensure Foundry is installed (`curl -L https://foundry.paradigm.xyz | bash`).
- If Python is missing, install `python3` for the reconciliation script.
