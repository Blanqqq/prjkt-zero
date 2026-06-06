"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { KatanaVariant } from "./katanaConfig";

/**
 * One katana, rendered as a single SVG. Anatomically referenced:
 *   kissaki (tip) + yokote line · ji (blade body) · hamon (temper line)
 *   · habaki (brass collar) · tsuba (guard) · tsuka with menuki + mekugi
 *   · kashira (pommel). State: idle → drawing → ignited → reset.
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
      {/* Hover glow — soft, behind the blade */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[660px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          opacity: hover ? 0.5 : 0.12,
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
        {variant.imageSrc ? (
          // Drop-in photo path: rendered at the same height as the SVG so the
          // niche/pedestal dimensions stay constant whether real or vector.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={variant.imageSrc}
            alt={`${variant.label} katana`}
            width={120}
            height={540}
            className="relative z-10 h-[540px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(17,17,17,0.28)]"
            loading="lazy"
            decoding="async"
          />
        ) : (
        <svg
          width={90}
          height={540}
          viewBox="0 0 90 540"
          className="relative z-10 drop-shadow-[0_30px_40px_rgba(17,17,17,0.22)]"
        >
          <defs>
            {/* Steel — three-stop gradient to fake a shinogi ridge */}
            <linearGradient id={`blade-${variant.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor={variant.blade.spine} />
              <stop offset="0.32" stopColor={variant.blade.base} />
              <stop offset="0.5" stopColor={variant.blade.sheen} stopOpacity="0.9" />
              <stop offset="0.7" stopColor={variant.blade.base} />
              <stop offset="1" stopColor={variant.blade.edge} />
            </linearGradient>
            {/* Hamon temper-line gradient */}
            <linearGradient id={`hamon-${variant.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={variant.blade.hamon} stopOpacity="0" />
              <stop offset="0.5" stopColor={variant.blade.hamon} stopOpacity="0.9" />
              <stop offset="1" stopColor={variant.blade.hamon} stopOpacity="0" />
            </linearGradient>
            {/* Habaki (brass collar) — warm metal gradient */}
            <linearGradient id={`habaki-${variant.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#7B5A2A" />
              <stop offset="0.5" stopColor="#D4A84F" />
              <stop offset="1" stopColor="#6E4D1F" />
            </linearGradient>
            {/* Tsuba depth gradient */}
            <linearGradient id={`tsuba-${variant.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="0.5" stopColor={variant.tsubaColor} />
              <stop offset="1" stopColor="#000000" stopOpacity="0.35" />
            </linearGradient>
            {/* Flame blur */}
            <filter id={`flame-${variant.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
          </defs>

          {/* ─── BLADE ─────────────────────────────────────────────── */}
          {/* Kissaki (tip) */}
          <path
            d="M45 6 L51 24 L52 38 L38 38 L39 24 Z"
            fill={`url(#blade-${variant.id})`}
            stroke={variant.blade.spine}
            strokeWidth="0.4"
          />
          {/* Yokote line — boundary between kissaki and main blade */}
          <line x1="38" y1="38" x2="52" y2="38" stroke={variant.blade.spine} strokeWidth="0.6" opacity="0.7" />

          {/* Main blade body — slight curvature (sori) */}
          <path
            d="M38 38 L52 38 Q 53.5 200, 54 355 L 36 355 Q 36.5 200, 38 38 Z"
            fill={`url(#blade-${variant.id})`}
            stroke={variant.blade.spine}
            strokeWidth="0.5"
          />

          {/* Shinogi ridge (the lengthwise highlight) */}
          <line
            x1="46"
            y1="40"
            x2="47"
            y2="354"
            stroke={variant.blade.sheen}
            strokeWidth="0.4"
            opacity="0.75"
          />

          {/* Hamon — organic temper line near the edge */}
          <path
            d="M51 40 Q 50 70 51.5 100 Q 49.5 130 51 162 Q 50 195 51.5 226 Q 50 258 51 290 Q 50 320 51.5 350"
            stroke={`url(#hamon-${variant.id})`}
            strokeWidth="1.4"
            fill="none"
            opacity="0.85"
          />

          {/* Engraving overlay */}
          <Engraving variant={variant} />

          {/* ─── HABAKI (brass collar) ─────────────────────────────── */}
          <rect x="34" y="355" width="22" height="7" rx="1" fill={`url(#habaki-${variant.id})`} />
          <rect x="34" y="355" width="22" height="1" fill="#FFFFFF" opacity="0.45" />
          <rect x="34" y="361" width="22" height="1" fill="#000000" opacity="0.35" />

          {/* ─── TSUBA (guard) ─────────────────────────────────────── */}
          <Tsuba variant={variant} />

          {/* ─── TSUKA (handle) ─────────────────────────────────────── */}
          <Handle variant={variant} />

          {/* ─── KASHIRA (pommel cap) ──────────────────────────────── */}
          <rect x="32" y="508" width="26" height="16" rx="3" fill={variant.pommel} />
          <rect x="32" y="508" width="26" height="2" fill="#FFFFFF" opacity="0.25" />
          <rect x="32" y="520" width="26" height="4" fill="#000000" opacity="0.35" />
          <circle cx="45" cy="516" r="1.8" fill="#FFFFFF" opacity="0.5" />
          <circle cx="45" cy="516" r="1" fill={variant.flame.outer} opacity="0.6" />

          {/* FLAME along blade — only when ignited */}
          {phase !== "idle" && (
            <g filter={`url(#flame-${variant.id})`}>
              <motion.path
                d="M45 6 Q 30 110, 45 220 Q 60 320, 45 355 Q 38 320, 45 220 Q 50 110, 45 6 Z"
                fill={variant.flame.outer}
                opacity={phase === "ignited" ? 0.85 : 0.4}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "ignited" ? 0.85 : 0.4 }}
                transition={{ duration: 0.35 }}
              />
              <motion.path
                d="M45 16 Q 36 110, 45 210 Q 54 300, 45 348 Q 40 300, 45 210 Q 48 110, 45 16 Z"
                fill={variant.flame.inner}
                opacity={phase === "ignited" ? 0.95 : 0.5}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "ignited" ? 0.95 : 0.5 }}
                transition={{ duration: 0.45, delay: 0.1 }}
              />
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
        )}
      </motion.div>

      {/* Brass plaque */}
      <div className="relative z-20 mt-6 flex flex-col items-center text-center">
        <span className="font-brush text-2xl text-ink-800 leading-none">{variant.kanji}</span>
        <span className="mt-2 block h-px w-8 bg-ink-800/30" />
        <span className="mt-2 text-[10px] tracking-[0.32em] text-ink-700/55 uppercase">
          {variant.subtitle}
        </span>
        <span className="mt-0.5 text-sm font-medium tracking-tight text-ink-800">
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
        <g fill={c} opacity="0.5" fontSize="6" fontFamily="serif">
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
        <g fill={c} opacity="0.55">
          <path d="M45 70 l3 6 l-3 5 l-3 -5 z" />
          <path d="M45 140 l3 6 l-3 5 l-3 -5 z" />
          <path d="M45 210 l3 6 l-3 5 l-3 -5 z" />
          <path d="M45 280 l3 6 l-3 5 l-3 -5 z" />
          <text x="42" y="335" fontSize="5" fontFamily="serif">勝</text>
        </g>
      );
    case "mechanical":
      return (
        <g stroke={c} strokeWidth="0.35" fill="none" opacity="0.65">
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
        <g fill={c} opacity="0.55" fontSize="6" fontFamily="serif">
          <text x="42" y="80">♪</text>
          <text x="42" y="140">⚔</text>
          <text x="42" y="200">♥</text>
          <text x="42" y="260">★</text>
          <text x="42" y="320">⌘</text>
        </g>
      );
    case "seal":
      return (
        <g fill={c} opacity="0.55" fontFamily="serif" fontSize="7">
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
  const grad = `url(#tsuba-${variant.id})`;
  const baseY = 362;
  switch (variant.tsuba) {
    case "disc":
      return (
        <g>
          <ellipse cx="45" cy={baseY + 4} rx="22" ry="7" fill={grad} />
          <ellipse cx="45" cy={baseY + 2} rx="22" ry="2" fill="#FFFFFF" opacity="0.18" />
          <circle cx="45" cy={baseY + 4} r="2" fill={c} stroke="#000" strokeOpacity="0.3" strokeWidth="0.3" />
        </g>
      );
    case "square":
      return (
        <g>
          <rect x="22" y={baseY} width="46" height="11" rx="1" fill={grad} />
          <rect x="22" y={baseY} width="46" height="2" fill="#FFFFFF" opacity="0.18" />
          <rect x="22" y={baseY + 9} width="46" height="2" fill="#000000" opacity="0.3" />
          <rect x="36" y={baseY + 2} width="18" height="7" rx="0.5" fill="none" stroke={c} strokeWidth="0.4" opacity="0.7" />
        </g>
      );
    case "flower":
      return (
        <g>
          <ellipse cx="45" cy={baseY + 4} rx="24" ry="8" fill={grad} />
          <circle cx="22" cy={baseY + 4} r="4" fill={c} />
          <circle cx="68" cy={baseY + 4} r="4" fill={c} />
          <circle cx="45" cy={baseY - 2} r="3" fill={c} />
          <circle cx="45" cy={baseY + 10} r="3" fill={c} />
          <circle cx="45" cy={baseY + 4} r="2.5" fill="#FFFFFF" opacity="0.15" />
        </g>
      );
    case "gear":
      return (
        <g>
          <rect x="22" y={baseY + 1} width="46" height="10" fill={grad} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={24 + i * 6.5} y={baseY - 2} width="3" height="3" fill={c} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={24 + i * 6.5} y={baseY + 10} width="3" height="3" fill={c} />
          ))}
          <rect x="22" y={baseY + 1} width="46" height="2" fill="#FFFFFF" opacity="0.18" />
        </g>
      );
    case "petal":
      return (
        <g>
          <ellipse cx="45" cy={baseY + 4} rx="24" ry="8" fill={grad} />
          <path d={`M22 ${baseY + 4} Q 12 ${baseY - 1}, 18 ${baseY + 12} Z`} fill={c} />
          <path d={`M68 ${baseY + 4} Q 78 ${baseY - 1}, 72 ${baseY + 12} Z`} fill={c} />
          <ellipse cx="45" cy={baseY + 4} rx="22" ry="2" fill="#FFFFFF" opacity="0.18" />
        </g>
      );
    case "wave":
      return (
        <g>
          <path
            d={`M21 ${baseY + 2} Q 28 ${baseY - 2}, 35 ${baseY + 2} T 49 ${baseY + 2} T 63 ${baseY + 2} T 69 ${baseY + 2} L 69 ${baseY + 10} Q 63 ${baseY + 14}, 56 ${baseY + 10} T 42 ${baseY + 10} T 28 ${baseY + 10} T 21 ${baseY + 10} Z`}
            fill={grad}
          />
        </g>
      );
  }
}

function Handle({ variant }: { variant: KatanaVariant }) {
  const { primary, secondary, pattern } = variant.wrap;
  // tsuka body, gently flared toward kashira (subtle taper)
  const baseRect = (
    <path
      d="M33 373 L 57 373 L 58 504 L 32 504 Z"
      fill={primary}
    />
  );
  // mekugi pin (small dot) — about 1/3 down the handle
  const mekugi = <circle cx="45" cy="403" r="1.3" fill="#000" opacity="0.55" />;

  // menuki — small decorative ornament under the wrap, color = flame outer for variant link
  const menuki = (
    <g>
      <ellipse cx="45" cy="445" rx="4" ry="3.2" fill={variant.flame.outer} opacity="0.85" />
      <ellipse cx="45" cy="444" rx="2.5" ry="1.4" fill="#FFFFFF" opacity="0.4" />
    </g>
  );

  switch (pattern) {
    case "diamond":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <path
                d={`M33 ${380 + i * 13} L45 ${386 + i * 13} L57 ${380 + i * 13} L45 ${374 + i * 13} Z`}
                fill={secondary}
                opacity="0.88"
              />
              <path
                d={`M33 ${380 + i * 13} L45 ${386 + i * 13} L57 ${380 + i * 13}`}
                stroke="#000"
                strokeWidth="0.3"
                fill="none"
                opacity="0.45"
              />
            </g>
          ))}
          {menuki}
          {mekugi}
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
                cy={378 + i * 12}
                r="5"
                fill={secondary}
                opacity="0.8"
                stroke="#000"
                strokeOpacity="0.35"
                strokeWidth="0.3"
              />
            ))
          )}
          {menuki}
          {mekugi}
        </g>
      );
    case "stripe":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 11 }).map((_, i) => (
            <rect
              key={i}
              x="33"
              y={376 + i * 12}
              width="24"
              height="4"
              fill={secondary}
              opacity="0.85"
            />
          ))}
          {menuki}
          {mekugi}
        </g>
      );
    case "circuit":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <rect x="33" y={380 + i * 16} width="24" height="2" fill={secondary} opacity="0.7" />
              <rect x="44" y={380 + i * 16} width="2" height="14" fill={secondary} opacity="0.5" />
              <circle cx="38" cy={387 + i * 16} r="1.2" fill={secondary} />
              <circle cx="52" cy={387 + i * 16} r="1.2" fill={secondary} />
            </g>
          ))}
          {menuki}
          {mekugi}
        </g>
      );
    case "wave":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 10 }).map((_, i) => (
            <path
              key={i}
              d={`M33 ${382 + i * 13} Q 38 ${378 + i * 13} 45 ${382 + i * 13} T 57 ${382 + i * 13}`}
              stroke={secondary}
              strokeWidth="2"
              fill="none"
              opacity="0.8"
            />
          ))}
          {menuki}
          {mekugi}
        </g>
      );
    case "tortoise":
      return (
        <g>
          {baseRect}
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i} fill="none" stroke={secondary} strokeWidth="1" opacity="0.85">
              <polygon
                points={`38,${376 + i * 12} 45,${372 + i * 12} 52,${376 + i * 12} 52,${382 + i * 12} 45,${386 + i * 12} 38,${382 + i * 12}`}
              />
            </g>
          ))}
          {menuki}
          {mekugi}
        </g>
      );
  }
}
