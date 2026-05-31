/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#20B2AA",
        highlight: "#20B2A6",
        surface: "rgba(255, 255, 255, 0.05)",
        border: "rgba(255, 255, 255, 0.1)",
        "primary-foreground": "#FFFFFF",
        "muted-foreground": "#A0AEC0",
        background: "#0A0A0A",
        foreground: "#FFFFFF",
        secondary: "#1A1A1A",
        "secondary-foreground": "#A0AEC0",
        card: "#111111",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "float": "float 3s ease-in-out infinite",
        "marquee": "marquee 20s linear infinite",
        "slow-drift": "slowDrift 15s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)", filter: "blur(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slowDrift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(15px, -15px)" },
          "50%": { transform: "translate(0, -25px)" },
          "75%": { transform: "translate(-15px, -15px)" },
        },
      },
    },
  },
  plugins: [],
}