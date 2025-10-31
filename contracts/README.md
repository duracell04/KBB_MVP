# Contracts

This package contains the Foundry-based smart contracts for the KBB MVP. The focus is a single fixed-income note that complies with ERC-3643 controls, delivered with upgrade tooling, tests, and fuzz harnesses.

## Layout

- `core/` – Production contracts including the `FixedIncomeNote` instrument, day count library, and role management utilities.
- `interfaces/` – Lightweight interfaces used across the protocol and operations tooling.
- `upgrades/` – Proxy administration and upgradeable contract scaffolding.
- `test/` – Foundry tests for acceptance criteria, invariants, and shared utilities.
- `echidna/` – Echidna harnesses and configuration.
- `script/` – Deployment scripts for Foundry's scripting runner.
