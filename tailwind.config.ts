import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        backgroundDark: "#1b191a",
        mainBackgroundDark: "#202222",
        contentBackgroundDark: "#191A1A",
        borderMain: "#3D3F40",
        textMainDark: "#e8e8e8",
        textOffDark: "#8D9191",
        caretColor: "#15808d",
        offsetPlusDark: "#2D2F2F",
        offsetDark: "#202222",
        superDark: "#1cb9cd",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config;
