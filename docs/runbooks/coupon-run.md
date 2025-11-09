# Runbook — Coupon Run

1. Freeze record date snapshot
2. Compute amounts (gross/withholding/net)
3. Wire off-chain; collect references
4. Emit `CouponPaid` events (refs per payment batch)
5. Reconcile statement vs events
