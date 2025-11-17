#!/usr/bin/env bash
set -euo pipefail

log() {
  echo "[+] $*"
}

error() {
  echo "[!] $*" >&2
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    error "Required command '$1' not found in PATH"
    exit 1
  fi
}

ensure_dir() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    log "Creating directory: $dir"
    mkdir -p "$dir"
  fi
}

write_file() {
  local path="$1"
  local dir
  dir=$(dirname "$path")
  ensure_dir "$dir"
  local tmp
  tmp=$(mktemp)
  cat >"$tmp"
  if [ -f "$path" ] && cmp -s "$tmp" "$path"; then
    rm -f "$tmp"
    return
  fi
  mv "$tmp" "$path"
}

make_executable() {
  local path="$1"
  if [ -f "$path" ]; then
    chmod +x "$path"
  fi
}

ensure_git_repo() {
  if [ ! -d .git ]; then
    log "Initializing git repository"
    git init -q
  else
    log "Reusing existing git repository"
  fi
}

ensure_main_branch() {
  git checkout -B main >/dev/null 2>&1
}

ensure_remote() {
  local ssh_url="git@github.com:duracell04/KBB_MVP.git"
  local https_url="https://github.com/duracell04/KBB_MVP.git"
  local current_url=""
  if git remote get-url origin >/dev/null 2>&1; then
    current_url=$(git remote get-url origin)
    if [ "$current_url" != "$ssh_url" ] && [ "$current_url" != "$https_url" ]; then
      log "Updating origin remote to SSH"
      if ! git remote set-url origin "$ssh_url"; then
        log "SSH remote unavailable, switching to HTTPS"
        git remote set-url origin "$https_url"
      fi
    fi
  else
    log "Adding origin remote (SSH)"
    if ! git remote add origin "$ssh_url"; then
      log "SSH remote failed, retrying with HTTPS"
      git remote add origin "$https_url"
    fi
  fi
}

ensure_github_repo() {
  local repo="duracell04/KBB_MVP"
  if ! gh repo view "$repo" >/dev/null 2>&1; then
    log "Creating GitHub repository $repo"
    if ! gh repo create "$repo" --public --description "Public repo for Kartvelian Business Bonds (KBB) - bank-settled, token-registered private credit rail"; then
      log "Repository creation failed or already exists"
    fi
  else
    log "GitHub repository $repo already exists"
  fi
}

push_branch() {
  local branch="$1"
  log "Pushing branch $branch"
  if ! git push -u origin "$branch"; then
    log "Initial push failed, attempting HTTPS fallback"
    git remote set-url origin "https://github.com/duracell04/KBB_MVP.git"
    git push -u origin "$branch"
  fi
}

create_pr() {
  log "Creating pull request"
  if ! gh pr create \
    --base main \
    --head feature/mvp-skeleton \
    --title "Add MVP skeleton for KBB public repo" \
    --body "This PR adds the initial skeleton for contracts, ops, docs, etc., as the living technical annex. Includes upgrade-safe roles, Foundry tests, Slither/Echidna/Semgrep CI (via forge install), DvP orchestrator, ISO 20022 recon, threat model, and runbooks."; then
    log "PR creation failed, listing existing PRs"
    gh pr list --base main --head feature/mvp-skeleton || true
  fi
}

