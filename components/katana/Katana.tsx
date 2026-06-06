"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { KatanaVariant } from "./katanaConfig";

/**
 * One katana, rendered as a single SVG (~520px tall). The blade, tsuba (guard),
 * tsuka (handle wrap) and flame are drawn from variant data. State machine:
 *   idle → drawing (translateY up + flame ignites) → ignited → reset on leave.
 */
type Props = {
  variant: KatanaVariant;
  onCommit: (targetId: string) => void;
  index: number;
};

export function Katana({ variant, onCommit, index }: Props) {
  const [phase, setPhase] = useState<"idle" | "drawing" | "ignited">("idle");
  const [hover, setHover] = useState(false);
  const reduceMotion = useReducedMotion();

  const ignite = () => {
    if (phase !== "idle") return;
    setPhase("drawing");
    window.setTimeout(() => setPhase("ignited"), reduceMotion ? 50 : 500);
    window.setTimeout(() => onCommit(variant.targetId), reduceMotion ? 250 : 1100);
  };

  const drawY = phase === "idle" ? 0 : -42;

  return (
    <motion.button
      type="button"
      data-hover
      aria-label={`${variant.label} — open section`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPhase("idle");
      }}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      onClick={ignite}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex shrink-0 flex-col items-center bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ink-800/40 focus-visible:ring-offset-4 focus-visible:ring-offset-sakura-200 rounded-md"
    >
      {/* Wall mounting bracket */}
      <span
        aria-hidden
        className="absolute -top-1 z-10 h-2 w-10 rounded-sm bg-ink-800/85 shadow-[0_2px_4px_rgba(17,17,17,0.25)]"
        style={{ top: 28 }}
      />
      <span
        aria-hidden
        className="absolute z-10 h-2 w-10 rounded-sm bg-ink-800/85 shadow-[0_2px_4px_rgba(17,17,17,0.25)]"
        style={{ bottom: 96 }}
      />

      {/* Hover glow */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[640px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          opacity: hover ? 0.55 : 0.15,
          scale: hover ? 1.05 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          background: `radial-gradient(closest-side, ${variant.flame.outer}55, transparent 70%)`,
        }}
      />

      <motion.div
        className="relative"
        animate={{ y: drawY }}
        transition={{ duration: reduceMotion ? 0.001 : 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          width={90}
          height={540}
          viewBox="0 0 90 540"
          className="relative z-10 drop-shadow-[0_30px_40px_rgba(17,17,17,0.18)]"
        >
          <defs>
            <linearGradient id={`blade-${variant.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={variant.blade.spine} />
              <stop offset="0.45" stopColor={variant.blade.base} />
              <stop offset="0.55" stopColor={variant.blade.base} />
              <stop offset="1" stopColor={variant.blade.edge} />
            </linearGradient>
            <linearGradient id={`sheen-${variant.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={variant.blade.sheen} stopOpacity="0" />
              <stop offset="0.5" stopColor={variant.blade.sheen} stopOpacity="0.55" />
              <stop offset="1" stopColor={variant.blade.sheen} stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`hamon-${variant.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={variant.blade.hamon} stopOpacity="0.0" />
              <stop offset="0.5" stopColor={variant.blade.hamon} stopOpacity="0.85" />
              <stop offset="1" stopColor={variant.blade.hamon} stopOpacity="0.0" />
            </linearGradient>
            <filter id={`flame-${variant.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          {/* BLADE (top → middle) */}
          {/* Tip (kissaki) */}
          <path
            d="M45 6 L52 26 L52 38 L38 38 L38 26 Z"
            fill={`url(#blade-${variant.id})`}
            stroke={variant.blade.spine}
            strokeWidth="0.5"
          />
          {/* Main blade body */}
          <path
            d="M38 38 L52 38 L54 360 L36 360 Z"
            fill={`url(#blade-${variant.id})`}
            stroke={variant.blade.spine}
            strokeWidth="0.5"
          />
          {/* Hamon (temper line) */}
          <path
            d="M50 40 Q 46 80, 50 130 Q 46 180, 50 230 Q 46 280, 50 340 L 53 358 L 51 358 Q 47 320, 51 270 Q 47 220, 51 170 Q 47 120, 51 70 Z"
            fill={`url(#hamon-${variant.id})`}
            opacity="0.7"
          />
          {/* Sheen — fixed light streak on blade */}
          <rect x="40" y="40" width="2.4" height="320" fill={`url(#sheen-${variant.id})`} />
          {/* Engraving overlay */}
          <Engraving variant={variant} />

          {/* TSUBA (guard) */}
          <Tsuba variant={variant} />

          {/* TSUKA (handle) */}
          <Handle variant={variant} />

          {/* KASHIRA (pommel) */}
          <rect x="32" y="510" width="26" height="14" rx="2" fill={variant.pommel} />
          <rect x="32" y="510" width="26" height="3" fill="#000" opacity="0.25" />

          {/* FLAME along blade — only when ignited */}
          {phase !== "idle" && (
            <g filter={`url(#flame-${variant.id})`}>
              <motion.path
                d="M45 6 Q 30 110, 45 220 Q 60 320, 45 360 Q 38 320, 45 220 Q 50 110, 45 6 Z"
                fill={variant.flame.outer}
                opacity={phase === "ignited" ? 0.85 : 0.4}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "ignited" ? 0.85 : 0.4 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                d="M45 16 Q 36 110, 45 210 Q 54 300, 45 350 Q 40 300, 45 210 Q 48 110, 45 16 Z"
                fill={variant.flame.inner}
                opacity={phase === "ignited" ? 0.95 : 0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "ignited" ? 0.95 : 0.5 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              />
              {/* sparks */}
              {phase === "ignited" &&
                [0, 1, 2, 3, 4].map((i) => (
                  <motion.circle
                    key={i}
                    cx={45 + (i % 2 === 0 ? -8 : 8)}
                    cy={60 + i * 60}
                    r="1.6"
                    fill={variant.flame.spark}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], y: [-2, -22, -40] }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: i * 0.18,
                      ease: "easeOut",
                    }}
                  />
                ))}
            </g>
          )}
        </svg>
      </motion.div>

      {/* Plaque */}
      <div className="relative z-20 mt-5 flex flex-col items-center text-center">
        <span className="font-brush text-2xl text-ink-800 leading-none">{variant.kanji}</span>
        <span className="mt-2 text-[10px] tracking-[0.32em] text-ink-700/55 uppercase">
          {variant.subtitle}
        </span>
        <span className="mt-1 text-sm font-medium tracking-tight text-ink-800">
          {variant.label}
        </span>
      </div>
    </motion.button>
  );
}

function Engraving({ variant }: { variant: KatanaVariant }) {
  const c = variant.blade.hamon;
  switch (variant.engraving) {
    case "formulas":
      return (
        <g fill={c} opacity="0.55" fontSize="6" fontFamily="serif">
          <text x="42" y="80">∑</text>
          <text x="42" y="140">σ²</text>
          <text x="42" y="200">∇f</text>
          <text x="42" y="260">∫</text>
          <text x="42" y="320">π</text>
        </g>
      );
    case "circuit":
      return (
        <g stroke={c} strokeWidth="0.4" fill="none" opacity="0.7">
          <path d="M45 70 L45 90 L48 92 L48 110 M45 130 L45 150 L42 152 L42 170 M45 200 L45 220 L48 222 L48 240 M45 270 L45 300" />
          <circle cx="48" cy="110" r="1" fill={c} />
          <circle cx="42" cy="170" r="1" fill={c} />
          <circle cx="48" cy="240" r="1" fill={c} />
        </g>
      );
    case "achievement":
      return (
        <g fill={c} opacity="0.6">
          <path d="M45 70 l3 6 l-3 5 l-3 -5 z" />
          <path d="M45 140 l3 6 l-3 5 l-3 -5 z" />
          <path d="M45 210 l3 6 l-3 5 l-3 -5 z" />
          <path d="M45 280 l3 6 l-3 5 l-3 -5 z" />
          <text x="42" y="340" fontSize="5" fontFamily="serif">勝</text>
        </g>
      );
    case "mechanical":
      return (
        <g stroke={c} strokeWidth="0.35" fill="none" opacity="0.7">
          <rect x="41" y="80" width="8" height="14" />
          <line x1="45" y1="80" x2="45" y2="94" />
          <rect x="41" y="140" width="8" height="14" />
          <line x1="41" y1="147" x2="49" y2="147" />
          <circle cx="45" cy="210" r="4" />
          <circle cx="45" cy="210" r="1.5" fill={c} />
          <rect x="41" y="270" width="8" height="14" />
        </g>
      );
    case "interest":
      return (
        <g fill={c} opacity="0.6" fontSize="6" fontFamily="serif">
          <text x="42" y="80">♪</text>
          <text x="42" y="140">⚔</text>
          <text x="42" y="200">♥</text>
          <text x="42" y="260">★</text>
          <text x="42" y="320">⌘</text>
        </g>
      );
    case "seal":
      return (
        <g fill={c} opacity="0.6" fontFamily="serif" fontSize="7">
          <rect x="41" y="70" width="8" height="8" fill="none" stroke={c} strokeWidth="0.4" />
          <text x="42" y="77">縁</text>
          <text x="42" y="180">約</text>
          <text x="42" y="280">束</text>
        </g>
      );
  }
}

function Tsuba({ variant }: { variant: KatanaVariant }) {
  const c = variant.tsubaColor;
  switch (variant.tsuba) {
    case "disc":
      return (
        <g>
          <ellipse cx="45" cy="365" rx="22" ry="6" fill={c} />
          <ellipse cx="45" cy="365" rx="22" ry="6" fill="#000" opacity="0.18" />
          <ellipse cx="45" cy="365" rx="22" ry="3" fill="#fff" opacity="0.15" />
        </g>
      );
    case "square":
      return (
        <g>
          <rect x="22" y="360" width="46" height="10" fill={c} />
          <rect x="22" y="360" width="46" height="3" fill="#fff" opacity="0.12" />
          <rect x="22" y="367" width="46" height="3" fill="#000" opacity="0.22" />
        </g>
      );
    case "flower":
      return (
        <g fill={c}>
          <ellipse cx="45" cy="365" rx="24" ry="7" />
          <circle cx="22" cy="365" r="4" />
          <circle cx="68" cy="365" r="4" />
          <circle cx="45" cy="358" r="3" />
          <circle cx="45" cy="372" r="3" />
        </g>
      );
    case "gear":
      return (
        <g fill={c}>
          <rect x="22" y="361" width="46" height="9" />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={24 + i * 6.5} y="358" width="3" height="3" />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={24 + i * 6.5} y="370" width="3" height="3" />
          ))}
          <rect x="22" y="361" width="46" height="2" fill="#fff" opacity="0.15" />
        </g>
      );
    case "petal":
      return (
        <g fill={c}>
          <ellipse cx="45" cy="365" rx="24" ry="7" />
          <path d="M22 365 Q 12 360, 18 372 Z" />
          <path d="M68 365 Q 78 360, 72 372 Z" />
        </g>
      );
    case "wave":
      return (
        <g fill={c}>
          <path d="M21 362 Q 28 358, 35 362 T 49 362 T 63 362 T 69 362 L 69 370 Q 63 374, 56 370 T 42 370 T 28 370 T 21 370 Z" />
        </g>
      );
  }
}

