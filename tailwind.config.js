/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./login/index.html",
    "./dashboard/index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral ramp — carried over from the reference palette unchanged.
        ink: {
          DEFAULT: "#111113", // body text
          black: "#0A0A0B", // final CTA band, wordmark
          muted: "#626873", // secondary copy
          light: "#AFB6C2", // disabled text
          lighter: "#E1E4E9",
        },
        line: "#E8EAEE", // hairline borders
        surface: "#F3F4F6", // step icon tiles, inert fills

        // The only palette change: the reference accent becomes Roomz purple.
        brand: {
          DEFAULT: "#6B21A8", // Royal Purple — CTAs, stat numbers, highlighted words
          dark: "#581C87", // hover / pressed
          soft: "#EDE9FE", // Lavender — tints, backgrounds, secondary highlights
          softEdge: "#DDD6FE", // lavender border, one step down
        },
      },
      fontFamily: {
        display: ["Fraunces", "Palanquin", "Georgia", "serif"],
        body: ["Palanquin", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
      },
      boxShadow: {
        lift: "0 24px 80px -32px rgba(16,16,18,0.25)",
        card: "0 8px 24px -12px rgba(16,16,18,0.5)",
      },
      keyframes: {
        rotIn: {
          "0%": { opacity: "0", transform: "translateY(0.45em)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rotOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-0.45em)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rotIn: "rotIn 450ms cubic-bezier(0.16,1,0.3,1) both",
        rotOut: "rotOut 300ms cubic-bezier(0.4,0,1,1) both",
        riseIn: "riseIn 600ms cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};