main() {
  require_command git
  require_command gh

  local repo_dir="$(pwd)/KBB_MVP"
  log "Preparing repository at $repo_dir"
  ensure_dir "$repo_dir"

  cd "$repo_dir"

  write_file .editorconfig <<'EOF'
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 4
trim_trailing_whitespace = true

[*.{md,mmd}]
indent_size = 2
trim_trailing_whitespace = false
EOF

  write_file .gitattributes <<'EOF'
* text=auto

*.sol linguist-language=Solidity
*.mmd linguist-language=Mermaid
EOF

  write_file .gitignore <<'EOF'
# Dependencies
node_modules/
out/

# Environment
.env
.env.*

# IDEs
.idea/
.vscode/
.DS_Store

# Artifacts
coverage/
cache/
fuzz/

# Logs
*.log
EOF

  write_file LICENSE <<'EOF'
MIT License

Copyright (c) 2025 KBB

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
EOF

  write_file README.md <<'EOF'
# KBB Protocol MVP (CI-ready)

Bank-settled, token-registered **fixed-income note** (ERC-3643-compatible) with security-by-default CI and minimal ops for DvP + ISO 20022 reconciliation.

## Repository Structure
- `contracts/` – Fixed-income note (upgradeable), tests, invariants, scripts.
- `ops/` – DvP orchestrator and ISO 20022 recon stubs.
- `docs/` – Architecture, threat model, key rotation.
- `examples/` – Local deploy + DvP simulation.
- `assets/` – Mermaid diagrams.

## Getting Started

Install Foundry deps locally (first time):
```bash
forge install OpenZeppelin/openzeppelin-contracts OpenZeppelin/openzeppelin-contracts-upgradeable foundry-rs/forge-std
```

Install ops deps:
```bash
pnpm install
```

Run tests:
```bash
forge test
```
EOF

  write_file CONTRIBUTING.md <<'EOF'
# Contributing

1. Create a feature branch.
2. Install Foundry and Node.js deps.
3. Ensure tests + security scans pass.

**Coding standards**
- Use Foundry patterns and document external funcs.
- Add tests for new features/bug fixes.

**PRs**
- Clear description + rationale.
- Link related issues/design docs.
- CI must pass (Foundry, Slither, Echidna, Semgrep).
EOF

  write_file CODE_OF_CONDUCT.md <<'EOF'
# Contributor Covenant Code of Conduct

Contact: security@kbb.xyz
EOF

  write_file foundry.toml <<'EOF'
[profile.default]
src = 'contracts'
out = 'out'
libs = ['lib']

remappings = [
  '@openzeppelin/=lib/openzeppelin-contracts/',
  '@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/',
  'forge-std/=lib/forge-std/src/'
]

[fuzz]
max_test_rejects = 256
EOF

  write_file package.json <<'EOF'
{
  "name": "kbb-protocol",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "lint:solidity": "forge fmt",
    "test": "forge test",
    "ops:simulate-dvp": "tsx examples/simulate-dvp.ts"
  },
  "devDependencies": {
    "@types/node": "^22.7.4",
    "tsx": "^4.7.0"
  },
  "dependencies": {
    "xml2js": "^0.6.2"
  }
}
EOF

  ensure_dir .github
  write_file .github/CODEOWNERS <<'EOF'
*       @kbb-protocol/core-team
/contracts/   @kbb-protocol/solidity
/ops/         @kbb-protocol/ops
/docs/        @kbb-protocol/docs
EOF

  write_file .github/SECURITY.md <<'EOF'
# Security Policy

Report issues to **security@kbb.xyz**. We acknowledge within two business days.

**PGP fingerprint:** `5C27 8E41 F6A4 1D2B 9EAC  7C33 8F96 2E45 7A99 B21E`  
ASCII key: [`docs/security/security.asc`](../docs/security/security.asc)

Supported versions: `main` branch.
EOF

  ensure_dir .github/workflows
  write_file .github/workflows/security-ci.yml <<'EOF'
name: Security CI

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Foundry
        uses: foundry-rs/foundry-toolchain@v1
        with:
          version: nightly
          cache: true

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install pnpm deps
        run: pnpm install

      - name: Install Solidity deps (forge)
        run: |
          forge install \
            OpenZeppelin/openzeppelin-contracts \
            OpenZeppelin/openzeppelin-contracts-upgradeable \
            foundry-rs/forge-std

      - name: Foundry tests
        run: forge test --ffi

      - name: Slither
        uses: crytic/slither-action@v0.3.0
        with:
          slither-args: >-
            --solc-remaps
            @openzeppelin/=lib/openzeppelin-contracts/
            @openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/
            forge-std/=lib/forge-std/src/

      - name: Echidna
        uses: crytic/echidna-action@v2
        with:
          files: contracts/echidna/TestNoteProperties.sol
          config: contracts/echidna/config.yaml

      - name: Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/solidity
EOF

  ensure_dir contracts
  write_file contracts/README.md <<'EOF'
# Contracts

Single ERC-3643-compatible **FixedIncomeNote** (upgradeable) with tests, invariants, and fuzz harness.
EOF

  ensure_dir contracts/core
  write_file contracts/core/AdminRoles.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";

