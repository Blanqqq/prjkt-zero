"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mockup autoplay hook. Increments a step counter every `intervalMs`, but
 * pauses when either:
 *   - the host element is not intersecting the viewport, or
 *   - the document is hidden (background tab, minimized window)
 *
 * Saves ~1 setInterval × 4 mockups × ~1700ms/tick that would otherwise
 * burn cycles whenever someone scrolls past projects.
 */
export function useAutoplay(
  steps: number,
  intervalMs = 1600
): { step: number; ref: React.RefObject<HTMLDivElement> } {
  const [step, setStep] = useState(0);
  // null! satisfies the non-null RefObject contract React's prop types expect
  // while still being null at runtime until React attaches the element.
  const ref = useRef<HTMLDivElement>(null!);
  const visibleRef = useRef(false);
  const docVisibleRef = useRef(
    typeof document === "undefined" ? true : !document.hidden
  );

  // Step + interval
  useEffect(() => {
    let id: number | null = null;
    const start = () => {
      if (id != null) return;
      id = window.setInterval(() => {
        if (visibleRef.current && docVisibleRef.current) {
          setStep((s) => (s + 1) % steps);
        }
      }, intervalMs);
    };
    const stop = () => {
      if (id != null) {
        window.clearInterval(id);
        id = null;
      }
    };
    start();
    return stop;
  }, [steps, intervalMs]);

  // Visibility of host element
  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = !!entry?.isIntersecting;
      },
      { rootMargin: "0px", threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // Document visibility (background tab)
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVis = () => {
      docVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return { step, ref };
}
