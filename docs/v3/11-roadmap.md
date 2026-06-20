# Deliverable 11 — Implementation Roadmap

Phased so the live site is never at risk and each phase is independently shippable. ☐ = not started.

## Phase 0 — Research (BLOCKED on your MCP connections)
☐ D2 Competitive analysis (Browser/web) · ☐ D4 Visual-language + moodboard (Exa/Firecrawl) · ☐ enrich D3 creative direction · ☐ D6 asset generation (Flux/Replicate).
*Gate:* unblock when Browser/Exa/Firecrawl/Replicate are live. Until then, build proceeds on validated brief + Stitch base hero.

## Phase 1 — Shared infra fixes (no visual change) — ~½ day
☐ D8 #1 origin env var (A1) → verify OG preview.
☐ D8 #2 `Reveal` motion primitive (A2, A3) → verify JS-off hero + reduced-motion.
☐ Verify `/` (live museum) unaffected.
*Ship:* safe to merge to `main`; improves the live site immediately.

## Phase 2 — `/v3` composition — ~1–2 days
☐ `HeroV3` (negative space + kanji column + time micro-card; drop katana grid).
☐ `ProjectsV3` editorial artifacts (outcome-led; desaturated car motif).
☐ `SectionIndex` single-active-blade accordion (replaces KatanaWall on /v3).
☐ Wire Recruiter Mode parity on `/v3`.
☐ Drop in generated assets if Phase 0 delivered them; else use existing `/cars` + `/katanas`.
*Ship:* `/v3` is a complete contender behind the existing quiet nav link.

## Phase 3 — Refactor & cleanup — ~½ day
☐ D8 #3 cookie/SSR recruiter (A4, A12) · ☐ D8 #4 delete dead JDM code (A5) · ☐ D8 #5 shared active-section (A6) · ☐ D8 #6 hygiene (contrast, image sizing).

## Phase 4 — Performance & gates — ~½ day
☐ D9 budgets met (LCP/CLS/INP, JS size) · ☐ mobile paint trims (A9) · ☐ Lighthouse run in PR (also closes A13) · ☐ throttled-mobile 60fps check.

## Phase 5 — Decision
☐ Side-by-side `/` vs `/v3` review against the 4 quality tests → keep contender, remix, or promote `/v3` → `/` (routing swap, per D10).

## Dependency graph
```
Phase 1 ─┬─> Phase 2 ──> Phase 4 ──> Phase 5
         └─> Phase 3 ──┘
Phase 0 ··· feeds Phase 2 (assets) + Phase 5 (validation), but does not block it
```

## Definition of done (per phase)
Live `/` regression-checked · reduced-motion + keyboard pass · mobile + desktop screenshots · perf budget green.
