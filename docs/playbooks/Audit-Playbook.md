# Audit Playbook (10 minutes)

## 1. Build & test
```bash
forge build && forge test -vv
```

## 2. Generate events (demo)
```bash
npm ci && npm run demo
cat out/events.sample.json
```

## 3. Validate schema
```bash
npm run validate:events
```

## 4. Reconcile
```bash
python3 ops/recon/recon.py ops/recon/rails.sample.csv out/events.sample.json > out/recon.report.json
jq '.matched | length, .breaks | length' out/recon.report.json
```

## 5. Expected invariants

Σ(couponsPaid) ≤ Σ(theoreticalAccrual)

issuance is DvP-gated (no SubscriptionSettled without evidence)

**Why:** reduces diligence friction to near zero.
