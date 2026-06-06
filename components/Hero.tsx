"use client";

import { motion } from "framer-motion";
import { KatanaWall } from "./katana/KatanaWall";
import { MusashiQuote } from "./MusashiQuote";
import { WeatherCard } from "./WeatherCard";

/**
 * V2 hero — brush wordmark on the left, side panels (Musashi quote, weather),
 * a giant Bushido kanji ghost in the background, and the pedestal katana row
 * spanning the bottom. Composition reads like a museum lobby plaque.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[1400px] px-6 pt-24 pb-12 sm:px-10 md:pt-32"
    >
      {/* Single-kanji watermark — 創 (build/create). Lighter touch than the
          full 武士道 phrase; reads as a brush mark, not a slogan. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 top-24 select-none font-brush text-[200px] leading-none text-ink-800/[0.05] md:text-[300px]"
      >
        創
      </span>

      {/* Top grid — brush wordmark vs quote/weather */}
      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* LEFT — wordmark & CTA */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-ink-800/30" />
            <span className="heading-eyebrow">Exhibition · Floor 00 — Lobby</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="brush-behind mt-4 font-brush text-[clamp(72px,11vw,168px)] font-medium leading-[0.92] tracking-[-0.02em] text-ink-800"
          >
            John Paul
            <br />
            <span className="italic">Giftson</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.15 }}
            className="mt-6 max-w-xl text-[clamp(16px,1.6vw,20px)] leading-snug text-ink-700/80"
          >
            Engineer. Creator. Problem solver.
            <br />
            <span className="text-ink-800">I build things that matter.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              data-hover
              className="group inline-flex items-center gap-3 rounded-full bg-ink-800 px-6 py-3.5 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
            >
              <span>View work</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-sakura-100/15 transition group-hover:bg-sakura-100/25">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
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
          </motion.div>

          {/* Vitals row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
          >
            {[
              { k: "Based", v: "Winnipeg, MB" },
              { k: "Year", v: "3rd · 2023–28" },
              { k: "Discipline", v: "AI / ML" },
              { k: "Status", v: "Open to work" },
            ].map((m) => (
              <div key={m.k}>
                <div className="heading-eyebrow">{m.k}</div>
                <div className="mt-1 text-sm font-medium tracking-tight text-ink-800">
                  {m.v}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — quote + weather stacked */}
        <div className="flex flex-col items-end gap-5 lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.4 }}
            className="w-full sm:max-w-[300px] lg:max-w-none"
          >
            <MusashiQuote />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5 }}
            className="w-full sm:max-w-[300px] lg:max-w-none"
          >
            <WeatherCard />
          </motion.div>
        </div>
      </div>

      {/* Katana pedestal row */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-20 md:mt-24"
      >
        <KatanaWall />
      </motion.div>
    </section>
  );
}
