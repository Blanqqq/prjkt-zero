"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Minimal soft-ring cursor. One element — a thin ink ring that lerps behind
 * the pointer, scales on [data-hover] targets, briefly contracts on click.
 * No dot, no slash, no theme. Apple/Linear-school discipline.
 *
 * Hard guards:
 *   - Returns null on touch / coarse-pointer devices (no orphan element)
 *   - Only registers listeners when fine pointer is detected
 *   - CSS in globals.css gates cursor:none to html.cinematic; this component
 *     is also conditionally mounted in AppFrame so the two systems can't
 *     desync (e.g. Recruiter Mode never shows a custom cursor, ever).
 */
export function KatanaCursor() {
  const [fine, setFine] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  // 1) Detect fine pointer (and react to docking/undocking)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // 2) Position + lerp loop (only when fine pointer)
  useEffect(() => {
    if (!fine || typeof window === "undefined") return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let targetScale = 1;
    let opacity = 0;
    let targetOpacity = 0.55;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      targetOpacity = 0.55;
      const target = e.target as HTMLElement | null;
      const hov = !!target?.closest?.("[data-hover]");
      targetScale = hov ? 1.6 : 1;
    };

    const onDown = () => {
      targetScale *= 0.7;
      window.setTimeout(() => {
        targetScale = targetScale / 0.7;
      }, 120);
    };

    const onLeave = () => {
      targetOpacity = 0;
    };

    const tick = () => {
      rx += (mx - rx) * 0.24;
      ry += (my - ry) * 0.24;
      scale += (targetScale - scale) * 0.2;
      opacity += (targetOpacity - opacity) * 0.2;
      const el = ringRef.current;
      if (el) {
        el.style.transform = `translate3d(${rx - 14}px, ${ry - 14}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-7 w-7 rounded-full border border-ink-900"
      style={{
        willChange: "transform, opacity",
        mixBlendMode: "multiply",
        opacity: 0,
      }}
    />
  );
}
