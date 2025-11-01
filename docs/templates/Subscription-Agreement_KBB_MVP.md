# Subscription Agreement (KBB_MVP Template)

**Instrument:** Fixed Income Note (face-value ERC-20 register)  
**Issuer:** ______________________________  
**Investor:** ______________________________  
**Annexes:** Annex A — On-Chain Register & Event Mapping (KBB_MVP)

---

## 1. Subscription
- **Amount Subscribed:** __________ (currency: ________)
- **Funding Rail:** ISO20022 / SWIFT / SEPA / ACH / FPS / Approved Stablecoin
- **Settlement Mechanics:** Delivery-versus-Payment (DvP); subscription deemed effective only upon confirmed receipt of cleared funds into the designated escrow account and subsequent on-chain event emission per Annex A.
- **Cut-Off:** Orders must fund by T+1 of trade date unless otherwise agreed in writing.

## 2. Representations & Eligibility
- Investor represents it satisfies the eligibility criteria in the Issuer's compliance registry (professional/qualified investor status, permitted jurisdiction, and sanctions screening).  
- Investor consents to the Issuer or its Transfer Agent querying `Registry.isEligible` and `Registry.lockupUntil` prior to each issuance or transfer.

## 3. Covenants
- Investor agrees to maintain accurate KYC/AML information and promptly notify of any change affecting eligibility.  
- Issuer will honour coupon and redemption payments as scheduled in Schedule 1, subject to applicable withholding tax.  
- Issuer will maintain covenant ratios as disclosed in the accompanying covenant schedule (DSCR ≥ 1.25x; leverage ≤ 4.0x) and report any breach via investor notices and on-chain flagging if applicable.  
- Transfer restrictions remain in force until `lockupEndsAt(holder)` has elapsed for each holder.

## 4. Default & Remedies
- Upon an Event of Default, Issuer may suspend coupons and investor-initiated transfers while enabling administrative unwind as described in Annex A.  
- Investors retain rights to information, meetings, and enforcement consistent with governing law.

## 5. Notices & Records
- Legal notices delivered via email and secure data room; operational notices mirrored through on-chain events enumerated in Annex A.  
- Settlement evidence references (MsgId/UETR/on-chain tx hash) must align between bank rails and protocol records to maintain reconciled status.

## 6. Governing Law & Jurisdiction
- Governing law: ______________________________  
- Forum: ______________________________

## 7. Signatures
Issuer: ______________________________  
Name / Title: ______________________________  
Date: ______________________________  

Investor: ______________________________  
Name / Title: ______________________________  
Date: ______________________________

> *This template is informational only and does not constitute legal advice. Parties should consult counsel to adapt for their specific transaction.*
