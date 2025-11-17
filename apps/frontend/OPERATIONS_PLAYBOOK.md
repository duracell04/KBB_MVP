# KBB Operations Playbook

> **Positioning:** KBB (Kartvelian Business Bonds) enables **cash‑settled via regulated rails, token‑registered** private debt that is simple, auditable, and eligible for professional investors.

---

## How a Georgian Company Registers on KBB

### 0) Eligibility & Quick Fit (15–30 min)

* **Issuer type:** Georgian LLC/JSC (SME or mid-cap)
* **Use of proceeds:** growth / CapEx / refinancing
* **Ticket & tenor target:** e.g., USD/EUR/GEL 0.5–10m, 12–36m
* **Baseline covenants:** DSCR/Leverage, information undertakings

> If it's a fit, proceed to KYB and data room.

---

### 1) Issuer Onboarding (KYB) — "Company Registration"

**Owner:** KBB Issuer Ops + Transfer Agent

**Deliverables:**

* **KYB pack:** Registry extract, UBO chart, directors' KYC, sanctions/PEP screening
* **Financials:** 2–3 years audited (or reviewed) FS, management accounts YTD, cash-flow model
* **Banking:** escrow bank selected (IBAN for subscription; coupon/redemption account)
* **Raise parameters:** target size, currency, tenor, coupon (bps), day-count (ACT/360 or 30/360), payment frequency, min denomination

**KBB System Entries (portal form):**

* Legal name, reg no., LEI (if any), tax no., address
* Officers/UBOs, KYC docs, contact
* Term sheet inputs (above), use of proceeds, timetable
* **Covenant candidates** (+ data sources for monitoring)
* Media files (logo), short "credit story"

---

### 2) Independent Risk Review & Basic Rating (3rd-party)

**Owner:** External reviewer from KBB panel

**What happens:**

* Desktop credit review (business, financials, collateral if any)
* Scorecard → **risk grade** (e.g., BBB-/BB+ internal scale)
* Pricing guidance (coupon range) and **covenant thresholds** (e.g., DSCR ≥ 1.25x)
* **Fact-check** of disclosures

**Outputs uploaded to KBB:**

* **Credit Note (PDF)** + one-page summary for investors
* Proposed **covenant set** (IDs + thresholds) to program into the **CovenantManager** (on-chain status exposure for custodians)

---

### 3) Legal & Documentation (private placement, professional-only)

**Owner:** Issuer counsel + KBB counsel

**Stack:**

* **Subscription Agreement** + **Information Memorandum** (EN ok)
* **Terms Supplement** explicitly stating:
  – legal title in **CSD** (GCSD/NBG CSD) in Phase-1
  – KBB token is a **register/distribution mirror**
  – **DvP-only** issuance based on verifiable **settlement evidence**
  – eligibility/lockups; whitelisted OTC transfers only
* Paying agent / escrow mandate with ISO 20022 statements/advices
* **Tax paragraph** (withholding, treaty claims)

KBB creates **Annex A (On-chain mapping)**: each legal clause ↔ **event fields** (`settlementRef`, `settlementNetwork`, `CouponPaid`, etc.).

---

### 4) Tech & Accounts (2–3 days, parallel)

**Owner:** KBB Tech + Transfer Agent + Escrow bank

* **KBB issuer profile** created; issuer **admin keys** (MPC/multisig)
* **DvP orchestration** wired to the bank: receive **camt.054** (credit advice)
* **Events schema** enabled; sample **events.json** validated (ajv)
* **CovenantManager** primed with IDs (`DSCR_ISS01`, `LEV_ISS01`, …)
* **Record date** logic (optional snapshot) decided

---

### 5) Placement (bookbuild → allocate → settle)

**Owner:** KBB Placement + Transfer Agent

**Who can buy in Phase-1:** **professional/qualified investors** only (eligibility whitelisted per jurisdiction; diaspora pros allowed).

**Flow (happy path):**

1. **Teaser/IM** to pro investors (incl. diaspora HNW/family offices that qualify)
2. **Soft Circle → Allocation** (min size, denomination)
3. **Fund to escrow** (bank rails); bank emits **camt.054** with **MsgId/UETR**
4. **DvP**: KBB **matches evidence** → mints/transfers tokens to investor's whitelisted wallet **and** updates CSD mirror (if required)
5. Emit `SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)`

**If stablecoins allowed by policy:** alternatively verify **USDC tx hash** from allow-listed wallet; still professional-only.

---

