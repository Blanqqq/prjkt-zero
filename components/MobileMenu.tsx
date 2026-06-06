"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Mobile menu drawer. Same link list as the desktop nav, rendered as a
 * full-bleed sheet so the museum palette doesn't break on small screens.
 * Closes on link tap, on Escape, and on outside click.
 */
type Link = { id: string; label: string };

export function MobileMenu({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        data-hover
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-full border border-ink-800/15 bg-white/55 text-ink-800 transition hover:border-ink-800/30 lg:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-800/30 backdrop-blur-md lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
        {open && (
          <motion.nav
            key="sheet"
            id="mobile-menu"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-20 z-50 origin-top rounded-3xl border border-ink-800/10 bg-sakura-100/95 p-6 shadow-[0_40px_60px_-30px_rgba(17,17,17,0.4)] backdrop-blur-xl lg:hidden"
            aria-label="Site navigation"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="heading-eyebrow">Wings of the museum</span>
              <span className="font-brush text-sm text-ink-700/55">案内</span>
            </div>
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`/#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between rounded-2xl px-3 py-3 text-lg font-medium tracking-tight text-ink-800 transition hover:bg-white/55"
                  >
                    <span>{l.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/45">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-ink-800/10 pt-4">
              <a
                href="mailto:johnpaul081023@gmail.com"
                className="block w-full rounded-full bg-ink-800 px-5 py-3 text-center text-sm font-medium tracking-tight text-sakura-100"
                onClick={() => setOpen(false)}
              >
                Hire Me · johnpaul081023@gmail.com
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
