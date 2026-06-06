"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Katana-shaped custom cursor. Two layers:
 *   - a small ink dot that tracks exactly
 *   - a sheathed blade that trails with eased lerp
 * Detects `[data-hover]` ancestors to reveal the blade, and emits a brief
 * slash arc on pointerdown. Hidden on touch/coarse-pointer devices via CSS.
 */
export function KatanaCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const bladeRef = useRef<HTMLDivElement>(null);
  const slashRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let bx = mx;
    let by = my;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      const hov = !!target?.closest?.("[data-hover]");
      setArmed(hov);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
    };

    const tick = () => {
      bx += (mx - bx) * 0.18;
      by += (my - by) * 0.18;
      if (bladeRef.current) {
        const dx = mx - bx;
        const dy = my - by;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        bladeRef.current.style.transform = `translate3d(${bx - 28}px, ${by - 28}px, 0) rotate(${angle - 45}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => {
      if (!slashRef.current) return;
      const el = slashRef.current;
      el.style.left = `${mx - 60}px`;
      el.style.top = `${my - 60}px`;
      el.classList.remove("opacity-0");
      el.classList.remove("scale-50");
      el.classList.add("opacity-100");
      el.classList.add("scale-100");
      window.setTimeout(() => {
        el.classList.remove("opacity-100");
        el.classList.remove("scale-100");
        el.classList.add("opacity-0");
        el.classList.add("scale-50");
      }, 220);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <>
      {/* Tip dot — exact tracking */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-ink-900 mix-blend-multiply"
        style={{ transition: "background-color 200ms ease" }}
      />
      {/* Sheathed blade — trails */}
      <div
        ref={bladeRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-14 w-14"
        style={{ transition: "opacity 220ms ease" }}
      >
        <svg viewBox="0 0 56 56" className="h-full w-full">
          {/* Sheath */}
          <rect
            x="6"
            y="26"
            width="36"
            height="6"
            rx="2"
            fill="#111111"
            opacity={armed ? 0.0 : 0.92}
            style={{ transition: "opacity 220ms ease" }}
          />
          {/* Blade (revealed on hover) */}
          <g style={{ transition: "opacity 220ms ease" }} opacity={armed ? 1 : 0}>
            <path d="M6 28 L46 26 L50 28 L46 30 L6 28 Z" fill="#EAEEF4" />
            <path d="M6 28 L46 26 L50 28" stroke="#C8CCD4" strokeWidth="0.6" fill="none" />
            <circle cx="6" cy="28" r="3" fill="#9D1B32" />
            <rect x="2" y="26" width="3" height="4" fill="#111111" />
          </g>
        </svg>
      </div>
      {/* Slash arc on click */}
      <div
        ref={slashRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-[120px] w-[120px] opacity-0 scale-50"
        style={{ transition: "opacity 220ms ease, transform 220ms ease" }}
      >
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <path
            d="M10 90 Q 60 10, 110 30"
            stroke="#111111"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <path
            d="M14 92 Q 60 18, 108 34"
            stroke="#9D1B32"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        </svg>
      </div>
    </>
  );
}
