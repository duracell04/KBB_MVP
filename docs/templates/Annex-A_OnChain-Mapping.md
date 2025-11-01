# Annex A — On-Chain Register & Event Mapping (KBB_MVP)

## 1) Definitions
- **Register:** ERC-20–like `FixedIncomeNote` supply equals face value units.
- **Settlement Evidence:** Rail-agnostic reference (`settlementRef`, `settlementNetwork`).

## 2) Primary Issuance (DvP)
- Legal: Subscription deemed effective upon receipt of cleared funds at escrow.
- On-chain: Emit `SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)` within T+1 of evidence.

## 3) Servicing
- Legal: Coupons/redemptions per Schedule 1; withholding per law.
- On-chain: Emit `CouponPaid(periodId, grossAmount, withholding, netAmount, settlementRef, settlementNetwork)`.
- Record date (optional): Snapshot holder balances at `recordDate` (OZ `ERC20Snapshot`).

## 4) Transfer Restrictions
- Legal: Transfers require eligibility + lockups.
- On-chain: `Registry.isEligible(holder)` & `lockupEndsAt(holder)` enforced by TransferAgent route.

## 5) Default & Remedies
- Legal: Upon Event of Default, Issuer may suspend coupons and investor-initiated transfers.
- On-chain: `setDefault(true)` → halts coupons & investor `transfer/transferFrom`; admin unwind allowed.

## 6) Data for Audit
- Export CSV/JSON of: `SubscriptionSettled`, `CouponPaid`, `RedemptionPaid`.
- Join key: `settlementRef` (MsgId/UETR/SWIFT/SEPA ref or on-chain tx hash).

> **Why:** instantly shows you understand how the paper maps to the protocol.
