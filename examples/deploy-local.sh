#!/usr/bin/env bash
set -euo pipefail

forge install
anvil --port 8545 --chain-id 31337 >/dev/null 2>&1 &
ANVIL_PID=$!
trap 'kill $ANVIL_PID' EXIT

forge script contracts/script/DeployFixedIncomeNote.s.sol \
  --rpc-url http://127.0.0.1:8545 \
  --broadcast \
  --private-key "$DEPLOYER_KEY"
