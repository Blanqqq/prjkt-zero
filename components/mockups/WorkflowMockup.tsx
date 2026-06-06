"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * n8n-style horizontal node graph for the content automation project.
 * Each node lights up sequentially, simulating a workflow run. The side
 * rail shows live "Run history" with timings.
 */
const NODES = [
  { id: "trigger", label: "Webhook Trigger", sub: "POST /content", color: "#9D1B32", icon: "▶" },
  { id: "fetch", label: "Fetch + Clean", sub: "Notion · Airtable", color: "#1A2B49", icon: "⇣" },
  { id: "score", label: "RAG Score", sub: "OpenAI · top-k 6", color: "#A98CFF", icon: "Σ" },
  { id: "guard", label: "Brand Voice", sub: "Guardrail prompt", color: "#D4A84F", icon: "✓" },
  { id: "approve", label: "Slack Approval", sub: "#content-ops", color: "#28C840", icon: "⌘" },
  { id: "publish", label: "Publish", sub: "Webflow · Buffer", color: "#55D6FF", icon: "↗" },
];

export function WorkflowMockup() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setTick((s) => (s + 1) % (NODES.length + 2)), 900);
    return () => window.clearInterval(t);
  }, []);

  const runId = "run_0824";
  const runs = [
    { id: "run_0824", status: "running", t: "now" },
    { id: "run_0823", status: "ok", t: "12m" },
    { id: "run_0822", status: "ok", t: "34m" },
    { id: "run_0821", status: "ok", t: "1h" },
    { id: "run_0820", status: "warn", t: "1h" },
    { id: "run_0819", status: "ok", t: "2h" },
  ];

  return (
    <div className="mx-auto w-full max-w-[920px]">
      <div className="washi-card overflow-hidden p-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-ink-800/10 bg-white/55 px-4 py-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-brush text-base text-crimson">流</span>
            <span className="font-mono text-ink-800">workflows / content_v3.json</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#28C840]/15 px-2 py-0.5 text-[10px] font-medium text-[#0a8a3a]">
              <span className="block h-1.5 w-1.5 rounded-full bg-[#28C840]" />
              live
            </span>
            <span className="rounded-md border border-ink-800/10 px-2 py-0.5 text-ink-700/65">v3.2</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-12">
          {/* Canvas */}
          <div className="relative overflow-hidden p-6 sm:col-span-9">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(17,17,17,0.07) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative grid grid-cols-3 gap-x-0 gap-y-12 sm:grid-cols-6">
              {NODES.map((n, i) => {
                const isActive = tick === i + 1;
                const isPast = tick > i + 1 || tick === 0;
                return (
                  <motion.div
                    key={n.id}
                    className="relative flex flex-col items-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {/* Connector */}
                    {i > 0 && (
                      <div className="absolute -left-1/2 top-7 hidden h-0.5 w-full sm:block">
                        <div className="relative h-full w-full bg-ink-800/12">
                          <motion.div
                            className="absolute inset-0 origin-left"
                            style={{
                              background: `linear-gradient(90deg, ${NODES[i - 1].color}, ${n.color})`,
                            }}
                            animate={{ scaleX: tick === 0 || tick > i ? 1 : 0 }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </div>
                    )}

                    <motion.div
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        boxShadow: isActive
                          ? `0 0 0 6px ${n.color}33, 0 12px 24px -12px ${n.color}80`
                          : "0 6px 18px -10px rgba(17,17,17,0.25)",
                      }}
                      transition={{ duration: 0.4 }}
                      className="grid h-14 w-14 place-items-center rounded-2xl border border-ink-800/10 bg-white text-lg"
                      style={{ color: n.color }}
                    >
                      <span className="font-mono">{n.icon}</span>
                    </motion.div>

                    <div className="mt-2 text-center">
                      <div className="text-[10px] font-semibold tracking-tight text-ink-800">
                        {n.label}
                      </div>
                      <div className="text-[9px] text-ink-700/55">{n.sub}</div>
                    </div>

                    {/* status dot */}
                    <motion.span
                      className="absolute -right-1 -top-1 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                      animate={{
                        background: isActive ? "#FFB300" : isPast ? "#28C840" : "#cbd5d8",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Footer status */}
            <div className="relative mt-6 flex items-center justify-between rounded-xl bg-sakura-100/60 px-3 py-2">
              <span className="font-mono text-[10px] text-ink-800">
                {tick === 0 || tick > NODES.length ? "✓ Run complete · 4 items published" : `⟳ executing · ${NODES[tick - 1]?.label}`}
              </span>
              <span className="font-mono text-[10px] text-ink-700/55">12 workflows · 4k items/wk</span>
            </div>
          </div>

          {/* Run history */}
          <aside className="border-t border-ink-800/10 bg-white/40 p-4 sm:col-span-3 sm:border-l sm:border-t-0">
            <div className="heading-eyebrow">Run history</div>
            <ul className="mt-3 space-y-2">
              {runs.map((r) => (
                <li key={r.id} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2">
                    <span
                      className={`block h-1.5 w-1.5 rounded-full ${
                        r.id === runId
                          ? "animate-pulse bg-amber"
                          : r.status === "ok"
                            ? "bg-[#28C840]"
                            : r.status === "warn"
                              ? "bg-amber"
                              : "bg-crimson"
                      }`}
                    />
                    <span className={`font-mono ${r.id === runId ? "font-semibold text-ink-800" : "text-ink-700"}`}>
                      {r.id}
                    </span>
                  </span>
                  <span className="text-ink-700/55">{r.t}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
