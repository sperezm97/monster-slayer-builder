# Monster Slayer Builder

Interactive web builder for an idle RPG character profile. It lets you tune heroes, skills, equipment, mastery, relics, traits, awaken, ascension, pets, alchemy, world progress, and zodiac nodes while recalculating DPS and derived stats locally.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Redux Toolkit 2 + React Redux
- Lucide React icons
- Vitest + Oxlint

## Local Development

```bash
npm install
npm run dev
```

Default local URL:

```text
http://127.0.0.1:5173/
```

## Scripts

```bash
npm run build   # typecheck and production build
npm run test    # feature import tests
npm run lint    # oxlint
npm run preview # serve built dist locally
```

## Architecture

State lives in Redux Toolkit slices under `src/store/slices/` and is persisted to `localStorage` with `msb:*` keys. The old single-profile storage key is migrated on first load.

Feature pages live under `src/features/`:

```text
heroes, skills, equipment, mastery, relics, traits,
awaken, ascension, pets, alchemy, world, zodiac
```

Shared app organisms live under `src/components/shared/organisms/`.

Core game formulas live in `src/utils/calculations.ts`.

## GitHub Pages

Deployment is configured in `.github/workflows/deploy-pages.yml`.

To publish:

1. Push to `main` or `master`.
2. In GitHub repository settings, set Pages source to GitHub Actions.
3. The workflow builds `dist/` and deploys it to GitHub Pages.

Vite uses `base: './'` so the built assets work under a GitHub Pages project path.
