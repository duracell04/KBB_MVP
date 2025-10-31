from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
from typing import Iterable, List


@dataclass
class CashEvent:
    reference: str
    amount: float
    timestamp: datetime


@dataclass
class OnChainEvent:
    tx_hash: str
    reference: str
    amount: float
    timestamp: datetime


def match_events(cash_events: Iterable[CashEvent], chain_events: Iterable[OnChainEvent]) -> List[str]:
    matches: List[str] = []
    cash_map = {event.reference: event for event in cash_events}
    for chain_event in chain_events:
        cash_event = cash_map.get(chain_event.reference)
        if cash_event and abs(cash_event.amount - chain_event.amount) < 0.01:
            matches.append(chain_event.tx_hash)
    return matches
