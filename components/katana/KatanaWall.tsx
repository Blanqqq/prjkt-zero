"use client";

import { useCallback } from "react";
import { Katana } from "./Katana";
import { KATANAS } from "./katanaConfig";

/**
 * The katana display wall. A horizontally arranged rack with mounting brackets,
 * a soft museum spotlight above, and a subtle scrollable overflow on mobile.
 */
export function KatanaWall() {
  const commit = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      {/* Spotlight wash above */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 h-40 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0.0) 70%)",
        }}
      />

      {/* Wall plate */}
      <div className="relative mx-auto max-w-[1280px] rounded-[28px] border border-ink-800/10 bg-gradient-to-b from-white/40 to-white/10 px-6 py-12 backdrop-blur-sm sm:px-10 md:py-16">
        {/* Plate top reveal */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-800/30 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ink-800/30 to-transparent" />

        {/* Plaque text */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-ink-800/30" />
            <span className="heading-eyebrow">Exhibition · Floor 01</span>
          </div>
          <span className="hidden font-brush text-sm text-ink-800/70 sm:inline">
            刀の間 — Hall of Blades
          </span>
        </div>

        {/* Rack */}
        <div className="no-scrollbar -mx-2 flex items-end gap-2 overflow-x-auto px-2 pb-6 sm:gap-4 md:justify-between md:gap-6">
          {KATANAS.map((variant, i) => (
            <Katana key={variant.id} variant={variant} onCommit={commit} index={i} />
          ))}
        </div>

        {/* Wooden rail at bottom */}
        <div className="relative mx-2 mt-2 h-3 rounded-sm bg-gradient-to-b from-ink-800 to-ink-700" />
        <div className="mx-6 h-2 rounded-b-md bg-gradient-to-b from-ink-700/80 to-transparent" />
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-[12px] tracking-[0.22em] uppercase text-ink-700/55">
        Select a blade · 抜刀
      </p>
    </div>
  );
}
