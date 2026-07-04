import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blueprint: {
          primary: {
            light: "#185FA5",
            dark: "#85B7EB"
          },
          secondary: {
            light: "#0F6E56",
            dark: "#5DCAA5"
          },
          background: {
            light: "#F7F7F5",
            dark: "#111214"
          },
          text: {
            light: "#1A1A1A",
            dark: "#EDEDED",
            secondaryLight: "#6B6B68",
            secondaryDark: "#A6A49B"
          },
          border: {
            light: "#DEDDD7",
            dark: "#3A3A38"
          }
        }
      },
      boxShadow: {
        card: "0 16px 40px rgb(17 18 20 / 10%)",
        cardDark: "0 18px 50px rgb(0 0 0 / 28%)"
      }
    }
  },
  plugins: []
};

export default config;
