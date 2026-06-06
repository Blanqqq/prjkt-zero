"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../projects/Projects";

const CARDS = [
  {
    title: "Gym",
    kanji: "鍛",
    body: "Strength training as a daily ritual. The discipline transfers — sets and reps, sleep and stress.",
    tag: "Push · Pull · Legs",
  },
  {
    title: "Books & Manga",
    kanji: "読",
    body: "Long-form fiction, technical reads, and ink on the side. Currently re-reading Berserk and Vagabond.",
    tag: "Reading list · open",
  },
  {
    title: "Video Games",
    kanji: "遊",
    body: "Action-RPGs and immersive sims. Ghost of Tsushima, Elden Ring, Cyberpunk 2077. Big fan of design that respects the player.",
    tag: "Single-player · narrative",
  },
  {
    title: "Pop Culture",
    kanji: "波",
    body: "Anime, JDM culture, hip-hop, and the corners of the internet where good taste lives.",
    tag: "Always-on radar",
  },
];

export function Hobbies() {
  return (
    <section
      id="hobbies"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 06"
        kanji="趣"
        title="Off Duty"
        sub="What sharpens the blade when nobody is watching."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="washi-card relative overflow-hidden p-6"
            data-hover
          >
            <div className="font-brush text-5xl text-ink-800/90">{c.kanji}</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink-800">
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-700/80">{c.body}</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink-700/70">
              <span className="block h-1 w-1 rounded-full bg-crimson" />
              {c.tag}
            </div>

            {/* Decorative brush whisper */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 opacity-[0.07]"
              viewBox="0 0 200 200"
            >
              <path
                d="M20 120 C 60 60, 120 160, 180 80"
                stroke="#111"
                strokeWidth="22"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
