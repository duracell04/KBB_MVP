# Contracts

## Module map
- `FixedIncomeNote` — instrument & lifecycle
- `DayCount` — financial math helpers
- `EligibilityRegistry` (preview) — gating & lockups

## API docs
The full Solidity API is generated from NatSpec comments via **Foundry**:

```bash
forge doc --build
```

The static site is published to GitHub Pages on push to `main`. See the CI job `docs.yml`.
