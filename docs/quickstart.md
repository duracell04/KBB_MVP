# Quickstart

**Prereqs**
- Foundry installed (`foundryup`)
- Node.js ≥ 20 (for ops/adapters demos)

## 1) Build & test

```bash
forge build && forge test -vv
```

Artifacts land in `out/` (contracts) and `cache/`.

## 2) Run the end-to-end demo

```bash
npm ci
npm run demo:all
```

What the demo does:

* Spins a local chain, deploys `FixedIncomeNote`
* Simulates **DvP** on a chosen rail
* Emits `SubscriptionSettled` with `(settlementRef, settlementNetwork)`
* Writes example outputs under `out/demo/`:

  * `onchain.events.json` — captured lifecycle events
  * `bank.sample.csv` — mocked bank statement rows
  * `recon.report.md` — reconciliation result

## 3) Troubleshooting

* `forge: command not found` → install Foundry then `foundryup`
* Solc mismatch → `foundryup` and retry
* Node errors → `nvm use 20` or install Node 20+

**Next:** understand the flow → [architecture.md](./architecture.md)
