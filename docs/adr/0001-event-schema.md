# ADR 0001 — Canonical lifecycle event schema

**Status:** Accepted

**Context:** Cross-rail reconciliation requires a rail-agnostic schema with a deterministic join key.

**Decision:** All lifecycle events include `settlementRef` and `settlementNetwork`. No field repurposing; breaking changes require a new event.

**Consequences:** Stable consumer interfaces; adapters must normalize per-rail evidence.
