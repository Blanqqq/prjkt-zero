/**
 * Sumi-e ink wash — hand-built, pure SVG (feTurbulence displacement + soft
 * radial gradients). No raster, no AI: deliverable D6's atmosphere asset,
 * crafted in code to honor the brief's "not generic AI art" and the
 * Kenya-Hara negative-space direction.
 *
 * A single organic ink diffusion with a feathered, bleeding edge and a faint
 * crimson undertone. Sits in the hero's negative space at very low opacity —
 * atmosphere, never a subject. Static (painted once), decorative, aria-hidden.
 */
export function InkWash({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 1000 760"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <filter id="ink-bleed" x="-25%" y="-25%" width="150%" height="150%">
          {/* Low-frequency noise → big soft clouds; displacement gives the
              brushed, bleeding sumi-e edge; a final blur softens it. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.0075" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="74" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="7" />
        </filter>
        <radialGradient id="ink-core" cx="40%" cy="36%" r="62%">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.13" />
          <stop offset="52%" stopColor="#111111" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#111111" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ink-blush" cx="62%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#9D1B32" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#9D1B32" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g filter="url(#ink-bleed)">
        <ellipse cx="440" cy="300" rx="380" ry="250" fill="url(#ink-core)" />
        <ellipse cx="600" cy="430" rx="240" ry="180" fill="url(#ink-blush)" />
      </g>
    </svg>
  );
}
