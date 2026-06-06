"use client";

import { motion } from "framer-motion";
import { usePortfolio } from "./PortfolioContext";

/**
 * Two-state pill toggle. Left = Exhibit (full cinematic), Right = Recruiter
 * (60-second resume view). Lives in the navbar.
 */
export function RecruiterToggle() {
  const { recruiter, toggleRecruiter, hydrated } = usePortfolio();

  return (
    <button
      data-hover
      onClick={toggleRecruiter}
      disabled={!hydrated}
      aria-pressed={recruiter}
      aria-label={`Switch to ${recruiter ? "Exhibit" : "Recruiter"} mode`}
      className="relative grid grid-cols-2 items-center gap-0 rounded-full border border-ink-800/15 bg-white/55 p-1 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-700/70 backdrop-blur-sm transition hover:border-ink-800/30"
    >
      <motion.span
        aria-hidden
        layout
        transition={{ type: "spring", stiffness: 500, damping: 36 }}
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-ink-800"
        style={{ left: recruiter ? "calc(50% + 0px)" : 4 }}
      />
      <span
        className={`relative z-10 px-3 py-1.5 transition-colors ${
          !recruiter ? "text-sakura-100" : "text-ink-700/70"
        }`}
      >
        Exhibit
      </span>
      <span
        className={`relative z-10 px-3 py-1.5 transition-colors ${
          recruiter ? "text-sakura-100" : "text-ink-700/70"
        }`}
      >
        Recruiter
      </span>
    </button>
  );
}
