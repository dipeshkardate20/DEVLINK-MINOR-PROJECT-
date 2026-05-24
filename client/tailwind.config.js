/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070d",
        panel: "#0b111d",
        line: "rgba(255,255,255,0.1)",
        neon: "#38bdf8"
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.22)"
      }
    }
  },
  plugins: []
};
