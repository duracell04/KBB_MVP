# Reconciliation

**Goal:** Deterministic join between rail evidence and on-chain events via `settlementRef` and `settlementNetwork`.

## Demo flow

1. `npm run demo:all` — runs the settlement simulator, indexes on-chain events (or falls back to the curated sample), executes recon, and validates the JSON artifacts.
2. Inspect `out/events.latest.json` / `out/events.sample.json` (indexer output), `out/recon.report.json`, and the validation files in `out/` to confirm matches vs. breaks.

### Sample inputs

- Rails CSV: [`ops/recon/rails.sample.csv`](https://github.com/duracell04/KBB_MVP/blob/main/ops/recon/rails.sample.csv)
- Events JSON: `out/events.latest.json` (materialized by the indexer) or `out/events.sample.json` when no RPC is configured
- Recon report: `out/recon.report.json`

### Report shape

```json
{
  "generatedAt": "2024-09-30T23:30:00Z",
  "matched": [
    {
      "settlementRef": "2025-10-15/MsgId:ABC123",
      "amount": 100000,
      "currency": "USD"
    }
  ],
  "breaks": []
}
```

When a near-miss surfaces, each break carries the taxonomy `kind`:

```json
{
  "kind": "AMOUNT_MISMATCH",
  "event": {
    "settlementRef": "2025-10-15/MsgId:DEF456",
    "amount": 100050,
    "currency": "USD"
  },
  "rail": {
    "amount": "100000",
    "currency": "USD"
  }
}
```

### Near-miss taxonomy

| Kind | When it fires |
| --- | --- |
| `MISSING_RAIL` | No rail record found for the emitted `settlementRef`. |
| `AMOUNT_MISMATCH` | Rail and event disagree on integer amount (after string coercion). |
| `CURRENCY_MISMATCH` | Currency codes diverge. |
| `DUPLICATE_REF` | Same `settlementRef` observed more than once in a run. |
| `STALE_VALUEDATE` | Event and rail provide conflicting `valueDate` values. |

## Production considerations

- **Normalization:** uppercase refs, strip whitespace, harmonize currency minor units.
- **Tolerance bands:** capture near-miss matches (FX slippage, rounding).
- **Duplicates:** flag duplicate `settlementRef` per rail/investor pair.
- **Attestations:** persist immutable hashes of bank statements & recon outputs.
- **Audit trail:** include user/time metadata for manual overrides.

## Extending automation

- Export recon metrics to monitoring (matched ratio, outstanding breaks).
- Notify ops when `breaks[]` non-empty post-cutoff.
- Retain historical reports for regulators/auditors.
