# Deliverable 5 — Motion Design System (draft)

> **Draft.** Principles + tokens are buildable now; the cinematic set pieces (ink reveal, blade transition) get finalized after D2 competitive research.

## Philosophy
Motion communicates **state, hierarchy, and continuity** — never decoration for its own sake. Every animation must survive three tests: SSR-safe (A2), reduced-motion-equivalent (A3), and 60fps on mid-tier mobile (D9).

## Tokens
| Token | Value | Use |
|---|---|---|
| `ease.standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | the house curve (already everywhere) |
| `ease.exit` | `cubic-bezier(0.4, 0, 1, 1)` | leaving/collapsing |
| `dur.micro` | 120–180ms | hover, press, toggles |
| `dur.reveal` | 450–700ms | entrances |
| `dur.scene` | 0.9–1.1s | hero / set-piece only |
| `stagger` | 50–80ms | list children |

## Reduced-motion contract (non-negotiable)
All of the below collapse to **opacity-only ≤120ms, or none** under `prefers-reduced-motion`. Implemented once in `components/motion/Reveal.tsx` (D8 #2) so it can't be forgotten per-component.

## The vocabulary
1. **Reveal (entrance)** — opacity + 14–20px rise, `ease.standard`, `dur.reveal`. SSR renders the final state. Used everywhere generic.
2. **Ink reveal (set piece)** — content unmasks along a soft brush edge (CSS mask / clip-path), suggesting sumi-e. Reserved for section headers; pure CSS where possible; reduced-motion → plain fade.
3. **Single-blade transition (signature)** — switching the active row in `SectionIndex` cross-dissolves/slides one blade out and the next in (the v2 KatanaWall already has a draw-then-commit micro-motion to reuse, `KatanaWall.tsx:55-62`).
4. **Press** — `scale(0.97)` 120ms; the custom cursor already contracts on pointerdown (`KatanaCursor.tsx:54`).
5. **Parallax / depth** — *whisper only.* Atmosphere layers may drift a few px on scroll; never enough to cost frames or induce motion sickness.

## Anti-patterns (banned)
Bounce/elastic easing · scroll-jacking · autoplaying loops that never rest · animating layout properties (`width`/`top`) instead of `transform`/`opacity` · anything that blocks INP.

## Build order
`Reveal` primitive first (unblocks D8 + D9) → blade transition in `SectionIndex` → ink reveal on headers (last, polish).
