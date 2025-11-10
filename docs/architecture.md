# Architecture

## Design principle
Cash settles on regulated rails. The token is the **register & event emitter**.

## System context

![System context diagram showing issuer ops, rails, adapters, and on-chain registry.](assets/diagrams/system.svg)

Mermaid source: `assets/diagrams/system.mmd`

## Components
- **Escrow (off-chain rail)** — receives funds and exposes settlement evidence.
- **Settlement Adapter** — verifies evidence and formats it.
- **DvP Orchestrator** — mints/transfers only when evidence is valid.
- **FixedIncomeNote** — permissioned instrument, emits lifecycle events.
- **Reconciliation** — deterministic join between bank statements and on-chain events.

## Primary market (DvP) sequence

![Primary market DvP sequence diagram showing interactions between investor, rail, adapter, orchestrator, and note.](assets/diagrams/dvp-sequence.svg)

Mermaid source: `assets/diagrams/dvp-sequence.mmd`

## Servicing (Coupons & Redemption)

Escrow wires cash; `CouponPaid` / `RedemptionPaid` events mirror rail references for audit.

**See also**

* Event schema → [events.md](./events.md)
* Reconciliation → [recon.md](./recon.md)
