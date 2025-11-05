# ADR 0001: Delivery-versus-Payment (DvP) issuance only

- **Status:** Accepted
- **Date:** 2024-10-01
- **Deciders:** Protocol, treasury, transfer agent leads

## Context

We must ensure the token register only reflects settled cash positions. Investors fund subscriptions on regulated rails; the chain is a register & distribution layer.

## Decision

- Mint or transfer note units only after verified settlement evidence.
- Settlement evidence is adapter-produced with immutable `settlementRef` and `settlementNetwork`.
- DvP orchestration is the single entry point to mint supply.

## Consequences

- Prevents creating liabilities without cash backing.
- Requires robust adapter integrations with custodial rails.
- Adds latency equal to statement confirmation but maintains regulatory trust.
