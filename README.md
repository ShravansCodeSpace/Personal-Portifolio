# Elite Architect Portfolio

Next.js App Router portfolio rebuilt from the Stitch `Obsidian Kinetic` design reference.

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`, or pass a port with `pnpm dev -p 4174`.

## Build

```bash
pnpm build
pnpm typecheck
```

## Add Portfolio Entries

Edit the typed data in `lib/data/portfolio.ts`.

- `achievements`: awards, certifications, delivery milestones
- `works`: case-study cards and `/work/[id]` detail pages
- `rewards`: recognition and trust signals
- `techStack`: marquee skills

Keep all public content resume-backed. Do not add phone numbers, personal photos, private documents, addresses, or unverified claims.

## Design

Tokens from `DESIGN.md` are translated into CSS variables in `app/globals.css` and mapped through `tailwind.config.ts`. Components use semantic Tailwind token names rather than hardcoded hex colors.

## Deployment

The app is Vercel-ready: static routes, Next Image, metadata API, sitemap, robots, and no server-only runtime dependency.
