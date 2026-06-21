"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "../motion/Reveal";
import { SectionHeading, StatusPill } from "../projects/Projects";
import { PROJECTS } from "../projects/projectsConfig";

/**
 * V3 project showcase — editorial artifacts (replaces the dark "Garage", audit
 * A7). Content leads: each card opens on its headline OUTCOME, then name,
 * tagline, and tech. The JDM wireframe-on-black car is kept (per brief) but
 * subordinate — contained in a slim dark strip so it composites correctly and
 * never upstages the work. Light sakura washi surface, not a black slab.
 */
export function ProjectsV3() {
  return (
    <section
      id="projects"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 02"
        kanji="創"
        title="Selected Work"
        sub="Four builds. Each opens on its result; the case study is the exhibit behind it."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {PROJECTS.map((project, i) => {
          const lead = project.caseStudy.outcomes[0];
          const tech = project.spec.engine
            .split("·")
            .slice(0, 4)
            .map((s) => s.trim());

          return (
            <Reveal key={project.id} as="div" delay={i * 70}>
              <Link
                href={`/projects/${project.id}`}
                data-hover
                aria-label={`Case study: ${project.name}`}
                className="washi-card group block h-full overflow-hidden transition duration-300 will-change-transform hover:-translate-y-1 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-800/40 focus-visible:ring-offset-2 focus-visible:ring-offset-sakura-200"
              >
                {/* Contained car strip — wireframe-on-black, so a dark home */}
                <div className="cinema-frame relative aspect-[16/7] overflow-hidden bg-[#06060A]">
                  {project.carImageSrc && (
                    <Image
                      src={project.carImageSrc}
                      alt={project.carModel}
                      fill
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="cinema-img object-contain p-4 transition duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  <div className="absolute left-4 top-4 z-10">
                    <StatusPill status={project.status} dark />
                  </div>
                  <span className="absolute bottom-3 right-4 z-10 text-[10px] uppercase tracking-[0.22em] text-sakura-100/55">
                    {project.carModel}
                  </span>
                </div>

                {/* Content — leads with the outcome */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="heading-display text-[clamp(36px,4.4vw,56px)] text-ink-800">
                      {lead.v}
                    </span>
                    <span className="max-w-[130px] text-[11px] uppercase leading-tight tracking-[0.2em] text-ink-700/60">
                      {lead.k}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink-800">
                    {project.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-700/80">
                    {project.tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink-800/12 bg-white/55 px-2.5 py-0.5 font-mono text-[10px] tracking-tight text-ink-700/75"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-medium tracking-tight text-ink-800">
                    <span>Case study</span>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-ink-800 text-sakura-100 transition group-hover:bg-crimson">
                      <svg viewBox="0 0 24 24" className="h-3 w-3 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
