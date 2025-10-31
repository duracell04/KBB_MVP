# KBB Protocol — MVP (CI-ready)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](#license--disclaimer)
[![Solidity](https://img.shields.io/badge/Solidity-%5E0.8.x-informational.svg)]()
[![Foundry](https://img.shields.io/badge/Foundry-tested-success.svg)]()
[![Security CI](https://img.shields.io/badge/Security-CI-green.svg)]()

**Bank-settled, token-registered fixed-income note** with permissioned transfers (ERC-3643-compatible), **Delivery-versus-Payment (DvP)** orchestration, and **ISO 20022** bank-statement reconciliation. Built for professional/qualified investors and real-world issuers that need enforceable cash flows and institutional-grade controls.
*Vision:* Bridge global capital to Georgian SMEs with **bank escrow as the legal source of truth** and tokens as the **register/distribution** rail.

---

## Table of contents

* [What this MVP includes](#what-this-mvp-includes)
* [Architecture at a glance](#architecture-at-a-glance)
* [Smart-contract design](#smart-contract-design)
* [Off-chain services](#off-chain-services)
* [Security & compliance posture](#security--compliance-posture)
* [Repository structure](#repository-structure)
* [Getting started](#getting-started)
* [Run the demos](#run-the-demos)
* [Event schema (for reconciliation)](#event-schema-for-reconciliation)
* [Roadmap](#roadmap)
* [Contributing & security reports](#contributing--security-reports)
* [License & disclaimer](#license--disclaimer)
* [About KBB (context)](#about-kbb-context)

---

## What this MVP includes

### Core instrument

`FixedIncomeNote` — upgradeable, ERC-3643-compatible debt token:

* Whitelisting, lockups, and jurisdiction/role-based transfer rules
* Coupon scheduler with **ACT/360** and **30/360** day-count conventions
* Default mode (halts coupons/transfers except admin unwind)
* Admin pause & upgrade timelock

### Operational minimums

* **DvP orchestrator (happy path):** conditional mint/transfer only on reconciled cash receipt
* **ISO 20022 reconciliation:** parse **camt.053/054** and match to on-chain events
* **Security CI:** **Slither**, **Foundry** unit tests, **Echidna** fuzzing, **Semgrep** static checks

### Docs (stakeholder-friendly)

* Architecture overview (bank-settled, token-registered model)
* Threat model (actors, assets, risks, controls)
* Key-rotation runbook (MPC/multisig)

> **Why fixed income first?** International allocators prefer predictable coupons and clean legal posture; revenue-share can be added later as a separate SKU.

---

## Architecture at a glance

```mermaid
flowchart LR
  A[Investor (KYC'd)] -->|Subscription| B(Escrow Bank Account)
  B -->|camt.054 advice| C[Reconciliation Adapter]
  C -->|match & attest| D[DvP Orchestrator]
  D -->|mint/transfer if funded| E((FixedIncomeNote))
  E -->|coupon events| F[On-chain Payment Log]
  B -->|coupon wire| G[Investor Bank]
  F -->|reference IDs| C
```

**Principles**

1. **Legal primacy:** Off-chain note/escrow agreements govern; the chain is the **register/distribution** layer.
2. **DvP only:** Tokens move **only** against reconciled fiat (or whitelisted stablecoin) receipts.
3. **Permissioned transfers:** Whitelist + roles enforce eligibility, lockups, and jurisdiction rules.
4. **Observability:** Every coupon/redemption emits an on-chain event keyed to a bank reference (UETR/MsgId) for audit-ready reconciliation.

---

## Smart-contract design

**Contracts (Solidity)**

* `core/FixedIncomeNote.sol` — ERC-20-like interface with ERC-3643-style permissions
* `core/DayCount.sol` — ACT/360, 30/360 (hooks for ACT/ACT)
* `core/AdminRoles.sol` — `ISSUER_ROLE`, `TRANSFER_AGENT_ROLE`, `PAUSER_ROLE`, `UPGRADER_ROLE`
* `upgrades/UUPSUpgradeableNote.sol` — upgradeable pattern with timelock

**Key features**

* **Whitelist & lockups:** Enforced at `transfer`/`transferFrom`; per-address lockups, geo/role gates
* **Coupon logic:** Schedule + accrual functions; rounding bounded & tested
* **Default handling:** `setDefault(true)` freezes investor transfers (except controlled unwind) and halts new coupons
* **Admin safety:** Pausable paths; timelocked upgrades; role-scoped force-transfers for legal unwind

**Invariants & properties (tested)**

* Coupons never exceed accrual to date (any supported day-count)
* Transfers revert if either party fails whitelist or lockup
* Default state halts coupons and investor-initiated transfers
* Upgrades executable only by `UPGRADER_ROLE` after timelock

**Testing**

* **Foundry** unit & integration tests (`contracts/test/*`)
* **Echidna** fuzz harness (`contracts/echidna/*`) enforcing the invariants above

---

## Off-chain services

### DvP orchestrator (`ops/dvp/`)

**Goal:** atomically link cash to token issuance

**API (OpenAPI in `openapi.yaml`)**

* `POST /subscriptions` → create order after KYC
* `POST /subscriptions/{id}/fund` → attach bank **camt.054** advice or stablecoin tx hash
* `POST /settle/{id}` → mint/transfer if fully funded and before deadline (idempotent)
* `POST /refund/{id}` → rollback for late/partial funds

**Idempotency:** All endpoints keyed by `orderId`; safe on retries.
**Source-of-truth reference:** Stores the bank **UETR/MsgId** (or stablecoin tx) and writes it into on-chain `SubscriptionSettled` metadata.

### ISO 20022 reconciliation (`ops/recon/`)

* **Parsers:** `camt.053` (statements) & `camt.054` (credit advices)
* **Matcher:** `(amount, currency, valueDate, MsgId/UETR)` ↔ on-chain `eventId`
* **Outputs:** JSON/CSV of matched items and breaks (under/over/duplicate)

---

## Security & compliance posture

* **Permissioning:** ERC-3643-compatible controls (whitelists, roles, lockups, geo rules) on transfers
* **Key management:** Designed for MPC/multisig; issuer controls admin keys; emergency guardian is separate
* **Upgrades:** UUPS with a **≥48 h** timelock; emergency pause documented
* **Reconciliation:** No issuance without a **reconciled** cash receipt; `eventId` ↔ bank **MsgId/UETR`
* **Disclosure:** Private, coordinated security disclosures via `SECURITY.md`
* **Eligibility:** MVP targets **professional/qualified** investors; **whitelisted OTC** transfers only (no public exchange promises)

See `.github/SECURITY.md`, `docs/threat-model.md`, and `docs/runbooks/key-rotation.md`.

---

## Repository structure

```
contracts/     # FixedIncomeNote + tests/invariants + upgrades
ops/           # DvP orchestrator (TS) + ISO 20022 recon (TS/Py)
docs/          # Architecture overview, threat model, key rotation
examples/      # Local deploy + DvP simulation
assets/        # Mermaid diagrams (system.mmd, dvp-sequence.mmd)
.github/       # CI (Slither/Foundry/Echidna/Semgrep), SECURITY.md
```

---

## Getting started

### Prerequisites

* **Node.js** ≥ 18 (for ops)
* **Foundry** (Solidity toolchain): [https://book.getfoundry.sh/](https://book.getfoundry.sh/)
* **Python** 3.10+ (optional, for recon matching engine)

### Install Solidity dependencies

```bash
forge install \
  OpenZeppelin/openzeppelin-contracts \
  OpenZeppelin/openzeppelin-contracts-upgradeable \
  foundry-rs/forge-std
```

### Build & test contracts

```bash
forge build
forge test -vv
# Property tests (see contracts/echidna/config.yaml)
```

### Run static analysis

```bash
# Use local tools or rely on CI
slither .
semgrep --config p/solidity --error
```

### Install ops services

```bash
cd ops
npm install
# or: pnpm install / yarn
```

### Configure environment (sample)

Create `.env` for `ops/dvp/`:

```
PORT=8080
RPC_URL=<your-evm-rpc>
PRIVATE_KEY=<issuer-admin-key>
ESCROW_IBAN=<iban-for-docs-only>
ALLOWED_CURRENCIES=USD,EUR
```

---

## Run the demos

### 1) Local deploy (contracts)

```bash
# Terminal A
anvil
# Terminal B
forge script contracts/script/DeployFixedIncomeNote.s.sol \
  --rpc-url http://localhost:8545 --broadcast --ffi
```

### 2) DvP happy path (simulate)

```bash
# Start the DvP service
npm --prefix ops run dvp:start

# Create subscription (investor already KYC’d in this demo)
curl -sS -X POST localhost:8080/subscriptions \
  -H 'Content-Type: application/json' \
  -d '{ "investor":"0xabc...", "amount":"100000", "currency":"USD" }'

# Attach funding proof (camt.054) and settle
curl -sS -X POST localhost:8080/subscriptions/<id>/fund \
  -F file=@ops/recon/fixtures/camt.054.sample.xml
curl -sS -X POST localhost:8080/settle/<id>
```

### 3) Reconciliation report

```bash
npm --prefix ops run recon:match \
  -- --053 ops/recon/fixtures/camt.053.sample.xml \
     --054 ops/recon/fixtures/camt.054.sample.xml \
     --events out/events.json
# Outputs matched JSON + CSV of breaks
```

---

## Event schema (for reconciliation)

**On-chain (`FixedIncomeNote`)**

* `SubscriptionSettled(orderId, investor, amount, currency, receiptHash, msgIdOrUetr)`
* `CouponPaid(periodId, grossAmount, withholding, netAmount, msgIdOrUetr)`
* `RedemptionPaid(amount, msgIdOrUetr)`

**Bank references**

* **camt.054** `Ntry/AcctSvcrRef` or `Refs/MsgId` (and **UETR** if available) → stored alongside the event
* Used as the **join key** for deterministic reconciliation and audit trails

---

## Roadmap

### MVP (this repo)

* FixedIncomeNote with ERC-3643-compatible controls ✅
* DvP orchestrator (happy path) ✅
* ISO 20022 recon adapter + fixtures ✅
* Security CI (Slither/Foundry/Echidna/Semgrep) ✅

### Phase-2

* RevenueShareNote (cash-sweep + DSRA)
* Withholding/FATCA/CRS exports
* DvP rollback runbook & failure drills (late/partial funds)
* Additional day-count conventions (ACT/ACT with ICMA vectors)

---

## Contributing & security reports

* Please read `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` before opening a PR.
* **Security issues:** follow `.github/SECURITY.md` (coordinated disclosure; we triage within 24 h).
* Good-first issues: look for labels `good first issue` and `security`.

---

## License & disclaimer

* **License:** MIT (or Apache-2.0 if you prefer patent protection; update `LICENSE` accordingly).
* **Disclaimer:** This repository is **technical documentation and reference code only**. It is **not** an offering of securities or a solicitation to invest. Any future offering would occur via private-placement documents to eligible investors with full KYC/AML and jurisdictional legends.

---

## About KBB (context)

KBB’s goal is to unlock growth financing for Georgian SMEs by standardizing **bank-settled** issuance with **token-registered** distribution—think “Eurobond-like access for SMEs,” starting with professional investors and whitelisted transfers.

> Questions or integration ideas? Open a Discussion or an Issue—this repo aims to be a **technical whitepaper in code** for partners, auditors, and regulators.

---

**Micro-improvements I made**

* Consistent heading grammar + concise bullets.
* Added small badges (feel free to remove).
* Harmonized terms (MsgId/UETR, DvP, ACT/360).
* Safer curl examples (`-sS`) and explicit content types.
* Minor typos/quoting fixes and clearer invariants section.

Want me to also generate the matching `SECURITY.md`, `CONTRIBUTING.md`, and a minimal `.github/workflows/security.yml` that runs Slither/Foundry/Echidna/Semgrep on PRs?
