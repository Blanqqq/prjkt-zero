"use client";

import { motion } from "framer-motion";
import { KatanaWall } from "./katana/KatanaWall";

/**
 * Hero — first-screen impression. Editorial typography, brushstroke heading,
 * the katana wall as the centerpiece, and a quiet intro line below.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[1400px] px-6 pt-28 pb-16 sm:px-10 md:pt-36 md:pb-24"
    >
      {/* Eyebrow row */}
      <div className="mb-10 flex flex-col items-center justify-center gap-2 text-center">
        <div className="flex items-center gap-3">
          <span className="block h-px w-10 bg-ink-800/30" />
          <span className="heading-eyebrow">Exhibition · Floor 00 — Lobby</span>
          <span className="block h-px w-10 bg-ink-800/30" />
        </div>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="brush-behind mx-auto max-w-[1100px] text-center"
      >
        <h1 className="heading-display text-[clamp(64px,12vw,176px)] text-ink-800">
          John Paul <span className="italic font-brush font-medium">Giftson</span>
        </h1>
        <p className="mt-6 mx-auto max-w-2xl text-balance text-[clamp(18px,2vw,22px)] leading-snug text-ink-700/75">
          AI &amp; Machine Learning Engineering — University of Manitoba.
          <br className="hidden sm:inline" />
          An exhibition of work in data, design, and intelligent systems.
        </p>
      </motion.div>

      {/* Vital row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4"
      >
        {[
          { k: "Based", v: "Winnipeg, MB" },
          { k: "Year", v: "3rd · 2023–28" },
          { k: "Discipline", v: "AI / ML" },
          { k: "Status", v: "Open to work" },
        ].map((m) => (
          <div key={m.k} className="text-center">
            <div className="heading-eyebrow">{m.k}</div>
            <div className="mt-1 text-sm font-medium tracking-tight text-ink-800">
              {m.v}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Katana wall */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-16 md:mt-24"
      >
        <KatanaWall />
      </motion.div>
    </section>
  );
}
