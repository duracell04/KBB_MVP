# Contributing to KBB_MVP

Thanks for your interest! This repo values small, testable changes.

## Workflow
- Fork → small branch → PR to `main`
- If you change Solidity or event shapes:
  - `forge test -vv`
  - `npm run demo` (regenerates `out/events.sample.json`)
  - `npm run validate:events`
  - (optional) `npm run validate:recon`

## Code expectations
- Math/permissions: add unit tests (cover month-end/leap edges for day-count)
- Keep diffs focused; update docs if behavior changes
- No real credentials or PII in fixtures

## Security
Use private disclosure per `.github/SECURITY.md`. Do not open public issues for security bugs.

## License
By contributing you agree your code is under the repo license (MIT unless stated otherwise).
