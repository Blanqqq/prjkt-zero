"use client";

import { SocialIcon } from "./SocialIcons";
import { SOCIALS } from "./socials";

/**
 * Footer — dark museum hand-off. Three columns at desktop, stacks on mobile.
 * Tightened to feel of a piece with the v2 ribbon directly above it: shared
 * brush mark, vertical mantra, consistent eyebrow taxonomy.
 */
export function Footer() {
  return (
    <footer className="relative border-t border-ink-800/10 bg-ink-800 text-sakura-100">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-14 sm:px-10 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span
              className="grid h-9 w-9 place-items-center rounded-full border border-sakura-100/15"
              aria-hidden
            >
              <span className="font-brush text-lg leading-none">零</span>
            </span>
            <div>
              <div className="text-sm font-semibold tracking-tight">
                John Paul Giftson
              </div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-sakura-100/45">
                Exhibition · 2026 Edition
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-sakura-100/65">
            An exhibition of work in data, design, and intelligent systems.
            Hand-built in Winnipeg, Manitoba.
          </p>
        </div>

        {/* Direct */}
        <div className="md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-sakura-100/45">
            Direct
          </div>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href="mailto:johnpaul081023@gmail.com"
                data-hover
                className="text-sm font-medium tracking-tight text-sakura-100/90 transition hover:text-sakura-100"
              >
                johnpaul081023@gmail.com
              </a>
            </li>
            <li>
              <a
                href="tel:+19513070269"
                data-hover
                className="text-sm font-medium tracking-tight text-sakura-100/90 transition hover:text-sakura-100"
              >
                +1 (951) 307-0269
              </a>
            </li>
          </ul>
        </div>

        {/* Elsewhere */}
        <div className="md:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-sakura-100/45">
            Elsewhere
          </div>
          <ul className="mt-4 flex flex-col gap-2">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-hover
                  aria-label={`${s.label} — ${s.handle}`}
                  className="group flex items-center gap-3 rounded-xl border border-sakura-100/8 bg-sakura-100/[0.03] px-3 py-2 transition hover:border-sakura-100/20 hover:bg-sakura-100/[0.06]"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sakura-100/10 text-sakura-100/85 transition group-hover:text-sakura-100">
                    <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium tracking-tight">
                      {s.label}
                    </span>
                    <span className="block font-mono text-[10px] text-sakura-100/45">
                      {s.handle}
                    </span>
                  </span>
                  <span className="ml-auto text-[10px] uppercase tracking-[0.22em] text-sakura-100/40 transition group-hover:text-sakura-100/70">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Closing rail */}
      <div className="border-t border-sakura-100/8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 text-[10px] uppercase tracking-[0.28em] text-sakura-100/40 sm:flex-row sm:px-10">
          <span>© {new Date().getFullYear()} · 抜刀 Edition</span>
          <span className="font-brush text-xs normal-case tracking-normal text-sakura-100/55">
            改善を続ける · keep improving
          </span>
          <span>Hand-built · Winnipeg, MB</span>
        </div>
      </div>
    </footer>
  );
}
