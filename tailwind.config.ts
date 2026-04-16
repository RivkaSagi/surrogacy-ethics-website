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
        background: "#fff9f4",
        primary: "#d0674e",
        highlight: "#ffc5b2",
        dark: "#1f1c1b",
        border: "#e49c84",
        text: "#000000",
      },
      fontFamily: {
        sans: ["var(--font-heebo)", ...defaultTheme.fontFamily.sans],
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
