import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: "#0f172a",
        panel: "#111827",
        edge: "#1f2937",
        accent: "#60a5fa",
        mint: "#34d399",
        warm: "#f59e0b"
      },
      boxShadow: {
        soft: "0 16px 50px rgba(2, 6, 23, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
