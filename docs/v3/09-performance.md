# Deliverable 9 — Performance Optimization Plan

Goal: "expensive" feel **and** fast. Targets are field-realistic for a content site on Vercel.

## Budgets (gates before `/v3` merges)
| Metric | Target | Why |
|---|---|---|
| LCP (mobile, p75) | < 2.0s | Hero wordmark is the LCP element — must paint without waiting on JS (A2). |
| CLS | < 0.02 | Self-host/subset fonts; reserve image boxes. |
| INP | < 200ms | Custom cursor rAF + observers must stay off the input path. |
| Total JS (route) | < 180KB gz | Trim framer usage + dead code (A5). |
| Lighthouse Perf / A11y | ≥ 95 / 100 | Public scorecard for a portfolio. |

## Actions (mapped to audit)
1. **LCP** — render hero text at first paint (motion primitive, D8 #2). Preload the display font weight; `font-display: swap` with metric-matched fallback to hold CLS (the RX-7 case study already preaches this — make it true here).
2. **Paint budget on mobile** (A9) — under `(max-width:640px)`: halve `SakuraPetals` count, drop the petal `drop-shadow` filter, keep the dark-section fade. Respect `prefers-reduced-motion` (already does for the CSS drift).
3. **Image weight** (A10) — ensure AVIF/WebP via next/image; size `/cars` + `/katanas` to their actual display boxes; only true above-the-fold images get `priority` (today 3 katanas are priority — drop once the wall is replaced, D7 #2).
4. **JS trim** — remove dead `JDMCar` code (A5); prefer CSS transitions over framer for simple hover/reveal; lazy-mount below-the-fold motion.
5. **Cursor/observers** — keep the rAF lerp passive (it is); collapse two observers to one (A6) to cut listener work.
6. **Fonts** — confirm SF Pro / Shippori Mincho / JetBrains Mono are subset + self-hosted, not full webfont pulls.

## Measurement
- Add a Lighthouse CI step (also closes the A13 narrative-vs-reality gap) **or** at minimum a documented manual Lighthouse run in the PR.
- Verify with real throttled mobile (4x CPU, Slow 4G) before merge — animations must hold 60fps; if not, downgrade effects, not correctness.

## Non-negotiable
Performance is a gate, not a trade. If an interaction can't hit the budget on mid-tier mobile, it ships in a reduced form — never at the cost of the budget.
