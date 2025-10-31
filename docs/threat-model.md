# Threat Model

## Actors
- Issuer operations
- Transfer agent
- Investors
- Malicious external attackers

## Assets
- Investor identity records
- On-chain token supply
- Bank account balances

## Risks
- Unauthorized minting or transfers
- Compromised admin keys
- Reconciliation mismatches

## Controls
- Role-based access control enforced by `AdminRoles`
- Multi-step DvP settlement requiring bank confirmation
- Continuous monitoring via reconciliation tooling
