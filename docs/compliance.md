# Compliance (preview)

`CovenantManager` tracks covenant signals (e.g., DSCR, LTV) and exposes a queryable status for custodians and auditors.

## Data model

- **Thresholds:** configurable per covenant (`breachIfBelow` / `breachIfAbove`).
- **Updates:** `CovenantUpdated` events when metrics change.
- **Breaches:** `CovenantBreached` events when values cross thresholds.

## Queries

- `getComplianceStatus()` → `{ fullyCompliant: bool, breachedIds: bytes32[] }`
- `getCovenant(bytes32 id)` → latest metadata + values.

## Operational hooks

- Ingest covenant metrics from treasury/ERP systems.
- Emit alerts when `fullyCompliant` flips to `false`.
- Document escalation steps in runbooks.

## Roadmap

- Back covenant data with signed attestations.
- Integrate with upgradeable governance before production.
- Align covenant vocabulary with legal documentation.
