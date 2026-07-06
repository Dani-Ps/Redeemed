# Redeemed 🌱

A gentle, mobile-first companion for emotional and spiritual well-being. Redeemed
guides you through a short daily reflection — naming an emotion, validating it,
reframing the thought behind it, meeting it with a scripture, and choosing one small
action — then quietly tracks your journey over time.

> **Redeemed acompaña, no reemplaza.** It is not therapy and not a crisis-detection or
> diagnostic tool. It never claims a clinical state — it only offers gentle support and
> points to help when it may be useful.

## ✨ Features

- **Daily flow** — a 7-step guided reflection (emotion → intensity → context →
  validation → reframe → verse → action) with a calm, one-thing-at-a-time pace.
- **Seed streak** — a non-competitive "seed" that grows with each day you show up.
- **My history** — every reflection saved as a warm, scannable timeline.
- **Progress** — a soft look at your emotional landscape (intensity over time and
  emotion distribution), framed as observation, never as a score.
- **Evidence of grace** — a personal gallery of photos, letters, music and prayers that
  sustain you, to return to when you need them.
- **Help** — a curated resources screen plus a gentle, keyword-based safety net that
  simply surfaces help; it never diagnoses.
- **Private by design** — everything lives on your device (localStorage +
  IndexedDB for photos). No accounts, no servers, no tracking.

## 🛠️ Tech stack

- **React 19** + **TypeScript** + **Vite 7**
- **Tailwind CSS 4** with a hand-built, custom design system (no UI kit)
- **React Router 7** for client-side routing
- **idb** for IndexedDB photo storage
- **Vitest** + **Testing Library** for the test suite

State is managed with tiny `useSyncExternalStore` stores — no external state library.

## 🚀 Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
npm test         # run the unit tests
```

## 🧪 Tests

Pure logic is fully unit-tested: the streak engine, the safety-net keyword matcher,
the curated content bundles (every emotion is guaranteed a valid verse and action),
the storage wrapper, and the date helpers.

```bash
npm test
```

## 📁 Project structure

```
src/
  components/   reusable UI + charts (design system)
  data/         curated content: emotions, verses, categories, safety, resources
  flow/         the 7-step daily reflection steps
  lib/          small pure helpers (dates, class merge, emotion styling)
  screens/      Home, DailyFlow, History, Dashboard, Grace, Resources
  store/        useSyncExternalStore stores + localStorage/IndexedDB persistence
  types.ts      core domain types
```

## 🌐 Deployment

The app is configured for **GitHub Pages** under the `/Redeemed/` base path. A GitHub
Actions workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to
`main`. Enable Pages → "GitHub Actions" in the repository settings.

## ⚠️ Before release

The help resources in `src/data/resources.ts` are clearly-marked **placeholders**.
Replace them with verified, region-appropriate hotlines and contacts before any public
release.

## 📄 License

MIT
