"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Floating sakura + ink particles. CSS-only — each petal is a positioned
 * <span> with an SVG background and a long-duration `drift` animation. Cheap,
 * repaints stay off the main thread, no requestAnimationFrame loop.
 *
 * Visibility is scroll-aware: when the viewport overlaps the dark Project
 * Garage (#projects), the whole layer fades out so pink petals never fly
 * across a black slab.
 */
const PETAL_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
    <defs>
      <radialGradient id='g' cx='30%' cy='30%' r='80%'>
        <stop offset='0%' stop-color='#FFFFFF' stop-opacity='0.95'/>
        <stop offset='60%' stop-color='#FFC8D8' stop-opacity='0.95'/>
        <stop offset='100%' stop-color='#FF8FB0' stop-opacity='0.85'/>
      </radialGradient>
    </defs>
    <path d='M12 2 C 16 6, 18 10, 12 22 C 6 10, 8 6, 12 2 Z' fill='url(#g)' stroke='#C25E7B' stroke-opacity='0.35' stroke-width='0.4'/>
  </svg>`
);

const INK_SVG = encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'>
    <circle cx='6' cy='6' r='5' fill='#111111' opacity='0.55'/>
  </svg>`
);

type Particle = {
  left: string;
  top: string;
  size: number;
  delay: string;
  duration: string;
  kind: "petal" | "ink";
  opacity: number;
};

function build(seed: number, count: number): Particle[] {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, (_, i) => {
    const kind = i % 7 === 0 ? ("ink" as const) : ("petal" as const);
    return {
      left: `${(rand() * 100).toFixed(2)}%`,
      top: `${(rand() * 100).toFixed(2)}%`,
      size: kind === "ink" ? 3 + rand() * 4 : 10 + rand() * 18,
      delay: `${(-rand() * 22).toFixed(2)}s`,
      duration: `${18 + rand() * 14}s`,
      kind,
      opacity: kind === "ink" ? 0.35 + rand() * 0.3 : 0.55 + rand() * 0.4,
    };
  });
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function SakuraPetals({ count = 36 }: { count?: number }) {
  const particles = useMemo(() => build(42, count), [count]);
  const layerRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState(false);

  /**
   * Watch for elements with [data-dark-section] (the dark Project Garage stage
   * carries this attribute). When one overlaps the viewport, fade the petal
   * layer so pink particles don't blizzard across a black slab.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dark = document.querySelectorAll<HTMLElement>("[data-dark-section]");
    if (!dark.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        setDim(anyVisible);
      },
      { rootMargin: "0px 0px 0px 0px", threshold: [0, 0.05] }
    );
    dark.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden transition-opacity duration-700 ease-out"
      style={{ opacity: dim ? 0 : 1 }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute block animate-drift will-change-transform"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            backgroundImage: `url("data:image/svg+xml;utf8,${p.kind === "petal" ? PETAL_SVG : INK_SVG}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            filter: p.kind === "petal" ? "drop-shadow(0 2px 6px rgba(157,27,50,0.18))" : "none",
          }}
        />
      ))}
    </div>
  );
}
