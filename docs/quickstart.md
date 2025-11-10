# Quickstart

**Prereqs**
- Foundry installed (`foundryup`)
- Node.js ≥ 20 (for ops/adapters demos)

## 1) Build & test contracts

```bash
forge build && forge test -vv
```

Outputs land in `out/` (ABI + bytecode) and `cache/`.

## 2) Install Node deps & run the demo

```bash
npm ci
npm run demo:all
```

The scripted flow wires funds, emits lifecycle events, indexes them, and validates reconciliation samples.

## 3) Inspect generated artifacts

| Path | Description |
| --- | --- |
| `out/demo/onchain.events.json` | Lifecycle events including rail identifiers |
| `out/demo/bank.sample.csv` | Mocked bank statement rows |
| `out/demo/recon.report.md` | Reconciliation summary |

## 4) Troubleshooting

- `forge: command not found` → install Foundry then `foundryup`
- Solc mismatch → `foundryup` and retry
- Node errors → `nvm use 20` or install Node 20+

**Next:** understand the flow → [architecture.md](./architecture.md)
