"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "../projects/Projects";
import { SocialIcon } from "../SocialIcons";
import { SOCIALS } from "../socials";

const CHANNELS = [
  { label: "Email", value: "johnpaul081023@gmail.com", href: "mailto:johnpaul081023@gmail.com" },
  { label: "Phone", value: "+1 (951) 307-0269", href: "tel:+19513070269" },
  { label: "Based", value: "Winnipeg, MB · Canada" },
  { label: "Status", value: "Open to AI / ML / Data roles" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-32 sm:px-10"
    >
      <SectionHeading
        eyebrow="Exhibition · Floor 07"
        kanji="縁"
        title="Contact"
        sub="Sealing the pact. The fastest paths to my inbox and phone."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="washi-card relative mt-12 overflow-hidden p-8 sm:p-12"
      >
        {/* Background scroll texture */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/2 h-[360px] w-[360px] -translate-y-1/2 opacity-[0.04]"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90" stroke="#111" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="#111" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="#111" strokeWidth="1" fill="none" />
        </svg>

        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="font-brush text-lg text-ink-700/70">よろしくお願いします</span>
            <h3 className="heading-display mt-2 text-[clamp(36px,5vw,72px)] text-ink-800">
              Let&apos;s build something.
            </h3>
            <p className="mt-4 max-w-md text-body">
              Open to internships, full-time roles, freelance, and good-fit
              collaborations in AI, ML, and data engineering. The fastest path
              is email — I read everything.
            </p>

            <a
              href="mailto:johnpaul081023@gmail.com"
              data-hover
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink-800 px-6 py-4 text-sakura-100 transition hover:bg-crimson"
            >
              <span className="text-sm font-medium tracking-tight">
                johnpaul081023@gmail.com
              </span>
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-6">
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-ink-800/10 bg-white/40 p-5"
                >
                  <dt className="heading-eyebrow">{c.label}</dt>
                  {c.href ? (
                    <dd className="mt-1">
                      <a
                        href={c.href}
                        data-hover
                        className="text-sm font-medium text-ink-800 underline decoration-ink-800/20 underline-offset-4 hover:decoration-crimson"
                      >
                        {c.value}
                      </a>
                    </dd>
                  ) : (
                    <dd className="mt-1 text-sm font-medium text-ink-800">{c.value}</dd>
                  )}
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-2xl border border-ink-800/10 bg-white/40 p-5">
              <div className="heading-eyebrow">Elsewhere</div>
              <ul className="mt-3 space-y-2.5">
                {SOCIALS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-hover
                      className="group flex items-center justify-between gap-3 rounded-xl px-2 py-2 transition hover:bg-white/55"
                    >
                      <span className="flex items-center gap-3 text-ink-800">
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-800 text-sakura-100 transition group-hover:bg-crimson">
                          <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium tracking-tight">
                            {s.label}
                          </span>
                          <span className="block font-mono text-[11px] text-ink-700/55">
                            {s.handle}
                          </span>
                        </span>
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.22em] text-ink-700/45 transition group-hover:text-ink-800">
                        Open ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-2xl bg-ink-800/95 p-5 text-sakura-100">
              <div className="text-[10px] uppercase tracking-[0.22em] text-sakura-100/55">
                Off the record
              </div>
              <div className="mt-1 font-brush text-sm text-sakura-100/90">
                "Nah, I&apos;d deploy."
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
