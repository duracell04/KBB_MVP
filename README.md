# KBB Protocol — Tokenized Fixed-Income Note (MVP)

**Cash-settled via regulated rails; permissioned token as register & distribution layer.**

---

## 1. Product scope

| Dimension | Scope |
| --- | --- |
| Instrument | Senior unsecured (or secured) **fixed-income note** issued off-chain and registered on-chain as `FixedIncomeNote` |
| Investors | Whitelisted professional/qualified investors only (jurisdictional legends enforced through a registry) |
| Token form | ERC-20-like divisible claims representing face value quanta |
| Currency | Settlement in fiat (e.g., USD/EUR) handled by escrow bank; tokens mirror ownership |
| Coupon | Nominal annual rate in **basis points** (e.g., `650 = 6.50%`) |
| Day-count | `ACT/360` baseline with optional `30/360` |
| Schedule | Periodic coupon payments (monthly/quarterly/semi-annual/annual) and bullet principal redemption at maturity |

### Why it matters
* **Simple valuation**: cash flows are deterministic (coupon leg + principal leg) so conventional fixed-income math applies.
* **Operational clarity**: tokens record rights; all fiat flows remain in the banking system, with one-to-one reconciliation via ISO 20022 `MsgId/UETR` references.
* **Regulatory discipline**: no peer-to-peer transfers; every change passes through a transfer agent enforcing eligibility and lockups.

---

## 2. Core contracts & storage

### `FixedIncomeNote`
Minimal state needed for the MVP:
- `couponRateBps`: Annual nominal coupon in basis points.
- `dayCountConvention`: Enum (`ACT_360`, `THIRTY_360`).
- `issueDate`: Timestamp marking accrual start.
- `maturityDate`: Timestamp for principal redemption.
- `paymentFrequency`: Periods per year (1, 2, 4, 12).
- `denomination`: Smallest transferable face value unit.
- `totalFaceValue`: Aggregate face value represented on-chain.
- Compliance references: `registry` (eligibility/lockups) and `transferAgent` (DvP settlement).
- Flags: `paused`, `inDefault` (halt investor-driven transfers, coupons, and primary issuance).

### `DayCount`
- Implements `ACT/360` calculations (`(days / 360)` with real day differences).
- Stubs for `30/360` mapping for future expansion.

### Interfaces
- `IRegistry`: KYC/KYB checks, jurisdictional lockups.
- `ITransferAgent`: Orchestrates subscriptions, secondary movements, and DvP proofs.

---

## 3. Cash-flow mechanics

### 3.1 Accrual engine
`Accrual = Notional × (couponRateBps / 10,000) × (days / 360)`
- Uses `DayCount.dayCount(convention, from, to)` to compute `days`.
- Rounds **down** in currency minor units to stay issuer-friendly and avoid overpayments.
- Each accrual event captures the relevant `asOfDate` to match the bank value date.

### 3.2 Coupon lifecycle (per period)
1. Calculate `theoreticalCoupon(period)` using day-count fraction and outstanding notional.
2. Determine statutory withholding (if applicable) and compute `netCoupon`.
3. Emit `CouponAccrued(periodId, grossAmount, asOfDate)` to open the reconciliation window.
4. Pay coupon **off-chain** via escrow bank; once confirmed, emit `CouponPaid(periodId, gross, withholding, net, msgIdOrUetr)`.
5. Tokens never move fiat—events supply the audit trail linking period IDs to bank references.

### 3.3 Redemption at maturity
- Repay principal off-chain via bank transfer.
- Emit `RedemptionPaid(amount, msgIdOrUetr)` upon confirmation.
- Optionally burn remaining supply or lock transfers to mark completion.

---

## 4. Primary issuance — Delivery versus Payment (DvP)

**Invariant: Tokens only mint/transfer when fiat (or an approved stablecoin) is reconciled.**

1. **Subscribe** – Transfer Agent creates `orderId` for an eligible investor with amount and funding deadline.
2. **Fund** – Investor wires to escrow; bank issues ISO 20022 `camt.054` credit advice containing `MsgId/UETR`.
3. **Reconcile** – Off-chain adapter matches `(amount, currency, valueDate, msgId)` from the bank feed.
4. **Settle** – Orchestrator calls `TransferAgent.settleSubscription(orderId, investor, amount, proof)`; contract mints/transfers if fully funded and within the settlement window.
5. **Record** – Emit `SubscriptionSettled(orderId, investor, amount, currency, receiptHash, msgIdOrUetr)` for the audit trail.

---

## 5. Compliance & transfer restrictions

- **No direct `transfer`** by investors in the MVP. All movements flow through the `TransferAgent` which enforces eligibility checks and optional DvP checks.
- **Eligibility** via `Registry.isEligible(holder)` covering KYC/KYB and jurisdictional legends.
- **Lockups** via `Registry.lockupEndsAt(holder)`; transfers revert if a party is still locked.
- **Emergency controls**: `pause()` and `setDefault(true)` freeze investor transfers, coupon processing, and new primary issuance; only privileged roles may unwind positions in default scenarios.

