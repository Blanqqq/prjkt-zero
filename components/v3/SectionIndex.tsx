"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Reveal } from "../motion/Reveal";
import { KATANAS } from "../katana/katanaConfig";

/**
 * V3 section index — the single-blade altar (replaces the 6-image katana wall).
 *
 * Reinvention of the old 3×2 grid (audit A8): the six section blades are now an
 * accordion-style list where exactly ONE blade is drawn at a time, in a single
 * dark display panel. Only the active image is rendered (vs. six at once), so
 * it's lighter and more deliberate — the "shrine displays one artifact" idea.
 *
 * Hover / keyboard-focus draws a blade; click navigates to its section. On
 * mobile the panel shows the featured blade above the list (one image, not six).
 */
export function SectionIndex() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const blade = KATANAS[active];

  const go = useCallback((targetId: string) => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-[1400px] px-6 py-20 sm:px-10">
      <Reveal as="div" className="flex items-center gap-3">
        <span className="block h-px w-10 bg-ink-800/30" />
        <span className="heading-eyebrow">The Index · 抜刀</span>
      </Reveal>
      <Reveal
        as="h2"
        delay={80}
        className="heading-display mt-4 text-[clamp(36px,6vw,88px)] text-ink-800"
      >
        Choose a blade.
      </Reveal>
      <Reveal as="p" delay={140} className="mt-4 max-w-xl text-body">
        Six sections, one drawn at a time. Hover to draw it; click to enter.
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Display panel — single active blade */}
        <Reveal as="div" delay={120} className="lg:order-last lg:col-span-5">
          <div className="cinema-frame relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink-800/10 bg-[#06060A] lg:aspect-[4/5]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={blade.id}
                initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0.001 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={blade.imageSrc!}
                  alt={`${blade.label} blade`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="cinema-img object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Caption + enter action */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5">
              <div>
                <div className="font-brush text-3xl leading-none text-sakura-100/90">
                  {blade.kanji}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-sakura-100/70">
                  {blade.subtitle}
                </div>
              </div>
              <button
                type="button"
                onClick={() => go(blade.targetId)}
                data-hover
                aria-label={`Open ${blade.label}`}
                className="inline-flex items-center gap-2 rounded-full bg-sakura-100/95 px-4 py-2 text-xs font-medium tracking-tight text-ink-800 transition hover:bg-crimson hover:text-sakura-100 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-100/80"
              >
                Enter →
              </button>
            </div>
          </div>
        </Reveal>

        {/* Index list */}
        <Reveal as="ul" delay={80} className="lg:col-span-7">
          <div className="border-t border-ink-800/10">
            {KATANAS.map((k, i) => {
              const isActive = i === active;
              return (
                <li key={k.id} className="border-b border-ink-800/10">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => go(k.targetId)}
                    data-hover
                    aria-label={`${k.label} — open section`}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left outline-none transition focus-visible:bg-white/40"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-ink-700/45">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-brush text-2xl leading-none transition ${
                          isActive ? "text-crimson" : "text-ink-800/70"
                        }`}
                      >
                        {k.kanji}
                      </span>
                      <span>
                        <span className="block text-xl font-semibold tracking-tight text-ink-800">
                          {k.label}
                        </span>
                        <span className="block text-[11px] uppercase tracking-[0.22em] text-ink-700/55">
                          {k.subtitle}
                        </span>
                      </span>
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
                        isActive
                          ? "bg-ink-800 text-sakura-100"
                          : "text-ink-700/45 group-hover:text-ink-800"
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </button>
                </li>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
