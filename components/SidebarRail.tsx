"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePortfolio } from "./PortfolioContext";

/**
 * Left vertical icon rail — secondary nav, primarily a visual element.
 * Mirrors the section nav with minimal pictograms, a vertical kaizen mantra,
 * and a small wax-stamp at the bottom. Desktop only; hidden in Recruiter Mode.
 */
const ICONS: { id: string; label: string; path: string }[] = [
  {
    id: "education",
    label: "Education",
    path: "M3 9.5l9-5 9 5-9 5-9-5zM5 11v4l7 4 7-4v-4",
  },
  {
    id: "projects",
    label: "Projects",
    path: "M3 7h18M3 12h18M3 17h12",
  },
  {
    id: "experience",
    label: "Experience",
    path: "M4 7h16v12H4zM9 7V5h6v2M4 13h16",
  },
  {
    id: "skills",
    label: "Skills",
    path: "M14.7 6.3a4 4 0 11-5.4 5.4l-5.6 5.6 2 2 5.6-5.6a4 4 0 015.4-5.4z",
  },
  {
    id: "hobbies",
    label: "Hobbies",
    path: "M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z",
  },
  {
    id: "contact",
    label: "Contact",
    path: "M4 6h16v12H4zM4 6l8 7 8-7",
  },
];

export function SidebarRail() {
  const { recruiter, hydrated } = usePortfolio();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (recruiter) return;
    const targets = ICONS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!targets.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const v = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (v) setActive(v.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.1, 0.3, 0.5] }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [recruiter]);

  if (recruiter) return null;

  return (
    <aside
      aria-hidden={!hydrated}
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-full w-16 lg:block"
    >
      {/* Rail background — a sliver of warm paper */}
      <div
        className="pointer-events-auto relative flex h-full flex-col items-center justify-between border-r border-ink-800/8 py-6"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,240,244,0.65), rgba(255,228,236,0.45) 60%, rgba(255,220,231,0.55))",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Brand mark */}
        <a
          href="#top"
          data-hover
          aria-label="Back to top"
          className="grid h-9 w-9 place-items-center rounded-full border border-ink-800/15 bg-white/60 text-ink-800 transition hover:border-ink-800/30"
        >
          <span className="font-brush text-lg leading-none">零</span>
        </a>

        {/* Section icons */}
        <nav aria-label="Section rail" className="flex flex-col items-center gap-1.5">
          {ICONS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`/#${l.id}`}
                data-hover
                aria-current={isActive ? "location" : undefined}
                aria-label={l.label}
                title={l.label}
                className="group relative grid h-9 w-9 place-items-center rounded-xl transition"
              >
                {isActive && (
                  <motion.span
                    layoutId="rail-pill"
                    className="absolute inset-0 -z-10 rounded-xl bg-ink-800"
                    transition={{ type: "spring", stiffness: 500, damping: 36 }}
                  />
                )}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition ${isActive ? "text-sakura-100" : "text-ink-700/65 group-hover:text-ink-800"}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={l.path} />
                </svg>
              </a>
            );
          })}
        </nav>

        {/* Kaizen vertical text */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="font-brush text-[11px] leading-[1.4] tracking-[0.18em] text-ink-700/60"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            改善を続ける
          </div>
          <span className="block h-6 w-px bg-ink-800/15" />
          {/* Wax seal */}
          <span
            className="grid h-6 w-6 place-items-center rounded-sm font-brush text-[10px] leading-none text-sakura-100"
            style={{
              background:
                "radial-gradient(circle at 35% 25%, #c8253f 0%, #8b1428 60%, #5a0c19 100%)",
              boxShadow:
                "0 1px 1px rgba(17,17,17,0.25), inset 0 1px 1px rgba(255,255,255,0.2)",
            }}
            aria-hidden
          >
            零
          </span>
        </div>
      </div>
    </aside>
  );
}
