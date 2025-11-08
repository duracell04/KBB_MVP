#!/usr/bin/env python3
"""Rail-agnostic reconciliation demo.

Matches settlement events emitted on-chain with cash-rail records by
comparing shared identifiers (settlement reference, amount, currency).
"""
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path
from typing import Any, Dict, List


def load_rails(path: Path) -> Dict[str, Dict[str, str]]:
    """Return a map of settlementRef -> rail record."""
    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        return {
            row["settlementRef"]: {"amount": row["amount"], "currency": row["currency"]}
            for row in reader
        }


def load_events(path: Path) -> List[Dict[str, Any]]:
    """Load lifecycle events emitted on-chain."""
    with path.open() as handle:
        return json.load(handle)


def classify(event: Dict[str, Any], rail: Dict[str, Any] | None, seen_refs: set[str]) -> str | None:
    ref = event.get("settlementRef")
    currency = event.get("currency")
    amount = event.get("amount")
    value_date = event.get("valueDate")

    if ref in seen_refs:
        return "DUPLICATE_REF"
    if rail is None:
        return "MISSING_RAIL"

    rail_amount = rail.get("amount")
    rail_currency = rail.get("currency")
    rail_value_date = rail.get("valueDate") or rail.get("value_date")

    if str(amount) != str(rail_amount):
        return "AMOUNT_MISMATCH"
    if currency != rail_currency:
        return "CURRENCY_MISMATCH"
    if value_date and rail_value_date and value_date != rail_value_date:
        return "STALE_VALUEDATE"

    return None


def reconcile(rails: Dict[str, Dict[str, str]], events: List[Dict[str, Any]]) -> Dict[str, Any]:
    matched: List[Dict[str, Any]] = []
    breaks: List[Dict[str, Any]] = []
    seen_refs: set[str] = set()

    for event in events:
        ref = event.get("settlementRef")
        rail_record = rails.get(ref)
        kind = classify(event, rail_record, seen_refs)

        if kind is None:
            matched.append({"event": event, "rail": rail_record})
        else:
            breaks.append({"event": event, "rail": rail_record, "kind": kind})

        if ref is not None:
            seen_refs.add(ref)

    return {"matched": matched, "breaks": breaks}


def main(argv: List[str]) -> int:
    if len(argv) != 3:
        print(f"Usage: {argv[0]} <rails.csv> <events.json>", file=sys.stderr)
        return 1

    rails_path = Path(argv[1])
    events_path = Path(argv[2])

    rails = load_rails(rails_path)
    events = load_events(events_path)
    summary = reconcile(rails, events)

    json.dump(summary, sys.stdout, indent=2)
    print()
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
