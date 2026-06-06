"use client";

import { motion } from "framer-motion";
import { useAutoplay } from "./useAutoplay";

/**
 * macOS-style browser mockup that demos a motion-driven landing page inside.
 * The "page" auto-scrolls between three frames on a 6s loop. An FPS pill,
 * a hovering CTA, and shimmer reveal sell the "motion is the product" pitch.
 */
export function BrowserMockup() {
  const { step: frame, ref } = useAutoplay(3, 3200);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[860px]">
      <div className="rounded-2xl border border-ink-800/15 bg-white/80 shadow-[0_60px_80px_-40px_rgba(17,17,17,0.35)]">
        {/* Chrome */}
        <div className="flex items-center gap-2 border-b border-ink-800/10 bg-gradient-to-b from-white to-sakura-50 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="block h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="block h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="block h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-ink-800/5 px-3 py-1 text-[11px] text-ink-700/65">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 11a3 3 0 100-6 3 3 0 000 6z" />
              <path d="M12 11v8" />
            </svg>
            <span className="font-mono">motion.giftson.dev</span>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-[#28C840]/15 px-2 py-0.5 text-[10px] font-medium text-[#0a8a3a]">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#28C840]" />
              60 fps
            </span>
          </div>
        </div>

        {/* Viewport */}
        <div className="relative h-[420px] overflow-hidden rounded-b-2xl bg-gradient-to-b from-sakura-100 to-white">
          {/* Frame 1 — hero */}
          <motion.div
            className="absolute inset-0 grid place-items-center px-10"
            animate={{ opacity: frame === 0 ? 1 : 0, y: frame === 0 ? 0 : -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center">
              <div className="heading-eyebrow">Launch · 2026</div>
              <div className="heading-display mt-2 text-5xl text-ink-800">
                Motion <span className="font-brush italic">is</span> the product.
              </div>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 rounded-full bg-ink-800 px-6 py-3 text-sm font-medium text-sakura-100"
              >
                See the case study →
              </motion.button>
            </div>
          </motion.div>

          {/* Frame 2 — animated stats */}
          <motion.div
            className="absolute inset-0 grid grid-cols-3 gap-6 px-10 pt-20"
            animate={{ opacity: frame === 1 ? 1 : 0, y: frame === 1 ? 0 : 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { k: "LCP", v: "1.1s", note: "Largest Contentful Paint" },
              { k: "CLS", v: "0.00", note: "Cumulative Layout Shift" },
              { k: "Scroll-depth", v: "+38%", note: "vs. prior version" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: frame === 1 ? 0 : 20,
                  opacity: frame === 1 ? 1 : 0,
                }}
                transition={{ delay: i * 0.08 + 0.1, duration: 0.55 }}
                className="rounded-2xl border border-ink-800/10 bg-white/80 p-5"
              >
                <div className="heading-eyebrow">{s.k}</div>
                <div className="mt-1 text-4xl font-semibold tracking-tight text-ink-800">
                  {s.v}
                </div>
                <div className="mt-1 text-[11px] text-ink-700/55">{s.note}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Frame 3 — feature reveal */}
          <motion.div
            className="absolute inset-0 grid place-items-center px-10"
            animate={{ opacity: frame === 2 ? 1 : 0, y: frame === 2 ? 0 : 20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex w-full max-w-md items-center gap-5 rounded-2xl border border-ink-800/10 bg-white/80 p-5">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-crimson text-sakura-100">
                <span className="font-brush text-2xl leading-none">動</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-ink-800">
                  Scroll choreography
                </div>
                <div className="text-xs text-ink-700/65">
                  Lenis + GSAP + reduced-motion shadow timeline.
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink-800/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: frame === 2 ? "84%" : "0%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-ink-800 to-crimson"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scroll progress */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-ink-800/5">
            <motion.div
              className="h-full bg-ink-800"
              animate={{ width: `${((frame + 1) / 3) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Floating spec chip */}
      <div className="washi-card absolute -bottom-6 -right-4 hidden items-center gap-2 px-3 py-2 text-[11px] sm:flex">
        <span className="block h-2 w-2 rounded-full bg-[#28C840]" />
        <span className="font-mono text-ink-800">No layout shifts.</span>
      </div>
    </div>
  );
}
