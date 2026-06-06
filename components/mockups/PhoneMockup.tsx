"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * iPhone 15-ish mockup that cycles through three screens of the delivery
 * platform: discover → cart → live tracking. SVG phone shell, real-looking
 * UI inside, animated dot moving along a map polyline on the tracking screen.
 */
const SCREENS = ["discover", "cart", "track"] as const;

export function PhoneMockup() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setIdx((i) => (i + 1) % SCREENS.length), 3200);
    return () => window.clearInterval(t);
  }, []);

  const screen = SCREENS[idx];

  return (
    <div className="relative mx-auto flex w-full max-w-[820px] items-center justify-center gap-8 sm:gap-12">
      {/* Side caption */}
      <div className="hidden max-w-[200px] sm:block">
        <div className="heading-eyebrow">UX preview</div>
        <p className="mt-2 text-sm text-ink-700/75">
          Three flows shown on rotation — discover, cart, live tracking. All
          driven by the same realtime order queue.
        </p>
        <div className="mt-4 flex gap-1.5">
          {SCREENS.map((s, i) => (
            <span
              key={s}
              className={`block h-1 rounded-full transition-all ${
                i === idx ? "w-6 bg-ink-800" : "w-2 bg-ink-800/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* iPhone */}
      <div className="relative">
        <div
          className="relative rounded-[44px] bg-ink-800 p-2 shadow-[0_50px_80px_-30px_rgba(17,17,17,0.5)]"
          style={{ width: 280 }}
        >
          {/* Side buttons */}
          <span className="absolute -left-[2px] top-24 h-10 w-[3px] rounded-l-sm bg-ink-700" />
          <span className="absolute -right-[2px] top-32 h-14 w-[3px] rounded-r-sm bg-ink-700" />

          {/* Screen */}
          <div className="relative h-[560px] overflow-hidden rounded-[36px] bg-sakura-50">
            {/* Dynamic island */}
            <div className="absolute left-1/2 top-2.5 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-ink-900" />

            {/* Status bar */}
            <div className="absolute inset-x-0 top-1.5 z-10 flex items-center justify-between px-6 text-[10px] font-semibold text-ink-800">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <svg viewBox="0 0 16 10" className="h-2.5 w-3"><path d="M1 9h1v-1H1zm3 0h1V7H4zm3 0h1V5H7zm3 0h1V3h-1zm3 0h1V1h-1z" fill="currentColor" /></svg>
                <span>5G</span>
                <svg viewBox="0 0 20 10" className="h-2.5 w-4"><rect x="0.5" y="2" width="16" height="6" rx="1.5" fill="none" stroke="currentColor" /><rect x="1.5" y="3" width="13" height="4" rx="0.5" fill="currentColor" /></svg>
              </span>
            </div>

            {/* Screens */}
            <Discover active={screen === "discover"} />
            <Cart active={screen === "cart"} />
            <Track active={screen === "track"} />

            {/* Home indicator */}
            <div className="absolute inset-x-0 bottom-1.5 z-10 flex justify-center">
              <span className="block h-1 w-24 rounded-full bg-ink-800/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Discover({ active }: { active: boolean }) {
  const items = [
    { n: "Sakura Ramen", t: "20 min", tags: "ラーメン · 4.8" },
    { n: "Manitoba Diner", t: "30 min", tags: "Comfort · 4.6" },
    { n: "Tokyo Sushi Bar", t: "25 min", tags: "Omakase · 4.9" },
  ];
  return (
    <motion.div
      className="absolute inset-0 z-0 px-4 pt-12 pb-16"
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">Discover</div>
      <div className="text-[20px] font-semibold tracking-tight text-ink-800">Good evening, John.</div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-ink-800/10 bg-white px-3 py-2 text-[11px] text-ink-700/60">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
        Search restaurants
      </div>
      <div className="mt-3 flex gap-1.5 text-[10px]">
        {["For You", "Sushi", "Ramen", "Bowls"].map((c, i) => (
          <span key={c} className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-ink-800 text-sakura-100" : "bg-ink-800/8 text-ink-700"}`}>{c}</span>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {items.map((it, i) => (
          <motion.div
            key={it.n}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{ delay: i * 0.08 + 0.15, duration: 0.4 }}
            className="flex items-center gap-3 rounded-2xl border border-ink-800/8 bg-white p-2.5"
          >
            <div
              className="h-12 w-12 shrink-0 rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${["#FFC8D8", "#FFDCE7", "#FFE4EC"][i]}, #FFF0F4)`,
              }}
            />
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold text-ink-800">{it.n}</div>
              <div className="truncate text-[10px] text-ink-700/55">{it.tags}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-ink-700/55">ETA</div>
              <div className="text-xs font-semibold text-ink-800">{it.t}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Cart({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 z-0 px-4 pt-12 pb-16"
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">Cart</div>
      <div className="text-[20px] font-semibold tracking-tight text-ink-800">Sakura Ramen</div>
      <div className="mt-3 space-y-2">
        {[
          { n: "Shoyu Ramen", q: 1, p: "$15.50" },
          { n: "Gyoza · 6 pc", q: 1, p: "$8.20" },
          { n: "Matcha Lemonade", q: 2, p: "$9.00" },
        ].map((row) => (
          <div key={row.n} className="flex items-center justify-between rounded-xl border border-ink-800/8 bg-white px-3 py-2.5">
            <div>
              <div className="text-xs font-semibold text-ink-800">{row.n}</div>
              <div className="text-[10px] text-ink-700/55">Qty {row.q}</div>
            </div>
            <div className="text-xs font-semibold text-ink-800">{row.p}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl bg-white p-3">
        <Row label="Subtotal" value="$32.70" />
        <Row label="Delivery" value="$2.99" />
        <Row label="Tax" value="$1.79" />
        <div className="mt-1.5 border-t border-ink-800/10 pt-1.5">
          <Row label="Total" value="$37.48" bold />
        </div>
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="mt-3 w-full rounded-full bg-crimson py-3 text-xs font-semibold text-white"
      >
        Place order · ETA 22 min
      </motion.button>
    </motion.div>
  );
}

function Track({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 z-0 px-4 pt-12 pb-16"
      animate={{ opacity: active ? 1 : 0, y: active ? 0 : 24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-[10px] uppercase tracking-[0.22em] text-ink-700/55">Live tracking</div>
      <div className="text-[20px] font-semibold tracking-tight text-ink-800">Order #JG-7821</div>
      {/* Map */}
      <div className="relative mt-3 h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-sakura-200 to-sakura-100">
        <svg viewBox="0 0 240 160" className="absolute inset-0 h-full w-full">
          {/* roads */}
          <path d="M0 90 Q 60 60, 120 80 T 240 70" stroke="#fff" strokeWidth="6" fill="none" opacity="0.7" />
          <path d="M40 0 L 50 160" stroke="#fff" strokeWidth="5" fill="none" opacity="0.5" />
          <path d="M180 0 L 170 160" stroke="#fff" strokeWidth="4" fill="none" opacity="0.5" />
          {/* route */}
          <path
            id="route"
            d="M30 130 Q 90 70, 150 90 T 220 30"
            stroke="#9D1B32"
            strokeDasharray="3 4"
            strokeWidth="2"
            fill="none"
          />
          {/* pins */}
          <circle cx="30" cy="130" r="6" fill="#9D1B32" />
          <circle cx="220" cy="30" r="6" fill="#0F1A26" />
          {/* courier dot */}
          <motion.circle
            r="6"
            fill="#fff"
            stroke="#9D1B32"
            strokeWidth="2.5"
            animate={{
              cx: active ? [80, 130, 175] : 80,
              cy: active ? [95, 88, 60] : 95,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { s: "Order received", done: true },
          { s: "Cooking · Sakura Ramen", done: true },
          { s: "Courier en route", done: true, active: true },
          { s: "Delivered", done: false },
        ].map((s) => (
          <div key={s.s} className="flex items-center gap-2">
            <span
              className={`block h-2 w-2 rounded-full ${
                s.done ? (s as any).active ? "bg-crimson" : "bg-ink-800" : "bg-ink-800/15"
              }`}
            />
            <span className={`text-[11px] ${s.done ? "font-semibold text-ink-800" : "text-ink-700/55"}`}>{s.s}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className={bold ? "font-semibold text-ink-800" : "text-ink-700/65"}>{label}</span>
      <span className={bold ? "font-semibold text-ink-800" : "text-ink-800"}>{value}</span>
    </div>
  );
}