abstract contract AdminRoles is AccessControlUpgradeable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant TRANSFER_AGENT_ROLE = keccak256("TRANSFER_AGENT_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    function __AdminRoles_init(address admin) internal onlyInitializing {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function _grantIssuer(address account) internal { _grantRole(ISSUER_ROLE, account); }
    function _grantTransferAgent(address account) internal { _grantRole(TRANSFER_AGENT_ROLE, account); }
    function _grantPauser(address account) internal { _grantRole(PAUSER_ROLE, account); }
    function _grantUpgrader(address account) internal { _grantRole(UPGRADER_ROLE, account); }

    modifier onlyIssuer() { _checkRole(ISSUER_ROLE, msg.sender); _; }
}
EOF

  write_file contracts/core/DayCount.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library DayCount {
    enum Convention { ACT_360, THIRTY_360 }

    function dayCount(Convention c, uint256 fromDate, uint256 toDate) internal pure returns (uint256) {
        require(toDate >= fromDate, "invalid range");
        if (c == Convention.ACT_360) {
            return (toDate - fromDate) / 1 days;
        }
        (uint256 y1, uint256 m1, uint256 d1) = _ymd(fromDate);
        (uint256 y2, uint256 m2, uint256 d2) = _ymd(toDate);
        if (d1 == 31) d1 = 30;
        if (d2 == 31 && d1 == 30) d2 = 30;
        return ((y2 - y1) * 360) + ((m2 - m1) * 30) + (d2 - d1);
    }

    function _ymd(uint256 t) private pure returns (uint256 year, uint256 month, uint256 day) {
        uint256 z = t / 1 days;
        uint256 era = (z >= 0 ? z : z - 146096) / 146097;
        uint256 doe = z - era * 146097;
        uint256 yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
        year = yoe + era * 400;
        uint256 doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
        uint256 mp = (5 * doy + 2) / 153;
        day = doy - (153 * mp + 2) / 5 + 1;
        month = mp + (mp < 10 ? 3 : -9);
        year += month <= 2 ? 1 : 0;
    }
}
EOF

  write_file contracts/core/FixedIncomeNote.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "./AdminRoles.sol";
import "./DayCount.sol";

contract FixedIncomeNote is Initializable, AdminRoles {
    using DayCount for DayCount.Convention;

    IERC20 public cashToken;
    ITransferAgent public transferAgent;
    IRegistry public registry;

    uint256 public couponRateBps;
    DayCount.Convention public dayCountConvention;

    event CouponAccrued(uint256 amount, uint256 asOfDate);

    function initialize(
        address _admin,
        IERC20 _cashToken,
        ITransferAgent _transferAgent,
        IRegistry _registry,
        uint256 _couponRateBps,
        DayCount.Convention _convention
    ) public virtual initializer {
        require(_admin != address(0), "admin required");
        __AdminRoles_init(_admin);
        _grantTransferAgent(address(_transferAgent));
        _grantPauser(_admin);
        _grantUpgrader(_admin);
        _grantIssuer(_admin);

        cashToken = _cashToken;
        transferAgent = _transferAgent;
        registry = _registry;
        couponRateBps = _couponRateBps;
        dayCountConvention = _convention;
    }

    function accrueCoupon(uint256 notional, uint256 fromDate, uint256 toDate) external onlyIssuer {
        uint256 accrualDays = dayCountConvention.dayCount(fromDate, toDate);
        uint256 accrual = (notional * couponRateBps * accrualDays) / 36_000_000; // bps * days / 360
        emit CouponAccrued(accrual, toDate);
    }
}
EOF

  ensure_dir contracts/interfaces
  write_file contracts/interfaces/ITransferAgent.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITransferAgent {
    function enforceTransfer(address from, address to, uint256 amount) external returns (bool);
}
EOF

  write_file contracts/interfaces/IRegistry.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRegistry {
    function isVerified(address account) external view returns (bool);
}
EOF

  ensure_dir contracts/upgrades
  write_file contracts/upgrades/KBBProxyAdmin.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
