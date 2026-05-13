import type { Config } from "tailwindcss";

const rgb = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./snippets/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: rgb("--bg"),
        surface: rgb("--surface"),
        "surface-2": rgb("--surface-2"),
        ink: rgb("--ink"),
        "ink-muted": rgb("--ink-muted"),
        rust: rgb("--rust"),
        "rust-dark": rgb("--rust-dark"),
        moss: rgb("--moss"),
        rule: rgb("--rule")
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      },
      maxWidth: {
        page: "1280px"
      }
    }
  },
  plugins: []
};

export default config;
