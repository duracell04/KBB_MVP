# ISO20022 → Event Field Mapping (KBB_MVP)

| Purpose            | ISO20022 camt.054 XPath                        | Event Field           |
|--------------------|-----------------------------------------------|-----------------------|
| Settlement Ref     | /BkToCstmrDbtCdtNtfctn/Ntfctn/Ntry/AcctSvcrRef | settlementRef         |
| Alt Ref (MsgId)    | /BkToCstmrDbtCdtNtfctn/GrpHdr/MsgId            | settlementRef (alt)   |
| Amount             | /Ntry/Amt/@Ccy + text()                         | amount, currency      |
| Value Date         | /Ntry/ValDt/Dt                                  | (off-chain context)   |
| Debtor Name        | /Ntry/NtryDtls/TxDtls/RltdPties/Dbtr/Nm         | investor (off-chain)  |
| Creditor Account   | /Ntry/NtryDtls/TxDtls/RltdAcct/Id/IBAN          | escrowAccount (ops)   |
| Remittance Info    | /Ntry/NtryDtls/TxDtls/RmtInf/Ustrd              | memo / settlementRef2 |

> Use the settlement reference as the join key to `SubscriptionSettled.settlementRef` for reconciled DvP proofs.
