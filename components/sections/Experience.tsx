"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../projects/Projects";

const ROLES = [
  {
    role: "Owner / Operator",
    org: "SnowAway & Landscaping Solutions",
    place: "Winnipeg, MB",
    range: "Nov 2024 — Present",
    bullets: [
      "Founded a service business across snow removal, landscaping, and auto detailing.",
      "Owned the whole stack: acquisition, scheduling, invoicing, CRM.",
      "Kept the books, tracked unit economics, optimized routes & resourcing.",
    ],
    accent: "#9D1B32",
  },
  {
    role: "Senior Marketing Consultant",
    org: "TELUS Communications",
    place: "Winnipeg, MB",
    range: "Mar 2024 — Nov 2024",
    bullets: [
      "Analyzed customer usage, demographics, and product metrics to recommend tailored solutions.",
      "Tracked regional sales metrics; exceeded quarterly targets by 42%.",
      "Managed CRM data to maximize retention, identify upsell, reduce churn.",
    ],
    accent: "#D4A84F",
  },
  {
    role: "Marketing / Sales Associate",
    org: "EPH Apparel",
    place: "Winnipeg, MB",
    range: "Sep 2023 — Feb 2024",
    bullets: [
      "Logged customer measurements and purchase history in CRM for personalized marketing.",
      "Analyzed seasonal trends to support localized inventory forecasting.",
      "Ran data-driven campaigns that lifted custom menswear sales.",
    ],
    accent: "#1A2B49",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 04"
        kanji="業"
        title="Experience"
        sub="The campaigns. Three deployments where data met operations."
      />

      <div className="mt-12 space-y-6">
        {ROLES.map((r, i) => (
          <motion.article
            key={r.org}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="washi-card grid grid-cols-1 gap-6 p-6 sm:p-8 lg:grid-cols-12"
          >
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3">
                <span
                  className="block h-3 w-3 rounded-full"
                  style={{ background: r.accent }}
                />
                <span className="heading-eyebrow">{r.range}</span>
              </div>
              <h3 className="heading-display mt-2 text-[clamp(24px,2.4vw,32px)] text-ink-800">
                {r.role}
              </h3>
              <div className="mt-1 text-sm text-ink-700/70">
                {r.org} · {r.place}
              </div>
            </div>
            <ul className="space-y-3 lg:col-span-8">
              {r.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-body">
                  <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-ink-800" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
