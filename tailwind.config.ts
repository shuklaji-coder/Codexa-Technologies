import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05050A",
        surface: {
          50: "#151525",
          100: "#11111C",
          200: "#0B0B14",
          300: "#07070E",
        },
        violet: {
          primary: "#6C4CF5",
          light: "#8B6CFF",
          glow: "#9E82FF",
          dark: "#4B2DE8",
        },
        silver: {
          light: "#F2F2F7",
          DEFAULT: "#D1D1DE",
          muted: "#9A9AA8",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1B5",
          muted: "#6B6B82",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Space Grotesk", "sans-serif"],
        body: ["var(--font-body)", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, var(--tw-gradient-stops))",
        "chrome-gradient": "linear-gradient(135deg, #FFFFFF 0%, #D8D8E8 40%, #8E8EA0 100%)",
        "violet-gradient": "linear-gradient(135deg, #6C4CF5 0%, #8B6CFF 50%, #B899FF 100%)",
        "violet-metallic": "linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 50%, #6C4CF5 100%)",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
