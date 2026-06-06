"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../projects/Projects";

const ARSENAL: { category: string; kanji: string; items: { name: string; level: number }[] }[] = [
  {
    category: "Languages",
    kanji: "語",
    items: [
      { name: "Python", level: 88 },
      { name: "SQL", level: 78 },
      { name: "Java", level: 68 },
      { name: "C++", level: 62 },
      { name: "R / RStudio", level: 60 },
    ],
  },
  {
    category: "Data & Analysis",
    kanji: "解",
    items: [
      { name: "Relational Databases", level: 80 },
      { name: "Data Pipelines (ETL)", level: 78 },
      { name: "BI Dashboards", level: 80 },
      { name: "Data Visualization", level: 76 },
      { name: "Statistics & Modeling", level: 72 },
    ],
  },
  {
    category: "AI / ML",
    kanji: "智",
    items: [
      { name: "Machine Learning Fundamentals", level: 74 },
      { name: "PyTorch / NumPy", level: 70 },
      { name: "Prompt + Agent Engineering", level: 76 },
      { name: "n8n & Workflow Automation", level: 84 },
    ],
  },
  {
    category: "Business & Ops",
    kanji: "策",
    items: [
      { name: "CRM Systems", level: 82 },
      { name: "Social Media Strategy", level: 78 },
      { name: "Content Strategy", level: 76 },
      { name: "Client Operations", level: 80 },
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 05"
        kanji="技"
        title="Technical Skills"
        sub="The arsenal. Tools sharpened across coursework, side projects, and real operations."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {ARSENAL.map((bucket, i) => (
          <motion.div
            key={bucket.category}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            className="washi-card p-6 sm:p-8"
          >
            <div className="flex items-baseline justify-between border-b border-ink-800/10 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-brush text-2xl text-ink-800">{bucket.kanji}</span>
                <h3 className="text-lg font-semibold tracking-tight text-ink-800">
                  {bucket.category}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
                Rack {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <ul className="mt-4 space-y-3">
              {bucket.items.map((item) => (
                <li key={item.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-ink-800">{item.name}</span>
                    <span className="font-mono text-[11px] text-ink-700/60">
                      {item.level}
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-800/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: true, margin: "-5% 0px" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-ink-800 via-crimson to-ink-800"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
