# KBB Sparkle UI (Local Mockup)

This folder now contains the standalone Next.js + React mockup that ships with the KBB MVP monorepo. It is fully self-contained and can be edited with any workflow you prefer.

## Prerequisites

- Node.js 20.x
- pnpm 9.x (recommended package manager used by the repo)

## Install & run

```bash
# from repo root
pnpm install
pnpm run frontend:dev
```

This launches the dev server on http://localhost:3000 (default Next.js dev port; override via `PORT`).

## Build

```bash
pnpm run frontend:build
pnpm run frontend:preview # runs `next start`
```

## Tech stack

- Next.js 15 (React 18 under the hood)
- TypeScript
- Tailwind CSS + shadcn/ui
- pnpm workspace tooling

## Editing tips

- Use the `src/lib` utilities and `src/components` structure already provided to keep styles consistent.
- Tailwind config lives in `tailwind.config.ts`; tokens/utilities are defined in `src/lib/utils.ts`.
- Static assets reside in `public/`; update Open Graph images or favicons there if needed.
