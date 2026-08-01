import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        ink: "#1C1917",
        surface: "#FBFAF6",
        panel: "#FFFFFF",
        subtle: "#F2EEE6",
        line: "rgba(28,25,23,0.1)",
        mist: "#726C62",
        paper: "#1C1917",
        orange: {
          DEFAULT: "#D9481A",
          dim: "#AD3812",
          soft: "rgba(217,72,26,0.1)",
        },
        navy: {
          DEFAULT: "#1E2A3A",
          dim: "#141D28",
          soft: "rgba(30,42,58,0.06)",
        },
        slate: {
          DEFAULT: "#6B6F76",
          soft: "rgba(107,111,118,0.1)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(217,72,26,0.06), transparent 60%)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(217,72,26,0.12) 0%, rgba(251,250,246,0) 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-line": {
          "0%, 100%": { strokeDashoffset: "0" },
          "50%": { strokeDashoffset: "24" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 28s linear infinite",
        "pulse-line": "pulse-line 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
