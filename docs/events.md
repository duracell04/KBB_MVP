# Lifecycle Events & Schema

All lifecycle events carry:
- `settlementRef` — the **rail-native identifier** (UETR, EndToEndId, TxHash, etc.)
- `settlementNetwork` — one of: `ISO20022 | SWIFT | SEPA | ACH | FPS | ONCHAIN_STABLECOIN`

## SubscriptionSettled

| Field              | Type     | Semantics                                           | Example                           |
|------------------:|:---------|:----------------------------------------------------|:----------------------------------|
| `orderId`         | bytes32  | Correlates primary order                            | `0x2b1c…d4`                       |
| `investor`        | address  | Whitelisted investor                                | `0x0000…FEE1`                     |
| `amount`          | uint256  | Face value units (token decimals)                   | `100000000`                       |
| `currency`        | string   | ISO 4217 currency code                              | `EUR`                             |
| `settlementRef`   | string   | Rail evidence reference                             | `1f9c20d4-...`                    |
| `settlementNetwork`| string  | Rail identifier                                     | `ISO20022`                        |

**ISO 20022 / UETR example**
```json
{
  "event": "SubscriptionSettled",
  "orderId": "0x2b1c...d4",
  "investor": "0x000000000000000000000000000000000000FEE1",
  "amount": "100000000",
  "currency": "EUR",
  "settlementRef": "1f9c20d4-4c1e-11ef-9a9a-0242ac120002",
  "settlementNetwork": "ISO20022"
}
```

**SEPA / EndToEndId example**

```json
{
  "event": "SubscriptionSettled",
  "currency": "EUR",
  "settlementRef": "E2E-2025-11-10-000123",
  "settlementNetwork": "SEPA"
}
```

**On-chain stablecoin example**

```json
{
  "event": "SubscriptionSettled",
  "currency": "USD",
  "settlementRef": "0x08c379a0...txHash",
  "settlementNetwork": "ONCHAIN_STABLECOIN"
}
```

## CouponPaid

| Field              | Type    | Meaning             |
|------------------:|:--------|:--------------------|
| `periodId`         | uint256 | Coupon period index |
| `grossAmount`      | uint256 | Before withholding  |
| `withholding`      | uint256 | Withheld amount     |
| `netAmount`        | uint256 | Paid amount         |
| `settlementRef`    | string  | Rail reference      |
| `settlementNetwork`| string  | Rail id             |

## RedemptionPaid

| Field              | Type    | Meaning          |
|------------------:|:--------|:-----------------|
| `amount`           | uint256 | Principal amount |
| `settlementRef`    | string  | Rail reference   |
| `settlementNetwork`| string  | Rail id          |

> **Compatibility rule:** Never repurpose fields. Add new data via **new events** to avoid breaking consumers.
