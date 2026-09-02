# Automata

Landing page for a paid corpus of first-person footage: people record 5–30s of an ordinary
task from their own eyeline, a human reviews each clip, and approved clips are paid in USDG
on Robinhood Chain.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (tokens in `app/globals.css`, no config file)
- GSAP + ScrollTrigger for reveals (`components/motion.tsx`)
- react-three-fiber + three for the hero automaton (`components/ui/robot-hero.tsx`)

## Art direction

Dark technical archive: near-black `#08080a`, bone `#ece7de`, one signal orange `#ff4a1c`.
Three faces, all self-hosted from `public/fonts` — **Zodiak** (display serif), **Switzer**
(body), **Spline Sans Mono** (labels, ledger figures). No Inter, no Playfair, no Instrument
Serif. Motion is masked line reveals and drawn hairlines rather than fade-up.

The hero automaton is the supplied `robot-hero` component with the navbar, wordmark backdrop
and light stage removed — the robot only, smaller, re-lit for a black page, and with the HDRI
environment dropped so the page has no runtime CDN dependency.

## Content

All copy, sample payouts, FAQ and pay rates live in `lib/site.ts`.

- `payouts` is **sample data with placeholder transaction hashes** — the `Verify` links will
  404 on the explorer until real ones are in. Replace before launch.
- `pay.base` / `pay.perSecond` drive both the dial and the FAQ, so changing the rate changes
  both.
- The `Record a clip` buttons point at `#record` (`data-cta="record"`); wire them to the
  recorder when it exists.

## Assets

`public/pov.jpg`, `public/og.jpg` and the icons were generated with GPT Image 2 through the
Higgsfield CLI — original renders, not stock. Raw outputs are kept in `assets-raw/`.

## The pipeline

`/record` → Vercel Blob → Neon Postgres → `/admin` → USDG transfer on Robinhood Chain →
the public ledger.

| Piece | Where |
|---|---|
| In-browser recorder (5–30s, one take) | `components/recorder.tsx`, `app/record` |
| Client upload token | `app/api/blob/upload` |
| Submission row | `app/api/submissions` |
| Review console (password) | `app/admin`, `components/admin-console.tsx` |
| Approve → pay → record hash | `app/api/admin/review`, `lib/chain.ts` |
| Public feed behind the ledger | `app/api/payouts` |

Approval pays **8.50 USDG flat** (`pay.flat` in `lib/site.ts`) to the submitted wallet, then
stores the transaction hash. The payment is sent *before* the row is marked approved: a paid
clip that failed to save can be reconciled from the chain, an approved clip that was never
paid cannot.

USDG is `0x5fc5360D0400a0Fd4f2af552ADD042D716F1d168` on chain 4663, per
docs.robinhood.com/chain/contracts — impostor tokens with the same ticker exist, so do not
swap that address without checking the docs. Decimals are read from the contract at runtime.

### Setup

1. Vercel → Storage → **Blob** and **Neon Postgres**, both connected to this project.
2. Set `ADMIN_PASSWORD` and `PAYOUT_PRIVATE_KEY` in Vercel → Settings → Environment Variables.
3. Fund the payout wallet with USDG on Robinhood Chain. `/admin` shows its balance.
4. `vercel env pull .env.local` to run the whole thing locally.

Without those variables the site still builds and serves: submissions return 503, the ledger
falls back to sample rows, and `/admin` says review is not configured.

## Develop

```bash
npm run dev
npm run build
```
