# Architecture

## Design principle
Cash settles on regulated rails. The token is the **register & event emitter**.

## Components
- **Escrow (off-chain rail)** — receives funds and exposes settlement evidence.
- **Settlement Adapter** — verifies evidence and formats it.
- **DvP Orchestrator** — mints/transfers only when evidence is valid.
- **FixedIncomeNote** — permissioned instrument, emits lifecycle events.
- **Reconciliation** — deterministic join between bank statements and on-chain events.

## Primary market (DvP) sequence

```mermaid
sequenceDiagram
  participant Inv as Investor
  participant Bank as Escrow (Rail)
  participant Ad as Settlement Adapter
  participant DvP as DvP Orchestrator
  participant Note as FixedIncomeNote
  participant Log as On-chain Events

  Inv->>Bank: Wire funds with rail-native reference
  Bank->>Ad: Settlement advice / evidence
  Ad->>DvP: attest(amount, ccy, valueDate, settlementRef, network)
  DvP->>Note: settleSubscription(...)
  Note-->>Log: SubscriptionSettled(...)
```

## Servicing (Coupons & Redemption)

Escrow wires cash; `CouponPaid` / `RedemptionPaid` events mirror rail references for audit.

**See also**

* Event schema → [events.md](./events.md)
* Reconciliation → [recon.md](./recon.md)
