# GitHub DevCard

Search any GitHub username, get a rich profile view (stats, top repo, collected stars), compare two developers head-to-head, browse trending repos by language — and export any of it as a shareable PNG card.

**Live demo:** [github-dev-card-bypl.vercel.app](https://github-dev-card-bypl.vercel.app/)
> If the demo doesn't load, try it with a VPN — Vercel deployments are occasionally blocked from some regions.

![demo](./public/demo.gif)
> *10–15s clip: search a username → view the profile → generate & download the card. Record with [ScreenToGif](https://www.screentogif.com/) (Windows) or [Kap](https://getkap.co/) (macOS), keep it under ~3MB, drop it at `public/demo.gif`.*

## Features

- 🔍 Search any GitHub username → profile with followers, public repos, total stars collected across all repos, and most-starred/most-recent project
- ⚔️ Head-to-head comparison between two GitHub users
- 📈 Trending repositories by language, powered by the GitHub Search API
- 🖼️ Export the profile or comparison card as a downloadable PNG, client-side, no server round-trip
- ⚡ GitHub responses cached for an hour at the fetch layer, so repeat visits don't burn API quota

## Why this architecture

- **All GitHub calls live in one server-only module** (`src/lib/github.ts`, `"use server"`). Every fetch — user, repos, starred, trending — and every error case (`USER_NOT_FOUND`, `RATE_LIMIT_EXCEEDED`, network failure) is normalized in exactly one place, so pages don't each reinvent error handling.
- **Two internal API routes** (`/api/github/profile/[username]`, `/api/github/trending`) exist for **aggregation, not gatekeeping**. The Profile page is a Server Component and calls `lib/github.ts` directly — no route needed. Compare and Trending, on the other hand, need a *shaped* response (e.g. Compare needs `totalStars`, computed from the raw repos list) reused across more than one feature, so that computation lives once in the route handler and both pages fetch it over `NEXT_PUBLIC_BASE_URL`.
- **Caching happens at the fetch layer, not the route layer**: every GitHub call carries `next: { revalidate: 3600 }`, so GitHub is hit at most once per hour per resource regardless of how many users load the page. This — not custom rate-limiting logic — is what keeps the app under GitHub's rate limit (60 req/hour unauthenticated, 5,000 req/hour with a `GITHUB_TOKEN`). It's Next.js Data Cache revalidation rather than route-level ISR (there's no `generateStaticParams` or `export const revalidate` on the pages themselves), but it gets you the same practical result: fast repeat loads without permanently stale data.
- **Card export is 100% client-side** (`generate-card.tsx`, using `html-to-image`): the PNG is a screenshot of the rendered DOM node, taken in the browser. No server-side image generation is involved in this feature — that keeps it instant.

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Server Components + Server Actions) |
| UI | React 19, Tailwind CSS 4, shadcn/ui, base-ui |
| Forms/validation | react-hook-form, zod |
| Image export | html-to-image |
| Data source | GitHub REST API (`/users`, `/users/:u/repos`, `/search/repositories`) |
| Deployment | Vercel |

## Getting started

```bash
git clone https://github.com/alir3za-samadi/Github-DevCard.git
cd Github-DevCard
pnpm install
```

Create a `.env.local` in the project root:

```bash
# Optional — raises GitHub's rate limit from 60 to 5,000 requests/hour.
# Create a token with no scopes at https://github.com/settings/tokens
GITHUB_TOKEN=

# Required — the Trending and Compare pages fetch the app's own API
# routes by absolute URL. Without this, those two pages will throw at runtime.
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Then:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | What it does |
|---|---|
| `/` | Search bar + a few preset usernames to try |
| `/profile/[username]` | Profile stats, most-starred repo, repo list |
| `/compare?userA=&userB=` | Side-by-side stats for two users |
| `/trending?lang=` | Trending repos filtered by language |

## Roadmap

- Dynamic `generateMetadata` per `/profile/[username]` page + a real per-user Open Graph image via `next/og`, so sharing a profile link on Twitter/LinkedIn shows a proper preview card instead of the generic site metadata.