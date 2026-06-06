"use client";

import type { Project } from "./projectsConfig";

/**
 * Side-profile SVG silhouettes of four iconic JDM cars. Stylized — not photoreal.
 * The goal is the *feel*: long hood (Supra), boxy widebody (R34), pop-up curves
 * (RX-7), low mid-engine wedge (NSX). Body color follows the project livery.
 *
 * If `carImageSrc` is set on the project, an <img> render takes over.
 */
export function JDMCar({ project }: { project: Project }) {
  const { liveryPrimary, liveryAccent, car, carImageSrc } = project;

  if (carImageSrc) {
    return (
      <div className="cinema-frame inline-block w-full max-w-[760px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={carImageSrc}
          alt={project.carModel}
          width={1600}
          height={900}
          className="cinema-img h-auto w-full object-contain drop-shadow-[0_24px_30px_rgba(17,17,17,0.24)]"
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 760 280"
      className="h-auto w-full max-w-[760px] drop-shadow-[0_40px_50px_rgba(17,17,17,0.18)]"
      role="img"
      aria-label={project.carModel}
    >
      <defs>
        <linearGradient id={`paint-${project.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lighten(liveryPrimary, 0.18)} />
          <stop offset="0.55" stopColor={liveryPrimary} />
          <stop offset="1" stopColor={darken(liveryPrimary, 0.22)} />
        </linearGradient>
        <linearGradient id={`glass-${project.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4a60" stopOpacity="0.95" />
          <stop offset="1" stopColor="#0e1622" stopOpacity="0.98" />
        </linearGradient>
        <radialGradient id={`tire-${project.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#23262C" />
          <stop offset="1" stopColor="#0A0B0D" />
        </radialGradient>
        <radialGradient id={`rim-${project.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#CACED6" />
          <stop offset="1" stopColor="#6D7280" />
        </radialGradient>
        <radialGradient id={`shadow-${project.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="380" cy="248" rx="320" ry="14" fill={`url(#shadow-${project.id})`} />

      {car === "rx7" && <RX7 id={project.id} accent={liveryAccent} />}
      {car === "r34" && <R34 id={project.id} accent={liveryAccent} />}
      {car === "supra" && <Supra id={project.id} accent={liveryAccent} />}
      {car === "nsx" && <NSX id={project.id} accent={liveryAccent} />}

      {/* Wheels (shared structure) */}
      <Wheel id={project.id} cx={205} cy={220} />
      <Wheel id={project.id} cx={555} cy={220} />
    </svg>
  );
}

function Wheel({ id, cx, cy }: { id: string; cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="32" fill={`url(#tire-${id})`} />
      <circle cx={cx} cy={cy} r="20" fill={`url(#rim-${id})`} />
      <circle cx={cx} cy={cy} r="20" fill="none" stroke="#0A0B0D" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * 6}
            y1={cy + Math.sin(a) * 6}
            x2={cx + Math.cos(a) * 19}
            y2={cy + Math.sin(a) * 19}
            stroke="#0A0B0D"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="3.5" fill="#0A0B0D" />
    </g>
  );
}

function RX7({ id, accent }: { id: string; accent: string }) {
  return (
    <g>
      {/* Body - smooth, curvy, low */}
      <path
        d="M70 220 L80 195 Q 110 158, 180 152 L 230 132 Q 300 116, 420 116 Q 530 118, 600 138 Q 660 150, 690 175 L 700 220 Z"
        fill={`url(#paint-${id})`}
      />
      {/* Glass — short fastback */}
      <path
        d="M250 130 L 320 96 Q 410 86, 500 100 L 560 132 Z"
        fill={`url(#glass-${id})`}
      />
      {/* Pop-up headlight (closed) */}
      <rect x="92" y="180" width="36" height="6" rx="2" fill="#222" />
      <circle cx="115" cy="195" r="6" fill="#FFE9A8" opacity="0.9" />
      {/* Tail */}
      <rect x="678" y="170" width="14" height="10" rx="2" fill={accent} opacity="0.9" />
      {/* Side accent stripe */}
      <path d="M120 200 L 660 200" stroke={accent} strokeWidth="2" opacity="0.65" />
      {/* Door line */}
      <path d="M310 130 L 320 220" stroke="#000" strokeOpacity="0.25" strokeWidth="1.2" />
      <path d="M450 124 L 470 220" stroke="#000" strokeOpacity="0.25" strokeWidth="1.2" />
      {/* Wheel arches */}
      <path d="M170 220 Q 205 175, 240 220 Z" fill="#000" opacity="0.18" />
      <path d="M520 220 Q 555 175, 590 220 Z" fill="#000" opacity="0.18" />
    </g>
  );
}

function R34({ id, accent }: { id: string; accent: string }) {
  return (
    <g>
      {/* Body - boxy widebody, aggressive */}
      <path
        d="M60 220 L70 185 Q 100 158, 165 150 L 215 118 Q 290 102, 430 104 Q 540 106, 605 124 L 660 150 Q 700 162, 710 195 L 712 220 Z"
        fill={`url(#paint-${id})`}
      />
      {/* Greenhouse — squared */}
      <path
        d="M245 118 L 285 80 L 480 80 L 545 118 Z"
        fill={`url(#glass-${id})`}
      />
      {/* C-pillar block */}
      <path d="M520 118 L 545 80 L 555 80 L 545 118 Z" fill={`url(#paint-${id})`} />
      {/* Round quad tail lights */}
      <circle cx="700" cy="178" r="7" fill={accent} />
      <circle cx="685" cy="178" r="7" fill={accent} />
      <circle cx="700" cy="178" r="3" fill="#FFFFFF" opacity="0.9" />
      <circle cx="685" cy="178" r="3" fill="#FFFFFF" opacity="0.9" />
      {/* GT-R wing */}
      <rect x="640" y="100" width="80" height="6" rx="2" fill="#0F1620" />
      <rect x="660" y="106" width="6" height="20" fill="#0F1620" />
      <rect x="700" y="106" width="6" height="20" fill="#0F1620" />
      {/* Hood vent */}
      <rect x="100" y="160" width="36" height="3" fill="#000" opacity="0.4" />
      {/* Door lines */}
      <path d="M300 118 L 305 220" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
      <path d="M430 116 L 445 220" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
      {/* Side skirt */}
      <rect x="180" y="210" width="490" height="10" fill="#0A0B0D" opacity="0.4" />
      {/* Wheel arches */}
      <path d="M170 220 Q 205 168, 240 220 Z" fill="#000" opacity="0.22" />
      <path d="M520 220 Q 555 168, 590 220 Z" fill="#000" opacity="0.22" />
    </g>
  );
}

function Supra({ id, accent }: { id: string; accent: string }) {
  return (
    <g>
      {/* Body - long hood, rear fastback */}
      <path
        d="M60 220 L75 190 Q 110 165, 200 158 L 280 130 Q 380 118, 470 120 Q 560 124, 630 150 Q 685 168, 705 200 L 708 220 Z"
        fill={`url(#paint-${id})`}
      />
      {/* Glass — long fastback */}
      <path
        d="M310 128 L 360 90 Q 440 84, 540 100 L 595 132 Z"
        fill={`url(#glass-${id})`}
      />
      {/* MK4 hi-mount wing */}
      <rect x="600" y="95" width="100" height="5" rx="2" fill="#1A1A1A" />
      <rect x="620" y="100" width="6" height="35" fill="#1A1A1A" />
      <rect x="674" y="100" width="6" height="35" fill="#1A1A1A" />
      {/* Pop-up headlight (closed) */}
      <rect x="92" y="186" width="40" height="6" rx="2" fill="#222" />
      <circle cx="118" cy="196" r="5" fill="#FFE9A8" opacity="0.9" />
      {/* Tail light */}
      <rect x="680" y="170" width="18" height="9" rx="2" fill={accent} opacity="0.9" />
      {/* Side body crease */}
      <path d="M120 198 L 680 198" stroke={accent} strokeWidth="1.5" opacity="0.5" />
      {/* Door lines */}
      <path d="M320 128 L 325 220" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
      <path d="M470 122 L 480 220" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
      {/* Wheel arches */}
      <path d="M170 220 Q 205 172, 240 220 Z" fill="#000" opacity="0.2" />
      <path d="M520 220 Q 555 172, 590 220 Z" fill="#000" opacity="0.2" />
    </g>
  );
}

function NSX({ id, accent }: { id: string; accent: string }) {
  return (
    <g>
      {/* Body - low, wide, mid-engine wedge */}
      <path
        d="M50 220 L60 200 Q 95 178, 175 170 L 240 142 Q 320 128, 430 128 Q 540 130, 620 150 L 680 180 Q 700 190, 705 215 L 708 220 Z"
        fill={`url(#paint-${id})`}
      />
      {/* Glass — long flat */}
      <path
        d="M265 140 L 295 110 L 510 110 L 555 140 Z"
        fill={`url(#glass-${id})`}
      />
      {/* Side air intake (mid-engine cue) */}
      <path d="M520 168 L 600 168 L 605 192 L 525 192 Z" fill="#000" opacity="0.6" />
      <path d="M530 174 L 600 174" stroke={accent} strokeWidth="1" opacity="0.7" />
      <path d="M530 184 L 600 184" stroke={accent} strokeWidth="1" opacity="0.7" />
      {/* Pop-up headlight */}
      <rect x="80" y="192" width="40" height="6" rx="2" fill="#222" />
      <circle cx="105" cy="201" r="5" fill="#FFE9A8" opacity="0.9" />
      {/* Tail strip */}
      <rect x="660" y="178" width="44" height="6" rx="2" fill={accent} opacity="0.9" />
      {/* Door cut */}
      <path d="M310 138 L 320 220" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
      <path d="M455 132 L 470 220" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
      {/* Wheel arches */}
      <path d="M170 220 Q 205 178, 240 220 Z" fill="#000" opacity="0.2" />
      <path d="M520 220 Q 555 178, 590 220 Z" fill="#000" opacity="0.2" />
    </g>
  );
}

function lighten(hex: string, amt: number) {
  return shade(hex, amt);
}
function darken(hex: string, amt: number) {
  return shade(hex, -amt);
}
function shade(hex: string, amt: number) {
  const h = hex.replace("#", "");
  const num = parseInt(h, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = clamp(r + Math.round(255 * amt));
  g = clamp(g + Math.round(255 * amt));
  b = clamp(b + Math.round(255 * amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
function clamp(v: number) {
  return Math.max(0, Math.min(255, v));
}
