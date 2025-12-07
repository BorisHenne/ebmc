import type { Config } from "tailwindcss";
import svgToDataUri from "mini-svg-data-uri";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // EBMC Brand Colors - Light theme with teal accent
        ebmc: {
          teal: "#2AA198",        // Main accent (the "C" in logo)
          "teal-dark": "#1D7A73",
          "teal-light": "#3DC7BD",
          black: "#1A1A1A",       // Logo text color
          gray: "#4A4A4A",
          "gray-light": "#6B6B6B",
        },
        // Light theme base
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        muted: "#F5F5F5",
        "muted-foreground": "#6B6B6B",
        border: "#E5E5E5",
        input: "#E5E5E5",
        ring: "#2AA198",
        // Primary = Teal
        primary: {
          DEFAULT: "#2AA198",
          foreground: "#FFFFFF",
          50: "#E6F5F4",
          100: "#CCEBE9",
          200: "#99D7D3",
          300: "#66C3BD",
          400: "#33AFA7",
          500: "#2AA198",
          600: "#228179",
          700: "#1A615B",
          800: "#11403D",
          900: "#09201E",
        },
        secondary: {
          DEFAULT: "#F5F5F5",
          foreground: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#2AA198",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        spotlight: "spotlight 2s ease .75s 1 forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        gradient: "gradient 8s ease infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%,-40%) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(42, 161, 152, 0.3)",
        "glow-lg": "0 0 40px rgba(42, 161, 152, 0.4)",
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [
    // Grid background plugin
    function ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" cx="10" cy="10" r="1.5"></circle></svg>`
            )}")`,
          }),
        },
        { values: { gray: "#E5E5E5", teal: "rgba(42, 161, 152, 0.3)" }, type: "color" }
      );
    },
  ],
};

export default config;
