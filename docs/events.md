# Lifecycle events (canonical)

```text
SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)
CouponPaid(periodId, grossAmount, withholding, netAmount, settlementRef, settlementNetwork)
RedemptionPaid(amount, settlementRef, settlementNetwork)
CollateralLocked(collateralId, type, value, currency, valuationDate, custodian, settlementRef, settlementNetwork)
CollateralReleased(collateralId, reason)
ProvisionFunded(amount, currency, settlementRef, settlementNetwork)
ProvisionPaidOut(claimId, amount, currency, reason)

settlementNetwork ∈ {"ISO20022","SWIFT","SEPA","ACH","FPS","ONCHAIN_STABLECOIN"}
settlementRef     = ISO MsgId/UETR, SWIFT/SEPA ref, or on-chain tx hash
```

**Machine schema:** [`specs/events.schema.json`](specs/events.schema.json)

## Example

```json
[
  {
    "event": "SubscriptionSettled",
    "orderId": "0x4f5244455231",
    "investor": "0x000000000000000000000000000000000000BEEF",
    "amount": 100000,
    "currency": "USD",
    "settlementRef": "2025-10-15/MsgId:ABC123",
    "settlementNetwork": "ISO20022"
  },
  {
    "event": "CollateralLocked",
    "collateralId": "COLL-1",
    "type": "INVENTORY",
    "value": 250000,
    "currency": "USD",
    "valuationDate": "2026-01-15",
    "custodian": "EscrowCo",
    "settlementRef": "2026-01-15/MsgId:ABC123",
    "settlementNetwork": "ISO20022"
  },
  {
    "event": "ProvisionFunded",
    "amount": 50000,
    "currency": "USD",
    "settlementRef": "2026-01-16/MsgId:DEF456",
    "settlementNetwork": "ISO20022"
  },
  {
    "event": "CollateralReleased",
    "collateralId": "COLL-1",
    "reason": "loan repaid"
  },
  {
    "event": "ProvisionPaidOut",
    "claimId": "CLAIM-1",
    "amount": 10000,
    "currency": "USD",
    "reason": "Borrower default coverage"
  }
]
```

## Semantics

- `settlementRef` is the join key to off-chain statements (MsgId/UETR, bank reference, or on-chain tx hash).
- `settlementNetwork` identifies the rail; use uppercase constants.
- Amounts are integers; apply ISO currency minor units.
- Emitted events must be monotonic per lifecycle stage (e.g., coupon periods cannot regress).
- Collateral custody is surfaced through `CollateralLocked` / `CollateralReleased`.
- Provision reserves are transparent via `ProvisionFunded` / `ProvisionPaidOut`.

## Collateral lifecycle

- Locking emits custody metadata (`custodian`, `valuationDate`, `settlementRef`, rail) for audit trails.
- Release reasons document why collateral is freed (e.g., repayment, substitution, waiver).

## Provision reserves

- `ProvisionFunded` ties reserve top-ups to the funding rail evidence.
- `ProvisionPaidOut` details drawdowns with a claim identifier and free-form reason.

## Consuming events

1. Generate events via `npm run demo:all` (writes to `out/events.latest.json` and `out/events.sample.json`).
2. Validate shape via `npm run validate:events` (AJV against schema, part of `demo:all`).
3. Join with rail evidence using the reconciliation script.

## Change control

- If you add/remove fields, update the schema and regen fixtures.
- Version new event shapes via ADR & README callouts.
- Maintain backwards compatibility for downstream consumers when feasible.
