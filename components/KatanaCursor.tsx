"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal Arc/Linear-school cursor. Two parts:
 *   - 5 px solid ink dot — tracks the pointer exactly
 *   - 30 px outlined ring — lerps behind, scales up on [data-hover] targets
 *
 * No katana imagery, no slash arc, no flashy click effects. The cursor is a
 * presence, not a feature. Hidden entirely on touch / coarse-pointer devices
 * by CSS; not rendered at all in Recruiter Mode (see AppFrame).
 */
export function KatanaCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let opacity = 1;
    let targetOpacity = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement | null;
      const hov = !!target?.closest?.("[data-hover]");
      targetScale = hov ? 1.45 : 1;
      targetOpacity = hov ? 0.45 : 1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 2.5}px, ${my - 2.5}px, 0)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      scale += (targetScale - scale) * 0.18;
      opacity += (targetOpacity - opacity) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 15}px, ${ry - 15}px, 0) scale(${scale.toFixed(3)})`;
      }
      if (dotRef.current) {
        dotRef.current.style.opacity = opacity.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };

    const onDown = () => {
      targetScale = 0.85;
      window.setTimeout(() => {
        targetScale = 1;
      }, 140);
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
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] rounded-full bg-ink-900"
        style={{ willChange: "transform, opacity" }}
      />
      {/* Soft ring — lerps behind */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[30px] w-[30px] rounded-full border border-ink-900/55"
        style={{ willChange: "transform", backdropFilter: "blur(1px)" }}
      />
    </>
  );
}
