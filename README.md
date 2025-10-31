# KBB Protocol MVP

Bank-settled, token-registered **fixed-income note** (ERC-3643-compatible) with security-by-default CI and minimal ops for DvP + ISO 20022 reconciliation.

## Repository Structure
- `contracts/` – Fixed-income note (upgradeable), tests, fuzzing, scripts.
- `ops/` – DvP orchestrator and ISO 20022 recon stubs.
- `docs/` – Architecture, threat model, key rotation.
- `examples/` – Local deploy + DvP simulation.
- `assets/` – Mermaid diagrams.

## Getting Started

Install Foundry deps locally:
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

#### `CONTRIBUTING.md`
```markdown
# Contributing

1. Create a feature branch.
2. Install Foundry and Node.js deps.
3. Ensure tests + security scans pass.

**Coding standards**
- Use Foundry patterns and document external funcs.
- Add tests for new features/bug fixes.

**PRs**
- Clear description + rationale.
- Link related issues/design docs.
- CI must pass (Foundry, Slither, Echidna, Semgrep).
```
