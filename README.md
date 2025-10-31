# KBB Protocol MVP

Bank-settled, token-registered **fixed-income note** (ERC-3643-compatible) with security-by-default CI and minimal ops for DvP + ISO 20022 reconciliation.

## Structure
- `contracts/` – Upgradeable fixed-income note + tests, invariants, scripts.
- `ops/` – DvP orchestrator + ISO 20022 recon stubs.
- `docs/` – Architecture, threat model, key rotation.
- `examples/` – Local deploy + DvP simulation.
- `assets/` – Mermaid diagrams.

## Getting Started (local)
Install Foundry deps:
```bash
forge install OpenZeppelin/openzeppelin-contracts OpenZeppelin/openzeppelin-contracts-upgradeable foundry-rs/forge-std
```

Install ops deps:
```bash
npm install
```

Run tests:
```bash
forge test
```

### `.github/CODEOWNERS`

  @kbb-protocol/core-team


/contracts/ @kbb-protocol/solidity
/ops/ @kbb-protocol/ops
/docs/ @kbb-protocol/docs


### `.github/SECURITY.md`
```markdown
# Security Policy
Report issues to **security@kbb.xyz**. We acknowledge within two business days.
Supported versions: `main`.
```
