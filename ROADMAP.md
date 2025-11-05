# Roadmap

## MVP (this repo)
- ✅ FixedIncomeNote demo + events
- ✅ ACT/360 & 30/360 (US) with edge tests
- ✅ 60s DvP→Recon demo + artifacts
- ✅ JSON Schemas (events, recon report) + CI validation

## Next
- Eligibility/DvP seams: `IRegistry`, `ITransferAgent` (+ minimal stubs)
- Recon “near-miss” classification (amount drift, FX, partials)
- Event JSON Schema → Solidity typegen (hardening)
- Compliance: wire `CovenantManager` behind an upgradeable pattern

## Later
- Record date & snapshot logic
- Failure drills (late/partial funds, refunds) and ops runbooks
- RevenueShareNote SKU (cash sweep + DSRA)
