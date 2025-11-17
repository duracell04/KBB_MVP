# KBB Sparkle UI (Local Mockup)

This folder contains the standalone Vite + React mockup that ships with the KBB MVP monorepo. It is fully self-contained and can be edited with any workflow you prefer.

## Prerequisites

- Node.js 20.x
- pnpm 9.x (recommended package manager used by the repo)

## Install & run

```bash
# from repo root
pnpm install
pnpm run frontend:dev
```

This launches the dev server on http://localhost:5173 (proxied to port 8080 inside the Vite config).

## Build

```bash
pnpm run frontend:build
pnpm run frontend:preview
```

## Tech stack

- React 18
- TypeScript
- Tailwind CSS + shadcn/ui
- Vite 5 with SWC

## Editing tips

- Use the `src/lib` utilities and `src/components` structure already provided to keep styles consistent.
- Tailwind config lives in `tailwind.config.ts`; tokens/utilities are defined in `src/lib/utils.ts`.
- Static assets reside in `public/`; update Open Graph images or favicons there if needed.
