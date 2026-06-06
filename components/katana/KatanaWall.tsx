"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { KATANAS, type KatanaVariant } from "./katanaConfig";

/**
 * V2.1 katana display — horizontal vitrine grid.
 *
 * The supplied renders are landscape 1536×1024 — blades laid on horizontal
 * display rests. The previous vertical-pedestal layout fought the assets and
 * overflowed. This redesign matches the image orientation: each blade lives
 * in its own recessed museum case, three across on desktop, two on tablet,
 * one stacked on mobile. Clicking a case unsheathes and routes to the section.
 */
export function KatanaWall() {
  const commit = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {KATANAS.map((variant, i) => (
          <Vitrine
            key={variant.id}
            variant={variant}
            index={i}
            onCommit={commit}
          />
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-[11px] tracking-[0.28em] uppercase text-ink-700/55">
        Select a blade · 抜刀
      </p>
    </div>
  );
}

function Vitrine({
  variant,
  index,
  onCommit,
}: {
  variant: KatanaVariant;
  index: number;
  onCommit: (target: string) => void;
}) {
  const [phase, setPhase] = useState<"idle" | "drawing">("idle");
  const reduceMotion = useReducedMotion();

  const onClick = () => {
    if (phase !== "idle") return;
    setPhase("drawing");
    window.setTimeout(
      () => onCommit(variant.targetId),
      reduceMotion ? 120 : 520
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onClick}
        data-hover
        aria-label={`${variant.label} — open section`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-ink-800/12 text-left outline-none focus-visible:ring-2 focus-visible:ring-ink-800/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sakura-100"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 60%, rgba(255,228,236,0.4) 100%)",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.7) inset, 0 30px 50px -30px rgba(17,17,17,0.18)",
        }}
      >
        {/* Bay top hairline + livery accent */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${variant.flame.outer}aa, transparent)`,
          }}
        />

        {/* Vitrine label rail (top) */}
        <div className="flex items-center justify-between px-4 pt-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
            Bay 0{index + 1} · {variant.subtitle}
          </span>
          <span className="font-brush text-base text-ink-800/70">
            {variant.kanji}
          </span>
        </div>

        {/* Image — sits inside a recessed dark display area */}
        <div className="cinema-frame relative mt-2 mx-3 mb-3 overflow-hidden rounded-xl">
          {/* Dark recessed display backplate (the case interior) */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, #1A1A20 0%, #0C0C12 70%, #07070B 100%)",
            }}
          />
          {/* Accent under-glow per blade */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-12 bottom-3 h-3 rounded-full blur-xl"
            style={{ background: variant.flame.outer, opacity: 0.22 }}
          />

          <motion.div
            className="relative"
            animate={{
              x: phase === "drawing" ? -32 : 0,
              opacity: phase === "drawing" ? 0.7 : 1,
            }}
            transition={{ duration: reduceMotion ? 0.001 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={variant.imageSrc!}
              alt={`${variant.label} katana`}
              width={1536}
              height={1024}
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              priority={index < 3}
              className="cinema-img relative z-10 block h-auto w-full transition duration-700 will-change-transform group-hover:scale-[1.02]"
            />
          </motion.div>

          {/* Glass top sheen */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-12 z-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.18), transparent 90%)",
            }}
          />
        </div>

        {/* Plaque (brass-style label, brushed steel hairline) */}
        <div className="flex items-center justify-between border-t border-ink-800/10 bg-white/30 px-4 py-3 backdrop-blur-sm">
          <div>
            <div className="text-sm font-semibold tracking-tight text-ink-800">
              {variant.label}
            </div>
            <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
              抜刀 · Unsheathe
            </div>
          </div>
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full bg-ink-800 text-sakura-100 transition group-hover:bg-crimson"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-3 w-3 transition group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export type { KatanaVariant };
