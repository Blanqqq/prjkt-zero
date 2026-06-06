"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { JDMCar } from "./JDMCar";
import { PROJECTS } from "./projectsConfig";

/**
 * Garage entrance — four cars on a row. Each card is a teaser that opens
 * the dedicated case-study page. No tabs, no inline spec sheet: the goal
 * is to *invite* the visitor into a project, not give them everything at once.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 02"
        kanji="創"
        title="The Garage"
        sub="Four builds, four lessons. Each car is a doorway — step inside for the case study."
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/projects/${p.id}`}
              data-hover
              className="washi-card group relative block overflow-hidden p-6 transition will-change-transform hover:-translate-y-0.5 sm:p-8"
              aria-label={`Open case study: ${p.name}`}
            >
              {/* Door frame — top stripe in livery color */}
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1"
                style={{
                  background: `linear-gradient(90deg, transparent, ${p.liveryAccent}, ${p.liveryPrimary}, transparent)`,
                }}
              />

              {/* Header row */}
              <div className="flex items-baseline justify-between">
                <span className="heading-eyebrow">
                  Bay 0{i + 1} · {p.carYear}
                </span>
                <span className="font-brush text-xs text-ink-700/55">
                  {["創", "智", "走", "流"][i]}
                </span>
              </div>

              <div className="mt-1 text-sm text-ink-700/65">{p.carModel}</div>

              <h3 className="heading-display mt-3 text-[clamp(28px,3.4vw,44px)] text-ink-800">
                {p.name}
              </h3>
              <p className="mt-2 max-w-md text-sm text-ink-700/80">{p.tagline}</p>

              {/* Car render */}
              <div className="relative mt-4">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
                  style={{
                    background: `radial-gradient(closest-side, ${p.liveryPrimary}33, transparent 70%)`,
                  }}
                />
                <JDMCar project={p} />
              </div>

              {/* Mini-spec strip */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Mini label="Engine" value={shortEngine(p.spec.engine)} />
                <Mini label="HP" value={shortFirst(p.spec.horsepower)} />
                <Mini label="Top Speed" value={shortFirst(p.spec.topSpeed)} />
              </div>

              {/* CTA */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-ink-700/55">
                  Enter garage
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-3.5 py-1.5 text-xs font-medium tracking-tight text-sakura-100 transition group-hover:bg-crimson">
                  Open case study
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              {/* Decorative brush whisper */}
              <svg
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-6 h-32 w-32 opacity-[0.05]"
                viewBox="0 0 200 200"
              >
                <path
                  d="M20 120 C 60 60, 120 160, 180 80"
                  stroke="#111"
                  strokeWidth="22"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function shortEngine(s: string) {
  return s.split("·")[0].trim();
}
function shortFirst(s: string) {
  return s.split("·")[0].trim();
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/40 p-2.5">
      <div className="heading-eyebrow">{label}</div>
      <div className="mt-0.5 text-[12px] font-medium tracking-tight text-ink-800">
        {value}
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  kanji,
  title,
  sub,
}: {
  eyebrow: string;
  kanji: string;
  title: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="block h-px w-10 bg-ink-800/30" />
        <span className="heading-eyebrow">{eyebrow}</span>
      </div>
      <div className="brush-behind mt-4 flex items-end gap-5">
        <span className="font-brush text-6xl leading-none text-ink-800/85 sm:text-7xl">
          {kanji}
        </span>
        <h2 className="heading-display text-[clamp(48px,8vw,120px)] text-ink-800">
          {title}
        </h2>
      </div>
      {sub && <p className="mt-4 max-w-xl text-body">{sub}</p>}
    </div>
  );
}
