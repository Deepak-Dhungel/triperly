import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        gradient1: "var(--gradient1)",
        gradient2: "var(--gradient2)",
        gradient3: "var(--gradient3)",
      },
      keyframes: {
        "border-spin": {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "marquee-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "marquee-up": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-50%)" },
        },
        "marquee-down": {
          from: { transform: "translateY(-50%)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        "border-spin": "border-spin 7s linear infinite",
        "marquee-left": "marquee-left 60s linear infinite",
        "marquee-right": "marquee-right 50s linear infinite",
        "marquee-up": "marquee-up 25s linear infinite",
        "marquee-down": "marquee-down 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
