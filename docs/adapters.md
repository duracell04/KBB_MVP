# Settlement Adapters

Adapters translate rail-native settlement **evidence** into the canonical event shape.

## Checklist

1. **Evidence input**: ingest rail message/statement and extract:
   - `amount`, `currency`, `valueDate`, `settlementRef`, `settlementNetwork`
2. **Validation**:
   - signature / webhook authentication (if applicable)
   - idempotency key on `(settlementRef, settlementNetwork)`
3. **Attestation**:
   - call DvP orchestrator with normalized evidence
4. **Observability**:
   - write adapter logs and an `evidence.jsonl` trail
5. **Tests**:
   - golden fixtures per rail and negative cases (stale, duplicate, underfunded)

## Minimal pseudo-code

```ts
type Evidence = {
  amount: bigint; ccy: 'EUR'|'USD'; valueDate: string;
  settlementRef: string; settlementNetwork: 'ISO20022'|'SEPA'|'ACH'|'ONCHAIN_STABLECOIN';
}

async function handleRailWebhook(msg: RailMessage) {
  const ev = parseEvidence(msg);         // 1
  validate(ev, msg.signature);           // 2
  await attestToDvP(ev);                  // 3
  await appendAuditTrail(ev, msg);        // 4
}
```

## Test matrix

| Case                      | Expectation                     |
| ------------------------- | ------------------------------- |
| Correct funding           | `SubscriptionSettled` emitted   |
| Duplicate `settlementRef` | Second call is ignored/rejected |
| Wrong currency            | Rejected                        |
| Underfunded               | Rejected                        |
| Future value date         | Pending or rejected by policy   |
