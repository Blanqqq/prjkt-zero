"use client";

import { useEffect, useState } from "react";

/**
 * Bottom of the page, above the footer. A subtle ribbon that surfaces some
 * of the personality buried elsewhere on the site — a terminal whoami, two
 * curated quotes, and a Konami detector that lights up after the cheat code.
 * Hidden in Recruiter Mode by AppFrame.
 */
export function EasterEggRibbon() {
  const [konamiArmed, setKonamiArmed] = useState(false);
  const [foundCat, setFoundCat] = useState(false);

  // Mirror the Konami listener with a state flag for the ribbon.
  useEffect(() => {
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
          setKonamiArmed(true);
          idx = 0;
        }
      } else if (got === SEQ[0].toLowerCase()) idx = 1;
      else idx = 0;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      aria-label="Easter eggs"
      className="relative mx-auto mt-16 max-w-[1400px] px-6 pb-12 sm:px-10"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Terminal */}
        <div
          className="rounded-2xl border border-ink-800/15 p-4 font-mono text-[12px] leading-relaxed"
          style={{
            background:
              "linear-gradient(180deg, #16161B, #0B0B10)",
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
            <span className="ml-auto text-base">💀</span>
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

        {/* Konami / brainrot */}
        <div
          className="relative rounded-2xl border p-4 transition"
          style={{
            background: konamiArmed
              ? "linear-gradient(180deg, rgba(157,27,50,0.18), rgba(157,27,50,0.05))"
              : "rgba(255,255,255,0.55)",
            borderColor: konamiArmed
              ? "rgba(157,27,50,0.4)"
              : "rgba(17,17,17,0.1)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              data-hover
              onClick={() => setFoundCat((v) => !v)}
              className="text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🐾</span>
                <span className="text-xs font-semibold tracking-tight text-ink-800">
                  {foundCat ? "You found the cat!" : "Did you find the cat?"}
                </span>
              </div>
              <div className="mt-1 text-[11px] text-ink-700/70">
                Domain Expansion: <span className="font-mono">Merge Conflict</span>
              </div>
            </button>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
              {konamiArmed ? "Brainrot protocol unlocked" : "Konami code · armed?"}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-ink-700/55">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </span>
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
    </section>
  );
}
