# KBB_MVP — Token-registered private debt, cash-settled on regulated rails

[![Build](https://github.com/duracell04/KBB_MVP/actions/workflows/ci.yml/badge.svg)](https://github.com/duracell04/KBB_MVP/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#license)
[![Docs](https://img.shields.io/badge/docs-mkdocs-blue.svg)](https://duracell04.github.io/KBB_MVP/)

**Keywords:** tokenized securities, private debt, DvP, ISO 20022, ERC-3643, reconciliation, settlement evidence, regulated rails.

KBB_MVP demonstrates how to keep a private debt register on-chain while cash settles on regulated rails. Delivery-versus-Payment (DvP) is mandatory; lifecycle events carry deterministic references back to rail evidence. Collateral lifecycle events are emitted for custody transparency.

## Quickstart

> Requires Foundry & Node 20. CI runs the same steps.

```bash
forge build && forge test -vv
npm ci
npm run demo:all
```

See [docs/quickstart.md](docs/quickstart.md) for artifact locations and troubleshooting tips.

## Economics snapshot

The economics TL;DR lives in [`market/economics.sample.json`](market/economics.sample.json) and validates against [`market/economics.schema.json`](market/economics.schema.json). Feed the JSON to your frontend for a card/table or render directly in docs.

## Documentation

| Topic | Link |
| --- | --- |
| Overview landing page | [docs/index.md](docs/index.md) |
| System & DvP architecture | [docs/architecture.md](docs/architecture.md) |
| Lifecycle events & schemas | [docs/events.md](docs/events.md) |
| Reconciliation | [docs/recon.md](docs/recon.md) |
| Financial mechanics | [docs/financial-mechanics.md](docs/financial-mechanics.md) |
| Contracts | [docs/contracts.md](docs/contracts.md) |
| Compliance preview | [docs/compliance.md](docs/compliance.md) |
| Settlement adapters | [docs/adapters.md](docs/adapters.md) |
| Eligibility registry | [docs/eligibility.md](docs/eligibility.md) |
| Runbooks | [docs/runbooks](docs/runbooks) |
| ADRs | [docs/adr](docs/adr) |

The full documentation site builds with MkDocs Material and publishes to GitHub Pages on every merge to `main`.

## Architecture guardrails

- Registry gate checks eligibility/lockup before settle/transfer.

## Repository map

```text
contracts/         # Solidity contracts (note, math, compliance preview)
ops/               # Demo, reconciliation, validators
apps/frontend/     # Placeholder frontend workspace
assets/            # Diagrams
docs/              # MkDocs content, specs, runbooks, ADRs
```

## Contributing

Small, focused PRs please ✨

- Include tests for math/permissions where applicable.
- Update docs & schemas when event shapes change.
- Follow [CONTRIBUTING.md](CONTRIBUTING.md) for workflow and issue triage.

## Security & disclosure

Reference [.github/SECURITY.md](.github/SECURITY.md) for responsible disclosure instructions.

## License

MIT. See [LICENSE](LICENSE). Informational only; not an offer to sell or solicitation to buy any security.
