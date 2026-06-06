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

      {/* Layer 4 — large brush-stroke whisper, top-right */}
      <svg
        className="absolute -top-24 -right-24 w-[80vw] max-w-[1100px] opacity-[0.05] mix-blend-multiply"
        viewBox="0 0 1000 600"
        fill="none"
      >
        <defs>
          <filter id="brush-rough">
            <feTurbulence baseFrequency="0.9" numOctaves="2" seed="7" />
            <feDisplacementMap in="SourceGraphic" scale="20" />
          </filter>
        </defs>
        <g filter="url(#brush-rough)" fill="#111111">
          <path d="M40 360 C 220 220, 460 460, 660 280 S 940 220, 990 320 L 990 360 C 820 280, 600 540, 400 380 S 120 460, 40 400 Z" />
        </g>
      </svg>

      {/* Layer 5 — second brush whisper, bottom-left */}
      <svg
        className="absolute -bottom-32 -left-32 w-[70vw] max-w-[900px] opacity-[0.045] mix-blend-multiply"
        viewBox="0 0 1000 600"
        fill="none"
      >
        <defs>
          <filter id="brush-rough-2">
            <feTurbulence baseFrequency="1.1" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="18" />
          </filter>
        </defs>
        <g filter="url(#brush-rough-2)" fill="#9D1B32">
          <path d="M20 320 C 280 180, 540 420, 760 260 S 980 320, 990 360 L 990 420 C 800 320, 600 540, 380 380 S 120 460, 20 420 Z" />
        </g>
      </svg>

      {/* Layer 6 — vignette pull */}
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
