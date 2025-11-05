# Lifecycle events (canonical)

```text
SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)
CouponPaid(periodId, grossAmount, withholding, netAmount, settlementRef, settlementNetwork)
RedemptionPaid(amount, settlementRef, settlementNetwork)

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
  }
]
```

## Semantics

- `settlementRef` is the join key to off-chain statements (MsgId/UETR, bank reference, or on-chain tx hash).
- `settlementNetwork` identifies the rail; use uppercase constants.
- Amounts are integers; apply ISO currency minor units.
- Emitted events must be monotonic per lifecycle stage (e.g., coupon periods cannot regress).

## Consuming events

1. Generate events via `npm run demo` (writes to `out/events.sample.json`).
2. Validate shape via `npm run validate:events` (AJV against schema).
3. Join with rail evidence using the reconciliation script.

## Change control

- If you add/remove fields, update the schema and regen fixtures.
- Version new event shapes via ADR & README callouts.
- Maintain backwards compatibility for downstream consumers when feasible.
