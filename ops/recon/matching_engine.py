from dataclasses import dataclass
from typing import Dict, List

@dataclass
class BankEntry:
    reference: str
    amount: float
    currency: str

def match(entries: List[BankEntry], expected_refs: List[str]) -> Dict[str, BankEntry]:
    idx = {e.reference: e for e in entries}
    return {ref: idx[ref] for ref in expected_refs if ref in idx}