function Handle({ variant }: { variant: KatanaVariant }) {
  const { primary, secondary, pattern } = variant.wrap;
  const baseRect = (
    <rect x="32" y="370" width="26" height="140" rx="3" fill={primary} />
  );
  switch (pattern) {
    case "diamond":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <path
                d={`M32 ${376 + i * 15} L45 ${383 + i * 15} L58 ${376 + i * 15} L45 ${369 + i * 15} Z`}
                fill={secondary}
                opacity="0.85"
              />
              <path
                d={`M32 ${376 + i * 15} L45 ${383 + i * 15} L58 ${376 + i * 15}`}
                stroke="#000"
                strokeWidth="0.4"
                fill="none"
                opacity="0.4"
              />
            </g>
          ))}
        </g>
      );
    case "scale":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 11 }).map((_, i) =>
            [0, 1].map((j) => (
              <circle
                key={`${i}-${j}`}
                cx={37 + j * 12}
                cy={376 + i * 12}
                r="5"
                fill={secondary}
                opacity="0.8"
                stroke="#000"
                strokeOpacity="0.35"
                strokeWidth="0.3"
              />
            ))
          )}
        </g>
      );
    case "stripe":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x="32"
              y={374 + i * 14}
              width="26"
              height="4"
              fill={secondary}
              opacity="0.85"
            />
          ))}
        </g>
      );
    case "circuit":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x="32" y={378 + i * 16} width="26" height="2" fill={secondary} opacity="0.7" />
              <rect x="44" y={378 + i * 16} width="2" height="14" fill={secondary} opacity="0.5" />
              <circle cx="38" cy={385 + i * 16} r="1.2" fill={secondary} />
              <circle cx="52" cy={385 + i * 16} r="1.2" fill={secondary} />
            </g>
          ))}
        </g>
      );
    case "wave":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M32 ${380 + i * 15} Q 38 ${376 + i * 15} 45 ${380 + i * 15} T 58 ${380 + i * 15}`}
              stroke={secondary}
              strokeWidth="2"
              fill="none"
              opacity="0.8"
            />
          ))}
        </g>
      );
    case "tortoise":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i} fill="none" stroke={secondary} strokeWidth="1" opacity="0.85">
              <polygon points={`38,${374 + i * 14} 45,${370 + i * 14} 52,${374 + i * 14} 52,${382 + i * 14} 45,${386 + i * 14} 38,${382 + i * 14}`} />
            </g>
          ))}
        </g>
      );
  }
}
