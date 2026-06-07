"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

/**
 * About section — the "who's behind the museum" beat. Goes between Hero and
 * Projects so the work narrative is anchored to a person.
 *
 * Photo: drop a portrait at /public/portrait.jpg (square, ~1000×1000)
 * and it renders. Until then a stylized placeholder with initials renders.
 */
export function About() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-[1400px] px-6 py-24 sm:px-10"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4"
        >
          <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-3xl border border-ink-800/10 bg-sakura-100/60 shadow-[0_40px_60px_-30px_rgba(17,17,17,0.22)]">
            {!photoFailed ? (
              <Image
                src="/portrait.jpg"
                alt="John Paul Giftson"
                fill
                sizes="(min-width: 1024px) 360px, 80vw"
                className="cinema-img object-cover"
                onError={() => setPhotoFailed(true)}
              />
            ) : (
              <Placeholder />
            )}

            {/* Hairline + subtle vignette */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(17,17,17,0.08)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(130% 100% at 50% 35%, transparent 60%, rgba(17,17,17,0.12) 100%)",
              }}
            />
          </div>

          {/* Caption */}
          <div className="mx-auto mt-4 max-w-[360px] text-center">
            <div className="font-brush text-sm text-ink-800/85">
              John Paul Giftson · 零
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">
              Winnipeg, MB — Canada
            </div>
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8"
        >
          <div className="flex items-center gap-3">
            <span className="block h-px w-10 bg-ink-800/30" />
            <span className="heading-eyebrow">Exhibition · Floor 01 — About</span>
          </div>
          <h2 className="heading-display mt-4 text-[clamp(40px,6vw,84px)] text-ink-800">
            About me
          </h2>

          <div className="mt-6 max-w-2xl space-y-4 text-body">
            <p>
              I'm a third-year B.Sc. student in AI &amp; Machine Learning
              Engineering at the University of Manitoba. I came in on the Data
              Science track and switched once I realized I cared more about
              building systems than just analyzing them.
            </p>
            <p>
              Outside of school I run a small services business — snow removal,
              landscaping, auto detailing — that I founded in late 2024. That
              part of the job has taught me as much about operations,
              acquisition, and unit economics as any class has about gradients
              and entropy.
            </p>
            <p>
              I&apos;m looking for AI / ML, data, or full-stack work — internship
              or full-time. I care about systems that fail loudly, code that
              ages well, and design that doesn&apos;t apologize for caring.
            </p>
          </div>

          {/* Quick facts row */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Discipline", v: "AI / ML" },
              { k: "Year", v: "3rd · 2023–28" },
              { k: "GPA", v: "3.4" },
              { k: "Status", v: "Open to work" },
            ].map((f) => (
              <div
                key={f.k}
                className="rounded-2xl border border-ink-800/10 bg-white/55 px-4 py-3"
              >
                <div className="heading-eyebrow">{f.k}</div>
                <div className="mt-1 text-sm font-medium tracking-tight text-ink-800">
                  {f.v}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Placeholder() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div
        aria-hidden
        className="relative grid h-full w-full place-items-center"
        style={{
          background:
            "linear-gradient(135deg, #FFE4EC 0%, #FFDCE7 60%, #FFC8D8 100%)",
        }}
      >
        <span className="font-brush text-[120px] leading-none text-ink-800/85">
          零
        </span>
        <span className="absolute bottom-5 text-[10px] uppercase tracking-[0.32em] text-ink-700/55">
          Portrait pending
        </span>
      </div>
    </div>
  );
}
