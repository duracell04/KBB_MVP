# Architecture Overview

The MVP issues a single ERC-3643-compatible fixed-income note. Investors subscribe via a DvP workflow that coordinates bank settlement with on-chain issuance.

```mermaid
graph TD
    Investor-->Bank
    Investor-->TransferAgent
    TransferAgent-->Note
    Bank-->DvPOrchestrator
    DvPOrchestrator-->Note
