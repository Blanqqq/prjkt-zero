"use client";

import Link from "next/link";

/**
 * V3 contender — placeholder while Stitch designs are landing.
 *
 * Lives alongside the museum version at /. The toggle in the nav links here.
 * Once Stitch generates mockups, this page is replaced with the new
 * composition. The case-study routes at /projects/[slug] are shared.
 */
export default function V3() {
  return (
    <main className="relative mx-auto flex min-h-[70vh] max-w-[1100px] flex-col items-center justify-center px-6 pt-32 pb-20 text-center sm:px-10">
      <div className="flex items-center gap-3">
        <span className="block h-px w-10 bg-ink-800/30" />
        <span className="heading-eyebrow">Contender · v3 · 構想中</span>
        <span className="block h-px w-10 bg-ink-800/30" />
      </div>

      <h1 className="heading-display mt-6 text-[clamp(56px,10vw,140px)] text-ink-800">
        Under design.
      </h1>

      <p className="mt-6 max-w-xl text-body">
        Same person. Same work. New skin. A second visual direction is being
        designed and will land here. The current museum experience stays at
        the home address.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          data-hover
          className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-3 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
        >
          ← Back to the museum
        </Link>
        <Link
          href="/projects/consensus"
          data-hover
          className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-3 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
        >
          Read a case study →
        </Link>
      </div>

      <div className="mt-16 w-full max-w-md rounded-2xl border border-ink-800/10 bg-white/55 p-5 text-left">
        <div className="heading-eyebrow">Design brief</div>
        <ul className="mt-3 space-y-2 text-sm text-ink-700/85">
          <li className="flex items-start gap-2">
            <span className="mt-2 block h-1 w-1 rounded-full bg-crimson" />
            <span>Locked: palette, kanji decoration, case-study spine, Recruiter Mode</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 block h-1 w-1 rounded-full bg-crimson" />
            <span>Open: typography, nav pattern, hero, katana display, project showcase, motion</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-2 block h-1 w-1 rounded-full bg-crimson" />
            <span>Goal: a contender, not a replacement</span>
          </li>
        </ul>
      </div>
    </main>
  );
}
