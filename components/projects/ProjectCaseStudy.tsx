"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AIMockup } from "../mockups/AIMockup";
import { BrowserMockup } from "../mockups/BrowserMockup";
import { PhoneMockup } from "../mockups/PhoneMockup";
import { WorkflowMockup } from "../mockups/WorkflowMockup";
import { usePortfolio } from "../PortfolioContext";
import { JDMCar } from "./JDMCar";
import { StatusPill } from "./Projects";
import { PROJECTS, type Project } from "./projectsConfig";

/**
 * Apple-style product page for one project. Order:
 *   1. Garage hero (the car)
 *   2. Tagline + overview
 *   3. Interactive mockup
 *   4. Problem · Approach · Solution
 *   5. Outcomes (metrics grid)
 *   6. Tech breakdown
 *   7. Development journey
 *   8. Technical challenges
 *   9. Lessons learned · Future improvements
 *  10. GitHub / Demo (last, intentionally)
 *
 * Honors recruiter mode by suppressing the cinematic mockup header and
 * collapsing the long-form prose into a tighter brief.
 */
export function ProjectCaseStudy({ project }: { project: Project }) {
  const { recruiter } = usePortfolio();

  return (
    <main className="relative">
      <article className="mx-auto max-w-[1280px] px-6 pb-24 pt-28 sm:px-10 md:pt-32">
        {/* Breadcrumb */}
        <div className="mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-ink-700/55">
          <Link href="/#projects" data-hover className="hover:text-ink-800">
            ← The Garage
          </Link>
          <span className="block h-px w-8 bg-ink-800/15" />
          <span>Case · {project.carModel}</span>
        </div>

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="heading-eyebrow">
                {project.carModel} · {project.carYear}
              </span>
              <StatusPill status={project.status} />
            </div>
            <h1 className="brush-behind heading-display mt-4 text-[clamp(48px,8vw,112px)] text-ink-800">
              {project.name}
            </h1>
            <p className="mt-6 max-w-xl text-[clamp(18px,1.7vw,22px)] leading-snug text-ink-700/80">
              {project.tagline}
            </p>
            {!recruiter && (
              <p className="mt-4 max-w-xl text-body">{project.story}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={project.links.demo || "#mockup"}
                data-hover
                className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-2.5 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
              >
                See it in action ↓
              </a>
              <a
                href="#case-study"
                data-hover
                className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-2.5 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
              >
                Read the case study
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="washi-card grid gap-3 p-5 sm:grid-cols-2">
              <SpecMini label="Engine" value={project.spec.engine} mono />
              <SpecMini label="Horsepower" value={project.spec.horsepower} mono />
              <SpecMini label="Top Speed" value={project.spec.topSpeed} mono />
              <SpecMini label="Track" value={project.spec.track} />
            </div>
            <div className="mt-6">
              <JDMCar project={project} />
            </div>
          </div>
        </motion.section>

        {/* MOCKUP */}
        <section id="mockup" className="mt-24 scroll-mt-24 md:mt-32">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <div className="heading-eyebrow">Interactive Preview</div>
              <h2 className="heading-display mt-2 text-[clamp(28px,3.4vw,44px)] text-ink-800">
                Use the product, not the README.
              </h2>
            </div>
            <span className="font-brush text-xl text-ink-800/40">体験</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="washi-card relative overflow-hidden p-6 sm:p-10"
          >
            {project.mockup === "browser" && <BrowserMockup />}
            {project.mockup === "ai" && <AIMockup />}
            {project.mockup === "phone" && <PhoneMockup />}
            {project.mockup === "workflow" && <WorkflowMockup />}
          </motion.div>
        </section>

        {/* CASE STUDY */}
        <section id="case-study" className="mt-24 scroll-mt-24 md:mt-32">
          <div className="heading-eyebrow">Case Study</div>
          <h2 className="heading-display mt-2 text-[clamp(34px,5vw,64px)] text-ink-800">
            From problem to outcome.
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Block label="01 · Problem" className="lg:col-span-6">
              <p className="text-body">{project.caseStudy.problem}</p>
            </Block>
            <Block label="02 · Approach" className="lg:col-span-6">
              <ul className="space-y-2.5">
                {project.caseStudy.approach.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-body">
                    <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="mt-16">
            <Block label="03 · Solution">
              <p className="max-w-3xl text-body">{project.caseStudy.solution}</p>
            </Block>
          </div>

          {/* Outcomes */}
          <div className="mt-16">
            <Block label="04 · Outcomes">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                {project.caseStudy.outcomes.map((o, i) => (
                  <motion.div
                    key={o.k}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.55, delay: i * 0.05 }}
                    className="washi-card p-5"
                  >
                    <div className="heading-eyebrow">{o.k}</div>
                    <div className="mt-1 text-3xl font-semibold tracking-tight text-ink-800">
                      {o.v}
                    </div>
                    {o.note && (
                      <div className="mt-1 text-[11px] text-ink-700/55">{o.note}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </Block>
          </div>

          {/* Tech breakdown */}
          <div className="mt-16">
            <Block label="05 · Technical Breakdown">
              <div className="washi-card p-2">
                <ul className="divide-y divide-ink-800/8">
                  {project.caseStudy.techBreakdown.map((t) => (
                    <li
                      key={t.layer}
                      className="grid gap-3 px-4 py-3 sm:grid-cols-12"
                    >
                      <div className="text-sm font-semibold tracking-tight text-ink-800 sm:col-span-3">
                        {t.layer}
                      </div>
                      <div className="font-mono text-[12px] text-ink-700/85 sm:col-span-9">
                        {t.items}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Block>
          </div>

          {/* Journey */}
          <div className="mt-16">
            <Block label="06 · Development Journey">
              <ol className="relative">
                <div className="absolute left-[14px] top-2 bottom-2 w-px bg-ink-800/15" />
                {project.caseStudy.journey.map((j) => (
                  <li key={j.date} className="relative pb-6 pl-10 last:pb-0">
                    <span className="absolute left-[7px] top-1 grid h-4 w-4 place-items-center rounded-full bg-sakura-100 ring-1 ring-ink-800/30">
                      <span className="block h-1.5 w-1.5 rounded-full bg-crimson" />
                    </span>
                    <div className="text-[11px] uppercase tracking-[0.22em] text-ink-700/55">
                      {j.date}
                    </div>
                    <div className="mt-0.5 text-sm text-ink-800">{j.milestone}</div>
                  </li>
                ))}
              </ol>
            </Block>
          </div>

          {/* Challenges */}
          <div className="mt-16">
            <Block label="07 · Technical Challenges">
              <div className="grid gap-4 md:grid-cols-3">
                {project.caseStudy.challenges.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="washi-card p-5"
                  >
                    <div className="font-brush text-xs text-crimson">
                      問題 0{i + 1}
                    </div>
                    <h4 className="mt-1 text-base font-semibold tracking-tight text-ink-800">
                      {c.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-700/85">
                      {c.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Block>
          </div>

          {/* Lessons + Future */}
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <Block label="08 · Lessons Learned">
              <ul className="space-y-2.5">
                {project.caseStudy.lessons.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-body">
                    <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block label="09 · Future Improvements">
              <ul className="space-y-2.5">
                {project.caseStudy.future.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-body">
                    <span className="mt-3 block h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* Links — LAST */}
          <div className="mt-20">
            <Block label={`10 · ${linkLabel(project.links)}`}>
              <div className="washi-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="text-lg font-semibold tracking-tight text-ink-800">
                    Want to go deeper?
                  </h4>
                  <p className="mt-1 text-sm text-ink-700/70">
                    {linkSubtitle(project.links)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-hover
                      className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-2.5 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.links.writeup && (
                    <a
                      href={project.links.writeup}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-hover
                      className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-2.5 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
                    >
                      Long-form writeup ↗
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-hover
                      className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-5 py-2.5 text-sm font-medium tracking-tight text-ink-800 transition hover:border-ink-800/30"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="currentColor"
                        aria-hidden
                      >
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.55v-1.93c-3.2.69-3.88-1.55-3.88-1.55-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.13v3.16c0 .31.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                      </svg>
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </Block>
          </div>
        </section>

        {/* Next project */}
        <NextProject currentId={project.id} />
      </article>
    </main>
  );
}

function linkLabel(links: Project["links"]) {
  const parts: string[] = [];
  if (links.github) parts.push("Source");
  if (links.demo) parts.push("Demo");
  if (links.writeup) parts.push("Writeup");
  return parts.join(" & ") || "Source";
}

function linkSubtitle(links: Project["links"]) {
  if (links.demo && links.writeup) return "Code, live demo, and writeup — opened in a new tab.";
  if (links.demo) return "Code and a live demo — opened in a new tab.";
  if (links.writeup) return "Code and a long-form writeup — opened in a new tab.";
  return "Read the code on GitHub — opens in a new tab.";
}

function SpecMini({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl bg-white/40 p-3">
      <div className="heading-eyebrow">{label}</div>
      <div
        className={`mt-1 text-[12px] leading-snug text-ink-800 ${mono ? "font-mono" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}

function Block({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div className="heading-eyebrow">{label}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function NextProject({ currentId }: { currentId: string }) {
  const idx = PROJECTS.findIndex((p) => p.id === currentId);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return (
    <section className="mt-24 border-t border-ink-800/10 pt-10 md:mt-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="heading-eyebrow">Next exhibit</div>
          <h3 className="heading-display mt-2 text-[clamp(28px,3.4vw,44px)] text-ink-800">
            {next.name}
          </h3>
          <p className="mt-1 text-sm text-ink-700/70">
            {next.carModel} · {next.tagline}
          </p>
        </div>
        <Link
          href={`/projects/${next.id}`}
          data-hover
          className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-3 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
        >
          Walk into the next garage →
        </Link>
      </div>
    </section>
  );
}
