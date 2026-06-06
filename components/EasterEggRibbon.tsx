"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Bottom-of-page ribbon — terminal whoami, two quotes, Konami detector.
 *
 * Now Konami-gated: nothing renders until the user enters the sequence
 * `↑ ↑ ↓ ↓ ← → ← → B A`. After that, the unlock persists for the session
 * (sessionStorage) so it doesn't disappear on the next nav. A small dismiss
 * button is provided so a recruiter who lands mid-session can hide it again.
 */
export function EasterEggRibbon() {
  const [unlocked, setUnlocked] = useState(false);

  // Sequence detection + persistence
  useEffect(() => {
    try {
      if (sessionStorage.getItem("pz_ribbon_unlocked") === "1") {
        setUnlocked(true);
      }
    } catch {}

    const SEQ = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
      "b", "a",
    ];
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const want = SEQ[idx]?.toLowerCase();
      const got = e.key.toLowerCase();
      if (got === want) {
        idx++;
        if (idx === SEQ.length) {
          setUnlocked(true);
          try {
            sessionStorage.setItem("pz_ribbon_unlocked", "1");
          } catch {}
          idx = 0;
        }
      } else if (got === SEQ[0].toLowerCase()) idx = 1;
      else idx = 0;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.section
          key="ribbon"
          initial={{ opacity: 0, y: 16, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 12, height: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Hidden content unlocked"
          className="relative mx-auto mt-12 max-w-[1400px] px-6 pb-12 sm:px-10"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-brush text-base text-crimson">秘</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-ink-700/55">
                Sequence unlocked · the hidden floor
              </span>
            </div>
            <button
              type="button"
              data-hover
              onClick={() => {
                setUnlocked(false);
                try {
                  sessionStorage.removeItem("pz_ribbon_unlocked");
                } catch {}
              }}
              className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55 transition hover:text-ink-800"
              aria-label="Hide hidden content"
            >
              Dismiss
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Terminal */}
            <div
              className="rounded-2xl border border-ink-800/15 p-4 font-mono text-[12px] leading-relaxed"
              style={{
                background: "linear-gradient(180deg, #16161B, #0B0B10)",
                boxShadow: "0 20px 40px -20px rgba(17,17,17,0.35)",
              }}
            >
              <div className="flex items-center gap-2 border-b border-sakura-100/10 pb-2">
                <span className="flex gap-1">
                  <span className="block h-2 w-2 rounded-full bg-[#FF5F57]" />
                  <span className="block h-2 w-2 rounded-full bg-[#FEBC2E]" />
                  <span className="block h-2 w-2 rounded-full bg-[#28C840]" />
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/50">
                  zsh — 80×20
                </span>
              </div>
              <div className="mt-3 text-sakura-100/85">
                <span className="text-[#28C840]">$</span>{" "}
                <span className="text-sakura-100/55">whoami</span>
              </div>
              <div className="text-sakura-100/85">
                <span className="text-[#28C840]">&gt;</span>{" "}
                <span>builder.of.things</span>
              </div>
              <div className="mt-1 text-sakura-100/45">
                <span className="text-[#28C840]">$</span>{" "}
                <span className="inline-block animate-pulse">_</span>
              </div>
            </div>

            {/* Quote 1 */}
            <figure className="rounded-2xl border border-ink-800/10 bg-white/55 p-4 backdrop-blur-sm">
              <blockquote className="font-brush text-sm leading-snug text-ink-800/90">
                Simplicity is the ultimate sophistication.
              </blockquote>
              <figcaption className="mt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
                  Leonardo da Vinci
                </span>
                <span className="block h-px w-6 bg-ink-800/20" />
              </figcaption>
            </figure>

            {/* Domain Expansion */}
            <div
              className="rounded-2xl border p-4"
              style={{
                background:
                  "linear-gradient(180deg, rgba(157,27,50,0.16), rgba(157,27,50,0.04))",
                borderColor: "rgba(157,27,50,0.35)",
                backdropFilter: "blur(6px)",
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🐾</span>
                <span className="text-xs font-semibold tracking-tight text-ink-800">
                  Domain Expansion
                </span>
              </div>
              <div className="mt-1 font-mono text-[11px] text-ink-800/80">
                Merge Conflict
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
                — JJK fan tax paid
              </div>
            </div>

            {/* Quote 2 */}
            <figure className="rounded-2xl border border-ink-800/10 bg-white/55 p-4 backdrop-blur-sm">
              <blockquote className="font-brush text-sm leading-snug text-ink-800/90">
                First, solve the problem. Then, write the code.
              </blockquote>
              <figcaption className="mt-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
                  John Johnson
                </span>
                <span className="block h-px w-6 bg-ink-800/20" />
              </figcaption>
            </figure>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
