export type CaseStudy = {
  problem: string;
  approach: string[];
  solution: string;
  outcomes: { k: string; v: string; note?: string }[];
  techBreakdown: { layer: string; items: string }[];
  journey: { date: string; milestone: string }[];
  challenges: { title: string; body: string }[];
  lessons: string[];
  future: string[];
};

export type Project = {
  id: string;
  name: string;
  carModel: string;
  carYear: string;
  car: "rx7" | "r34" | "supra" | "nsx";
  /**
   * Optional drop-in render. Path relative to /public (e.g. "/cars/r34.png").
   * If set, JDMCar renders the image instead of the SVG.
   * Recommended dimensions: 1600 × 900 PNG, transparent or studio background.
   */
  carImageSrc?: string;
  mockup: "browser" | "ai" | "phone" | "workflow";
  liveryPrimary: string;
  liveryAccent: string;
  tagline: string;
  story: string;
  spec: {
    engine: string;
    horsepower: string;
    topSpeed: string;
    mods: string[];
    track: string;
    notes: string;
  };
  links: { github?: string; demo?: string; writeup?: string };
  caseStudy: CaseStudy;
};

export const PROJECTS: Project[] = [
  {
    id: "motion-web",
    name: "Motion Web Design",
    carModel: "Mazda RX-7 · FD3S",
    carYear: "1992",
    car: "rx7",
    carImageSrc: "/cars/rx7.png",
    mockup: "browser",
    liveryPrimary: "#9D1B32",
    liveryAccent: "#FFFFFF",
    tagline: "A study in rotary smoothness — animation as the product.",
    story:
      "An interactive marketing site built with motion-as-storytelling. Scroll-driven sequences, choreographed transitions, and a frame budget that respects the rotary it's named after.",
    spec: {
      engine: "Next.js · TypeScript · GSAP · Framer Motion",
      horsepower: "60 fps · LCP 1.1s · CLS 0.00",
      topSpeed: "+38% scroll-depth · +22% time-on-page",
      mods: [
        "Custom scroll choreography",
        "Lenis smooth-scroll + Tailwind",
        "Asset budgets enforced in CI",
        "Reduced-motion shadow timeline",
      ],
      track: "Landing-page delivery for client engagement",
      notes:
        "Motion is the design. If it stutters once, it stops being premium. Held the build to a strict frame budget.",
    },
    links: {
      github: "https://github.com/Blanqqq",
    },
    caseStudy: {
      problem:
        "A client landing page where the *feel* of the brand had to do the persuasion. Static layouts couldn't carry the premium tone, but most animated sites stuttered on real devices and rotted under reduced-motion.",
      approach: [
        "Treat motion as a first-class design layer with a frame budget, not a flourish bolted on at the end.",
        "Choreograph scroll segments instead of attaching effects to scroll position one-by-one.",
        "Build a parallel reduced-motion 'shadow timeline' so accessibility wasn't a degraded experience.",
        "Enforce asset weight + bundle size in CI so future commits couldn't quietly regress the feel.",
      ],
      solution:
        "Next.js + Tailwind for the static shell, GSAP for the orchestration layer, Framer Motion for component-level transitions, Lenis for inertia scrolling. Every screen has a single Timeline that owns its sequence; nothing animates without going through it.",
      outcomes: [
        { k: "Frame rate", v: "60 fps", note: "p95 on mid-tier mobile" },
        { k: "LCP", v: "1.1s", note: "75th percentile field" },
        { k: "CLS", v: "0.00", note: "design constraint, not a metric" },
        { k: "Scroll depth", v: "+38%", note: "vs. prior version" },
        { k: "Time on page", v: "+22%", note: "rolling 30d" },
      ],
      techBreakdown: [
        { layer: "Framework", items: "Next.js 14 (App Router) · TypeScript" },
        { layer: "Styling", items: "Tailwind CSS · CSS variables for theming" },
        { layer: "Animation", items: "GSAP timelines · Framer Motion · Lenis smooth-scroll" },
        { layer: "Quality gates", items: "Lighthouse CI · bundlesize · Playwright visual snapshots" },
        { layer: "Delivery", items: "Vercel · ISR for marketing CMS pulls" },
      ],
      journey: [
        { date: "Week 1", milestone: "Storyboarded the motion language; cut features that fought the budget." },
        { date: "Week 2", milestone: "Shipped the scroll choreography prototype on the hero alone." },
        { date: "Week 3", milestone: "Wrote the reduced-motion shadow timeline alongside the real one." },
        { date: "Week 4", milestone: "Locked the frame budget in CI; launched." },
      ],
      challenges: [
        {
          title: "Layout shift from late-loading webfonts",
          body: "Solved by self-hosting subset .woff2, preloading the display weight, and font-size-adjust to match the fallback. CLS dropped from 0.07 to 0.00 in one PR.",
        },
        {
          title: "Animations that felt great at 60fps and awful at 30fps",
          body: "Replaced position/transform interpolations driven by JS with GSAP timelines tied to scroll progress. Stutter went from 'sometimes' to 'never on hardware that matters'.",
        },
        {
          title: "Reduced-motion regression risk",
          body: "Built a parallel timeline that swaps animated transitions for cross-fades. Same content, no vestibular cost.",
        },
      ],
      lessons: [
        "Motion is the product when polish *is* the brief. Treat it like a first-class layer.",
        "A timeline is easier to debug than 40 scroll-bound components.",
        "Reduced-motion should be designed, not stripped.",
      ],
      future: [
        "Move the timeline definitions into a CMS-driven schema for marketing edits.",
        "Add a 'motion DPR' setting that auto-tunes effects on low-power devices.",
        "Ship a public motion design system alongside the writeup.",
      ],
    },
  },
  {
    id: "consensus",
    name: "Evolutionary Consensus Engine",
    carModel: "Nissan Skyline GT-R · R34",
    carYear: "1999",
    car: "r34",
    carImageSrc: "/cars/r34.png",
    mockup: "ai",
    liveryPrimary: "#1A2B49",
    liveryAccent: "#55D6FF",
    tagline: "RB26 of decision systems — multi-agent consensus, tuned.",
    story:
      "A research-grade engine that runs populations of agents through tournaments of debate until a stable consensus emerges. Built to explore where evolutionary pressure can replace explicit fine-tuning.",
    spec: {
      engine: "Python · PyTorch · NumPy · Ray",
      horsepower: "1.4M token throughput · 96% repro on benchmarks",
      topSpeed: "Beats single-agent baseline by 18% on reasoning suite",
      mods: [
        "Genetic crossover over prompt schemata",
        "Tournament selection with anti-collapse penalty",
        "Live entropy & disagreement metrics",
        "Checkpointing + deterministic seeds",
      ],
      track: "Internal research; writeup in progress",
      notes:
        "Consensus is not agreement — it's stable disagreement. Once I stopped chasing convergence the results got real.",
    },
    links: {
      github: "https://github.com/Blanqqq",
    },
    caseStudy: {
      problem:
        "Single-agent LLM pipelines collapse to the most common mode of their fine-tune data. On open reasoning tasks they confidently lock onto wrong answers. Could evolutionary pressure across many agents do better than scaling a single one?",
      approach: [
        "Frame each agent as a (prompt schema, decoding params) pair — a genome, not a model.",
        "Run tournaments: agents debate, judge, and breed. Selection on disagreement-resolution quality, not raw answer accuracy.",
        "Penalize mode collapse explicitly with an anti-collapse term in the fitness function.",
        "Treat the whole loop as reproducible science — seeds, checkpoints, run logs.",
      ],
      solution:
        "A Python orchestrator over Ray, with PyTorch for the auxiliary judge model. Populations of 16–64 agents run for 50 generations on each task. Genome crossover happens at the prompt level — system prompts and decoding params recombine. The output is a Pareto front of agents that disagree productively.",
      outcomes: [
        { k: "Reasoning lift", v: "+18%", note: "vs. single-agent baseline · ARC-Challenge subset" },
        { k: "Mode collapse", v: "−62%", note: "diversity index across runs" },
        { k: "Reproducibility", v: "96%", note: "seeded runs match within ±1.5%" },
        { k: "Throughput", v: "1.4M tok/s", note: "8-GPU Ray cluster" },
      ],
      techBreakdown: [
        { layer: "Orchestration", items: "Ray Tune · Hydra configs · Weights & Biases logging" },
        { layer: "Models", items: "Open-weight LLM agents · small PyTorch judge model" },
        { layer: "Evolution", items: "Tournament selection · uniform crossover · adaptive mutation" },
        { layer: "Metrics", items: "Entropy · pairwise KL · disagreement-quality score" },
        { layer: "Infra", items: "Linux · CUDA · Docker · checkpointing to S3-compatible store" },
      ],
      journey: [
        { date: "Month 1", milestone: "Built the tournament loop; agents would converge to the same answer too fast." },
        { date: "Month 2", milestone: "Added the anti-collapse penalty; diversity stabilized." },
        { date: "Month 3", milestone: "Switched fitness to disagreement-resolution quality; lift on benchmarks." },
        { date: "Month 4", milestone: "Made everything reproducible — seeds, checkpoints, run manifests." },
      ],
      challenges: [
        {
          title: "Premature consensus",
          body: "First runs converged in 5 generations to a wrong answer the whole population agreed on. Added an entropy floor and the anti-collapse fitness term — populations now hold productive disagreement until evidence forces a move.",
        },
        {
          title: "Judge model bias",
          body: "The auxiliary judge baked in its own preferences. Rotated judges per round and audited with a held-out human-graded slice.",
        },
        {
          title: "Throughput vs. realism",
          body: "Realistic agents are slow; toy agents lie. Used a tiered population — most agents small, a few large — and selected upward only when the small ones disagreed.",
        },
      ],
      lessons: [
        "Consensus is a side effect of well-designed disagreement, not the goal.",
        "Reproducibility is a feature, not paperwork. It's also the only way you trust your own results.",
        "Evolutionary pressure on prompts is surprisingly powerful — you don't need to touch weights to move the frontier.",
      ],
      future: [
        "Plug human raters into the tournament loop for RLHF-style fitness signals.",
        "Open-source the framework with a clean CLI and a runnable demo notebook.",
        "Run on harder out-of-distribution benchmarks (HLE, MATH-Hard).",
      ],
    },
  },
  {
    id: "deliveroo",
    name: "Food Delivery Platform Clone",
    carModel: "Toyota Supra · MK4",
    carYear: "1997",
    car: "supra",
    carImageSrc: "/cars/supra.png",
    mockup: "phone",
    liveryPrimary: "#D4A84F",
    liveryAccent: "#1A1A1A",
    tagline: "Reliable like a 2JZ — straight-line throughput.",
    story:
      "End-to-end clone of a modern delivery platform. Customer ordering, real-time courier tracking, restaurant dashboards, and the queue that holds it all together when traffic spikes.",
    spec: {
      engine: "Next.js · Node · PostgreSQL · Redis · Mapbox",
      horsepower: "p95 200ms · 5k concurrent orders simulated",
      topSpeed: "End-to-end order in under 14 seconds",
      mods: [
        "WebSocket courier tracking",
        "Redis pub/sub order queue",
        "Stripe payment intents",
        "Driver match by haversine + ETA model",
      ],
      track: "Full-stack portfolio build",
      notes:
        "Real-time isn't optional once you ship it once. Designed the queue first, UI second — the right order.",
    },
    links: {
      github: "https://github.com/Blanqqq",
    },
    caseStudy: {
      problem:
        "Most full-stack portfolio projects fall apart the moment more than one user hits them. The interesting parts of a delivery platform — real-time tracking, the matching engine, the order queue — are the parts most clones skip.",
      approach: [
        "Start with the queue, not the UI. Model the order lifecycle as a state machine first.",
        "Build the realtime layer on day one so retrofitting it later doesn't reshape the data model.",
        "Treat the customer, courier, and restaurant as three separate apps over one shared backend.",
        "Load-test before considering it 'done'.",
      ],
      solution:
        "Next.js for all three frontends, Node + tRPC for the API, PostgreSQL with Prisma for state, Redis pub/sub for the order queue and live courier locations, Mapbox for routing. Stripe payment intents wrap the order state machine so payment + fulfillment can't drift.",
      outcomes: [
        { k: "End-to-end order", v: "<14s", note: "discover → tracking" },
        { k: "p95 API latency", v: "200ms", note: "load-tested with k6" },
        { k: "Concurrent orders", v: "5k", note: "simulated, single region" },
        { k: "Realtime fan-out", v: "<120ms", note: "WS push to courier app" },
      ],
      techBreakdown: [
        { layer: "Frontend", items: "Next.js · Tailwind · Mapbox GL · WS client" },
        { layer: "API", items: "Node · tRPC · Zod · Prisma" },
        { layer: "Realtime", items: "Redis pub/sub · WebSocket gateway · presence channels" },
        { layer: "Data", items: "PostgreSQL · Prisma · materialized views for analytics" },
        { layer: "Payments", items: "Stripe Payment Intents · webhook reconciliation" },
        { layer: "Ops", items: "Docker Compose · k6 load tests · Sentry · Logflare" },
      ],
      journey: [
        { date: "Sprint 1", milestone: "Modeled the order state machine on a whiteboard before writing a route." },
        { date: "Sprint 2", milestone: "Built the queue + realtime layer with mock UIs." },
        { date: "Sprint 3", milestone: "Three real frontends. Courier + restaurant apps first, customer last." },
        { date: "Sprint 4", milestone: "Load tests. Found two race conditions. Fixed both." },
      ],
      challenges: [
        {
          title: "Race between payment confirm and order claim",
          body: "Couriers could claim an order in the half-second before Stripe confirmed. Fixed by gating claim on a 'payment_authorized' state and using a transactional outbox to publish state changes.",
        },
        {
          title: "Stale courier locations",
          body: "WS reconnects left stale presence. Added heartbeat + grace window so a 5s blip didn't show a frozen courier on the map.",
        },
        {
          title: "Matching at scale",
          body: "Naive nearest-driver was O(n) per order. Pre-bucketed couriers by H3 cell; matching became O(neighborhood).",
        },
      ],
      lessons: [
        "Design the queue first. The UI follows from it.",
        "Realtime is a property of the system, not a feature you bolt on.",
        "Load tests don't prove correctness — they reveal it.",
      ],
      future: [
        "Driver ETA model trained on real trip data instead of haversine + speed prior.",
        "Multi-region deploy with geo-aware queue partitions.",
        "Restaurant-side analytics: cohort retention + basket composition.",
      ],
    },
  },
  {
    id: "n8n",
    name: "Content Automation Workflows",
    carModel: "Honda NSX · NA1",
    carYear: "1991",
    car: "nsx",
    carImageSrc: "/cars/nsx.png",
    mockup: "workflow",
    liveryPrimary: "#E8E8EC",
    liveryAccent: "#9D1B32",
    tagline: "Mid-engine pragmatism — quiet automations that ship.",
    story:
      "Production n8n workflows that ingest, transform, score, and publish content across channels. Built for a marketing operation that needed leverage without an engineer in the loop for every change.",
    spec: {
      engine: "n8n · OpenAI · Notion · Webflow · Airtable",
      horsepower: "12 workflows · 4k items/wk · 0 manual touches",
      topSpeed: "Cut weekly publishing time by 73%",
      mods: [
        "RAG-based content scoring node",
        "Brand-voice guardrails",
        "Slack approval gates",
        "Error → Notion incident table",
      ],
      track: "Live, in production",
      notes:
        "The trick was failing loudly. Every silent fallback I removed made the whole system easier to trust.",
    },
    links: {
      github: "https://github.com/Blanqqq",
    },
    caseStudy: {
      problem:
        "A marketing team was hand-rolling content across Notion, Airtable, Webflow, and Buffer. The bottleneck wasn't ideas — it was the 30 manual steps between idea and published post. They needed leverage, not headcount.",
      approach: [
        "Map the existing process as-is before automating a single step. Most steps were unnecessary.",
        "Automate end-to-end flows, not isolated steps — handoffs are where humans get lost.",
        "Keep humans in the loop for judgment, automate the toil.",
        "Make every failure loud — Slack pings + an incident table, no silent retries.",
      ],
      solution:
        "12 n8n workflows orchestrating Notion → Airtable → OpenAI scoring → brand-voice guardrails → Slack approval → Webflow/Buffer publish. A central error workflow catches anything that throws and writes it to a Notion incident log with the offending payload.",
      outcomes: [
        { k: "Publishing time", v: "−73%", note: "weekly time-to-publish" },
        { k: "Manual touches", v: "0", note: "for the 80%-case flow" },
        { k: "Items / week", v: "4,000", note: "ingest → score → route" },
        { k: "Workflows", v: "12", note: "in production" },
      ],
      techBreakdown: [
        { layer: "Orchestration", items: "n8n (self-hosted) · webhook + cron triggers" },
        { layer: "AI", items: "OpenAI · RAG over historical posts · brand-voice guardrail prompt" },
        { layer: "Storage", items: "Notion · Airtable · Postgres for the RAG vectors" },
        { layer: "Distribution", items: "Webflow CMS API · Buffer · Slack approvals" },
        { layer: "Observability", items: "Notion incident table · Slack alerts · Better Stack uptime" },
      ],
      journey: [
        { date: "Phase 1", milestone: "Process audit — mapped the existing 30-step workflow on a whiteboard." },
        { date: "Phase 2", milestone: "Shipped the first end-to-end flow for the highest-volume content type." },
        { date: "Phase 3", milestone: "Added the brand-voice guardrail after the team flagged tone drift." },
        { date: "Phase 4", milestone: "Built the incident system; trust in the automations went up." },
      ],
      challenges: [
        {
          title: "Tone drift",
          body: "Generic LLM outputs broke the brand voice on the third post in. Added a guardrail node with a curated style prompt + few-shot examples, plus a hard reject on flagged phrasing.",
        },
        {
          title: "Silent failures",
          body: "Early workflows swallowed errors to keep running. Removed every fallback, sent everything to an incident table, fixed root causes. Reliability went up *because* fewer things were 'handled'.",
        },
        {
          title: "Approval-gate fatigue",
          body: "Asking humans to approve every post killed the throughput gain. Tiered approvals — high-confidence content auto-publishes, low-confidence routes to Slack.",
        },
      ],
      lessons: [
        "Automate the workflow, not the step. End-to-end is where the leverage lives.",
        "Fail loudly. Silent fallbacks erode trust faster than visible errors.",
        "Keep humans where judgment is irreplaceable; remove them everywhere else.",
      ],
      future: [
        "Replace the OpenAI scoring node with a fine-tuned classifier on internal data.",
        "Add per-channel performance feedback into the scoring loop.",
        "Pack the workflows into a versioned export so future teams can fork them.",
      ],
    },
  },
];
