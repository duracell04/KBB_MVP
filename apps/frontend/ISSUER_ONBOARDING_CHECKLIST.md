# Issuer Onboarding Checklist

One-page mapping from Georgian registry infrastructure to KBB requirements.

---

## Pre-Flight (5 min)

- [ ] Issuer type: LLC (შპს) or JSC (სას)
- [ ] Registered with NAPR
- [ ] Operating ≥12 months
- [ ] Target raise: USD/EUR/GEL 0.5–10m, tenor 12–36m

---

## 1. NAPR Company Details

**From Public Registry Extract:**

| Field | KBB Portal Entry |
|-------|------------------|
| Legal Name (EN + KA) | `company.legal_name` |
| Registration Number | `company.registration_number` |
| Registration Date | `company.registration_date` |
| Registered Address | `company.address` |
| Legal Form (LLC/JSC) | `company.entity_type` |
| Authorized Capital | `company.authorized_capital` |

**Required Documents:**
- [ ] NAPR registry extract (PDF, <6 months old)
- [ ] English translation (certified if for foreign investors)
- [ ] UBO chart showing beneficial owners (≥25% stakes)

**Who Signs:**
- [ ] Director(s) with authority per NAPR records
- [ ] Board resolution authorizing debt issuance (if JSC)

---

## 2. Tax & Bank Evidence

**Revenue Service:**

| Field | KBB Portal Entry |
|-------|------------------|
| Tax ID Number | `company.tax_id` |
| Tax Registration Date | `company.tax_registration_date` |
| VAT Registration (if applicable) | `company.vat_registered` |

**Banking:**

| Field | KBB Portal Entry |
|-------|------------------|
| Bank Name | `company.primary_bank` |
| IBAN (Operating) | `company.operating_iban` |
| IBAN (Escrow/Subscription) | `company.escrow_iban` |
| SWIFT/BIC | `company.swift_code` |

**Required Documents:**
- [ ] Tax ID certificate
- [ ] Bank account confirmation letter
- [ ] Bank reference letter (good standing)
- [ ] Escrow account mandate (ISO 20022 compatible)

---

## 3. GCSD Issuer Account

**Central Securities Depository:**

| Field | KBB Portal Entry |
|-------|------------------|
| GCSD Issuer Account Number | `company.gcsd_account` |
| GCSD Registration Date | `company.gcsd_registration_date` |
| ISIN (if existing issues) | `company.existing_isins[]` |

**For New Issuers:**
- [ ] Apply for GCSD issuer account (2-4 weeks lead time)
- [ ] Coordinate ISIN assignment with GCSD for this raise
- [ ] Confirm GCSD CSD mirror requirements with KBB tech

**Required Documents:**
- [ ] GCSD issuer account confirmation
- [ ] GCSD fee payment receipt
- [ ] Issue registration application (GCSD format)

---

## 4. KBB KYB Fields

**Company Profile:**

- [ ] Legal name, reg no., LEI (if any)
- [ ] Directors/officers (name, DOB, nationality, ID)
- [ ] UBOs (name, ownership %, KYC docs)
- [ ] Contact (email, phone, address)
- [ ] Logo & short description (200 chars)

**Raise Parameters:**

| Parameter | Value | KBB Field |
|-----------|-------|-----------|
| Target Size | e.g., USD 2,000,000 | `raise.target_amount` |
| Currency | USD/EUR/GEL | `raise.currency` |
| Tenor | e.g., 24 months | `raise.tenor_months` |
| Coupon | e.g., 850 bps | `raise.coupon_bps` |
| Day Count | ACT/360 or 30/360 | `raise.day_count` |
| Payment Frequency | Quarterly/Semi-annual | `raise.payment_frequency` |
| Min Denomination | e.g., USD 100,000 | `raise.min_denomination` |

**Use of Proceeds:**
- [ ] Narrative (200 words max)
- [ ] Category (growth/CapEx/refinancing)

