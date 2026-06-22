# Deliverable 7 — UX Redesign Plan

Scope: the `/v3` homepage composition only. `/` (museum) stays live; case studies at `/projects/[slug]` are shared and unchanged. Locked: sakura palette, kanji decoration, case-study spine, Recruiter Mode.

## North star

A visitor should, in one scroll, understand **who** (AI/ML student, Winnipeg), **what** (4 real builds), and **why he's good** (honest, measured outcomes) — and *feel* that it was made by someone obsessive. The experience leads with content; decoration retreats (continues the v2 art-direction pass, commit `42e08fb`).

## The three reinventions (from audit A7, A8)

### 1. Projects: "Garage" → **Editorial artifacts** (replace)
The dark car-catalog upstages strong case-study content. Reframe each project as an *artifact card* in a calm, sakura-ground editorial layout:
- Lead line = the **outcome**, not the car ("+18% reasoning lift" before "R34").
- Status pill (Live / Research / Client / Prototype) — already in data.
- Tech-stack mono chips (from `spec.engine`).
- The JDM render stays but **desaturated and small** — a motif, not the hero (honor `cinema-img`).
- One-line tagline + `Case study →`.
- Layout candidates (decide in build): asymmetric 2×2 editorial grid · horizontal snap-carousel · vertical stacked story. Default recommendation: **asymmetric grid** (scannable, no hidden content, recruiter-friendly).

### 2. Katana wall: 3×2 grid → **single active blade** (reduce)
Keep all 6 assets; kill the 6-image wall. Replace with a **vertical accordion / index list** of the six sections where only the *active* row reveals its blade image. One image in view at a time → 5/6 the pixel cost, clearer nav, more intrigue. Click still scrolls to the section (preserve `targetId`).

### 3. Hero: keep bones, fix above-the-fold (elevate)
- Wordmark + two-sentence subhead + two CTAs + vitals stay.
- Replace the katana grid in the lower hero with negative space + a single faint kanji column and the Tokyo/Winnipeg time micro-card (validated direction from the Stitch base hero).
- Above-the-fold content visible without JS (audit A2).

## Information architecture (v3 order)
Hero → About → Projects(artifacts) → Experience → Skills → Education → Contact. Section index (the ex-katana accordion) doubles as a sticky mini-map. Recruiter Mode unchanged.

## Interaction principles
- One primary action per viewport.
- Hover is enhancement, never required (touch parity).
- Every clickable has a focus-visible state (already the norm — keep).
- Motion communicates state/hierarchy, never just decoration (→ D5).

## Open questions for research phase (D2/D4)
- Carousel vs grid vs stack for Projects — validate against Awwwards patterns.
- Whether the section-index accordion or a horizontal ticker reads more "shrine."
