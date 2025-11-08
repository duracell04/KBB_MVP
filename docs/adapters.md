# Settlement adapters (rail-agnostic)

Adapters turn rail-specific evidence into normalized settlement records consumed by the DvP orchestrator.

## Evidence sources

- ISO 20022 `camt.053/.054`
- SWIFT MT940/MT950
- SEPA Credit Transfer reports
- ACH / FPS statements
- Permitted stablecoin transfers (tx hash + attestation)

## Adapter output

```
{
  amount: number,
  currency: string,
  valueDate: string,
  settlementRef: string,
  settlementNetwork: "ISO20022" | "SWIFT" | "SEPA" | "ACH" | "FPS" | "ONCHAIN_STABLECOIN"
}
```

## Demo artifacts

- [`ops/examples/simulate-dvp.ts`](https://github.com/duracell04/KBB_MVP/blob/main/ops/examples/simulate-dvp.ts) — mocks settlement evidence & events.
- [`ops/recon/recon.py`](https://github.com/duracell04/KBB_MVP/blob/main/ops/recon/recon.py) — joins normalized evidence ↔ events.

## Implementation notes

- Preserve original message identifiers; do not invent refs.
- Capture `valueDate` for accrual boundary checks.
- Sign adapter outputs before handing to on-chain components.
- Maintain adapter-specific runbooks for incident response.
