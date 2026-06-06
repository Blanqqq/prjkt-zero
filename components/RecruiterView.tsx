"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PROJECTS } from "./projects/projectsConfig";
import { SocialIcon } from "./SocialIcons";
import { SOCIALS } from "./socials";

/**
 * Recruiter mode — the 60-second resume scan. Everything a hiring manager
 * needs is above the fold or one short scroll away. No cinematic motion,
 * minimal decoration, dense but readable. Section ids mirror the full
 * homepage so the nav still works.
 */
export function RecruiterView() {
  return (
    <main className="relative mx-auto w-full max-w-[1100px] px-6 pt-28 pb-24 sm:px-10">
      {/* SUMMARY */}
      <section id="summary" className="scroll-mt-24">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-ink-800/30" />
            <span className="heading-eyebrow">Resume · 60s read</span>
          </div>
          <button
            type="button"
            data-hover
            data-print-hide
            onClick={() => typeof window !== "undefined" && window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-700/70 transition hover:border-ink-800/30 hover:text-ink-800"
            aria-label="Download resume as PDF"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12" />
              <path d="M7 10l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            Download PDF
          </button>
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="heading-display mt-4 text-[clamp(40px,6vw,80px)] text-ink-800"
        >
          John Paul Giftson
        </motion.h1>
        <p className="mt-3 max-w-2xl text-body">
          3rd-year B.Sc. in <strong>AI &amp; Machine Learning Engineering</strong> at
          the University of Manitoba. Comfortable across the stack: data pipelines,
          ML fundamentals, BI dashboards, and the operational side that comes from
          running my own service business.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Pill k="Email" v="johnpaul081023@gmail.com" href="mailto:johnpaul081023@gmail.com" />
          <Pill k="Phone" v="+1 (951) 307-0269" href="tel:+19513070269" />
          <Pill k="Based" v="Winnipeg, MB" />
          <Pill k="Status" v="Open · AI / ML / Data" />
        </div>

        {/* Socials */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {SOCIALS.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              data-hover
              className="group inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-3 py-1.5 text-[12px] text-ink-800 transition hover:border-ink-800/30"
              aria-label={`${s.label} — ${s.handle}`}
            >
              <SocialIcon id={s.id} className="h-3.5 w-3.5 text-ink-800 transition group-hover:text-crimson" />
              <span className="font-medium tracking-tight">{s.label}</span>
              <span className="font-mono text-[10px] text-ink-700/60">{s.handle}</span>
            </a>
          ))}
        </div>
      </section>

      <Divider />

      {/* EXPERIENCE */}
      <section id="experience" className="scroll-mt-24">
        <Eyebrow>Experience</Eyebrow>
        <div className="mt-5 grid gap-4">
          {[
            {
              role: "Owner / Operator",
              org: "SnowAway & Landscaping Solutions",
              range: "Nov 2024 — Present",
              bullets: [
                "Founded a multi-service operation (snow, landscaping, auto detail).",
                "Run acquisition, scheduling, invoicing, CRM, and unit economics end-to-end.",
              ],
            },
            {
              role: "Senior Marketing Consultant",
              org: "TELUS Communications",
              range: "Mar 2024 — Nov 2024",
              bullets: [
                "Analyzed customer usage + product metrics to recommend tailored solutions.",
                "Exceeded quarterly sales targets by 42% via data-led outreach.",
                "Managed CRM data for retention, upsell, and churn reduction.",
              ],
            },
            {
              role: "Marketing / Sales Associate",
              org: "EPH Apparel",
              range: "Sep 2023 — Feb 2024",
              bullets: [
                "Logged CRM data driving personalized marketing.",
                "Seasonal trend analysis informed local inventory forecasting.",
              ],
            },
          ].map((r) => (
            <article
              key={r.org}
              className="washi-card grid grid-cols-1 gap-4 p-5 sm:grid-cols-12 sm:p-6"
            >
              <header className="sm:col-span-4">
                <div className="heading-eyebrow">{r.range}</div>
                <div className="mt-1 text-base font-semibold tracking-tight text-ink-800">
                  {r.role}
                </div>
                <div className="text-sm text-ink-700/70">{r.org}</div>
              </header>
              <ul className="space-y-2 sm:col-span-8">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink-700/85">
                    <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-crimson" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <Divider />

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-24">
        <Eyebrow>Projects</Eyebrow>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              data-hover
              className="washi-card group block p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-baseline justify-between">
                <span className="heading-eyebrow">{p.carModel}</span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
                  Case study →
                </span>
              </div>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-800">
                {p.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink-700/75">{p.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.spec.engine.split("·").map((s) => (
                  <span
                    key={s.trim()}
                    className="rounded-full border border-ink-800/12 bg-white/50 px-2 py-0.5 text-[10px] tracking-tight text-ink-700/75"
                  >
                    {s.trim()}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-24">
        <Eyebrow>Skills</Eyebrow>
        <div className="washi-card mt-5 grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Languages", items: "Python · SQL · Java · C++ · R" },
            { k: "Data & ML", items: "Pipelines · BI Dashboards · PyTorch · ML Fundamentals · Statistics" },
            { k: "Automation", items: "n8n · OpenAI APIs · Webhooks · Notion / Airtable" },
            { k: "Business / Ops", items: "CRM · Social Strategy · Content · Client Ops" },
          ].map((b) => (
            <div key={b.k}>
              <div className="heading-eyebrow">{b.k}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-800">{b.items}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* EDUCATION */}
      <section id="education" className="scroll-mt-24">
        <Eyebrow>Education</Eyebrow>
        <div className="washi-card mt-5 grid gap-4 p-6 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <h3 className="text-base font-semibold tracking-tight text-ink-800">
              B.Sc. — Artificial Intelligence &amp; Machine Learning Engineering
            </h3>
            <div className="mt-1 text-sm text-ink-700/70">
              University of Manitoba · Winnipeg, MB · 2023 — 2028 (projected)
            </div>
            <p className="mt-3 text-sm text-ink-800/85">
              Third year. Transitioned from a Data Science focus after completing
              the first two years. Coursework: Calculus, Statistics, Python, Java,
              C++, ML Fundamentals.
            </p>
          </div>
          <div className="sm:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              <Stat label="Year" value="3rd" />
              <Stat label="GPA" value="3.4" />
              <Stat label="Track" value="AI / ML" />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-24">
        <Eyebrow>Contact</Eyebrow>
        <div className="washi-card mt-5 grid gap-5 p-6 sm:grid-cols-12 sm:items-center">
          <div className="sm:col-span-7">
            <h3 className="text-lg font-semibold tracking-tight text-ink-800">
              Open to AI / ML, Data, and full-stack roles.
            </h3>
            <p className="mt-1 text-sm text-ink-700/75">
              Email is the fastest path. I read everything.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-hover
                  className="group inline-flex items-center gap-2 rounded-full border border-ink-800/15 bg-white/55 px-3 py-1.5 text-[12px] text-ink-800 transition hover:border-ink-800/30"
                  aria-label={`${s.label} — ${s.handle}`}
                >
                  <SocialIcon id={s.id} className="h-3.5 w-3.5 text-ink-800 transition group-hover:text-crimson" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="sm:col-span-5 sm:text-right">
            <a
              href="mailto:johnpaul081023@gmail.com"
              data-hover
              className="inline-flex items-center gap-2 rounded-full bg-ink-800 px-5 py-3 text-sm font-medium tracking-tight text-sakura-100 transition hover:bg-crimson"
            >
              johnpaul081023@gmail.com →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Pill({ k, v, href }: { k: string; v: string; href?: string }) {
  const inner = (
    <div className="rounded-2xl border border-ink-800/10 bg-white/55 p-3">
      <div className="heading-eyebrow">{k}</div>
      <div className="mt-0.5 text-[13px] font-medium tracking-tight text-ink-800">
        {v}
      </div>
    </div>
  );
  return href ? (
    <a href={href} data-hover>
      {inner}
    </a>
  ) : (
    inner
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-px w-10 bg-ink-800/30" />
      <span className="heading-eyebrow">{children}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-sakura-100/70 p-2.5">
      <div className="heading-eyebrow">{label}</div>
      <div className="mt-0.5 text-lg font-semibold tracking-tight text-ink-800">
        {value}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-12 ink-rule" />;
}
