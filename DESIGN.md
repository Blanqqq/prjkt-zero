# PRJKT ZERO — v3 Design System

Premium portfolio for **John Paul Giftson**, 3rd-year AI/ML engineering student, University of Manitoba, Winnipeg, Canada. He is presenting AI and machine-learning work — not a generalist developer. Tone: **Apple meets Kenya Hara meets editorial print.** Restraint, negative space, content leads. Honest student-seeking-AI/ML-roles voice, not a senior IC selling consulting.

## Color (locked)

- **Background**: sakura pink `#FFE4EC` (primary), `#FFDCE7` (alt), `#FFF0F4` (card tint), `#FFF5F8` (lightest)
- **Ink / text**: matte black `#111111` (primary), `#0B0B0C` (near-black), `#1A1A1A` (secondary)
- **Accent**: crimson `#9D1B32` — primary accent, used sparingly
- **Reserved narrow accents** (small surfaces only): steel `#C8CCD4`, cyan `#55D6FF`, gold/amber `#D4A84F`
- White surfaces are **translucent** (rgba white 0.25–0.55) layered over the sakura ground

## Typography (locked)

- **Display / headline**: SF Pro Display, weight 700, tight tracking `-0.045em`, line-height `0.92`
- **Body**: SF Pro Text, weight 400, 18px, line-height 1.55, tracking `-0.01em`, ink at 78%
- **Eyebrow / label**: SF Pro Text, 500, UPPERCASE, 11px, tracking `0.32em`, ink at 55%
- **Mono**: JetBrains Mono — tech tokens, timestamps, micro-data
- **Brush (KANJI ONLY)**: Shippori Mincho / Noto Serif JP — reserved exclusively for Japanese kanji glyphs as low-opacity decoration. Never used for Latin text.

## Shape & surface (locked)

- **Roundness**: cards 22px radius; CTAs and status chips fully round (pill)
- **Washi-card surface**: translucent white gradient over sakura, 1px ink border at 8% opacity, soft layered drop shadow with a faint crimson undertone, 8px backdrop blur
- **Dividers**: 1px ink rule, gradient that fades to transparent at both ends

## Motion (locked baseline, open to reinvention)

- Easing `cubic-bezier(0.22, 1, 0.36, 1)` — restrained, editorial, no bounce
- Sakura petals drift slowly; reduced-motion fully respected

## Decoration system (locked)

- Vertical **kanji** in negative space, very low opacity, brush font only
- `零` (zero) is the brand-mark glyph
- Wireframe-on-black JDM car and katana-blade silhouettes are supporting imagery only — heavily desaturated so content leads, never competing with type

## Component vocabulary

- **Primary CTA**: solid black pill, sakura-tint text, hover → crimson
- **Secondary CTA**: ghost — translucent white fill, 1px ink border at ~15%
- **Status pills**: Live / Research · in dev / Client delivery / Portfolio · prototype
- **Tech-stack pill row**: small mono chips
- **Recruiter Mode** toggle pill — locked feature, full print-to-PDF + 60-second resume scan

## Locked information architecture

Case-study spine (never reordered): Hero → Mockup → Problem → Approach → Solution → Outcomes → Tech Breakdown → Journey → Challenges → Lessons & Future → Source (always last).
