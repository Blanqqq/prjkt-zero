"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * SSR-safe, reduced-motion-first scroll reveal.
 *
 * Why not framer-motion here: framer renders `initial={{ opacity: 0 }}` into the
 * server HTML, so content is invisible until JS hydrates (audit A2), and the
 * entrance ignores prefers-reduced-motion unless every call site opts in (A3).
 *
 * This primitive ships the element VISIBLE by default. The hidden
 * pre-animation state is scoped (in globals.css) to `.js-reveal` on <html>,
 * a class added by an inline script in the root layout *before* first paint.
 * The result:
 *   - no JS / crawlers       → fully visible, no flash, real LCP
 *   - prefers-reduced-motion → forced visible (globals.css), no transform
 *   - JS enabled             → hidden at first paint, transitions in on scroll
 *
 * One shared IntersectionObserver services every instance (cf. audit A6's note
 * on observer sprawl).
 */

let observer: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
  }
  return observer;
}

type RevealProps = {
  /** Element to render. Defaults to a div. */
  as?: ElementType;
  /** Entrance delay in ms (becomes transition-delay). */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const io = sharedObserver();
    if (!el || !io) return;
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return createElement(
    as,
    {
      ref,
      "data-reveal": "",
      className,
      style: delay ? { ...style, transitionDelay: `${delay}ms` } : style,
    },
    children
  );
}
