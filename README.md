# KBB_MVP - Token-registered private debt, cash-settled on regulated rails (MVP)
[![Build](https://github.com/duracell04/KBB_MVP/actions/workflows/ci.yml/badge.svg)](https://github.com/duracell04/KBB_MVP/actions/workflows/ci.yml)

**Keywords:** tokenized securities, private debt, DvP, ISO 20022, ERC-3643, permissioned transfers, reconciliation, settlement evidence, stablecoin (whitelisted), escrow, audit-ready.

**What:** A fixed-income note where cash settles on **regulated rails** (escrow at a licensed institution or, where permitted, whitelisted stablecoins). A **permissioned token** is the **register and distribution** layer.  
**Why:** Modernise SME credit with programmability and auditability without breaking prudential guardrails; the roadmap shows how this evolves from a contained pilot into a macro-relevant rail.

---

## TL;DR

- **Instrument:** `FixedIncomeNote` (ERC-20-like supply equals face value units; **ERC-3643-compatible**, permissioned transfers).  
- **Issuance:** **Delivery-versus-Payment (DvP)** only - mint/transfer **after** verified settlement evidence.  
- **Servicing:** Coupons/redemptions wired off-chain; **on-chain events** carry `settlementRef` and `settlementNetwork` for deterministic reconciliation to statements or transaction hashes.

---

## The KBB story (2-minute read)

**KBB = Kartvelian Business Bonds.** In a small, open, bank-dominated market, KBB is state-aligned modernization of SME credit: legally orthodox dematerialised securities, technologically modern ERC-3643 controls, and operational truth on regulated cash rails. It is a new intermediation layer between conservative banking regulation and flexible capital-markets rails that attracts institutional capital without compromising prudence.

- **Who benefits:**  
  - Georgian SMEs with revenue but limited cross-border credit access.  
  - Professional investors wanting transparent, standardised exposure to SME credit with audit-ready trails.  
  - Operators (issuer/transfer agent/registrar) needing DvP discipline, eligibility enforcement, and clean reconciliations.

> **Design principle:** **Cash settles on regulated rails.** Tokens exist to **register ownership, gate eligibility/lockups/caps, and emit machine-readable lifecycle events** keyed to the same references used by banking or (where permitted) stablecoin rails. `ROADMAP.md` explains how this moves from a supervised pilot to Digital Lari DvP, DLT register recognition, and regional issuance.

---

## Architecture at a glance

```mermaid
flowchart LR
  I[Investor (eligible)] -->|Subscribe| E(Escrow at regulated institution)
  E -->|Settlement advice / proof| A[Settlement Adapter]
  A -->|attest (amount,currency,valueDate,settlementRef,network)| O[DvP Orchestrator]
  O -->|mint/transfer if funded| N((FixedIncomeNote))
  N -->|events incl. settlementRef| L[On-chain Event Log]
  L -->|refs| A
```

**Core flows**

* **Primary (DvP):** Investor funds on a supported rail + adapter attests + orchestrator settles + `SubscriptionSettled(...)` with the same reference identifiers.  
* **Servicing:** Escrow wires coupons/redemptions + token emits `CouponPaid(...)` / `RedemptionPaid(...)` including identical references + deterministic reconciliation.

---

## Event schema (rail-agnostic)

```text
SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)
CouponPaid(periodId, grossAmount, withholding, netAmount, settlementRef, settlementNetwork)
RedemptionPaid(amount, settlementRef, settlementNetwork)

settlementNetwork: e.g., "ISO20022" | "SWIFT" | "SEPA" | "ACH" | "FPS" | "ONCHAIN_STABLECOIN"
```

**Accrual (ACT/360, example)**

```text
accrual = notional x (couponRateBps / 10_000) x (days / 360)
```

---

## Repo map

```text
contracts/  -> Solidity stubs (compiles): FixedIncomeNote, DayCount, interfaces
test/       -> one passing Foundry test (keeps CI green early)
ops/        -> DvP and reconciliation stubs (no heavy deps; TS/Py-ready)
docs/       -> 1-page architecture overview (rail-agnostic)
ROADMAP.md  -> phased regulatory/infra plan (pilot -> rail -> Digital Lari/DLT register)
assets/     -> diagrams (Mermaid)
apps/frontend -> Vite + Tailwind mockup (desktop/mobile, pnpm workspace package)
```

---

## Try it locally (5 min)

> Prereq: Foundry - [https://book.getfoundry.sh/](https://book.getfoundry.sh/)

```bash
./scripts/demo.sh
```

```bash
forge build
forge test -vv
```

*(Optional ops stubs)*

```bash
pnpm install
pnpm run ops:simulate-dvp
```

### Frontend mockup (desktop/mobile)

```bash
pnpm install
pnpm run frontend:dev         # launches Vite dev server (defaults to 5173)
# or, to build/preview:
pnpm run frontend:build
pnpm run frontend:preview
```

### Validate event structure
```bash
pnpm run validate:events
# writes out/events.validation.json
```

### 5-minute demo

```bash
./scripts/demo.sh   # builds and tests contracts, runs rail-agnostic reconciliation
```

---

## Why this MVP matters

* **Operational truth:** DvP and reconciliation are core, not bolted on.  
* **Eligibility by default:** Permissioned transfers; lockups/jurisdictions enforceable at the token seam.  
* **Audit-ready:** Event fields mirror the same identifiers rails use (for deterministic joins to statements or hashes).  
* **Macro fit:** Built for a small open economy to add a transparent SME credit rail without compromising prudential control.

---

## How to collaborate

* **Contribute a slice:** small PR plus one test.  
* **Add a rail adapter:** parse evidence and emit `(amount, currency, valueDate, settlementRef, settlementNetwork)`.  
* **Challenge mechanics:** invariants, rounding, record dates, failure paths.

See `ROADMAP.md` for phased regulatory/infra steps.
