"use client";

import { useEffect, useState } from "react";

/**
 * Hero weather/time card. Winnipeg local time — the actual location of the
 * person behind the site, not a borrowed cultural anchor. Current time
 * updated client-side every 30s. The "forecast" line is a small bit of
 * personality, not a real weather pull (no API dependency).
 */
function fmtTime(d: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Winnipeg",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return f.format(d).replace(" ", " ");
}

function fmtDate(d: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Winnipeg",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return f.format(d).toUpperCase();
}

function forecast(d: Date) {
  // Simple month-based mood line so the card has personality without an API.
  const m = parseInt(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Winnipeg", month: "numeric" }).format(d),
    10
  );
  if (m >= 11 || m <= 2) return { temp: "−18", note: "Light snow" };
  if (m === 3 || m === 4) return { temp: "+4", note: "Wind from the north" };
  if (m >= 5 && m <= 8) return { temp: "+22", note: "Open sky" };
  return { temp: "+9", note: "Clear and dry" };
}

export function WeatherCard() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  // Stable placeholder during SSR / pre-hydration
  const time = now ? fmtTime(now) : "—";
  const date = now ? fmtDate(now) : "CENTRAL TIME · WINNIPEG";
  const f = now ? forecast(now) : { temp: "—", note: "Loading" };

  return (
    <div
      className="relative w-full max-w-[280px] overflow-hidden rounded-2xl border border-ink-800/30 p-4"
      style={{
        background:
          "linear-gradient(180deg, #1a1a20 0%, #0e0e12 100%)",
        boxShadow:
          "0 25px 50px -25px rgba(17,17,17,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,182,200,0.25), transparent 70%)" }}
      />

      <div className="flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-[0.32em] text-sakura-100/75">
          Winnipeg
        </span>
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full bg-[#9D1B32] shadow-[0_0_8px_#9D1B32]"
        />
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-semibold tracking-tight text-sakura-100">
              {f.temp}
            </span>
            <span className="text-lg text-sakura-100/60">°C</span>
          </div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-sakura-100/65">
            {f.note}
          </div>
        </div>

        <div className="text-right">
          <div className="font-mono text-base text-sakura-100/90">{time}</div>
          <div className="mt-0.5 font-mono text-[10px] text-sakura-100/60">
            {date}
          </div>
        </div>
      </div>
    </div>
  );
}
