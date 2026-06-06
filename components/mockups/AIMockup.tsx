"use client";

import { motion } from "framer-motion";
import { useAutoplay } from "./useAutoplay";

/**
 * Dashboard for the Evolutionary Consensus Engine. Five agents debate,
 * an entropy curve drops as consensus emerges, a verdict panel renders.
 * Loops every ~8s — three states: debating → converging → consensus.
 */
const AGENTS = [
  { name: "Α-01", color: "#9D1B32" },
  { name: "Β-02", color: "#D4A84F" },
  { name: "Γ-03", color: "#55D6FF" },
  { name: "Δ-04", color: "#A98CFF" },
  { name: "Ε-05", color: "#28C840" },
];

const MESSAGES = [
  { agent: 0, t: "Hypothesis: A dominates under noise σ > 0.4." },
  { agent: 2, t: "Counter: B's variance penalty kicks in earlier." },
  { agent: 1, t: "Both stable. Weight by gradient agreement?" },
  { agent: 3, t: "Tournament round 7 — entropy 0.41 ↓" },
  { agent: 4, t: "Consensus reached. Confidence 0.94." },
];

export function AIMockup() {
  const { step, ref } = useAutoplay(MESSAGES.length + 1, 1600);

  return (
    <div ref={ref} className="relative mx-auto grid w-full max-w-[920px] grid-cols-1 gap-4 lg:grid-cols-12">
      {/* Left — agent ring */}
      <div className="lg:col-span-5">
        <div className="washi-card relative overflow-hidden p-5">
          <div className="flex items-baseline justify-between border-b border-ink-800/10 pb-2">
            <span className="heading-eyebrow">Population</span>
            <span className="font-mono text-[11px] text-ink-700/55">tournament/0007</span>
          </div>

          <div className="relative mt-3 aspect-square w-full">
            <svg viewBox="0 0 240 240" className="h-full w-full">
              {/* Connections */}
              {AGENTS.map((_, i) =>
                AGENTS.map((__, j) => {
                  if (j <= i) return null;
                  const a1 = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
                  const a2 = (j / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
                  const x1 = 120 + Math.cos(a1) * 80;
                  const y1 = 120 + Math.sin(a1) * 80;
                  const x2 = 120 + Math.cos(a2) * 80;
                  const y2 = 120 + Math.sin(a2) * 80;
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#111"
                      strokeOpacity={0.08 + (step / MESSAGES.length) * 0.18}
                      strokeWidth={0.6}
                    />
                  );
                })
              )}
              {/* Center marker (consensus) */}
              <motion.circle
                cx="120"
                cy="120"
                r="18"
                fill="#9D1B32"
                animate={{ scale: step >= MESSAGES.length ? 1.15 : 0.6, opacity: step >= MESSAGES.length ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "120px 120px" }}
              />
              {/* Agents */}
              {AGENTS.map((a, i) => {
                const angle = (i / AGENTS.length) * Math.PI * 2 - Math.PI / 2;
                const x = 120 + Math.cos(angle) * 80;
                const y = 120 + Math.sin(angle) * 80;
                const active = MESSAGES[step]?.agent === i;
                return (
                  <g key={a.name}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="20"
                      fill={a.color}
                      animate={{ scale: active ? 1.15 : 1, opacity: 0.95 }}
                      transition={{ duration: 0.35 }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                    <text
                      x={x}
                      y={y + 3}
                      textAnchor="middle"
                      fontFamily="ui-monospace, monospace"
                      fontSize="9"
                      fontWeight="600"
                      fill="#fff"
                    >
                      {a.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Verdict */}
          <div className="mt-2 flex items-center gap-2 rounded-xl bg-sakura-100/70 px-3 py-2">
            <span className={`block h-2 w-2 rounded-full ${step >= MESSAGES.length ? "bg-[#28C840]" : "bg-amber"}`} />
            <span className="text-[11px] font-medium tracking-tight text-ink-800">
              {step >= MESSAGES.length ? "Consensus · 0.94" : "Debating · entropy ↓"}
            </span>
            <span className="ml-auto font-mono text-[10px] text-ink-700/55">
              tick {(step + 1).toString().padStart(2, "0")} / {MESSAGES.length + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Right — chart + transcript */}
      <div className="space-y-4 lg:col-span-7">
        {/* Entropy chart */}
        <div className="washi-card p-5">
          <div className="flex items-baseline justify-between border-b border-ink-800/10 pb-2">
            <span className="heading-eyebrow">Entropy</span>
            <span className="font-mono text-[11px] text-ink-700/55">
              H = {entropyAt(step).toFixed(2)} bits
            </span>
          </div>
          <svg viewBox="0 0 400 110" className="mt-3 h-28 w-full">
            <defs>
              <linearGradient id="entropy-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#9D1B32" stopOpacity="0.35" />
                <stop offset="1" stopColor="#9D1B32" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* gridlines */}
            {[20, 50, 80].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#111" strokeOpacity="0.06" />
            ))}
            <motion.path
              d={entropyPath(step)}
              fill="url(#entropy-fill)"
              stroke="none"
              animate={{ opacity: 1 }}
            />
            <motion.path
              d={entropyPath(step).replace(/ L 400 100 L 0 100 Z$/, "")}
              fill="none"
              stroke="#9D1B32"
              strokeWidth="2"
            />
          </svg>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-700/65">
            <Legend swatch="#9D1B32" label="H(p)" />
            <Legend swatch="#28C840" label="Confidence" />
          </div>
        </div>

        {/* Transcript */}
        <div className="washi-card p-5">
          <div className="flex items-baseline justify-between border-b border-ink-800/10 pb-2">
            <span className="heading-eyebrow">Live transcript</span>
            <span className="font-mono text-[11px] text-ink-700/55">/agents/debate</span>
          </div>
          <ul className="mt-3 space-y-2">
            {MESSAGES.slice(0, Math.min(step + 1, MESSAGES.length)).map((m, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-3"
              >
                <span
                  className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: AGENTS[m.agent].color }}
                >
                  {AGENTS[m.agent].name[0]}
                </span>
                <span className="text-[12px] leading-snug text-ink-800">{m.t}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function entropyAt(step: number) {
  const max = MESSAGES.length;
  const t = Math.min(step, max) / max;
  return 1.62 * (1 - t) + 0.18;
}

function entropyPath(step: number) {
  const max = MESSAGES.length;
  const samples = 24;
  let d = "M 0 ";
  const points: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * 400;
    const progress = Math.min(step + 1, max) / max;
    const drop = Math.min(i / samples, progress);
    const noise = Math.sin(i * 1.3) * 3 + Math.cos(i * 0.7) * 2;
    const y = 90 - drop * 60 + (1 - drop) * 10 + noise * (1 - drop);
    points.push(`${x.toFixed(1)} ${Math.max(8, y).toFixed(1)}`);
  }
  d += points[0];
  for (let i = 1; i < points.length; i++) d += ` L ${points[i]}`;
  d += " L 400 100 L 0 100 Z";
  return d;
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="block h-2 w-3 rounded-sm" style={{ background: swatch }} />
      <span>{label}</span>
    </span>
  );
}
