# Eligibility & Permissioning

Transfers/mints are permissioned. Typical checks:
- KYC/AML verified
- Jurisdiction allowed
- Lockup window satisfied

**Policy examples**
- Primary issuance requires `eligible(investor) && notLocked(investor)`
- Secondary transfers require `eligible(from) && eligible(to) && !lockup(from)`

**Audit**
- Log all denials with reason codes
