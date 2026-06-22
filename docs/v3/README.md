# PRJKT ZERO — V3 Reinvention Dossier

Strategy stack for the `/v3` contender. `/` (museum) stays live; case studies are shared. Locked: sakura palette, kanji decoration, case-study spine, Recruiter Mode.

## Deliverables

| # | Document | Status |
|---|---|---|
| 1 | [Full site audit](01-audit.md) | ✅ Complete (grounded in code) |
| 2 | [Competitive analysis](02-competitive-analysis.md) | ✅ Complete (WebSearch) |
| 3 | [Creative direction](03-creative-direction.md) | ◑ v1 (D2-informed; D4 imagery pending) |
| 4 | [Visual language & moodboard](04-visual-language-moodboard.md) | ✅ Report done (Exa); image board needs gen credit |
| 5 | [Motion design system](05-motion-system.md) | ◑ Draft (buildable) |
| 6 | [Asset generation plan](06-asset-plan.md) | ◑ Atmosphere delivered (hand-crafted SVG); AI gen on hold — no credit |
| 7 | [UX redesign plan](07-ux-redesign.md) | ✅ Complete |
| 8 | [Technical refactor plan](08-tech-refactor.md) | ✅ Complete |
| 9 | [Performance plan](09-performance.md) | ✅ Complete |
| 10 | [V3 architecture](10-v3-architecture.md) | ✅ Complete |
| 11 | [Implementation roadmap](11-roadmap.md) | ✅ Complete |

## Headline findings (from D1)
- **A1** wrong `metadataBase` domain → broken OG/canonical. Fix first.
- **A2/A3** framer entrances ship `opacity:0` in SSR and ignore reduced-motion. SSR-safe motion primitive fixes both.
- **A7/A8** the dark "Garage" and the 6-image katana wall upstage strong content → the two reinventions.
- Foundation is **better than the brief implies**: clean tokens, real Recruiter Mode, honest case studies, SEO scaffolding.

## Build sequence (from D11)
Phase 1 shared infra fixes → Phase 2 `/v3` composition → Phase 3 refactor → Phase 4 perf gates → Phase 5 decide. Research (Phase 0) feeds but does not block.

## Notes
- Identity confirmed **sakura pink**, not "midnight purple" (that line was template residue; retired per direction).
- A Stitch design system + base hero already exist (project `prjkt-zero-v3`) and validate the Hero direction in D7.
