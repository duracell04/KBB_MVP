# KBB_MVP — Cash-settled via Regulated Rails, Token-registered Private Debt (MVP)

**What:** A fixed-income note where cash settles on **regulated rails** (escrow at a licensed institution or—where permitted—whitelisted stablecoins) and the **permissioned token** is the **register & distribution** layer.
**Why:** Make private debt programmable and auditable without pretending payments are on-chain.

---

## TL;DR (for builders & allocators)

* **Instrument:** `FixedIncomeNote` (ERC-20-like supply = face value units; **permissioned transfers**).
* **Issuance:** **DvP** only — mint/transfer happens **after verified settlement evidence**.
* **Servicing:** Coupons/redemptions wired off-chain; **on-chain events** reference the same settlement identifiers for deterministic reconciliation.
* **Audience:** Tech-savvy partners, contributors, allocators, transfer agents.

---

## Problem → Solution

**Problem.** Private debt is slow and opaque: off-chain cash vs. cap-table drift; poor audit trails; messy eligibility/lockups.
**Solution.** Keep cash on **regulated rails**; use a **permissioned, upgradeable token** as the canonical **register**, and encode lifecycle events with settlement references for one-click reconciliation.

---

## Instrument & Tokenomics (MVP)

**Type:** Senior private debt (configurable).
**Coupon:** Nominal annual rate in **bps** (e.g., 650 = 6.50% p.a.).
**Day-count:** `ACT/360` (MVP), `30/360` optional.
**Schedule:** Periodic coupons (e.g., quarterly), bullet principal redemption.
**Holders:** Whitelisted professional/qualified investors; **OTC-style** permissioned transfers.

**Accrual (ACT/360)**

```
accrual = notional × (couponRateBps / 10_000) × (days / 360)
```

*(Round to currency minor units; disclose policy off-chain.)*

**Core invariants**

* Σ(couponsPaid) ≤ Σ(theoreticalAccrual)
* Accrual monotone in time
* No transfer if eligibility/lockup fails
* Issuance is DvP-gated

---

## How Settlement & Reconciliation Work

* **Rails:** ISO 20022 / SWIFT / SEPA / ACH / FPS, or **whitelisted stablecoins** with on-chain proof.
* **Adapter attests:** `(amount, currency, valueDate, settlementRef, settlementNetwork)`
* **Token writes events:** `SubscriptionSettled`, `CouponPaid`, `RedemptionPaid` containing the same reference → **deterministic join** to statements or tx hashes.

**Event fields (rail-agnostic)**

```solidity
// e.g., "ISO20022" | "SWIFT" | "SEPA" | "ACH" | "FPS" | "ONCHAIN_STABLECOIN"
string settlementNetwork;
string settlementRef; // MsgId/UETR/SWIFT ref/SEPA ref/on-chain tx hash
```

---

## High-level Architecture

```mermaid
flowchart LR

  A[Investor (eligible)] -->|Subscribe| B(Escrow at Regulated Institution)
  B -->|Settlement advice / proof| C[Settlement Adapter]
  C -->|attest (amount,currency,valueDate,settlementRef,network)| D[DvP Orchestrator]
  D -->|mint/transfer if funded| E((FixedIncomeNote))
  E -->|lifecycle events| F[On-chain Event Log]
  F -->|refs| C
```

**Principles**

1. **Legal primacy off-chain**; chain = **register/distribution**.
2. **DvP only** for issuance.
3. **Permissioned transfers** (whitelist, lockups, geo-rules).
4. **Full observability** via event references.

---

## What’s in This Repo (MVP scope)

```
contracts/       # Solidity (upgradeable note, day-count, interfaces) — start small, grow safely
  core/          # FixedIncomeNote, DayCount, AdminRoles (stubs today)
  interfaces/    # ITransferAgent (DvP), IRegistry (eligibility/lockups)
  upgrades/      # UUPS surface (phase-in)
  test/          # unit / invariants / fuzz (placeholders)

ops/             # Off-chain orchestration & reconciliation (stubs)
  dvp/           # subscribe → fund → settle (idempotent flow)
  recon/         # ISO 20022 adapter + matcher; fixtures for demos

docs/            # brief architecture notes & runbooks (short, pragmatic)
assets/diagrams/ # Mermaid diagrams for quick comprehension
```

---

## Minimal Getting Started (dev focus)

```bash
# clone
git clone https://github.com/duracell04/KBB_MVP.git && cd KBB_MVP

# contracts (placeholders compile)
forge build
forge test

# ops stubs (optional)
npm install
npm run ops:simulate-dvp
```

---

## How to Collaborate

* **Contribute code:** Keep PRs small and test the financial math.
* **Integrate rails:** Add a settlement adapter (ISO/SWIFT/SEPA/ACH/FPS or on-chain stablecoin proofs).
* **Audit/Review:** Challenge invariants, rounding, and state transitions.
* **Co-design:** Bring issuer/TA requirements; we’ll adapt the seams (Registry/TransferAgent).

> If you want a deeper spec (coupon edges, record-date snapshots, blocked balances, UUPS/timelock), open an Issue or Discussion and we’ll expand the slices in this repo.

---

## Roadmap (compact)

* ✅ MVP skeleton (contracts + ops stubs + fixtures)
* ▶ DayCount + accrual tests (edge cases, rounding, leap days)
* ▶ DvP “happy path” demo (idempotent, deterministic refs)
* ▶ Event-driven recon report (matched/breaks CSV/JSON)
* ⏭ Revenue-share SKU (cash sweep + DSRA), withholding exports, failure drills

---

*On-chain is the register & distribution rail. Settlement runs on regulated rails or approved stablecoins. This is built for professional/qualified investors and collaborators who care about **clean mechanics** and **audit-ready data**.*
