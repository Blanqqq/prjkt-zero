import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "John Paul Giftson — AI & ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(180deg, #FFF0F4 0%, #FFE4EC 55%, #FFDCE7 100%)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          color: "#111111",
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "rgba(17,17,17,0.55)",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "block", width: 56, height: 1, background: "rgba(17,17,17,0.3)" }} />
          Exhibition · 2026 Edition
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 0.95,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              color: "#111111",
            }}
          >
            John Paul Giftson
          </div>
          <div
            style={{
              fontSize: 32,
              color: "rgba(17,17,17,0.78)",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            AI &amp; Machine Learning Engineering — University of Manitoba. An
            exhibition of work in data, design, and intelligent systems.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(17,17,17,0.65)",
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span>Winnipeg, MB</span>
            <span>·</span>
            <span>Open to work</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 56,
              fontFamily: "serif",
              color: "#9D1B32",
            }}
          >
            零
          </div>
        </div>
      </div>
    ),
    size
  );
}
