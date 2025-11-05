# Failure modes & incident patterns

## Late or partial funds

- **Trigger:** Rail statement missing expected settlement before cutoff.
- **Action:**
  - Flag investor order as pending; do not mint.
  - Notify treasury; request confirmation of payment initiation.
  - Update recon report with outstanding break.

## Duplicate settlement references

- **Trigger:** Adapter surfaces identical `settlementRef` more than once.
- **Action:**
  - Halt associated investor transfers.
  - Investigate rail statement (possible reversal or retry).
  - Document decision in recon notes; update ADRs if systemic.

## Refunds / reversals

- **Trigger:** Negative amount for prior `settlementRef`.
- **Action:**
  - Emit compensating event or adjust outstanding balance.
  - Tie reversal to original `settlementRef` for audit trace.
  - Update investors via transfer agent notifications.

## Schema validation failures

- **Trigger:** `npm run validate:events` or `npm run validate:recon` fails in CI.
- **Action:**
  - Review schema diffs; ensure fixtures updated.
  - Regenerate demo artifacts locally and re-run CI.
  - Communicate downstream consumers about breaking changes.

## Rail downtime

- **Trigger:** Bank statement feeds unavailable post-cutoff.
- **Action:**
  - Extend funding window per legal docs.
  - Capture manual attestations from custodian.
  - Record exception in this runbook with timestamp & approval.
