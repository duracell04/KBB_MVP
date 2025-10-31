# Operations Tooling

Operational services supporting delivery-versus-payment (DvP) flows and bank statement reconciliation live in this package. The focus is on pragmatic, automatable tooling that supports the MVP instrument.

- `dvp/` contains a minimal orchestrator for happy-path settlement and OpenAPI documentation.
- `recon/` provides ISO 20022 adapters, a matching engine, and fixtures for testing recon processes.
