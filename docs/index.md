# KBB_MVP — Token-registered private debt on regulated rails

**What:** A fixed-income note where cash settles on ISO 20022 / SWIFT / SEPA / ACH / FPS (or permitted stablecoins). The chain acts as the **register & distribution** layer.

**Why:** Make private debt programmable & auditable—without claiming on-chain payments. Every lifecycle event references verifiable settlement evidence.

- **DvP-only issuance**: Mint/transfer after verified settlement evidence.
- **Permissioned transfers**: ERC-3643-compatible eligibility & lockups.
- **Deterministic reconciliation**: Events emit `settlementRef` / `settlementNetwork` that match rail statements.
- **Collateral transparency**: Custody events document who holds what and when.
- **Provision reserves**: Funding & payouts are evented for auditability.

➡️ Start with the [Quickstart](quickstart.md) for the 60-second runnable demo.

## Key flows

| Flow | What to read |
| --- | --- |
| System & DvP overview | [Architecture](architecture.md) |
| Lifecycle events | [Events](events.md) & [schemas](specs/events.schema.json) |
| Reconciliation | [Recon runbook](recon.md) |
| Finance math | [Financial mechanics](financial-mechanics.md) |
| Contracts | [Contracts](contracts.md) (NatSpec-facing) |
| Eligibility seam | [Eligibility](eligibility.md) |
| Compliance preview | [Compliance](compliance.md) |
| Integrations | [Adapters](adapters.md) |

## Tooling & automation

- CI validates demo artifacts (`npm run demo`, `validate:events`, `validate:recon`).
- GitHub Pages publishes this site on every merge to `main`.
- ADRs capture irreversible decisions ([0001](adr/0001-dvp-only.md), [0002](adr/0002-rail-agnostic.md)).

## Market snapshot

- Economics JSON lives in [`../market/economics.sample.json`](../market/economics.sample.json) and validates via [`../market/economics.schema.json`](../market/economics.schema.json).
- Near-miss taxonomy for reconciliation is defined in [`specs/recon.breaks.schema.json`](specs/recon.breaks.schema.json).

## Contributing to docs

1. Keep docs actionable—include commands that run in CI.
2. Update schemas & validations when event shapes change.
3. Reference ADRs when making architectural changes.

Docs are Markdown + JSON Schema. Build locally with `mkdocs serve` after installing `mkdocs-material`.
