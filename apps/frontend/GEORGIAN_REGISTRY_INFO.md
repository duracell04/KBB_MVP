# Georgian Registry & Depository Infrastructure

Reference guide for KBB issuer onboarding and compliance verification.

---

## Company Registration

### National Agency of Public Registry (NAPR)

**Authority:** State Business Register under the Ministry of Justice

**Entity Types:**
- **LLC (შპს)** — Limited Liability Company
- **JSC (სას/სააქციო საზოგადოება)** — Joint Stock Company

**Registration Process:**
- Applications filed online or in person at Public Service Halls
- Standard cases complete in ~1 business day
- Company receives state registration/ID number

**Public Search:**
- [NAPR Business Register Search](https://enreg.reestri.gov.ge)
- [NAPR About & Services](https://napr.gov.ge)

**Post-Registration:**
- Tax registration with Revenue Service (often linked in workflow)
- Bank account opening

**Reference:**
- [Invest in Georgia — How to Register a Business](https://investingeorgia.org/en/how-to-register-a-business) (document checklist, notarisation notes)

---

## Securities Depository Infrastructure

### GCSD (Georgian Central Securities Depository)

**Purpose:** Central depository for corporate securities

**Scope:**
- Corporate bonds
- Corporate shares
- GSE (Georgian Stock Exchange) settlements

**Functions:**
- Maintains issuer accounts
- Registers new issues
- ISIN assignment per GCSD rules
- Title registry for dematerialized securities

**Website:**
- [GCSD Official](https://csd.ge)

### NBG CSD (National Bank of Georgia CSD)

**Purpose:** Depository for government securities

**Scope:**
- Government bonds
- Treasury bills
- State-issued debt instruments

---

## KBB Integration Points

### Phase-1 Requirements

1. **Company Verification:**
   - NAPR registration number and extract
   - Legal entity type (LLC/JSC)
   - UBO chart from NAPR records

2. **Tax & Banking:**
   - Revenue Service tax ID
   - Bank account evidence (IBAN, bank name)
   - Escrow account designation

3. **Securities Registration:**
   - GCSD issuer account (if dematerialized)
   - ISIN assignment for bond issues
   - CSD mirror for legal title (Phase-1)

4. **KBB Token Layer:**
   - Register & distribution mirror
   - DvP settlement evidence tracking
   - On-chain events linked to CSD records

---

## Verification Workflow

```
NAPR Extract
    ↓
[Company Legal Status Verified]
    ↓
Revenue Service Tax ID
    ↓
[Tax Compliance Verified]
    ↓
GCSD Issuer Account
    ↓
[Securities Infrastructure Ready]
    ↓
KBB Onboarding Complete
```

---

## Key Documents Required

| Document | Source | Purpose |
|----------|--------|---------|
| Company Registry Extract | NAPR | Legal entity verification |
| UBO Chart | NAPR | Beneficial ownership |
| Tax ID Certificate | Revenue Service | Tax compliance |
| Bank Account Confirmation | Issuer's Bank | Settlement infrastructure |
| GCSD Issuer Account | GCSD | Securities depository |
| Audited Financials | Issuer/Auditor | Credit assessment |
| Board Resolution | Issuer | Authority to raise debt |

---

## Reference Links

- **NAPR:** https://napr.gov.ge
- **Business Register Search:** https://enreg.reestri.gov.ge
- **Invest in Georgia:** https://investingeorgia.org
- **GCSD:** https://csd.ge
- **Georgian Stock Exchange:** https://gse.ge

---

## Notes for KBB Ops Team

- Registry extracts are in Georgian; ensure translation for international investors
- GCSD registration timeline: allow 2-4 weeks for new issuer accounts
- ISIN assignment coordinated with GCSD; KBB does not assign ISINs directly
- Phase-1: legal title remains in GCSD; KBB token is register/distribution layer only
