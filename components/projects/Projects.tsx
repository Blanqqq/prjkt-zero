"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { JDMCar } from "./JDMCar";
import { PROJECTS, type ProjectStatus } from "./projectsConfig";

export function StatusPill({
  status,
  dark = false,
}: {
  status: ProjectStatus;
  dark?: boolean;
}) {
  // One dot color per kind — green = live, amber = in-dev, cyan = client, grey = prototype
  const dot =
    status.kind === "live"
      ? "#28C840"
      : status.kind === "research"
        ? "#E8A53A"
        : status.kind === "client"
          ? "#55D6FF"
          : "#A0A4AD";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.18em] ${
        dark
          ? "border-sakura-100/15 bg-white/[0.04] text-sakura-100/80"
          : "border-ink-800/15 bg-white/55 text-ink-700/75"
      }`}
    >
      <span
        aria-hidden
        className={`block h-1.5 w-1.5 rounded-full ${status.kind === "live" ? "animate-pulse" : ""}`}
        style={{ background: dot, boxShadow: `0 0 6px ${dot}` }}
      />
      {status.label}
    </span>
  );
}

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
      {/* Stage — dark slab. data-dark-section signals SakuraPetals to fade. */}
      <div
        data-dark-section
        className="relative overflow-hidden rounded-[28px] border border-ink-800/40 px-6 py-12 sm:px-10 md:py-14"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, #14141A 0%, #0A0A10 60%, #06060A 100%)",
          boxShadow:
            "0 40px 80px -45px rgba(17,17,17,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Single restrained overhead wash — was two competing spotlights */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[60%] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent 70%)" }}
        />

        {/* Heading — typographic, brush kanji removed from header line */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-sakura-100/30" />
            <span className="heading-eyebrow text-sakura-100/75">
              Exhibition · Floor 02 — The Garage
            </span>
          </div>
          <h2 className="heading-display mt-4 text-[clamp(44px,7vw,96px)] text-sakura-100">
            Project Garage
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-snug text-sakura-100/75">
            Four builds, four lessons. Each car is a doorway into the case study.
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
      className="group relative block overflow-hidden rounded-2xl border border-sakura-100/8 transition-all duration-300 will-change-transform hover:-translate-y-1.5 hover:shadow-[0_40px_60px_-30px_rgba(0,0,0,0.7)]"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 50%, rgba(255,255,255,0.0) 100%)",
        boxShadow:
          "0 30px 50px -30px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Bay header bar */}
      <div className="flex items-center justify-between border-b border-sakura-100/8 px-4 py-2.5">
        <span className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/75">
          Bay 0{index + 1}
        </span>
        <StatusPill status={project.status} dark />
      </div>

      {/* Platform — car on a quieter floor */}
      <div className="relative px-3 pt-3">
        {/* Floor light pool removed; the bay backplate now does the lighting */}
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
            <div className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/70">
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
          <span className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/75">
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
