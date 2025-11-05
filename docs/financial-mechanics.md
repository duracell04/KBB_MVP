# Financial mechanics

**Accrual discipline** relies on deterministic day-count conventions with explicit invariants.

## ACT/360

```
accrual = notional × (couponRateBps / 10_000) × (days / 360)
```

Implementation: [`contracts/lib/DayCount.sol`](../contracts/lib/DayCount.sol)

- Use calendar day differences.
- Round to nearest cent via integer math in servicing.

## 30/360 (US)

Handles end-of-month and leap-year edges; see [`contracts/lib/DayCount30_360.sol`](../contracts/lib/DayCount30_360.sol) and [`test/DayCount30_360.t.sol`](../test/DayCount30_360.t.sol).

## Invariants

- Σ(coupons paid) ≤ Σ(theoretical accrual) at any checkpoint.
- Accrual is monotonic over time.
- DvP gating: no issuance or transfer if eligibility/lockup fails.

## Testing commands

```bash
forge test -vv --match-contract DayCountTest
forge test -vv --match-contract DayCount30_360Test
```

CI runs `forge test -vv` to cover accrual math every push.