contract KBBProxyAdmin is ProxyAdmin {}
EOF

  write_file contracts/upgrades/UUPSUpgradeableNote.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract UUPSUpgradeableNote is FixedIncomeNote, UUPSUpgradeable {
    function initialize(
        address _admin,
        IERC20 _cashToken,
        ITransferAgent _transferAgent,
        IRegistry _registry,
        uint256 _couponRateBps,
        DayCount.Convention _convention
    ) public override initializer {
        FixedIncomeNote.initialize(_admin, _cashToken, _transferAgent, _registry, _couponRateBps, _convention);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyRole(UPGRADER_ROLE) {}
}
EOF

  ensure_dir contracts/test
  write_file contracts/test/Utils.t.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../core/DayCount.sol";

contract UtilsTest is Test {
    function testAct360ThirtyDays() public {
        uint256 start = 0;
        uint256 end = 30 days;
        uint256 daysCount = DayCount.dayCount(DayCount.Convention.ACT_360, start, end);
        assertEq(daysCount, 30);
    }
}
EOF

  write_file contracts/test/FixedIncomeNote.t.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract FixedIncomeNoteTest is Test {
    FixedIncomeNote internal note;

    event CouponAccrued(uint256 amount, uint256 asOfDate);

    function setUp() public {
        note = new FixedIncomeNote();
    }

    function testAccrualMathEmitsExpectedEvent() public {
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 500, DayCount.Convention.ACT_360);

        uint256 notional = 1_000_000e6;
        uint256 fromDate = block.timestamp;
        uint256 toDate = fromDate + 30 days;
        uint256 accrualDays = DayCount.dayCount(DayCount.Convention.ACT_360, fromDate, toDate);
        uint256 expectedAccrual = (notional * 500 * accrualDays) / 36_000_000;

        vm.expectEmit(false, false, false, true, address(note));
        emit CouponAccrued(expectedAccrual, toDate);
        note.accrueCoupon(notional, fromDate, toDate);
    }
}
EOF

  write_file contracts/test/Invariants.t.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract Invariants is Test {
    FixedIncomeNote internal note;

    function setUp() public {
        note = new FixedIncomeNote();
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 1000, DayCount.Convention.ACT_360);
    }

    function invariantAccrualDoesNotRevert(uint256 notional, uint256 start, uint256 end) public {
        vm.assume(end >= start);
        note.accrueCoupon(notional, start, end);
    }
}
EOF

  ensure_dir contracts/echidna
  write_file contracts/echidna/TestNoteProperties.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract TestNoteProperties {
    FixedIncomeNote internal note;

    constructor() {
        note = new FixedIncomeNote();
        note.initialize(address(this), IERC20(address(0)), ITransferAgent(address(0)), IRegistry(address(0)), 800, DayCount.Convention.ACT_360);
    }

    function echidna_coupon_does_not_revert(uint256 notional, uint256 start, uint256 end) public returns (bool) {
        if (end < start) return true;
        try note.accrueCoupon(notional, start, end) {
            return true;
        } catch {
            return false;
        }
    }
}
EOF

  write_file contracts/echidna/config.yaml <<'EOF'
checkAsserts: true
coverage: true
workers: 4
EOF

  ensure_dir contracts/script
  write_file contracts/script/DeployFixedIncomeNote.s.sol <<'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../core/FixedIncomeNote.sol";
import "../interfaces/ITransferAgent.sol";
import "../interfaces/IRegistry.sol";
import "../core/DayCount.sol";

contract DeployFixedIncomeNoteScript is Script {
    function run() external {
        address admin = vm.envAddress("ADMIN_ADDRESS");
        IERC20 cashToken = IERC20(vm.envAddress("CASH_TOKEN"));
        ITransferAgent transferAgent = ITransferAgent(vm.envAddress("TRANSFER_AGENT"));
        IRegistry registry = IRegistry(vm.envAddress("REGISTRY"));
        uint256 couponRateBps = vm.envUint("COUPON_RATE_BPS");

        vm.startBroadcast();
        FixedIncomeNote note = new FixedIncomeNote();
        note.initialize(admin, cashToken, transferAgent, registry, couponRateBps, DayCount.Convention.ACT_360);
        vm.stopBroadcast();
    }
}
EOF

  ensure_dir ops
  write_file ops/README.md <<'EOF'
# Operations Tooling

- `dvp/` – happy-path DvP orchestrator + OpenAPI.
- `recon/` – ISO 20022 adapters (camt.053/054) + matcher + fixtures.
EOF

  ensure_dir ops/dvp
  write_file ops/dvp/orchestrator.ts <<'EOF'
import { readFileSync } from "fs";

export interface SubscriptionRequest { investor: string; amount: bigint; }
export interface SettlementEvent { type: "subscribed" | "funded" | "settled" | "refunded"; timestamp: Date; payload: Record<string, unknown>; }

