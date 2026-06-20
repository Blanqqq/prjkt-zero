# Deliverable 2 — Competitive Analysis

**Status:** Done via WebSearch (Exa/Firecrawl weren't connected; this is real web research, synthesized from case studies, Awwwards entries, and the designers' own writing — not a substitute fake). Deep per-pixel teardown of the heavy WebGL sites would need a browser MCP; the *principles* below don't.
**Date:** 2026-06-20.

## The field splits into two camps

| Camp | Who | Signature | What it optimizes |
|---|---|---|---|
| **A — Immersive WebGL** | Bruno Simon, Active Theory, Resn | A handcrafted 3D world you *explore* | Wonder, novelty, "forget you're looking at a screen" |
| **B — Editorial craft** | Linear / Vercel (Rauno Freiberg), Daniel Spatzek, Locomotive-style sites | Restraint + obsessive micro-detail + strong identity | Taste, trust, perceived precision |

PRJKT ZERO's locked brief (Apple × Kenya Hara × editorial print, content-led, fast, accessible, AI/ML *engineer* not creative-dev) puts us squarely in **Camp B**, borrowing exactly one idea from Camp A.

## Findings by source

**Bruno Simon** ([case study](https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b), [site](https://bruno-simon.com/)) — Three.js car-game world; **projects are physical places you drive to** — browsing becomes exploration. Retention hook: multiplayer "whispers" (leave a flame + message). Obsessive detail (spatialized audio). *Cost:* heavy, hard on mobile/a11y, and it reads as "creative developer," not "ML engineer." **Borrow the principle (navigate-to-enter), not the engine.**

**Active Theory / Resn** — benchmark for high-end immersive WebGL set pieces. Same trade: maximum wow, maximum weight. Off-lane for us; useful only as a reminder that a *single* memorable mechanic beats wall-to-wall spectacle.

**Rauno Freiberg — "Invisible Details of Interaction Design" / Devouring Details** ([essay](https://every.to/p/invisible-details-of-interaction-design), [devouringdetails.com](https://devouringdetails.com/)) — the Camp B bible. Craft lives in *timing of animation, physics of motion, predictability of gesture*. Premium UI (Stripe/Linear/Vercel) = restraint + relentless micro-detail. Build by prototyping in code, not mockups. **This is our quality bar.**

**Daniel Spatzek** ([site](https://www.danielspatzek.com/)) — CSSDA Designer of the Year ×4. Treats the portfolio as "a work of art"; the **landing impression** is the thesis; one-person builds with a strong art-directed identity. **Lesson: the first screen must state the identity in one confident gesture.**

**Awwwards SOTD 2025–26 patterns** ([awwwards](https://www.awwwards.com/)) — scroll-driven narrative, immersive hero, purposeful motion (small hover cues over gratuitous animation), near-perfect balance across design/usability/creativity/content. Winners "make you forget you're looking at a screen."

## Steal / Avoid → mapped to our sections

**Steal**
- **Exploration-as-navigation** (Bruno Simon) → our **SectionIndex single-blade draw = "enter a section"** is the restrained, performant, on-brand analog. *Validated.*
- **Craft in micro-details** (Rauno) → tighten timing/physics on the blade cross-fade, CTA press, nav-active transitions. Codify in D5.
- **One confident landing gesture** (Spatzek) → HeroV3's wordmark + single kanji + live clock. Consider one signature reveal (ink wipe) to raise the first-impression ceiling.
- **Purposeful hover cues** (Awwwards) → keep hover as enhancement; never required (touch parity already enforced).

**Avoid**
- Full 3D/WebGL world — perf, mobile, a11y cost, and it mis-signals (creative-dev, not ML engineer).
- Scroll-jacking, content-gating loaders, autoplay-everything.
- Spectacle without a memory hook — pick ONE mechanic and make it perfect.

## Implications (feed D3 + D5)
1. The single-blade SectionIndex is our differentiator — invest the most craft there (D5 timing/physics pass).
2. Raise the hero's first-impression ceiling with **one** signature reveal (candidate: sumi-e ink wipe on the wordmark), reduced-motion-safe.
3. Memory test answer to protect: *"the site where you draw a blade to enter each section."*

## Sources
- [Bruno Simon case study](https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b) · [bruno-simon.com](https://bruno-simon.com/)
- [Invisible Details of Interaction Design — Rauno Freiberg](https://every.to/p/invisible-details-of-interaction-design) · [Devouring Details](https://devouringdetails.com/)
- [Daniel Spatzek](https://www.danielspatzek.com/) · [CSSDA DOTY](https://www.cssdesignawards.com/doty2018/nominees/daniel-spatzek)
- [Awwwards](https://www.awwwards.com/) · [How Stripe, Linear, Vercel ship premium UI](https://mantlr.com/blog/stripe-linear-vercel-premium-ui)
- [awesome-casestudy (luruke)](https://github.com/luruke/awesome-casestudy/blob/master/README.md)
