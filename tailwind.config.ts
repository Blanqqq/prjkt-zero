import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: {
          50: "#FFF5F8",
          100: "#FFF0F4",
          200: "#FFE4EC",
          300: "#FFDCE7",
          400: "#FFC8D8",
          500: "#FFA8C0",
        },
        ink: {
          900: "#0B0B0C",
          800: "#111111",
          700: "#1A1A1A",
          600: "#26262A",
          500: "#3A3A40",
          400: "#5C5C66",
          300: "#8A8A94",
        },
        steel: "#C8CCD4",
        crimson: "#9D1B32",
        cyan: "#55D6FF",
        amber: "#D4A84F",
      },
      fontFamily: {
        display: ['"SF Pro Display"', '"Inter"', "system-ui", "sans-serif"],
        text: ['"SF Pro Text"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"SF Mono"', "ui-monospace", "monospace"],
        brush: ['"Shippori Mincho"', '"Noto Serif JP"', "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tightish: "-0.025em",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(6deg)" },
        },
        drift: {
          "0%": { transform: "translate3d(-5vw, -10vh, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.9" },
          "90%": { opacity: "0.7" },
          "100%": { transform: "translate3d(105vw, 110vh, 0) rotate(540deg)", opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1", transform: "scaleY(1)" },
          "50%": { opacity: "0.85", transform: "scaleY(1.06)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(-2%, 1%)" },
          "40%": { transform: "translate(1%, -2%)" },
          "60%": { transform: "translate(-1%, 2%)" },
          "80%": { transform: "translate(2%, -1%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 22s linear infinite",
        flicker: "flicker 1.4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        grain: "grain 8s steps(6) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