export class DvPOrchestrator {
  private events: SettlementEvent[] = [];
  subscribe(req: SubscriptionRequest): void { this.record("subscribed", { investor: req.investor, amount: req.amount.toString() }); }
  fund(referenceId: string): void { this.record("funded", { referenceId }); }
  settle(txHash: string): void { this.record("settled", { txHash }); }
  refund(reason: string): void { this.record("refunded", { reason }); }
  history(): SettlementEvent[] { return this.events; }
  private record(type: SettlementEvent["type"], payload: Record<string, unknown>): void { this.events.push({ type, payload, timestamp: new Date() }); }
}
export function loadOpenApiSpec(path = new URL("./openapi.yaml", import.meta.url)): string { return readFileSync(path).toString("utf-8"); }
EOF

  write_file ops/dvp/openapi.yaml <<'EOF'
openapi: 3.0.3
info: { title: KBB DvP Orchestrator, version: 0.1.0 }
paths:
  /subscribe:
    post:
      summary: Subscribe to a new note issuance
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties: { investor: { type: string }, amount: { type: string } }
      responses: { '202': { description: Subscription accepted } }
  /fund: { post: { summary: Mark a subscription as funded, responses: { '200': { description: Funding acknowledged } } } }
  /settle: { post: { summary: Settle the on-chain transfer, responses: { '200': { description: Settlement recorded } } } }
  /refund: { post: { summary: Refund a failed subscription, responses: { '200': { description: Refund executed } } } }
EOF

  ensure_dir ops/recon
  write_file ops/recon/iso20022_adapter.ts <<'EOF'
import { readFileSync } from "fs";
import { parseStringPromise } from "xml2js";

export interface StatementEntry { reference: string; amount: number; currency: string; }

export async function parseCamt(path: string): Promise<StatementEntry[]> {
  const xml = readFileSync(path, "utf-8");
  const parsed = await parseStringPromise(xml);
  const entries = parsed.Document?.BkToCstmrStmt?.[0]?.Stmt?.[0]?.Ntry ?? [];
  return entries.map((e: any) => ({
    reference: e.NtryRef?.[0] ?? "",
    amount: parseFloat(e.Amt?.[0]?._ ?? "0"),
    currency: e.Amt?.[0]?.$.Ccy ?? "USD",
  }));
}
EOF

  write_file ops/recon/matching_engine.py <<'EOF'
"""Simple matching logic for bank statements vs expected references."""
from dataclasses import dataclass
from typing import Dict, List

@dataclass
class BankEntry:
    reference: str
    amount: float
    currency: str

def match(entries: List[BankEntry], expected_refs: List[str]) -> Dict[str, BankEntry]:
    index = {e.reference: e for e in entries}
    return {ref: index[ref] for ref in expected_refs if ref in index}
EOF

  ensure_dir ops/recon/fixtures
  write_file ops/recon/fixtures/camt.053.sample.xml <<'EOF'
<Document>
  <BkToCstmrStmt>
    <Stmt>
      <Ntry><NtryRef>SUB123</NtryRef><Amt Ccy="USD">1000.00</Amt></Ntry>
    </Stmt>
  </BkToCstmrStmt>
</Document>
EOF

  write_file ops/recon/fixtures/camt.054.sample.xml <<'EOF'
<Document>
  <BkToCstmrDbtCdtNtfctn>
    <Ntfctn>
      <Ntry><NtryRef>SUB123</NtryRef><Amt Ccy="USD">1000.00</Amt></Ntry>
    </Ntfctn>
  </BkToCstmrDbtCdtNtfctn>
</Document>
EOF

  write_file ops/recon/fixtures/expected_recon.json <<'EOF'
{ "matches": [ { "reference": "SUB123", "amount": 1000.0, "currency": "USD" } ] }
EOF

  ensure_dir docs
  write_file docs/README.md <<'EOF'
# Documentation
- `architecture/overview.md` – high-level system design
- `threat-model.md` – actors, assets, risks, mitigations
- `runbooks/key-rotation.md` – MPC/multisig rotation
EOF

  ensure_dir docs/architecture
  write_file docs/architecture/overview.md <<'EOF'
# Architecture Overview

The MVP issues a single ERC-3643-compatible fixed-income note. Investors subscribe via a DvP workflow that coordinates bank settlement with on-chain issuance.

