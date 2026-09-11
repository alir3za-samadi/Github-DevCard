# GitHub DevCard

> Search any GitHub username, inspect their stats and top repos, and export a shareable "dev card" as a PNG.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

**🔗 Live demo:** [github-dev-card-bypl.vercel.app](https://github-dev-card-bypl.vercel.app/)

## Demo

![DevCard demo](./docs/demo.gif)

_Search a username → view the generated profile page → export it as a downloadable card image._

## Features

- 🔍 **Search any GitHub username** and jump straight to a full profile view
- 📊 **Profile stats** — followers, public repo count, total stars collected across all repos, top languages breakdown
- ⭐ **Highlighted repo** — automatically surfaces the user's most-starred (or most recently updated) repository
- 🖼️ **Exportable dev card** — renders the profile as a styled card and downloads it as a PNG, client-side, with no server round-trip
- ⚖️ **Compare mode** — put two GitHub users head-to-head
- 📈 **Trending repos** — browse trending repositories filtered by language and time window
- 🔎 **Dynamic SEO on every page** — `/profile/[username]`, `/compare`, and `/trending` each build their own `<title>`/description at request time via `generateMetadata`, so titles, search results, and link previews always reflect what's actually being viewed
- 🖼️ **Personalized social preview cards** — each of those three pages ships its own `next/og`-generated Open Graph image (the username, the two usernames being compared, or the selected language, rendered into a branded card), so sharing a link on Twitter/X, LinkedIn, or Discord shows a real preview instead of a generic screenshot
- 🌓 **Polished, responsive UI** — built with shadcn/ui + Tailwind CSS v4, dark theme by default

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components) |
| Language | TypeScript (strict mode) |
| Styling / UI | Tailwind CSS v4, shadcn/ui, Base UI |
| Forms & validation | react-hook-form + zod |
| Card export | [html-to-image](https://github.com/bubkoo/html-to-image) (`toBlob` → PNG download) |
| Data source | [GitHub REST API](https://docs.github.com/en/rest) |
| Deployment | Vercel |

## Why this architecture

A few deliberate decisions worth calling out, since they're easy to miss just skimming the file tree:

### A dedicated API route (`/api/github/...`), separate from the pages

`GET /api/github/profile/[username]` and `GET /api/github/trending` are standalone JSON endpoints, and the `/compare` and `/trending` pages call them over HTTP (via `NEXT_PUBLIC_BASE_URL`) instead of importing the GitHub-fetching functions directly. Keeping the GitHub-fetching logic behind an API route means:

- **Rate-limit handling lives in one place.** GitHub's REST API allows only 60 unauthenticated requests/hour per IP (5,000/hour with a token). The route normalizes GitHub's various failure states (404, 429, 422, network errors) into a single, predictable JSON error shape instead of leaking raw GitHub errors to every consumer.
- **The response is a stable, reusable contract.** Any page, client component, or future public integration that needs "stats for user X" hits the same endpoint instead of duplicating fetch logic.

### Caching via Next.js's fetch cache (ISR-style revalidation)

Every GitHub call goes through `fetch(url, { next: { revalidate: 3600 } })`. Because GitHub's rate limit is tight and per-IP, re-fetching the same profile on every request would burn through it fast. Time-based revalidation means:

- The first request for a given username hits GitHub and caches the result.
- Any request within the next hour reuses the cached data — no GitHub call, no rate-limit cost.
- After an hour, the data is treated as stale and refreshed automatically on the next request.

This gives most of the benefit of static generation (fast, cached responses) while still keeping profile data reasonably fresh — a good fit for data that changes slowly (follower counts, repo lists) but shouldn't be frozen forever like a fully static page.

### `generateMetadata` instead of a static `metadata` export

`/profile/[username]`, `/compare`, and `/trending` all use the async `generateMetadata` function rather than a static `export const metadata`, because the content of each of those pages depends on the URL: which username was searched, which two users are being compared, or which language is selected. A static export can't see any of that — `generateMetadata` runs per-request with access to `params`/`searchParams`, so the `<title>` and description in the page's `<head>` (and therefore browser tabs, search results, and link previews) actually describe what's being viewed instead of one generic title reused everywhere.

### `next/og` for personalized social preview images

Each of those same three routes also ships its own `opengraph-image.tsx` using Next.js's built-in [`next/og`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) file convention — generated on the fly at the edge, with no separate image-hosting or screenshot service involved:

- `/profile/[username]` renders a card with that username
- `/compare?userA=...&userB=...` renders a "X vs Y" head-to-head card
- `/trending?lang=...` renders a card naming the selected language

This is what makes a shared link render as an actual branded image (instead of a bare URL) when pasted into Twitter/X, LinkedIn, or Discord.

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/alir3za-samadi/Github-DevCard.git
cd Github-DevCard

# 2. Install dependencies (pnpm is what this repo is locked to)
pnpm install

# 3. Set up environment variables — see below
cp .env.example .env.local

# 4. Run the dev server
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | **Yes** | The base URL the app is running on (e.g. `http://localhost:3000` locally, or your deployed domain in production). The `/compare` and `/trending` pages call the app's own `/api/github/...` routes over HTTP, so this needs to point at wherever the app itself is reachable. |
| `GITHUB_TOKEN` | No | A [GitHub personal access token](https://github.com/settings/tokens) (no scopes needed for public data). Without it, requests use GitHub's unauthenticated rate limit (60/hour/IP). With it, the limit jumps to 5,000/hour, which is worth setting for local development if you're searching a lot of usernames back-to-back. |

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

## License

No license specified yet — all rights reserved by default.