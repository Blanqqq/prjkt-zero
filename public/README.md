# /public — assets & insertion points

## Portrait (pending — one-file swap)
The About section renders `/public/portrait.jpg` if present, and falls back to a
`零` placeholder otherwise (`components/sections/About.tsx`, `onError` → `Placeholder`).

**To add the real photo:** drop a square image (~1000×1000, JPG) at
`public/portrait.jpg`. No code change, no rebuild needed — it renders on next load.
Until then the placeholder ships cleanly.

## Imagery / atmosphere
The site's atmosphere is **hand-crafted, not AI-generated** — `components/v3/InkWash.tsx`
(pure SVG sumi-e wash) is the **production asset** and the permanent fallback.

AI-generated imagery (Replicate/Flux) is **optional and pending account credit** —
see `docs/v3/06-asset-plan.md` for the generation brief. There are **no Replicate
hooks wired into runtime code**; the hand-crafted assets are self-sufficient, so
nothing breaks without credit. If/when funded, generated pieces would be added
under `public/` and referenced the same way as the portrait (drop-in), keeping the
hand-crafted versions as fallback.

## Existing renders
- `katanas/*.png` — six wireframe-on-black section blades (used by `SectionIndex`).
- `cars/*.png` — four JDM wireframe renders (used by `ProjectsV3` + case studies).
- `resume.pdf` — downloadable résumé (Recruiter Mode).