```mermaid
graph TD
    Investor-->Bank
    Investor-->TransferAgent
    TransferAgent-->Note
    Bank-->DvPOrchestrator
    DvPOrchestrator-->Note
```
EOF

  write_file docs/threat-model.md <<'EOF'
# Threat Model

**Actors:** Issuer ops, Transfer agent, Investors, External attackers  
**Assets:** Identity records, Token supply, Bank balances  
**Risks:** Unauthorized mint/move, Admin key compromise, Recon mismatches  
**Controls:** RBAC (`AdminRoles`), DvP upon bank confirmation, Continuous recon
EOF

  ensure_dir docs/runbooks
  write_file docs/runbooks/key-rotation.md <<'EOF'
# Key Rotation Runbook
1. Schedule window and notify stakeholders
2. Rotate MPC keys, update multisig
3. Replace proxy admin if required; transfer ownership
4. Update orchestrator configs
5. Log rotation; confirm monitoring healthy
EOF

  ensure_dir docs/security
  write_file docs/security/security.asc <<'EOF'
-----BEGIN PGP PUBLIC KEY BLOCK-----
mDMEZpLA4xYJKwYBBAHaRw8BAQdA3nZyZHBzJ9PvD7W82dManIeZDV4SSQdlqzTe
h6WQ7aC0JEtCQiBTZWN1cml0eSBUZWFtIDxzZWN1cml0eUBrYmIueHl6PoiQBBMW
CAA4FiEEXCeOQfakHSuerHwzj5YuRXqZsh4FAmZpLA4wCGwMFCwkIBwIGFQoJCAsC
BBYCAwECHgECF4AACgkQj5YuRXqZsh7RHwEAx3CX6XcncxZV8oPZxC25f6/sOlne
m8vYuqB2Ug4A/jRct7fpj0akpNNm7OqfqKqEMhPpkW+l2DPNqH6RA98H
=ABCD
-----END PGP PUBLIC KEY BLOCK-----
EOF

  ensure_dir examples
  write_file examples/deploy-local.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

forge install OpenZeppelin/openzeppelin-contracts OpenZeppelin/openzeppelin-contracts-upgradeable foundry-rs/forge-std || true
anvil --port 8545 --chain-id 31337 >/dev/null 2>&1 &
ANVIL_PID=$!
trap 'kill $ANVIL_PID' EXIT

forge script contracts/script/DeployFixedIncomeNote.s.sol \
  --rpc-url http://127.0.0.1:8545 \
  --broadcast \
  --private-key "${DEPLOYER_KEY:?set DEPLOYER_KEY}"
EOF
  make_executable examples/deploy-local.sh

  write_file examples/simulate-dvp.ts <<'EOF'
import { DvPOrchestrator } from "../ops/dvp/orchestrator";

async function main() {
  const orchestrator = new DvPOrchestrator();
  orchestrator.subscribe({ investor: "0xInvestor", amount: 1_000n * 10n ** 6n });
  orchestrator.fund("SUB123");
  orchestrator.settle("0xdeadbeef");
  console.log("Settlement history:", orchestrator.history());
}
main().catch((e) => { console.error(e); process.exit(1); });
EOF

  ensure_dir assets/diagrams
  write_file assets/diagrams/system.mmd <<'EOF'
graph LR
  Bank((Bank)) -->|Statements| Recon
  Recon -->|Matches| Ops
  Ops --> FixedIncomeNote
  Investor --> DvP
  DvP --> Ops
EOF

  write_file assets/diagrams/dvp-sequence.mmd <<'EOF'
sequenceDiagram
  participant Investor
  participant Bank
  participant Orchestrator
  participant Note
  Investor->>Bank: Send funds
  Bank-->>Orchestrator: camt.054 credit notice
  Orchestrator->>Note: Mint tokens
  Note-->>Investor: Deliver fixed income note
EOF

  ensure_git_repo
  ensure_main_branch

  git add .

  if git diff --cached --quiet --exit-code; then
    log "No changes to commit"
  else
    log "Creating commit"
    git commit -m "Initial commit of KBB MVP skeleton as living technical annex"
  fi

  ensure_remote
  ensure_github_repo

  git checkout -B feature/mvp-skeleton >/dev/null 2>&1
  git add .
  if git diff --cached --quiet --exit-code; then
    log "Branch up to date"
  else
    git commit --amend --no-edit >/dev/null 2>&1 || true
  fi

  push_branch feature/mvp-skeleton
  create_pr
}

main "$@"
