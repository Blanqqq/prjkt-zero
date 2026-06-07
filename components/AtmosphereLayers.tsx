"use client";

/**
 * Layered ambient background. Painted once at the page root. Pure CSS/SVG —
 * no canvas, no listeners, near-zero cost on the main thread.
 */
export function AtmosphereLayers() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1 — sakura gradient field */}
      <div className="absolute inset-0 bg-gradient-to-b from-sakura-100 via-sakura-200 to-sakura-300" />

      {/* Layer 2 — washi paper grain */}
      <div className="absolute inset-0 paper-grain opacity-90" />

      {/* Layer 3 — museum lighting (top spots + bottom crimson wash) */}
      <div className="absolute inset-0 museum-lights" />

      {/* Layer 4 — single brush whisper, very low opacity. Was two competing
          decorative shapes; one is enough and stays quiet. */}
      <svg
        className="absolute -top-32 -right-32 w-[70vw] max-w-[1000px] opacity-[0.028] mix-blend-multiply"
        viewBox="0 0 1000 600"
        fill="none"
        aria-hidden
      >
        <path
          d="M40 360 C 220 220, 460 460, 660 280 S 940 220, 990 320 L 990 360 C 820 280, 600 540, 400 380 S 120 460, 40 400 Z"
          fill="#111111"
        />
      </svg>

      {/* Layer 5 — vignette pull */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 50%, rgba(17,17,17,0.06) 100%)",
        }}
      />
    </div>
  );
}
