import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-dim": "var(--surface-dim)",
        "surface-bright": "var(--surface-bright)",
        "surface-container-lowest": "var(--surface-container-lowest)",
        "surface-container-low": "var(--surface-container-low)",
        "surface-container": "var(--surface-container)",
        "surface-container-high": "var(--surface-container-high)",
        "surface-container-highest": "var(--surface-container-highest)",
        "surface-variant": "var(--surface-variant)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        "primary-container": "var(--primary-container)",
        "on-primary-container": "var(--on-primary-container)",
        secondary: "var(--secondary)",
        "secondary-container": "var(--secondary-container)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)"
      },
      fontFamily: {
        display: ["var(--font-kanit)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        label: ["var(--font-geist-label)", "monospace"]
      },
      fontSize: {
        "display-xl": [
          "clamp(3.45rem, 14vw, 12rem)",
          { lineHeight: "0.9", letterSpacing: "0", fontWeight: "800" }
        ],
        "headline-lg": [
          "clamp(3rem, 8vw, 6rem)",
          { lineHeight: "1", letterSpacing: "0", fontWeight: "700" }
        ],
        "label-caps": [
          "0.75rem",
          { lineHeight: "1.2", letterSpacing: "0.1em", fontWeight: "600" }
        ],
        "body-md": ["1.125rem", { lineHeight: "1.6", letterSpacing: "0.01em", fontWeight: "400" }]
      },
      spacing: {
        "safe-margin": "clamp(1.5rem, 5vw, 5rem)",
        "stack-gap": "clamp(2rem, 10vh, 8rem)",
        gutter: "1.5rem"
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      boxShadow: {
        rim: "inset 0 0 0 1px rgb(255 255 255 / 8%)",
        lift: "0 24px 90px rgb(0 0 0 / 42%)"
      }
    }
  },
  plugins: []
};

export default config;
