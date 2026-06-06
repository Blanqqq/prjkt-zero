"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../projects/Projects";

const COURSES = [
  "Calculus",
  "Statistics",
  "Intro to Python",
  "Intro to Java",
  "Intro to C++",
  "Machine Learning Fundamentals",
];

const TIMELINE = [
  { year: "2023", note: "Enrolled — Data Science focus" },
  { year: "2024", note: "Foundations: Calculus · Stats · Python" },
  { year: "2025", note: "Transitioned to AI & ML Engineering" },
  { year: "2026", note: "Year 3 · ML Fundamentals · Research" },
  { year: "2028", note: "B.Sc. — projected" },
];

export function Education() {
  return (
    <section
      id="education"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 03"
        kanji="学"
        title="Education"
        sub="The forging. Foundations laid in Data Science, sharpened into AI &amp; ML."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-12">
        {/* Plaque */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="washi-card relative overflow-hidden p-8 lg:col-span-7"
        >
          <div className="flex items-baseline justify-between">
            <span className="heading-eyebrow">B.Sc. · 2023 — 2028</span>
            <span className="font-brush text-sm text-ink-700/55">学位記</span>
          </div>
          <h3 className="heading-display mt-3 text-[clamp(28px,3.4vw,46px)] text-ink-800">
            Artificial Intelligence &amp; Machine Learning Engineering
          </h3>
          <p className="mt-2 text-body">
            University of Manitoba · Winnipeg, MB. Currently in third year after
            completing the first two on a Data Science track.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <Stat label="Year" value="3rd" />
            <Stat label="GPA" value="3.4" />
            <Stat label="Track" value="AI / ML" />
          </div>

          <div className="mt-8">
            <div className="heading-eyebrow">Relevant Coursework</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {COURSES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink-800/15 bg-white/50 px-3 py-1 text-xs text-ink-800"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Wax seal */}
          <div className="pointer-events-none absolute bottom-6 right-6 grid h-16 w-16 place-items-center rounded-full bg-crimson text-sakura-100 shadow-md">
            <span className="font-brush text-xl leading-none">学</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.ol
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative lg:col-span-5"
        >
          <div className="absolute left-[14px] top-2 bottom-2 w-px bg-ink-800/15" />
          {TIMELINE.map((t, i) => (
            <li key={t.year} className="relative pl-10 pb-6 last:pb-0">
              <span className="absolute left-[7px] top-1 grid h-4 w-4 place-items-center rounded-full bg-sakura-100 ring-1 ring-ink-800/30">
                <span className="block h-1.5 w-1.5 rounded-full bg-crimson" />
              </span>
              <div className="text-xs uppercase tracking-[0.22em] text-ink-700/55">
                {t.year}
              </div>
              <div className="mt-0.5 text-sm font-medium text-ink-800">{t.note}</div>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/40 p-3">
      <div className="heading-eyebrow">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-ink-800">
        {value}
      </div>
    </div>
  );
}
