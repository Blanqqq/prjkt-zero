# Deliverable 1 — Full Site Audit

**Project:** PRJKT ZERO · John Paul Giftson portfolio
**Live:** prjkt-zero.vercel.app · **Repo:** Blanqqq/prjkt-zero
**Audited:** 2026-06-19 · against `main` @ `1de857e`
**Method:** full local read of `app/`, `components/`, configs. No external tools (Browser/Exa/Firecrawl deferred per direction).

---

## 0. Stack & architecture snapshot

| Layer | Reality |
|---|---|
| Framework | Next.js 15.5.19, App Router |
| UI | React 18.3.1, framer-motion 11.11.9 |
| Styling | Tailwind 3.4.13 + hand-rolled CSS in `globals.css` |
| Lang | TypeScript 5.6.3 (strict not verified — no tsconfig read) |
| Extras | pdf-lib (resume), next/image |
| Tests / CI | **None in repo** (no test runner, no workflow, no lint config beyond `next lint`) |

**Route map**
- `app/layout.tsx` → `PortfolioProvider` → `AppFrame` (atmosphere + nav + rail + footer + cursor + petals + easter egg) → routes
- `app/page.tsx` (`"use client"`) → `recruiter ? RecruiterView : FullExperience` (Hero → About → Projects → Experience → Skills → Education → Contact → Hobbies, kanji dividers between)
- `app/projects/[slug]/page.tsx` → **server component**, `generateStaticParams` over `PROJECTS` → `ProjectCaseStudy` (the shared 10-part spine)
- `app/v3/page.tsx` → placeholder contender (target of this work)

**Data layer** (keep, per brief): `components/projects/projectsConfig.ts` (4 projects, full case studies) · `components/katana/katanaConfig.ts` (6 section blades).

---

## 1. Findings — severity ranked

Severity = user/recruiter impact × likelihood, not effort.

### 🔴 Critical / High

**A1 — `metadataBase` points at the wrong domain.**
`app/layout.tsx:7` sets `metadataBase: new URL("https://giftson.dev")`, but the site ships on `prjkt-zero.vercel.app` and `PERSON_LD.url` (`layout.tsx:49`) says `prjkt-zero.vercel.app`. Every relative OG/canonical URL Next generates resolves against `giftson.dev` — a domain not serving this build. Result: OG image + canonical links can 404 in scrapers (LinkedIn/Slack/iMessage previews), and the structured-data URL disagrees with the canonical host. **Fix:** single source of truth for the public origin (env var), used by `metadataBase`, `PERSON_LD`, `sitemap.ts`, `robots.ts`, `opengraph-image`.

**A2 — Hero (and most sections) ship as `opacity:0` in SSR HTML.**
Framer-motion `initial={{ opacity: 0, y: 20 }}` renders as an inline style in the server HTML. `Hero.tsx:36-105` means the wordmark, subhead, CTAs and vitals are all invisible until JS hydrates and runs the entrance. Consequences: (a) if JS is slow/blocked, the hero is blank; (b) the LCP element is hidden at first paint, hurting perceived load; (c) no-JS / some crawlers see empty hero. Same pattern in `Projects.tsx`, `ProjectCaseStudy.tsx`, `RecruiterView.tsx`. **Fix:** animate from a visible-by-default baseline (CSS reveal that no-ops without JS), or gate `initial` on a mounted flag, or use `whileInView` with `initial={false}` for above-the-fold.

**A3 — Reduced-motion is not honored by the entrance animations.**
`globals.css:247` zeroes CSS `animation`/`transition` durations under `prefers-reduced-motion`. But framer-motion drives entrances with JS-computed inline transforms — that media query does **not** touch them. Only `KatanaWall.tsx` calls `useReducedMotion()`. So a vestibular-sensitive user still gets fade-up/translate on the Hero, Projects, every case-study block, and the Recruiter `h1`. This is the one accessibility gap that actively affects a class of users. **Fix:** a shared motion wrapper that reads `useReducedMotion()` and collapses to opacity-only (or no) transitions globally.

### 🟠 Medium

**A4 — The entire homepage is a client component.**
`app/page.tsx:1` is `"use client"`, so Hero/About/Projects/all sections ship as client JS and forfeit RSC streaming. Combined with the `hydrated` gate (`page.tsx:17-22`), a returning recruiter (localStorage `pz_recruiter=1`) first sees `FullExperience`, then swaps to `RecruiterView` after hydration — a visible content flash and layout jump. **Fix:** push the recruiter decision to a cookie read in a server component (no flash), keep only genuinely interactive leaves as client.

**A5 — ~170 lines of dead car-rendering code.**
`JDMCar.tsx:31-235` (the `RX7`/`R34`/`Supra`/`NSX` SVG renderers + `Wheel` + shade helpers) only execute when a project has **no** `carImageSrc`. Every project in `projectsConfig.ts` sets `carImageSrc`, so this branch is never reached in production. It's maintenance weight and ships in the bundle. **Fix:** delete, or move behind a clearly-marked fallback the data can never trigger and tree-shake.

**A6 — Two IntersectionObservers compete for one truth.**
`Nav.tsx:50` and `SidebarRail.tsx:55` each build an IO over the same section ids to compute "active." Two observers, two `active` states that can disagree at boundaries. **Fix:** one `useActiveSection` hook in context; both navs consume it.

**A7 — The "Project Garage" reads as a tuner catalog, not craftsmanship.** (brief-flagged)
`Projects.tsx:47-104`: a black slab (`data-dark-section`) with four car "bays." It's novel, but against the audit's own emotion test it communicates *car showroom*, not *AI/ML engineering rigor*. The cars are louder than the work; the JDM metaphor (RX-7 = "rotary smoothness") is a stretch a recruiter must decode. **This is the highest-value section to rethink** — the case-study content underneath is genuinely strong and is being upstaged.

