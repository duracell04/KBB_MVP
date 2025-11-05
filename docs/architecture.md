# Architecture (1 page)

**Rails:** ISO 20022 / SWIFT / SEPA / ACH / FPS, or (where permitted) whitelisted stablecoins  
**Register:** `FixedIncomeNote` (permissioned transfers; ERC-3643-compatible)  
**DvP:** asset mint/transfer **only** after verified settlement evidence (rail-agnostic)

## System diagram (text)
Investor → Escrow at regulated institution → Settlement Adapter → DvP Orchestrator → FixedIncomeNote (events with settlementRef) → Reconciliation report

## Day in the life
1) Investor subscribes; eligibility checked (permissioned transfers).  
2) Investor funds on supported rail.  
3) Adapter parses evidence (ISO 20022 camt.053/054, SWIFT/SEPA/ACH/FPS, or permitted stablecoin tx), extracting a **settlementRef** seen on statements.  
4) Orchestrator verifies funding/window; mints/transfers atomically; emits `SubscriptionSettled(...)` with the same reference.  
5) Servicing wires coupons/redemptions; note emits `CouponPaid(...)` / `RedemptionPaid(...)` with identical refs → deterministic join.

## Event schema (canonical)
See **docs/specs/events.schema.json**. All CI runs validate demo events against this schema.

## Guardrails
- **DvP discipline**: no issuance without verified evidence  
- **Permissioned transfers**: eligibility/lockups enforced on-chain  
- **Deterministic reconciliation**: every lifecycle event is joinable to rail evidence  
- **Upgrade safety (later)**: timelocked upgrades; emergency pause documented
