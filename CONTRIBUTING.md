# Contributing to KBB_MVP

Thanks for your interest! This repo values small, testable changes that keep the DvP + reconciliation story deterministic.

## Ground rules
- Prefer **one small problem per PR** — smaller diffs merge faster.
- Every functional change ships with at least one automated test (Forge, TypeScript, or Python) that covers invariants, rounding, and permission edges.
- Update docs, schemas, and fixtures when you change external behavior or event shapes.
- No real credentials or PII in fixtures. Use `.env` (see `.env.example`) and never commit secrets.

## Workflow
1. Fork → branch from `main`.
2. Make the change with tight commits using the template below.
3. Run the checklists.
4. Open a PR against `main` describing the slice and linking any issues.

### Commit message template
```
type(scope): concise imperative summary

Optional body with context, references, or follow-up actions.
```
- `type` examples: `feat`, `fix`, `chore`, `docs`, `test`.
- `scope` is optional; use it for contract names, adapters, or docs (e.g., `docs(readme)`).
- Keep subjects under 72 characters and use the imperative mood.

## Required checks
Before opening a PR, run the following locally and paste the checklist in the PR description:

- [ ] `forge test -vv`
- [ ] `npm run demo` (regenerates `out/events.sample.json`)
- [ ] `npm run validate:events`
- [ ] Additional suite(s) relevant to your change (e.g., `npm run validate:recon`, Python scripts)

CI mirrors these steps via GitHub Actions.

## Coding style & expectations
- Solidity: follow Foundry defaults, document public/external functions with NatSpec, and keep math/permission guards explicit.
- TypeScript: lint via TypeScript compiler (`tsc --noEmit`) and keep adapters pure/side-effect free outside IO boundaries.
- Python: prefer standard library + `typing` hints; keep deterministic outputs for reconciliation scripts.
- Tests: cover boundary cases — month-end, leap years, rounding pennies, jurisdiction toggles, etc.

## Getting help
- Review existing issues and the [docs/](docs) folder before filing new questions.
- Discussions about security-sensitive findings belong in private mail per `.github/SECURITY.md`.
- If `forge` or Node tooling fails, see the [Troubleshooting section](README.md#troubleshooting).

## License
By contributing you agree that your code is released under the repository license (MIT unless explicitly noted otherwise).
