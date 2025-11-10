# KBB_MVP — Token-registered private debt, cash-settled on regulated rails

[![Build](https://github.com/duracell04/KBB_MVP/actions/workflows/ci.yml/badge.svg)](https://github.com/duracell04/KBB_MVP/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)
[![Docs](https://img.shields.io/badge/docs-mkdocs-blue.svg)](https://duracell04.github.io/KBB_MVP/)
[![Made with Foundry](https://img.shields.io/badge/Made%20with-Foundry-f26922.svg)](https://book.getfoundry.sh/)

**Keywords:** tokenized securities, private debt, DvP, ISO 20022, reconciliation, settlement evidence, regulated rails.

> **Design principle:** Cash settles on regulated rails; the token is the register & evidence source.

---

## TL;DR
- Cash remains on regulated rails; the token is the canonical register & lifecycle log.
- DvP enforced: mint/transfer only after verified settlement evidence.
- Every lifecycle event carries `settlementRef` + `settlementNetwork` for deterministic reconciliation.
- Economics snapshot lives in [`market/economics.sample.json`](market/economics.sample.json) (schema in [`market/economics.schema.json`](market/economics.schema.json)).
- Full docs ship via MkDocs Material — run `mkdocs serve` locally or visit the hosted site.

## Start here
| Role | Read next |
| --- | --- |
| Issuer / Ops | [Quickstart](docs/quickstart.md), [Runbook — Primary Issuance](docs/runbooks/primary-issuance.md) |
| Integration partner | [Settlement Adapters](docs/adapters.md), [Reconciliation](docs/recon.md) |
| Solidity / protocol dev | [Architecture](docs/architecture.md), [Contracts](docs/contracts.md) |

## Quickstart (5 min)
1. **Build & test contracts**
   ```bash
   forge build && forge test -vv
   ```
   Outputs land in `out/` (ABI + bytecode) and `cache/`.

2. **Install Node deps & run the demo**
   ```bash
   npm ci
   npm run demo:all
   ```
   The scripted flow wires funds, emits lifecycle events, indexes them, and validates recon samples.

3. **Inspect generated artifacts**
   - `out/demo/onchain.events.json` — lifecycle log with rail references
   - `out/demo/bank.sample.csv` — mocked rail statement
   - `out/demo/recon.report.md` — reconciliation snapshot

Full troubleshooting notes live in [docs/quickstart.md](docs/quickstart.md).

## Documentation map
- Overview landing page — [docs/index.md](docs/index.md)
- System & DvP architecture — [docs/architecture.md](docs/architecture.md)
- Lifecycle events & schema — [docs/events.md](docs/events.md)
- Settlement adapters — [docs/adapters.md](docs/adapters.md)
- Reconciliation patterns — [docs/recon.md](docs/recon.md)
- Financial mechanics — [docs/financial-mechanics.md](docs/financial-mechanics.md)
- Eligibility & compliance previews — [docs/eligibility.md](docs/eligibility.md), [docs/compliance.md](docs/compliance.md)
- Runbooks — [docs/runbooks](docs/runbooks)
- Architectural decisions — [docs/adr](docs/adr)

## Repository map
| Path | Description |
| --- | --- |
| [`contracts/`](contracts) | Solidity contracts (`FixedIncomeNote`, math utilities, eligibility helpers). |
| [`ops/`](ops) | DvP/reconciliation simulators, validators, adapters (TypeScript & Python). |
| [`apps/frontend/`](apps/frontend) | Sample workspace for dashboards and tooling. |
| [`assets/diagrams/`](assets/diagrams) | Mermaid sources and exported diagrams. |
| [`docs/`](docs) | MkDocs site content (overview, adapters, runbooks, ADRs). |
| [`market/`](market) | Economics snapshot JSON + schema. |
| [`scripts/`](scripts) | Shell helpers for demos and validation. |
| [`test/`](test) | Foundry-based contract tests. |

## Troubleshooting
- `forge` missing? Install via `foundryup`.
- Solc mismatch? Run `foundryup` to sync toolchain.
- Node errors? Use Node.js ≥ 20 (`nvm use 20`).
- Demo artifacts missing? Re-run `npm run demo:all`.

## Contributing
Issues and PRs welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for style and tooling.

## License
MIT — see [LICENSE](LICENSE).
