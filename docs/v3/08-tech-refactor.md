# Deliverable 8 — Technical Refactor Plan

Ordered by value-to-risk. Each item maps to an audit finding. None of this blocks the `/v3` build; items 1–3 should land first because everything else inherits them.

## 1. Single public-origin source of truth (A1) — High
- Add `NEXT_PUBLIC_SITE_URL` (default `https://prjkt-zero.vercel.app`).
- Consume in `app/layout.tsx` `metadataBase`, `PERSON_LD.url`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`.
- Acceptance: OG debugger (LinkedIn/Slack) resolves image + canonical to the live host.

## 2. SSR-safe, reduced-motion-first motion primitive (A2, A3) — High
- Create `components/motion/Reveal.tsx`: wraps framer-motion, reads `useReducedMotion()`, and when reduced (or before mount) renders children at their **final** visual state (no `opacity:0` in SSR).
- Replace ad-hoc `initial/animate/whileInView` in Hero, Projects, ProjectCaseStudy, RecruiterView with `<Reveal>`.
- Acceptance: JS-disabled hero is fully visible; `prefers-reduced-motion` shows no transform/opacity entrances.

## 3. Recruiter decision moves server-side (A4, A12) — Medium
- Persist mode in a cookie (mirror the existing localStorage/`?r=1`).
- Read the cookie in a server component so first paint is correct — no Exhibit→Recruiter flash.
- Keep client context for runtime toggling.
- Acceptance: returning recruiter sees Recruiter view with zero flash; toggle still instant.

## 4. Delete dead car SVG renderers (A5) — Medium
- Remove `RX7/R34/Supra/NSX/Wheel` + `shade/lighten/darken` from `JDMCar.tsx` (never reached; all projects set `carImageSrc`). Keep the image branch.
- If a no-image fallback is still wanted, replace 170 lines with a simple placeholder.
- Acceptance: bundle shrinks; case studies + projects visually identical.

## 5. One shared active-section observer (A6) — Medium
- `useActiveSection(ids)` hook (single IntersectionObserver) in context; `Nav` and `SidebarRail` consume it.
- Acceptance: nav + rail highlight identically; one observer in the profiler.

## 6. Hygiene — Low
- Confirm `tsconfig` strict; add a minimal `eslint` pass in build.
- Right-size `/cars` + `/katanas` assets to display boxes (A10).
- Contrast pass on eyebrow/idle-link tokens (A11).

## Sequencing
1–2 before the `/v3` build (the new page consumes both). 3–5 in parallel with the build. 6 as cleanup before merge.

## Risk notes
- `/` and `/v3` share `AppFrame`, `PortfolioContext`, data layer, and case studies — refactors here touch both routes. Verify `/` after each change (it's the live site).
