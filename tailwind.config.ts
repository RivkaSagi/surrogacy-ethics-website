import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#fef9f4",
        ink: "#1e1b16",
        clay: "#c26c55",
        stone: "#6d5b4b",
        mist: "#f4ece4",
        border: "#e2d7cf",
        success: "#15803d",
        danger: "#b91c1c",
      },
      fontFamily: {
        sans: ["var(--font-rubik)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-secular)", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: "0 10px 40px rgba(30, 27, 22, 0.08)",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fade: "fade 0.6s ease forwards",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
