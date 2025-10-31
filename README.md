# KBB Protocol MVP

This repository contains the smart contracts, operational tooling, and documentation for the KBB MVP deployment. The structure emphasises a single fixed-income instrument, pragmatic operations support, and security-by-default automation.

## Repository Structure

- `contracts/` – Foundry project implementing the ERC-3643 compatible fixed income note, along with upgrade, test, and fuzzing harnesses.
- `ops/` – Delivery-versus-payment orchestrator and reconciliation utilities for ISO 20022 statements.
- `docs/` – Architecture overview, threat model, and key rotation runbooks.
- `examples/` – Quick start scripts for local deployments and DvP simulations.
- `assets/` – Diagrams and other visual artefacts referenced throughout the docs.

Refer to the individual subdirectories for additional context and setup guidance.