### 6) Servicing & Monitoring (T+ lifecycle)

**Owner:** Issuer Ops + KBB Servicing

* **Coupons/redemptions** paid from paying-agent account; upon bank evidence: emit `CouponPaid` / `RedemptionPaid` with `settlementRef`
* **Covenants:** quarterly upload of metrics (or API to ERP); **CovenantManager** flags breaches; **ComplianceStatus** exposed read-only to custodians
* **Reports:** investor CSV/JSON, regulator recon pack, events archive (hash-signed)

---

## Investor Side (including Georgian Diaspora)

### A) Phase-1 (what's allowed now)

* **Professional/qualified investors only** (per home-country rules)
* Georgian diaspora investors **can participate if they are professional** (e.g., HNWI meeting MiFID pro criteria) or invest via a **qualified intermediary** (bank/asset manager) that is on the whitelist

**Onboarding steps:**

1. **KYC/eligibility** (jurisdiction, status, sanctions)
2. Wallet whitelisting (or custodian account)
3. Subscription & **DvP** funding; receive tokens in whitelisted wallet/custody
4. Corporate actions reported via on-chain events + email pack

### B) Path to Reach Broader Diaspora (retail)

Retail everywhere is **not** feasible from Georgia alone. Two safe routes:

1. **Foreign wrapper / venue**
   * Raise into a **Lux securitization** or **Swiss ledger-based** wrapper, listed/distributed to eligible retail **there**, then pass proceeds to Georgian issuer
   * KBB remains **servicer + register tech**

2. **ECSPR-style crowdfunding** (if/when Georgia adopts rules or via an EU platform partner)
   * Ticket caps, risk warnings, suitability checks; KBB integrates as **register + DvP** rail under the platform's license

> Until then, keep KBB **professional-only**, while you build the wrapper channel to let diaspora retail in via **host-country permissions**.

---

## Data Collection & Templates

### Issuer KYB Form (portal fields)

* Company legal name, reg no., LEI, tax ID, address
* Directors/UBOs (name, DOB, nationality, doc type/number), proof of address
* Financials upload (PDFs) + covenant data sources
* Raise parameters (size, currency, tenor, coupon bps, day-count, frequency, min denomination)
* Bank details (escrow, paying); contact for ops/legal

### Investor Onboarding (pro-only)

* Jurisdiction, investor type (professional/HNWI), KYC docs, AML screening
* Wallet address or custodian account; lockup/eligibility flags; consent to private-placement terms

### On-chain Events

* `SubscriptionSettled(orderId, investor, amount, currency, settlementRef, settlementNetwork)`
* `CouponPaid(periodId, gross, withholding, net, settlementRef, settlementNetwork)`
* `RedemptionPaid(amount, settlementRef, settlementNetwork)`

---

## Responsibility Matrix (RACI)

| Task                          | Issuer | KBB   | Transfer Agent | Escrow Bank | Reviewer |
|-------------------------------|--------|-------|----------------|-------------|----------|
| KYB / KYC                     | **R**  | C/A   | C              | C           | –        |
| Credit review                 | C      | C     | –              | –           | **R**    |
| Docs (IM + Subs + Annex)      | **R**  | C/A   | C              | –           | C        |
| DvP setup (ISO 20022)         | –      | **A** | **R**          | **R**       | –        |
| Bookbuild/allocation          | **R**  | **A** | C              | –           | –        |
| Settlement                    | –      | **A** | **R**          | **R**       | –        |
| Servicing (coupons)           | **R**  | A     | C              | **R**       | –        |
| Covenant updates              | **R**  | A     | –              | –           | C        |

**R** = Responsible, **A** = Accountable, **C** = Consulted

---

## Messaging Guidelines (issuer-facing)

> **What KBB is:** cash-settled via regulated rails; on-chain is the register & distribution layer. We place **professional-only** today. You fund into an **escrow account**; tokens are delivered **DvP** after verified funds. Coupons/redemptions are paid via bank rails and logged on-chain for audit.

> **Your gains:** broader professional investor access (including diaspora professionals through custodians), faster closing, and transparent servicing—without changing your accounting or banking stack.

---

## Key Principles

1. **Cash settlement via regulated rails** (bank wires, ISO 20022)
2. **Tokens = register & distribution layer** (not payment rails)
3. **Professional investors only** (Phase-1)
4. **DvP only** (no unsecured token issuance)
5. **Transparent servicing** (on-chain events + bank evidence)
6. **Compliance-first** (whitelisted transfers, covenant monitoring)
