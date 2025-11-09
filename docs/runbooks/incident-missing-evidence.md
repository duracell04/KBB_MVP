# Incident — Missing Settlement Evidence

**Symptom:** On-chain event missing for a known bank row (or vice versa)

**Actions**
- Pull adapter logs by `settlementRef`
- Retry attestation with idempotency
- Escalate to bank liaison with evidence bundle

**Close-out**
- Write postmortem with root cause & prevention
