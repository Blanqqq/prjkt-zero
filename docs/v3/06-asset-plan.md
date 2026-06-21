# Deliverable 6 — Asset Generation Plan

> **Update (2026-06-20):** Replicate is now authenticated, but the account has $0 credit and Higgsfield has none either, so paid AI generation is on hold. Rather than block, the **#1 asset (atmosphere) was hand-crafted in code** instead — see "Delivered" below. The AI-gen brief stays valid for when credit is added.

## ✅ Delivered (no-AI, free)
- **Sumi-e ink-wash atmosphere** — `components/v3/InkWash.tsx`, pure SVG (`feTurbulence` displacement + soft gradients), placed behind the hero wordmark at very low opacity. Honors "not generic AI art" + negative-space direction; zero cost, zero weight beyond a few KB of inline SVG. Build + live-preview verified.
- Pairs with the CSS `.ink-wipe` wordmark reveal (shipped separately).

## Principle
Generate only assets that **earn their pixels** against negative space. Default to *no new hero image*; add atmosphere only if it raises the concept without costing the perf budget (D9). Museum/concept-car quality. **Not** generic AI art, cyberpunk, or anime.

## Existing assets (reuse, don't regenerate)
- `/public/katanas/*.png` (6) — wireframe-on-black blades, one per section.
- `/public/cars/*.png` (4) — JDM silhouettes, one per project.
Both already graded by `cinema-img`. Keep unless research says the metaphor must change.

## Candidate new assets (priority order)
1. **Atmospheric ground texture** — ultra-subtle washi/paper or ink-wash gradient for section backgrounds. Tileable, < 60KB, AVIF. *Highest value, lowest risk.*
2. **Single-blade altar render** — one hero-grade katana on a dark plinth for the `SectionIndex` active state, consistent with the 6 existing blades. Only if it out-performs the current PNGs.
3. **Kanji brush strokes** — hand-feel `零` / section kanji as SVG or transparent PNG for decoration (replaces the CSS `brush-behind` if higher quality).
4. **OG/social image refresh** — branded card matching v3 (ties to A1 origin fix).

## Generation spec (apply to every asset)
- Palette: sakura `#FFE4EC` ground or pure `#06060A` for blade backplates; ink `#111`; crimson only as a spark.
- Style refs: Kenya Hara emptiness · sumi-e ink · concept-car studio lighting · matte, not glossy.
- Negative prompt: neon, cyberpunk, anime, glow-heavy, busy, text, watermark.
- Output: AVIF/WebP, sized to display box, transparent where it composites over sakura.

## Acceptance gates
- Passes the "museum vs stock-AI" eye test.
- Adds < its weight in perceived value; never pushes LCP over budget.
- Consistent as a *set* with the 6 existing blades.

## Workflow once tools connect
1. Confirm Replicate auth (or use Higgsfield `generate_image`).
2. Generate texture (#1) first; integrate; measure perf.
3. Only then attempt the altar render (#2).
