# KBB_MVP — Token-registered private debt, cash-settled on regulated rails

**What it is:** A reference MVP showing how to keep a **private debt register on-chain** while **cash settles on regulated rails** (ISO 20022/SWIFT/SEPA/etc.). DvP is mandatory; lifecycle events carry deterministic banking references for reconciliation.

**Who it’s for**
- **Issuer Ops** — run primary issuance and servicing on existing rails with audit-grade on-chain evidence.
- **Integration Partners** — add new settlement rails (adapters) and reconcile statements to on-chain events.
- **Solidity Devs** — extend the instrument, eligibility checks, and lifecycle events.

## TL;DR (5 bullets)
1. Cash stays on regulated rails; the **token is the register** and event source of truth.
2. **DvP only**: tokens mint/transfer after verified settlement evidence.
3. All lifecycle events carry `settlementRef` and `settlementNetwork` for **deterministic joins**.
4. Economics snapshot lives in `market/economics.sample.json` (validates against `economics.schema.json`).
5. Full docs site builds with MkDocs (see **Quickstart**).

## Start here
- **Quickstart (5 min)** → [quickstart.md](./quickstart.md)
- **System & DvP** → [architecture.md](./architecture.md)
- **Event Schema** → [events.md](./events.md)
- **Add a rail** → [adapters.md](./adapters.md)
- **Reconciliation** → [recon.md](./recon.md)

## Repository map (clickable)
- `contracts/` — instrument + utils
- `ops/` — demo, reconciliation, validators
- `apps/frontend/` — sample workspace
- `assets/diagrams/` — mermaid sources + exported diagrams
- `docs/` — this site (MkDocs)

> Legal note: Informational only; not an offer to sell or solicitation to buy any security.