This mirrors the ERC-3643/ONCHAINID mental model without binding the implementation to any vendor.

---

## 6. Event schema for reconciliation

Machine-readable events align on the bank reference identifiers:
- `SubscriptionSettled(orderId, investor, amount, currency, receiptHash, msgIdOrUetr)`
- `CouponAccrued(periodId, grossAmount, asOfDate)`
- `CouponPaid(periodId, grossAmount, withholding, netAmount, msgIdOrUetr)`
- `RedemptionPaid(amount, msgIdOrUetr)`
- `TransferRestricted(reasonCode)` (optional diagnostics)

The `msgIdOrUetr` field matches ISO 20022 `AcctSvcrRef` / `Refs/MsgId` and UETR values, enabling deterministic joins between on-chain events and bank statements.

---

## 7. Risk controls & invariants (MVP test plan)

Financial invariants to enforce via unit/property tests:
- `sum(paidCoupons) ≤ sum(theoreticalAccrual)` across any time window.
- Accrual is monotonic in time (never decreases).
- No transfer succeeds when sender or receiver is ineligible or under lockup.
- When `inDefault` is set, coupon processing and investor-initiated transfers revert.

Operational controls to implement around the contracts:
- DvP-only issuance (no free mints).
- Optional record-date snapshots and blocked balances (Phase-1 extensions).
- Role separation: admin multisig/MPC, guardian for emergencies, and timelocked upgrades (Phase-1).

---

## 8. Reporting expectations

Downstream consumers (ops/audit) require deterministic outputs:
- **Cash-flow table** per note: `periodId, accrualStart, accrualEnd, dayCount, grossCoupon, withholding, netCoupon, valueDate, msgId`.
- **Position report** at record dates: `holder, balance, proRataCoupon`.
- **Breaks report**: unmatched bank credits/debits, duplicates, and under/over payments.

`ops/recon` will produce CSV/JSON reports in these schemas from on-chain logs and ISO 20022 feeds.

---

## 9. Parameterization knobs

| Parameter | Purpose |
| --- | --- |
| `couponRateBps` | Typical range 500–1200 bps for SME private debt |
| `paymentFrequency` | 1, 2, 4, or 12 periods per year |
| `dayCountConvention` | Start with `ACT/360`; extendable |
| `denomination` / `minSubscription` | Control minimum ticket sizes and rounding |
| `cutoffWindows` | Minimum days between funding and period end for inclusion |
| `withholdingPolicy` | Off-chain engine calculates statutory/treaty rates, recorded in events |

---

## 10. Lifecycle states

1. **Draft** → instrument configured, not open for funding.
2. **Open** → subscriptions accepted and routed through transfer agent.
3. **Funded** → order-level and aggregate targets achieved; ready for go-live.
4. **Live** → accrual and coupon processing active.
5. **In Default** → transfers/coupons halted; only admin unwind allowed.
6. **Matured** → principal repaid; register closed or left non-transferable.

State transitions are role-gated and emit explicit events for auditability.

---

## 11. Repository map

```
contracts/
  core/
    DayCount.sol         # Day-count math
    FixedIncomeNote.sol  # Storage, events, compliance hooks
  interfaces/
    IRegistry.sol        # Eligibility / lockup seam
    ITransferAgent.sol   # Orchestrated transfer pathway
  upgrades/              # UUPS scaffolding (Phase-1)
ops/
  dvp/
    orchestrator.ts      # Subscribe → fund → settle happy path
  recon/
    iso20022_adapter.ts  # camt.054 parser
    matching_engine.py   # On-chain ↔ bank reconciliation
docs/
  architecture.md
  threat_model.md
  runbooks/
    upgrades.md
assets/
  diagrams/
    dvp_sequence.mmd
    lifecycle.mmd
```

All code files currently contain descriptive comments only. Add logic incrementally and bring up CI after the first meaningful test suite is green.

---

## 12. Development checklist before handling real funds

- [ ] Unit tests for accrual math (`ACT/360` and edge cases).
- [ ] Invariants: `paid ≤ theoretical`, monotonic accrual, lockup enforcement.
- [ ] Reconciliation fixtures producing deterministic CSV/JSON outputs with matching `MsgId/UETR` keys.
- [ ] Admin controls: pause/default toggles and role gating.
- [ ] Upgrade policy documented (or upgrades disabled for MVP).
- [ ] Data retention strategy aligned between on-chain events and bank records.

---

## 13. Disclaimers

This repository contains **technical documentation and reference code only**.  It is not an offer to sell or a solicitation to buy securities.  Any offering occurs under applicable private-placement exemptions to eligible investors with full KYC/AML and jurisdictional legends.  Operational banking, tax, and compliance behaviors are off-chain legal obligations; the on-chain components serve as a register and distribution rail.

