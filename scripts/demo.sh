#!/usr/bin/env bash
set -euo pipefail
forge build
forge test -vv
python3 ops/recon/recon.py ops/recon/rails.sample.csv ops/recon/events.sample.json > out.recon.json
echo "Recon summary:"
if command -v jq >/dev/null 2>&1; then
  jq -r '"matched=\(.matched|length) breaks=\(.breaks|length)"' out.recon.json
else
  python3 - <<'PY'
import json
from pathlib import Path
with Path("out.recon.json").open() as handle:
    data = json.load(handle)
print(f"matched={len(data.get('matched', []))} breaks={len(data.get('breaks', []))}")
PY
fi
echo "✅ Foundry build, tests, and reconciliation demo complete"
