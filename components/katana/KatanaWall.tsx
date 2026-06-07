"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useState } from "react";
import { KATANAS, type KatanaVariant } from "./katanaConfig";

/**
 * V2.2 katana display — quieter vitrine grid.
 *
 * Art-direction pass: the blades are now silhouette-leaning artifacts, not
 * advertised products. Each vitrine is smaller, the plaques are typographic
 * (not decorative), the under-glow is per-variant rim-light only. The grid
 * supports the content; it doesn't compete with it.
 */
export function KatanaWall() {
  const commit = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KATANAS.map((variant, i) => (
          <Vitrine
            key={variant.id}
            variant={variant}
            index={i}
            onCommit={commit}
          />
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-[10px] tracking-[0.32em] uppercase text-ink-700/45">
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onClick}
        data-hover
        aria-label={`${variant.label} — open section`}
        className="group relative block w-full overflow-hidden rounded-2xl border border-ink-800/10 text-left outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-ink-800/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sakura-100 hover:shadow-[0_28px_50px_-30px_rgba(17,17,17,0.18)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.18) 60%, rgba(255,228,236,0.32) 100%)",
        }}
      >
        {/* Display area */}
        <div className="cinema-frame relative aspect-[3/2] overflow-hidden">
          {/* Dark recessed backplate — uniform across all six */}
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 50% 40%, #14141A 0%, #0A0A0F 70%, #06060A 100%)",
            }}
          />

          {/* Per-variant rim light — color influences, doesn't dominate */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(140% 70% at 50% 80%, ${variant.flame.outer}1A 0%, transparent 60%)`,
              mixBlendMode: "screen",
            }}
          />

          <motion.div
            className="relative h-full w-full"
            animate={{
              x: phase === "drawing" ? -24 : 0,
              opacity: phase === "drawing" ? 0.6 : 1,
            }}
            transition={{ duration: reduceMotion ? 0.001 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={variant.imageSrc!}
              alt={`${variant.label} katana`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={index < 3}
              className="cinema-img relative z-10 object-cover transition duration-500 will-change-transform group-hover:scale-[1.015]"
            />
          </motion.div>

          {/* Glass sheen — top hairline */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-8"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.12), transparent 90%)",
            }}
          />
        </div>

        {/* Plaque — typographic, not decorative */}
        <div className="flex items-center justify-between gap-3 border-t border-ink-800/8 bg-white/35 px-4 py-3 backdrop-blur-sm">
          <div className="min-w-0">
            <div className="text-[9.5px] uppercase tracking-[0.24em] text-ink-700/55">
              0{index + 1} · {variant.subtitle}
            </div>
            <div className="mt-0.5 truncate text-sm font-semibold tracking-tight text-ink-800">
              {variant.label}
            </div>
          </div>
          <span
            aria-hidden
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink-800 text-sakura-100 transition group-hover:bg-crimson"
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