**Covenants:**

| Covenant | Threshold | Data Source | KBB ID |
|----------|-----------|-------------|--------|
| DSCR | ≥ 1.25x | Quarterly FS | `DSCR_ISS01` |
| Leverage | ≤ 3.5x | Quarterly FS | `LEV_ISS01` |
| Min Liquidity | ≥ GEL 500k | Bank statement | `LIQ_ISS01` |

---

## 5. Financials & Credit

**Required Documents:**
- [ ] 2–3 years audited financial statements
- [ ] Latest management accounts (YTD)
- [ ] Cash flow model (12-month forward)
- [ ] Tax compliance certificate

**Independent Review:**
- [ ] Credit reviewer assigned (KBB panel)
- [ ] Credit note & risk grade received
- [ ] Pricing guidance confirmed

---

## 6. Legal Stack

**Documents:**
- [ ] Subscription agreement (EN)
- [ ] Information memorandum (EN)
- [ ] Terms supplement (DvP, CSD mirror, eligibility)
- [ ] Paying agent mandate
- [ ] Escrow agreement (ISO 20022)
- [ ] Tax withholding annex

**KBB-Specific:**
- [ ] Annex A: On-chain mapping (events schema)
- [ ] Professional-only eligibility declaration
- [ ] Whitelisted transfer terms

---

## 7. Tech Setup (2-3 days)

**KBB Platform:**
- [ ] Issuer admin account created
- [ ] Admin keys provisioned (MPC/multisig)
- [ ] DvP orchestration wired to escrow bank
- [ ] Events schema enabled (`SubscriptionSettled`, `CouponPaid`, `RedemptionPaid`)
- [ ] CovenantManager IDs primed

**Testing:**
- [ ] Sample camt.054 validated (from escrow bank)
- [ ] Test events.json validated (ajv schema)
- [ ] Record date logic confirmed

---

## 8. Go-Live Checklist

**Pre-Launch:**
- [ ] All KYB documents uploaded & verified
- [ ] Credit review complete
- [ ] Legal docs signed
- [ ] GCSD coordination confirmed
- [ ] Tech stack tested

**Launch:**
- [ ] Teaser/IM distributed to professional investors
- [ ] Bookbuild open
- [ ] Escrow account active
- [ ] DvP monitoring live

---

## Summary Mapping

```
NAPR Extract
   ↓
[Legal Entity Verified]
   ↓
Tax ID + Bank IBAN
   ↓
[Settlement Infrastructure Ready]
   ↓
GCSD Issuer Account
   ↓
[CSD Mirror Configured]
   ↓
KBB Platform Setup
   ↓
[Tech + Events Enabled]
   ↓
Credit Review + Legal Docs
   ↓
[Ready for Placement]
```

---

## Timeline

| Phase | Duration | Owner |
|-------|----------|-------|
| Eligibility check | 15–30 min | Issuer + KBB BD |
| NAPR/Tax/Bank docs | 1–2 days | Issuer |
| GCSD account (if new) | 2–4 weeks | Issuer + GCSD |
| Credit review | 5–7 days | Reviewer |
| Legal docs | 3–5 days | Counsel |
| Tech setup | 2–3 days | KBB Tech |
| **Total (existing GCSD)** | **2–3 weeks** | — |
| **Total (new GCSD)** | **4–6 weeks** | — |

---

## Contact Points

- **NAPR queries:** NAPR Public Service Hall or online portal
- **GCSD registration:** csd.ge / registry team
- **KBB onboarding:** issuer-ops@kbb.ge (placeholder)
- **Legal coordination:** legal@kbb.ge (placeholder)

---

## Notes

- All amounts in KBB are stored in **minor units** (e.g., USD cents)
- GCSD coordination is **critical**; start early
- Professional-only placement (Phase-1); no retail eligibility
- DvP only; no token issuance without settlement evidence
