"use client";

import { useEffect, useState } from "react";

const LINES = [
  "Domain Expansion: Merge Conflict.",
  "Nah, I'd deploy.",
  "It works on my machine.",
  "git push origin main — and pray.",
  "Stand proud. You're strong. (You closed the PR.)",
  "ssh-keygen of the void.",
  "The katana is the for-loop.",
];

/**
 * Konami-code easter egg. ↑↑↓↓←→←→ B A toggles a tiny scroll that quotes a
 * random line from LINES. Hidden behind keyboard discovery — visitors who
 * spam the page won't see it. Stored in sessionStorage so it doesn't spam.
 */
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState("");

  useEffect(() => {
    // Discoverable hint for the curious — show only once per device.
    try {
      if (!window.localStorage.getItem("pz_console_hint")) {
        // eslint-disable-next-line no-console
        console.log(
          "%c零 · prjkt zero\n%cYou're early. Try ↑ ↑ ↓ ↓ ← → ← → B A on any page.",
          "font: 600 14px/1.2 ui-serif, serif; color:#9D1B32;",
          "font: 400 12px/1.4 ui-monospace, monospace; color:#111;"
        );
        window.localStorage.setItem("pz_console_hint", "1");
      }
    } catch {
      // ignore
    }

    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const want = SEQUENCE[idx]?.toLowerCase();
      const got = e.key.toLowerCase();
      if (got === want) {
        idx++;
        if (idx === SEQUENCE.length) {
          setLine(LINES[Math.floor(Math.random() * LINES.length)]);
          setOpen(true);
          idx = 0;
        }
      } else if (got === SEQUENCE[0].toLowerCase()) {
        idx = 1;
      } else {
        idx = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Auto-dismiss after 6s so it never gets stuck on screen
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setOpen(false), 6000);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-live="polite"
      className="pointer-events-auto fixed bottom-6 left-1/2 z-[60] -translate-x-1/2"
    >
      <button
        data-hover
        onClick={() => setOpen(false)}
        className="washi-card flex items-center gap-3 px-5 py-3"
        style={{ borderRadius: 999 }}
      >
        <span className="font-brush text-base text-crimson">秘</span>
        <span className="font-brush text-sm tracking-tight text-ink-800">
          {line}
        </span>
        <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
          tap to dismiss
        </span>
      </button>
    </div>
  );
}
