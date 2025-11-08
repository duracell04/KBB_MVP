# Contracts

## Core note

- [`contracts/core/FixedIncomeNote.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/core/FixedIncomeNote.sol): emits `SubscriptionSettled`, `CouponPaid`, and `RedemptionPaid` events with deterministic settlement references.
- Permissioned transfers (ERC-3643 compatible) enforced via registry hooks.
- Minting guarded by Delivery-versus-Payment orchestration.

## Math libraries

- [`contracts/lib/DayCount.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/lib/DayCount.sol) — ACT/360 day-count basis.
- [`contracts/lib/DayCount30_360.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/lib/DayCount30_360.sol) — 30/360 US convention.
- [`contracts/lib/Accrual.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/lib/Accrual.sol) — accrual helpers.

## Compliance preview

- [`contracts/compliance/CovenantManager.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/compliance/CovenantManager.sol) — covenant storage & breach events.

## Interfaces

- [`contracts/interfaces/ITransferAgent.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/interfaces/ITransferAgent.sol)
- [`contracts/interfaces/IComplianceReportable.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/interfaces/IComplianceReportable.sol)
- [`contracts/interfaces/IRegistry.sol`](https://github.com/duracell04/KBB_MVP/blob/main/contracts/interfaces/IRegistry.sol)

## Testing

```bash
forge build
forge test -vv
```

## Upgradeability roadmap

- Plan for UUPS + timelock with auditable upgrade proposals.
- Maintain an emergency pause playbook (see [`docs/runbooks/key-rotation.md`](runbooks/key-rotation.md)).
- Document governance thresholds before shipping upgradeable contracts.

> Add NatSpec comments near external/public functions to keep auto-generated docs accurate.
