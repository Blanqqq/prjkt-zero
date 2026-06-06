"use client";

/**
 * Floating quote panel — Musashi citation pulled from Go Rin no Sho.
 * Lives in the hero, right-aligned. Brush serif body, hairline rule, small
 * vermilion seal at the corner.
 */
export function MusashiQuote() {
  return (
    <figure
      className="relative w-full max-w-[260px] rounded-2xl border border-ink-800/10 bg-white/55 p-5 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 30px 60px -30px rgba(17,17,17,0.18), 0 1px 0 rgba(255,255,255,0.7) inset",
      }}
    >
      <span
        aria-hidden
        className="absolute -left-2 top-3 font-brush text-5xl leading-none text-crimson/70"
      >
        “
      </span>

      <blockquote className="font-brush text-[15px] leading-snug text-ink-800/90">
        Today is victory over yourself of yesterday.
      </blockquote>

      <span className="mt-3 block h-px w-8 bg-ink-800/25" />

      <figcaption className="mt-2 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink-700/55">
          Miyamoto Musashi
        </span>
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center rounded-sm font-brush text-[10px] leading-none text-sakura-100"
          style={{
            background:
              "radial-gradient(circle at 35% 25%, #c8253f 0%, #8b1428 60%, #5a0c19 100%)",
            boxShadow:
              "0 1px 1px rgba(17,17,17,0.25), inset 0 1px 1px rgba(255,255,255,0.2)",
          }}
        >
          武
        </span>
      </figcaption>
    </figure>
  );
}
