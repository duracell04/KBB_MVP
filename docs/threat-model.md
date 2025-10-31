# Threat Model

**Actors:** Issuer ops, Transfer agent, Investors, External attackers  
**Assets:** Identity records, Token supply, Bank balances  
**Risks:** Unauthorized mint/move, Admin key compromise, Recon mismatches  
**Controls:** RBAC (`AdminRoles`), DvP upon bank confirmation, Continuous recon
