# Lifecycle Events & Schema

Every lifecycle event exposes the **rail-native settlement reference** alongside the network identifier so reconciliation remains deterministic across ledgers.

| Field | Description |
| --- | --- |
| `settlementRef` | Native payment identifier (UETR, EndToEndId, on-chain tx hash, etc.). |
| `settlementNetwork` | Enumerated rail identifier. Valid values: `ISO20022`, `SWIFT`, `SEPA`, `ACH`, `FPS`, `ONCHAIN_STABLECOIN`. |

## `SubscriptionSettled`

Triggered after DvP completes for an investor subscription.

| Field | Type | Required | Notes | Example |
| --- | --- | --- | --- | --- |
| `event` | string | ✓ | Always `"SubscriptionSettled"`. | `"SubscriptionSettled"` |
| `orderId` | bytes32 | ✓ | Off-chain order correlation identifier. | `0x2b1c…4bd4` |
| `investor` | address | ✓ | Whitelisted investor wallet. | `0x0000…FEE1` |
| `amount` | uint256 | ✓ | Face value in instrument decimals. | `100000000` |
| `currency` | string | ✓ | ISO 4217 currency code. | `"EUR"` |
| `valueDate` | string | optional | ISO 8601 settlement date echoed from the rail. | `"2025-01-02"` |
| `settlementRef` | string | ✓ | Rail-native evidence reference. | `"1f9c…0002"` |
| `settlementNetwork` | string | ✓ | Rail identifier enum. | `"ISO20022"` |

### Rail-specific fixtures

Downloadable fixtures live under `examples/events/`:

| Rail | Fixture |
| --- | --- |
| ISO 20022 / UETR | [`subscription.iso20022.json`](examples/events/subscription.iso20022.json) |
| SEPA / EndToEndId | [`subscription.sepa.json`](examples/events/subscription.sepa.json) |
| On-chain stablecoin | [`subscription.onchain.json`](examples/events/subscription.onchain.json) |

Each fixture includes realistic addresses, order IDs, and settlement identifiers for direct ingestion in tests or demos.

## `CouponPaid`

Represents periodic coupon servicing.

| Field | Type | Required | Notes | Example |
| --- | --- | --- | --- | --- |
| `event` | string | ✓ | Always `"CouponPaid"`. | `"CouponPaid"` |
| `periodId` | uint256 | ✓ | Coupon period index (0-based). | `3` |
| `grossAmount` | uint256 | ✓ | Amount before withholding. | `1250000` |
| `withholding` | uint256 | ✓ | Tax withheld (same decimals as token). | `250000` |
| `netAmount` | uint256 | ✓ | Cash delivered on the rail. | `1000000` |
| `currency` | string | ✓ | ISO 4217 code. | `"USD"` |
| `settlementRef` | string | ✓ | Rail evidence reference. | `"E2E-2025-09-30-000045"` |
| `settlementNetwork` | string | ✓ | Rail identifier enum. | `"SEPA"` |
| `valueDate` | string | optional | ISO 8601 settlement date. | `"2025-09-30"` |

## `RedemptionPaid`

Represents principal repayment at maturity or early redemption.

| Field | Type | Required | Notes | Example |
| --- | --- | --- | --- | --- |
| `event` | string | ✓ | Always `"RedemptionPaid"`. | `"RedemptionPaid"` |
| `amount` | uint256 | ✓ | Principal amount repaid. | `100000000` |
| `currency` | string | ✓ | ISO 4217 code. | `"EUR"` |
| `settlementRef` | string | ✓ | Rail evidence reference. | `"UETR-RED-0009"` |
| `settlementNetwork` | string | ✓ | Rail identifier enum. | `"ISO20022"` |
| `valueDate` | string | optional | ISO 8601 settlement date. | `"2027-01-01"` |

> **Compatibility rule:** Never repurpose fields. Add new data via **new events** to avoid breaking consumers.
