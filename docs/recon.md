# Reconciliation

The join is **string-equal** on `(settlementRef, settlementNetwork)` between:
- Rail statement rows (bank CSV, ISO 20022 camt, SWIFT MT, on-chain Tx)
- On-chain events (`SubscriptionSettled`, `CouponPaid`, `RedemptionPaid`)

## Example files (demo output)
- `out/demo/bank.sample.csv`
- `out/demo/onchain.events.json`
- `out/demo/recon.report.md`

## SQL-style join (conceptual)

```sql
SELECT e.block_time, e.event, e.amount, s.value_date, s.amount
FROM onchain_events e
JOIN statements s
  ON e.settlementRef = s.reference
 AND e.settlementNetwork = s.network
WHERE e.event IN ('SubscriptionSettled','CouponPaid','RedemptionPaid');
```

## Python sketch

```python
import pandas as pd
e = pd.read_json('out/demo/onchain.events.json', lines=True)
s = pd.read_csv('out/demo/bank.sample.csv')
j = e.merge(s, left_on=['settlementRef','settlementNetwork'],
              right_on=['reference','network'], how='left')
assert j.reference.notna().all()
j.to_markdown('out/demo/recon.report.md', index=False)
```

## Operational notes

* **Idempotency:** dedupe by `(settlementRef, settlementNetwork)`
* **Tolerances:** handle rounding differences for FX/fees with a small epsilon window
* **Disputes:** unmatched pairs go to exception queue with raw evidence attached
