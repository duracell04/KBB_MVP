# Frontend demo workflow

Use this checklist whenever you spin up the Next.js + Tailwind mockups locally or for previews.

## Runtime parity

1. Install Node 20 (Volta / nvmrc) and pin pnpm via Corepack:
   ```sh
   corepack enable
   corepack prepare pnpm@9.12.0 --activate
   node -v && pnpm -v
   ```
2. Versions stay in sync via `package.json` (`packageManager`, `engines.node`).

## First-time setup

```sh
pnpm install          # always at repo root
cp apps/frontend/.env.example apps/frontend/.env.local
```

## Dev commands

| Use case | Command |
| --- | --- |
| Deterministic port 3000 (forces UTF-8 console) | `pnpm run frontend:dev:3000` |
| Custom port (pass `-- --port 3050`) | `pnpm run frontend:dev:port -- --port 3050` |
| Auto-pick free port (PowerShell) | `pnpm run frontend:dev:auto` |
| Clean stale `.next` | `pnpm run frontend:clean` |
| Production parity | `pnpm run frontend:build && pnpm --filter kbb-mvp-frontend preview` |

`frontend:dev:auto` runs `scripts/dev-frontend-auto.ps1`, which:

1. Verifies `apps/frontend` is writable (`scripts/check-writable.ps1`).
2. Clears `.next` when `-Clean` is passed.
3. Grabs a free port via `scripts/find-free-port.ps1` and starts dev with that port.

### One-liner check + run (PowerShell)

```powershell
pwsh -NoProfile -Command "cd C:\GIT\KBB_MVP; ./scripts/check-writable.ps1 apps/frontend; pnpm run frontend:dev:port -- --port 3000"
```

## LAN / mobile testing

- Prefer HTTPS tunnels for phones/tablets: `npx localtunnel --port 3000` or `ngrok http 3000`.
- If you must expose LAN: `pnpm run frontend:dev:port -- --hostname 0.0.0.0 -- --port 3000` and open the firewall for that port.

## Logging & observability

```powershell
pnpm run frontend:dev:3000 2>&1 | Tee-Object -FilePath apps/frontend/dev-log.txt
```

Add a lightweight `/api/health` route in Next to print the current `NODE_ENV`, API base URL, and git SHA for quick validation.

## Troubleshooting

- Port in use: `Get-NetTCPConnection -LocalPort 3000 -State Listen | Stop-Process -Id {$_.OwningProcess} -Force`
- Permissions: `./scripts/check-writable.ps1 apps/frontend`
- Hard reset: `pnpm rimraf node_modules pnpm-lock.yaml && pnpm install`
- pnpm cache cleanup: `pnpm store prune`
- Clean Next build: `pnpm run frontend:clean`

## Team hygiene

- Keep `.env.example` updated and `.env.local` ignored.
- Always start from root `pnpm install`.
- Document new scripts/features here so remote demos stay reproducible.
