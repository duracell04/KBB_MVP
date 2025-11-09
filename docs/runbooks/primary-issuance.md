# Runbook — Primary Issuance (DvP)

**Goal:** Investor subscribes; tokens appear **only** after funds settle.

## Steps
1. Generate order `orderId`
2. Investor wires with the correct rail reference
3. Adapter receives evidence → attest to DvP
4. Observe `SubscriptionSettled` event with rail reference
5. Reconciliation job matches bank row ↔ event
6. Exception queue if no match within T+1

## Verification checklist
- [ ] Bank statement row present
- [ ] Event emitted with identical `settlementRef` & `settlementNetwork`
- [ ] Investor whitelisted; lockups enforced
