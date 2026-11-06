import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,.04), 0 4px 16px -4px rgba(15,23,42,.08)",
        float: "0 10px 40px -12px rgba(15,23,42,.25)",
        glow: "0 8px 24px -6px rgba(37,99,235,.45)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(8px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pop: { "0%": { opacity: "0", transform: "scale(.96)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "slide-in": { "0%": { opacity: "0", transform: "translateX(16px)" }, "100%": { opacity: "1", transform: "translateX(0)" } },
      },
      animation: {
        "fade-up": "fade-up .35s ease-out both",
        pop: "pop .2s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        "slide-in": "slide-in .3s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
