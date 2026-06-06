"use client";

import { SocialIcon } from "./SocialIcons";
import { SOCIALS } from "./socials";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-ink-800/10 bg-ink-800 text-sakura-100">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-12 sm:px-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-brush text-2xl">零</span>
            <span className="text-sm font-semibold tracking-tight">
              John Paul Giftson
            </span>
          </div>
          <p className="mt-3 max-w-md text-sm text-sakura-100/65">
            An exhibition of work in data, design, and intelligent systems.
            Hand-built in Winnipeg, Manitoba.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <a
            href="mailto:johnpaul081023@gmail.com"
            data-hover
            className="text-sm font-medium tracking-tight underline decoration-sakura-100/30 underline-offset-4 hover:decoration-crimson"
          >
            johnpaul081023@gmail.com
          </a>
          <a
            href="tel:+19513070269"
            data-hover
            className="text-sm font-medium tracking-tight underline decoration-sakura-100/30 underline-offset-4 hover:decoration-crimson"
          >
            +1 (951) 307-0269
          </a>

          <ul className="mt-1 flex items-center gap-2">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-hover
                  aria-label={`${s.label} — ${s.handle}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-sakura-100/15 bg-sakura-100/5 text-sakura-100/80 transition hover:border-sakura-100/40 hover:bg-sakura-100/10 hover:text-sakura-100"
                >
                  <SocialIcon id={s.id} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-sakura-100/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-6 py-5 text-[11px] uppercase tracking-[0.22em] text-sakura-100/45 sm:flex-row sm:px-10">
          <span>© {new Date().getFullYear()} · 抜刀 Edition</span>
          <span className="font-brush text-xs normal-case tracking-normal text-sakura-100/55">
            零 · Hand-built in Winnipeg
          </span>
          <span>Made with deliberate slowness.</span>
        </div>
      </div>
    </footer>
  );
}
