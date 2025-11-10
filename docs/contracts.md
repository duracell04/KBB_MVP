# Contracts

## Module map
- `FixedIncomeNote` — instrument & lifecycle
- `DayCount` — financial math helpers
- `EligibilityRegistry` (preview) — gating & lockups

## API docs
Generate the full Solidity API from NatSpec comments using **Foundry**:

```bash
forge doc --build --out docs/contracts/api
```

This produces an mdBook in `docs/contracts/api/` (ignored in git) so you can browse `book/index.html` locally or publish it from CI.