**A8 — The katana wall outweighs its job.**
`KatanaWall.tsx` renders 6 wireframe-on-black images in a 3×2 grid as *section navigation*, occupying the entire lower hero. Six heavy images for what is functionally a 6-item menu. High pixel cost, high priority-image count (`priority={index < 3}`), modest informational payload. (brief-flagged as the most reinventable element.)

### 🟡 Low / Polish

**A9 — Petal layer paints continuously on mobile.** `SakuraPetals.tsx:102-120`: 36 absolutely-positioned spans, petals carry a `drop-shadow(...)` filter (`:117`) and animate `transform` for 18–32s. Filtered, moving nodes = ongoing composite/paint cost on low-end phones. The dark-section fade is smart; consider also halving `count` and dropping the drop-shadow under `(max-width: 640px)` / low DPR.

**A10 — Image hygiene.** `JDMCar.tsx:24` declares `width={1536} height={1024}` (3:2) while the config comment recommends 1600×900 (16:9); `object-contain` hides mismatch but ships letterboxing. Confirm all `/cars` and `/katanas` PNGs are sized to their display box and served as AVIF/WebP (next/image default — verify in prod headers).

**A11 — Small-text contrast.** `.heading-eyebrow` is 11px at 55% ink on sakura (`globals.css:84-91`); link idle states use `text-ink-700/65`. These are plausibly under WCAG AA for small text. Worth a contrast pass with a checker.

**A12 — Recruiter hydration flash.** Same root as A4: returning recruiter sees Exhibit→Recruiter swap. Cookie/SSR fixes both.

**A13 — Narrative vs. repo reality.** Case-study copy claims "asset budgets enforced in CI" / "Lighthouse CI" (`projectsConfig.ts:107`). There is no CI in the repo. Fine as portfolio voice, but if a recruiter checks the repo it's a credibility gap — consider making at least the perf budget real (ties to D9).

---

## 2. What's genuinely strong (keep / protect)

- **Token system** is clean and consistent: sakura/ink/crimson scale in `tailwind.config.ts`, mirrored as CSS vars, with purpose-built utilities (`washi-card`, `cinema-img`, `brush-behind`, `ink-rule`).
- **Recruiter Mode** is a real differentiator: localStorage + `?r=1`, dedicated dense view, print-to-PDF stylesheet (`globals.css:258-296`), downloadable resume. Locked — protect it.
- **Accessibility foundations**: skip link (`AppFrame.tsx:27`), custom cursor hard-guarded to fine pointers and gated to `.cinematic`, focus-visible rings, `aria-hidden` discipline on decoration.
- **SEO scaffolding**: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, Person JSON-LD. (Just fix the domain — A1.)
- **Case studies** are static-generated (`generateStaticParams`) and the 10-part spine is well-structured and honest (status pills distinguish prototype vs live). The *content* is the asset.
- **Atmosphere** is cheap: `AtmosphereLayers` is pure CSS/SVG, fixed, no listeners.

---

## 3. Section-by-section emotion / craftsmanship test

> Does it create emotion · build intrigue · communicate craftsmanship? Keep / Elevate / Replace.

| Section | Verdict | Note |
|---|---|---|
| Hero | **Elevate** | Strong bones; over-reliant on katana grid below the fold (A8) and hidden-until-JS (A2). |
| About | Elevate | Not yet read in depth — verify it leads with the person, not decoration. |
| **Projects (Garage)** | **Replace** | A7. Reframe as editorial artifacts; let the case studies lead. |
| **Katana wall** | **Replace/Reduce** | A8. Keep the 6 assets, kill the 3×2 dominance. |
| Experience | Keep | Lives mainly in Recruiter view; solid. |
| Skills / Education | Keep | Functional; minor visual polish. |
| Contact | Keep | Clear CTA. |
| Case-study spine | **Keep (protect)** | Shared across `/` and `/v3`; the strongest content. |
| Recruiter view | **Keep (locked)** | Differentiator. |

---

## 4. Mobile & responsive

- SidebarRail is desktop-only (`lg:block`) — correct.
- Katana wall collapses to 1 column → 6 tall images stacked = a long scroll before any section is reachable on phones (compounds A8).
- Dark garage cars go 1-col; fine, but the black slab + petal-fade interplay is the heaviest mobile moment (A9).
- No obvious horizontal-overflow traps spotted (`overflow-x: hidden` on body, `globals.css:34`).

---

## 5. Audit → downstream deliverables

| Finding | Feeds |
|---|---|
| A2, A3 | D5 Motion system (SSR-safe, reduced-motion-first wrapper) |
| A4, A12 | D8 Refactor (cookie/SSR recruiter decision), D10 Architecture |
| A5, A6 | D8 Refactor (dead-code removal, shared active-section) |
| A7, A8 | D7 UX redesign (Projects + Katana reinvention) |
| A9, A10, A2 | D9 Performance (LCP, paint budget, image sizing) |
| A1, A13 | D9 / D8 (origin env var, optional real perf budget) |

**Bottom line:** the foundation is better than the brief implies — clean tokens, real Recruiter Mode, honest case studies, solid SEO scaffolding. The reinvention is not a rebuild; it's (1) fix three correctness issues (A1–A3), (2) replace two upstaging sections (A7–A8), (3) make motion SSR- and reduced-motion-safe, all on the `/v3` route while `/` stays live.
