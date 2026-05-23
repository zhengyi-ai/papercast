import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f8",
          100: "#ececef",
          200: "#d4d4da",
          400: "#8b8b95",
          600: "#4a4a52",
          800: "#1f1f24",
          900: "#0d0d10"
        },
        accent: {
          DEFAULT: "#ff6a3d",
          soft: "#ffb89e"
        },
        host: "#5b8def",
        guest: "#e26ba3"
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif"
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(15, 15, 20, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
