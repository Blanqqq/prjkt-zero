# PRJKT ZERO

Portfolio of **John Paul Giftson** — AI & Machine Learning Engineering student at the University of Manitoba.

Designed as a digital museum. A sakura-pink hall, a wall of katanas as navigation, a JDM-car garage as project entrance, and an Apple-style product page behind each car. Built with Next.js 15, TypeScript, Tailwind, and Framer Motion. Vercel-ready.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production bundle
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it on [vercel.com/new](https://vercel.com/new) — no env vars required.
3. Vercel detects Next.js. Done.

## Two modes

A toggle in the top nav switches between:

- **Exhibit** — full cinematic experience (katana wall, sakura petals, custom cursor, easter egg).
- **Recruiter** — condensed 60-second resume scan (summary · experience · projects · skills · education · contact).

The selection persists in `localStorage` and can be deep-linked via `?r=1`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage — Exhibit or Recruiter view, conditional |
| `/projects/motion-web` | Case study — Motion Web Design · Mazda RX-7 mockup: animated browser landing page |
| `/projects/consensus` | Case study — Evolutionary Consensus Engine · R34 mockup: multi-agent debate dashboard |
| `/projects/deliveroo` | Case study — Food Delivery Platform · Supra MK4 mockup: iPhone delivery app |
| `/projects/n8n` | Case study — Content Automation · NSX mockup: n8n-style workflow graph |

Each case study follows the same 10-section flow: **Hero → Mockup → Problem → Approach → Solution → Outcomes → Tech Breakdown → Journey → Challenges → Lessons & Future → Source/Demo (last)**.

## Architecture

```
app/
  layout.tsx                    — metadata, providers, AppFrame
  page.tsx                      — switches Exhibit vs Recruiter
  globals.css                   — sakura palette, brush utilities, washi card
  projects/[slug]/page.tsx      — static project routes (generateStaticParams)
components/
  PortfolioContext.tsx          — recruiter-mode context (localStorage + URL)
  AppFrame.tsx                  — global chrome wrapper used by every route
  AtmosphereLayers.tsx          — 6-layer pink + paper + brush background
  SakuraPetals.tsx              — CSS petal / ink drift
  KatanaCursor.tsx              — sheathed cursor that draws on hover, slashes on click
  Nav.tsx                       — sticky translucent nav, active-section IO tracker
  RecruiterToggle.tsx           — pill toggle in nav
  RecruiterView.tsx             — condensed resume layout
  Hero.tsx                      — title + katana wall
  Footer.tsx · EasterEgg.tsx    — dark hand-off bar + Konami code reveal
  katana/                       — 6 variants, full SVG katana + flame
  projects/
    projectsConfig.ts           — 4 projects with full case-study payloads
    JDMCar.tsx                  — RX-7 / R34 / Supra / NSX side-profile SVGs
    Projects.tsx                — homepage garage doors
    ProjectCaseStudy.tsx        — Apple-style product page layout
  mockups/
    BrowserMockup.tsx           — animated macOS browser landing page
    AIMockup.tsx                — 5-agent debate ring + entropy chart + transcript
    PhoneMockup.tsx             — iPhone shell, 3 screens (discover · cart · live track)
    WorkflowMockup.tsx          — n8n-style node graph with live run history
  sections/                     — Education · Experience · Skills · Hobbies · Contact
```

## Design notes

- **Color**: sakura pink (`#FFE4EC` / `#FFDCE7`) field, matte black ink, crimson + gold + cyan accents used sparingly. No dark mode — by design.
- **Typography**: SF Pro Display / Inter for editorial body, Shippori Mincho / Noto Serif JP for brush kanji.
- **Motion**: Framer Motion on `[0.22, 1, 0.36, 1]` ease (Apple-style spring-out). Reduced-motion respected globally.
- **Custom cursor**: only on `(hover: hover)` devices — touch users get the native experience.
- **Performance**: zero canvas, all SVG. ~161 kB First Load JS on the home, ~158 kB on case-study pages. Every route prerendered.

## Easter egg

Press `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the site (Exhibit mode only).

## Personalization touches scattered through the site

- Manga referenced in Hobbies: Berserk, Vagabond
- Games: Ghost of Tsushima, Elden Ring, Cyberpunk 2077
- JDM cars chosen with intent (RX-7 for motion, R34 for AI, Supra for throughput, NSX for restraint)
- Brand voice across case studies — "Consensus is stable disagreement," "Fail loudly," "Design the queue first"
- Konami code → quotes like "Nah, I'd deploy." and "Domain Expansion: Merge Conflict."

## Resume facts wired into the site

- B.Sc. AI & ML Engineering · University of Manitoba · 2023–2028 · GPA 3.4
- TELUS Communications · EPH Apparel · SnowAway & Landscaping Solutions
- Projects: Motion Web Design · Evolutionary Consensus Engine · Food Delivery Clone · n8n Content Automation
- Python · Java · C++ · SQL · R · PyTorch · n8n · CRM
- johnpaul081023@gmail.com · +1 (951) 307-0269
