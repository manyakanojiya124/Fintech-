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
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Brand
        blue: {
          DEFAULT: "#1565C0",
          50: "#EAF2FC",
          100: "#D2E3F8",
          200: "#A6C7F1",
          300: "#74A6E8",
          400: "#4285DD",
          500: "#1E73D6",
          600: "#1565C0",
          700: "#11519A",
          800: "#0D3E76",
          900: "#092C54",
        },
        red: {
          DEFAULT: "#C62828",
          50: "#FCEBEC",
          100: "#F9D3D6",
          200: "#F2A6AB",
          300: "#E9767E",
          400: "#DB4752",
          500: "#C62828",
          600: "#A52021",
          700: "#831A1B",
          800: "#611415",
          900: "#400E0E",
        },
        // Neutrals
        ink: "#111827",
        mist: "#6B7280",
        subtle: "#F8FAFC",
        line: "#E5E7EB",
        surface: "#FFFFFF",
        panel: "#F1F5F9",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        "display-1": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-2": ["clamp(2rem, 3.6vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      borderRadius: {
        xl2: "0.875rem",
        xl3: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
        "card-hover": "0 12px 24px -8px rgba(16,24,40,0.12), 0 4px 8px -4px rgba(16,24,40,0.06)",
        pop: "0 24px 48px -12px rgba(16,24,40,0.18), 0 8px 16px -8px rgba(16,24,40,0.08)",
        ring: "0 0 0 4px rgba(21,101,192,0.12)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both",
        "scale-in": "scale-in 0.25s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 1.6s infinite",
        "spin-slow": "spin-slow 1.1s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
