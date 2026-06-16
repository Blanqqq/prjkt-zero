# V3 — Stitch Design Brief

Same DNA, new clothes. The museum aesthetic stays at `/`; the contender lives at `/v3`.

## Locked constants (do not redesign)

- **Palette tokens**: sakura pink `#FFE4EC / #FFDCE7`, matte ink `#111`, crimson accent `#9D1B32`, cyan / gold / steel reserved for narrow accent use
- **Kanji decoration system** — `font-brush` Japanese serif reserved for kanji glyphs only
- **Case-study spine** — Hero → Mockup → Problem → Approach → Solution → Outcomes → Tech Breakdown → Journey → Challenges → Lessons & Future → Source (always last)
- **Recruiter Mode** — full untouched, including print-to-PDF + 60-second resume scan
- **Subject** — John Paul Giftson, 3rd-yr AI/ML student, UManitoba

## Everything below this line is up for reinvention

- Hero composition + wordmark treatment
- Navigation pattern (sidebar rail + top nav — both or one)
- Katana display (the centerpiece is the most reinventable thing)
- Project showcase layout
- About section treatment
- Motion language (currently `[0.22, 1, 0.36, 1]` everywhere — could shift)
- Surface materials (currently washi-card; could be glass, paper, metal, none)

## Stitch prompts (in execution order)

### 1. Hero — `prompt-hero.md`

> Premium portfolio hero for a 3rd-year AI / ML engineering student named John Paul Giftson, Winnipeg, Canada. Subject is presenting AI and machine learning work — not a generalist developer. Visual tone: Apple meets Kenya Hara meets editorial print. Sakura-pink background (`#FFE4EC`), matte black typography. Bold confident sans-serif wordmark, single line. A short two-sentence subhead leads with what he builds. Vertical kanji decoration in the negative space, very low opacity. Two CTAs: primary "View work" black pill, secondary "Hire me" ghost. Real estate reserved for a small Tokyo-time / Winnipeg-time micro-card.

### 2. Navigation — `prompt-nav.md`

> Portfolio top navigation in two variants. Variant A: minimal top bar — left brand mark `零`, center horizontal section list (About · Projects · Experience · Skills · Education · Contact), right Recruiter-mode toggle pill + Hire-me CTA. Variant B: the same plus a vertical left rail with icon-only section nav and a kaizen mantra in vertical Japanese type. Both translucent over sakura pink. Show desktop + mobile sheet. Typography is SF Pro Display, tight tracking.

### 3. Project showcase — `prompt-projects.md`

> Premium project showcase section for an AI/ML student portfolio. Replace the current "dark project garage" (black slab with car cards) with a treatment that reads as an editorial product launch, not a tuner car catalog. Four projects, each with a status pill (Live / Research · in dev / Client delivery / Portfolio · prototype), a tech-stack pill row, a one-line tagline, and a "Case study →" CTA. Show one option using a horizontal scroll carousel, one option using a 2×2 grid with each card a different size (asymmetric editorial), one option using a vertical stacked story. Keep the cars (JDM wireframe-on-black silhouettes), keep the kanji subtitle per project, but reframe so content leads.

### 4. Katana section — `prompt-katana.md`

> The most reinventable element. Currently six katana wireframe-on-black images in a 3×2 grid acting as section navigation. Need a new treatment that still uses the six images but reduces their visual dominance. Could be: a horizontal ticker/marquee, a stacked spread-card metaphor (like fanning out playing cards), a single hero blade that morphs through the six on hover, a vertical accordion list with the image only revealed on the active row, or a calendar-card style with the blade as the single image. The user should still be able to click a blade to jump to its section. Sakura pink page, matte ink typography. Apple-grade restraint.

### 5. About — `prompt-about.md`

> Premium About section for a 3rd-year AI/ML student. 4 paragraphs of bio + a portrait slot (square, ~1000×1000) + a quick-facts row (Discipline · Year · GPA · Status). Need a treatment that doesn't read like a default "about me" page. Could include: editorial magazine layout with pulled quotes, photograph as full background with text overlay, asymmetric two-column with sticky photo, or a polaroid-grid of multiple smaller images. Sakura background, brush kanji decoration allowed. Honest tone: this is a student looking for AI/ML roles, not a senior IC selling consulting.

## Output expectations from each Stitch generation

For each prompt: **2-3 variant directions**. We pick the strongest, optionally remix elements across variants. Stitch exports → I translate the visual decisions into actual code at `/v3`.

## What we keep across BOTH `/` and `/v3`

- Same routing primitives (Recruiter Mode toggle works in both)
- Same data layer (`projectsConfig.ts`, `katanaConfig.ts`)
- Same images (`/public/katanas/*`, `/public/cars/*`)
- Same case-study pages — they live at `/projects/[slug]` and serve both `/` and `/v3` traffic

Only the homepage composition differs.
