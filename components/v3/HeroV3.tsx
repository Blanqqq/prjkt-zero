"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../motion/Reveal";

/**
 * V3 hero — editorial negative space.
 *
 * Departs from the museum hero: no katana grid in the lower half. Instead a
 * large wordmark on generous whitespace, a two-sentence subhead that leads
 * with what he builds, two CTAs, a faint vertical kanji column in the open
 * right, and a live Tokyo/Winnipeg time micro-card (validated in the Stitch
 * base hero). Entrances use <Reveal> so the wordmark — the LCP element —
 * paints immediately (audit A2/A3).
 */
export function HeroV3() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-32 sm:px-10 md:pb-28 md:pt-40"
    >
      {/* Vertical kanji in the negative space — 零式 (type zero), very faint */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-1 top-20 select-none font-brush leading-[0.8] text-ink-800/[0.04] text-[40vw] md:text-[22vw] lg:text-[280px]"
        style={{ writingMode: "vertical-rl" }}
      >
        零式
      </span>

      <div className="relative max-w-4xl">
        <Reveal as="div" className="flex items-center gap-3">
          <span className="block h-1.5 w-1.5 rounded-full bg-crimson" />
          <span className="heading-eyebrow">AI / ML Engineer · Open to roles · 構築中</span>
        </Reveal>

        <Reveal
          as="h1"
          delay={80}
          className="heading-display mt-6 text-[clamp(56px,11vw,168px)] text-ink-800"
        >
          John Paul
          <br />
          Giftson
        </Reveal>

        <Reveal
          as="p"
          delay={160}
          className="mt-8 max-w-xl text-[clamp(18px,1.7vw,22px)] leading-snug text-ink-700/80"
        >
          I build machine-learning systems — data pipelines, multi-agent
          reasoning, and the tooling around them.
          <span className="block text-ink-800">
            Third-year AI/ML engineering at the University of Manitoba, looking
            for the next problem worth solving.
          </span>
        </Reveal>

        <Reveal
          as="div"
          delay={240}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            data-hover
            className="group inline-flex items-center gap-3 rounded-full bg-ink-800 px-6 py-3.5 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
          >
            <span>View work</span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-sakura-100/15 transition group-hover:bg-sakura-100/25">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
          <a
            href="mailto:johnpaul081023@gmail.com"
            data-hover
            className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-3.5 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
          >
            Hire me ↗
          </a>
        </Reveal>

        <Reveal as="div" delay={320} className="mt-14">
          <TimeCard />
        </Reveal>
      </div>
    </section>
  );
}

const clockFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

/**
 * Dual-timezone live clock. Isolated so its per-second tick re-renders only
 * itself. Renders placeholders until mounted to avoid an SSR/client mismatch
 * (server and client clocks differ).
 */
function TimeCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const winnipeg = now ? clockFormatter("America/Winnipeg").format(now) : "--:--:--";
  const tokyo = now ? clockFormatter("Asia/Tokyo").format(now) : "--:--:--";

  return (
    <div className="inline-flex items-stretch divide-x divide-ink-800/10 rounded-2xl border border-ink-800/10 bg-white/45 backdrop-blur-sm">
      <Zone label="Winnipeg" sub="here" time={winnipeg} />
      <Zone label="Tokyo" sub="spirit" time={tokyo} />
      <div className="flex items-center px-5">
        <span className="font-brush text-base leading-none text-ink-800/55" aria-hidden>
          零
        </span>
      </div>
    </div>
  );
}

function Zone({ label, sub, time }: { label: string; sub: string; time: string }) {
  return (
    <div className="px-5 py-3">
      <div className="heading-eyebrow">
        {label} <span className="text-ink-700/40">· {sub}</span>
      </div>
      <div className="mt-1 font-mono text-sm tabular-nums text-ink-800">{time}</div>
    </div>
  );
}
