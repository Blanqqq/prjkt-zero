"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { JDMCar } from "./JDMCar";
import { PROJECTS } from "./projectsConfig";

/**
 * V2 Project Garage — a dark studio stage. Four cars on lit platforms, each
 * a doorway to its case-study page. The stage swap (sakura → black) reads as
 * "the museum has a back room for engineering" — intentional, not jarring.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="relative mx-auto mt-16 w-full max-w-[1400px] px-6 pb-12 sm:px-10"
    >
      {/* Stage — dark slab */}
      <div
        className="relative overflow-hidden rounded-[32px] border border-ink-800/40 px-6 py-12 sm:px-10 md:py-16"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #1A1A22 0%, #0C0C12 60%, #07070B 100%)",
          boxShadow:
            "0 60px 100px -50px rgba(17,17,17,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Stage atmosphere — spotlights from above */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-[10%] h-56 w-[35%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.16), transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[10%] h-56 w-[35%] rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(157,27,50,0.15), transparent 70%)" }}
        />

        {/* Heading */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-sakura-100/30" />
            <span className="heading-eyebrow text-sakura-100/55">
              Exhibition · Floor 02 — The Garage
            </span>
          </div>
          <div className="brush-behind mt-4 flex items-end gap-5">
            <span className="font-brush text-6xl leading-none text-sakura-100/85 sm:text-7xl">
              創
            </span>
            <h2
              className="heading-display text-[clamp(48px,8vw,108px)] text-sakura-100"
              style={{ textShadow: "0 30px 40px rgba(0,0,0,0.4)" }}
            >
              Project Garage
            </h2>
          </div>
          <p className="mt-4 max-w-xl text-[15px] leading-snug text-sakura-100/70">
            Each project is a machine. Built with precision. Tuned with passion.
            Driven by purpose.
          </p>
          <p className="mt-1 font-brush text-sm text-sakura-100/45">
            プロジェクトガレージ
          </p>
        </div>

        {/* Cars */}
        <div className="relative mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <CarBay project={p} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarBay({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.id}`}
      data-hover
      aria-label={`Open case study: ${project.name}`}
      className="group relative block overflow-hidden rounded-2xl border border-sakura-100/8 transition will-change-transform hover:-translate-y-0.5"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 50%, rgba(255,255,255,0.0) 100%)",
        boxShadow:
          "0 30px 50px -30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Bay header bar */}
      <div className="flex items-center justify-between border-b border-sakura-100/8 px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/55">
          Bay 0{index + 1}
        </span>
        <span className="font-brush text-xs text-sakura-100/45">
          {["創", "智", "走", "流"][index]}
        </span>
      </div>

      {/* Platform — car on a lit floor */}
      <div className="relative px-3 pt-4">
        {/* Floor light pool */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-2 h-8 rounded-full blur-md"
          style={{
            background: `radial-gradient(closest-side, ${project.liveryPrimary}60, transparent 70%)`,
          }}
        />
        <div className="relative">
          <JDMCar project={project} />
        </div>
        {/* Reflection — a faint, mirrored copy via CSS gradient */}
        <div
          aria-hidden
          className="mt-1 h-6 opacity-30"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Plate */}
      <div className="border-t border-sakura-100/8 px-5 pt-4 pb-5">
        <div className="flex items-baseline justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/45">
              {project.carYear} · {project.carModel}
            </div>
            <h3 className="mt-1 truncate text-xl font-semibold tracking-tight text-sakura-100">
              {project.name}
            </h3>
          </div>
          <span
            aria-hidden
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-sakura-100 transition group-hover:bg-crimson"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-[12px] text-sakura-100/65">
          {project.tagline}
        </p>

        {/* Tech pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.spec.engine
            .split("·")
            .slice(0, 4)
            .map((s) => (
              <span
                key={s.trim()}
                className="rounded-full border border-sakura-100/12 px-2 py-0.5 text-[10px] tracking-tight text-sakura-100/75"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {s.trim()}
              </span>
            ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-sakura-100/8 pt-3">
          <span className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/55">
            View project
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.22em] transition"
            style={{ color: project.liveryPrimary }}
          >
            Case study →
          </span>
        </div>
      </div>
    </Link>
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
