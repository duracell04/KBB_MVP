# ADR 0002: Rail-agnostic register & distribution layer

- **Status:** Accepted
- **Date:** 2024-10-01
- **Deciders:** Protocol, ops, compliance leads

## Context

The product must interoperate with multiple payment rails (ISO 20022, SWIFT, SEPA, ACH, FPS, and select stablecoins) without depending on any single rail's settlement finality semantics.

## Decision

- Treat the blockchain as the canonical register & distribution layer, independent of payment rail.
- Normalize settlement evidence from adapters into a shared event schema.
- Keep rail-specific logic off-chain to remain regulation-aware and auditable.

## Consequences

- Simplifies on-chain contracts; complexity lives in adapters and ops processes.
- Enables future rails to be added by providing new adapters + schemas.
- Requires strict reconciliation to guarantee register accuracy across rails.
