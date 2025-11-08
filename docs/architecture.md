# Architecture

**Rails:** ISO 20022 / SWIFT / SEPA / ACH / FPS / ONCHAIN_STABLECOIN  
**Register:** Permissioned token (`FixedIncomeNote`, ERC-3643-compatible)  
**DvP:** Mint/transfer only after **verified** settlement evidence

## Flow at a glance

Investor → Escrow (regulated rails) → Settlement Adapter → DvP Orchestrator → FixedIncomeNote (events with `settlementRef`) → Reconciliation report

## Day in the life

1. Investor subscribes; eligibility & lockups enforced.
2. Investor funds via supported rail; adapter parses evidence (camt.053/054, SWIFT/SEPA/ACH/FPS, or permitted stablecoin tx).
3. Orchestrator verifies funding window, mints/transfers atomically, emits `SubscriptionSettled` with rail references.
4. Servicing wires coupons/redemptions; note emits `CouponPaid` / `RedemptionPaid` with identical references for deterministic joins.

## Guardrails

- **DvP discipline:** No issuance without verified evidence.
- **Permissioned transfers:** Eligibility/lockups enforced on-chain.
- **Registry gate:** DvP orchestrator checks eligibility & lockup expiry before settle/transfer.
- **Deterministic reconciliation:** Every lifecycle event is joinable to rail evidence.
- **Upgrade safety (roadmap):** Timelocked upgrades; emergency pause documented.

## Further reading

- [Events](events.md) for canonical lifecycle messages.
- [Adapters](adapters.md) for rail integrations.
- [Reconciliation](recon.md) for deterministic joins.
