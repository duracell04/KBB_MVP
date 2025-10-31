# Architecture Overview

The MVP issues a single ERC-3643-compatible fixed-income note. Investors subscribe via a DvP workflow that coordinates bank settlement with on-chain issuance.

```mermaid
graph TD
    Investor-->Bank
    Investor-->TransferAgent
    TransferAgent-->Note
    Bank-->DvPOrchestrator
    DvPOrchestrator-->Note


#### `docs/threat-model.md`
```markdown
# Threat Model

**Actors:** Issuer ops, Transfer agent, Investors, External attackers  
**Assets:** Identity records, Token supply, Bank balances  
**Risks:** Unauthorized mint/move, Admin key compromise, Recon mismatches  
**Controls:** RBAC (`AdminRoles`), DvP upon bank confirmation, Continuous recon
