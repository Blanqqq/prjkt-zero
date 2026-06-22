# Deliverable 10 — Portfolio V3 Architecture

How the contender is built without disturbing the live museum.

## Principle: one app, two compositions, shared spine
`/` and `/v3` are two homepage compositions over the **same** primitives. The case studies, data, Recruiter Mode, and atmosphere are shared — only the landing composition differs (per the brief's "what we keep across both").

```
app/
  layout.tsx            // shared shell (origin env var fix — D8 #1)
  page.tsx              // museum homepage  (unchanged, live)
  v3/page.tsx           // contender homepage (this work)
  projects/[slug]/      // shared case studies (unchanged)
components/
  AppFrame, PortfolioContext, Nav, SidebarRail, Footer   // shared
  motion/Reveal.tsx     // NEW — SSR-safe, reduced-motion-first (D8 #2)
  hooks/useActiveSection.ts  // NEW — shared observer (D8 #5)
  v3/                   // NEW — contender-only sections
    HeroV3.tsx
    ProjectsV3.tsx      // editorial artifacts (replaces Garage on /v3)
    SectionIndex.tsx    // single-active-blade accordion (replaces KatanaWall on /v3)
  projects/projectsConfig.ts   // shared data (unchanged)
  katana/katanaConfig.ts       // shared data (reused by SectionIndex)
```

## Rules of engagement
1. **No edits to `app/page.tsx` or the museum-only components** except shared infra fixes (origin, motion primitive, active-section hook) that benefit both — and each such change is verified on `/` before merge.
2. **`/v3` composes existing data** (`PROJECTS`, `KATANAS`) — no data duplication.
3. **Recruiter Mode works on `/v3`** exactly as on `/` (same context; `recruiter ? RecruiterView : <V3>`).
4. **Case studies are untouched.** Both routes link into `/projects/[slug]`.

## Component contracts (new)
- `<Reveal as="h1" delay?>` — renders final state in SSR/reduced-motion; animates in otherwise. Replaces raw framer entrances everywhere.
- `useActiveSection(ids: string[]): string` — one IO, shared by Nav + SidebarRail + SectionIndex.
- `<ProjectsV3>` — maps `PROJECTS` to editorial artifact cards (outcome-led, desaturated car motif, status + tech pills).
- `<SectionIndex>` — maps `KATANAS` to an accordion; reveals one blade image for the active row; click → `scrollIntoView(targetId)`.

## State & theming
- Theme tokens unchanged (`tailwind.config.ts` + `globals.css`). No new colors; reuse `washi-card`, `cinema-img`, `ink-rule`, `brush-behind`.
- `PortfolioContext` unchanged in API; cookie persistence added under the hood (D8 #3).

## Rollout
`/v3` stays the labeled contender (Nav already links to it, `Nav.tsx:117`). When it wins, promotion is a routing swap (`/v3` content → `/`), not a rewrite — because both already share everything underneath.

## Quality gates (per the brief's four tests, made concrete)
- **Awwwards** → does the Projects reveal + section-index feel intentional on desktop *and* mobile?
- **Apple** → does every interaction have a reduced-motion equivalent and a focus state?
- **Porsche** → are the numbers real (outcomes from data, perf budget met)?
- **Memory** → the one thing to remember: *the single-blade section index* + *outcome-led artifacts*. If a tester recalls neither, iterate.
