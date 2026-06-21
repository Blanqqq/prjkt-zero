# Deliverable 4 — Visual Language & Moodboard

**Status:** Visual-language report done via Exa research (2026-06-20). A true *image* moodboard (clustered visuals) needs generation/curation credit — see "Moodboard" below, delivered as a curated reference set instead. Firecrawl not required; Exa covered the research.

**Guardrail (held):** research *enriches treatment*; it never overrides the locked constants (sakura palette, kanji-only brush, case-study spine, Recruiter Mode). Where a principle would conflict, it's noted as an option, not auto-applied.

---

## The aesthetic pillars → concrete UI rules

### 1. Ma (間) — emptiness as structure, not gap
Kenya Hara: emptiness is a *"container for the imagination,"* receptive and invitational — distinct from Western minimalism's declarative reduction. Negative space is a **structural material**. The practical test: remove an element; if the rest gets *harder* to read it was structural, if *easier* it was noise.

→ **Rules:** generous section rhythm (the canonical fix was 24px→64px vertical margin — *add space, not dividers*); one focal action per viewport; treat whitespace as load-bearing. **Caveat that matters for us:** Ma suits *exclusivity/storytelling/identity* sites but *backfires* on dense-info needs — which is exactly why **Recruiter Mode** exists as the dense, reassurance-first counterpart. The two modes are the reconciliation.

### 2. Wabi-sabi — four pillars, all codeable
- **Ma** (negative space) — above.
- **Fukinsei** (asymmetry) — break the centered 12-col grid → **validates `ProjectsV3`'s asymmetric editorial layout.**
- **Kanso** (simplicity, incl. *technical* cleanliness — fast load, clean code) → **validates the Phase-3 dead-code removal + the perf budget (D9).**
- **Shibui** (austere, understated — "whispers, not bling") → crimson stays rare; no glossy chrome/neon.
- **Controlled imperfection** via **CSS brush-stroke masking that animates as ink spreads** → **exactly the `.ink-wipe` reveal already shipped.**

### 3. Sumi-e — ink discipline as hierarchy
*"Say more with less; each stroke intentional and irreversible — no visual hedging."*
→ **Rules:** **ink-gradation hierarchy** (use opacity/weight like a brush's water-to-ink ratio — already how `text-ink-800/700` + eyebrow opacities work); **vermilion/red seal as a rare accent only** → **directly validates the crimson <2% rule**; **rice-paper tactility** (fiber noise) → **validates `washi-card` + `paper-grain`**; mark-and-void = layout theory → the `InkWash` atmosphere + negative space.

### 4. Luxury craft — Apple (Ive), Bang & Olufsen, Porsche
- **Ive: "care about the parts nobody sees"** — finish the back of the drawer; manufacturing precision *is* the aesthetic; matte surfaces that absorb light. → **Reframes our engineering as craft:** SSR-safe reveals, reduced-motion equivalents, the a11y contrast fix, cookie/SSR recruiter — *these invisible details are the "back of the drawer."* Keep that bar.
- **B&O: material honesty** — "if it looks like aluminium, it *is* aluminium." → **Don't fake materials:** `washi-card` is honestly translucent over sakura; no faux-3D skeuomorphism.
- **Porsche manifesto:** soul · precision · simplicity · clear purpose · emotion — *"engineered, not merely styled."* → maps to our **Porsche Test** quality gate: the numbers on the site are real (`caseStudy.outcomes`), not decoration.

---

## Moodboard (curated reference set)
A real image-board needs gen/curation credit (on hold). Until then, these are the canonical references to pull from — each already distilled into a rule above:

| Cluster | Reference |
|---|---|
| Emptiness / Ma | [Hara — Emptiness, not Simplicity](https://blakecrosley.com/blog/design-philosophy-kenya-hara) · [Negative Space as Infrastructure](https://blakecrosley.com/blog/nothing-is-structural) · [Ma in UX](https://uxplanet.org/integrating-japanese-ma-into-modern-ux-principles-9b0646d5b756) |
| Ma in *digital* (+ the density caveat) | [Redefining Ma in Japanese Digital Aesthetics](https://uism.co.jp/en/blog/redefining-ma-in-japanese-digital-aesthetics/) |
| Wabi-sabi → code | [Wabi-Sabi in Web Design](https://silphiumdesign.com/wabi-sabi-web-design-implement-imperfection/) · [Ma · Wabi-Sabi Spatial Minimalism](https://katagami.ai/language/ma-wabi-sabi-spatial-minimalism) |
| Sumi-e → UI | [Sumi Ink Editorial Minimalism](https://katagami.ai/language/en-019dcaa1-64d5-7b30-aab9-dd7ee1af903f) |
| Luxury craft | [Jony Ive — The Part You Never See](https://blakecrosley.com/blog/design-philosophy-jony-ive) · [Apple unibody](https://wolfnhare.com/how-apple-s-aluminum-unibody-turns-precision-manufacturing-into-aesthetic-design) · [B&O — Craft Matters](https://www.bang-olufsen.com/en/int/story/craft-matters) · [Porsche Design Manifesto](https://art4d.com/en/2024/10/porsche-a-design-manifesto-2) |

---

## Net: what D4 changes
Mostly **confirms** the locked system and the v3 build (asymmetry, crimson-as-seal, washi/paper, ink-wipe, negative space, recruiter-as-density-mode). The one *new* framing worth adopting: **treat the invisible engineering (SSR/a11y/reduced-motion) as the "back of the drawer"** — the Apple/Ive craft tenet — and hold that standard through every remaining phase. Feeds [D3 creative direction](03-creative-direction.md) and the [D6 generation spec](06-asset-plan.md).
