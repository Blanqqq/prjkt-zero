"use client";

import { useCallback } from "react";
import { Katana } from "./Katana";
import { KATANAS } from "./katanaConfig";

/**
 * Pedestal display — the v2 katana wall. Each blade stands in its own glass
 * column on a chrome pedestal, with a floor reflection underneath. No wall
 * plate, no brackets clipping the blade. Reads like a luxury-watch exhibit.
 */
export function KatanaWall() {
  const commit = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative">
      {/* Ambient spotlight overhead */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-56 w-[80%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Pedestals row */}
      <div className="no-scrollbar relative -mx-2 flex items-end gap-3 overflow-x-auto px-2 pb-2 sm:gap-4 md:justify-between md:gap-2 lg:gap-3">
        {KATANAS.map((variant, i) => (
          <Pedestal key={variant.id} accent={variant.flame.outer}>
            <Katana variant={variant} onCommit={commit} index={i} />
          </Pedestal>
        ))}
      </div>

      {/* Stage floor — thin polished line under the pedestals */}
      <div className="relative -mt-2">
        <div
          aria-hidden
          className="mx-auto h-px max-w-[1200px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(17,17,17,0.4), transparent)",
          }}
        />
        <div
          aria-hidden
          className="mx-auto h-6 max-w-[1200px]"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(17,17,17,0.18), transparent 70%)",
          }}
        />
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-[11px] tracking-[0.28em] uppercase text-ink-700/55">
        Select a blade · 抜刀
      </p>
    </div>
  );
}

/**
 * One pedestal. Three layers stacked:
 *   1. Glass column (transparent, faint vertical highlights) — holds the blade
 *   2. Chrome cap (the disc the blade stands on)
 *   3. Chrome cylinder base with a soft floor reflection underneath
 */
function Pedestal({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div className="relative flex shrink-0 flex-col items-center">
      {/* Glass column — invisible structure that contains the blade */}
      <div
        className="relative flex w-[112px] flex-col items-center pt-2 pb-3 sm:w-[124px] md:w-[136px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.16) 75%, rgba(255,255,255,0.05) 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.45)",
          borderRight: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Glass top edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
          }}
        />
        {/* Accent under-glow (variant flame color) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-2 h-2 rounded-full blur-md"
          style={{ background: accent, opacity: 0.35 }}
        />

        {children}
      </div>

      {/* Chrome cap — the polished disc */}
      <div
        className="relative -mt-1 h-2 w-[120px] rounded-[2px] sm:w-[130px] md:w-[140px]"
        style={{
          background:
            "linear-gradient(180deg, #E8ECF0 0%, #BCC2CC 35%, #6E7480 60%, #C0C5CF 100%)",
          boxShadow:
            "0 1px 1px rgba(17,17,17,0.35), inset 0 0.5px 0 rgba(255,255,255,0.8)",
        }}
      />

      {/* Chrome base cylinder */}
      <div
        className="relative h-7 w-[96px] sm:w-[104px] md:w-[112px]"
        style={{
          background:
            "linear-gradient(180deg, #DDE1E7 0%, #A6ABB5 25%, #4E535D 55%, #6E7480 75%, #2F333B 100%)",
          borderRadius: "0 0 6px 6px",
          boxShadow:
            "0 8px 16px -8px rgba(17,17,17,0.45), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(255,255,255,0.18)",
        }}
      >
        {/* Vertical brushed-steel highlights */}
        <span
          aria-hidden
          className="absolute inset-y-1 left-3 w-px"
          style={{ background: "rgba(255,255,255,0.45)" }}
        />
        <span
          aria-hidden
          className="absolute inset-y-1 right-3 w-px"
          style={{ background: "rgba(255,255,255,0.35)" }}
        />
      </div>

      {/* Floor reflection */}
      <div
        aria-hidden
        className="mt-0.5 h-3 w-[120px] rounded-full sm:w-[130px] md:w-[140px]"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(17,17,17,0.28), transparent 70%)",
        }}
      />
    </div>
  );
}
