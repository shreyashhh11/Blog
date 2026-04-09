/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#f7f8f5",
          surface: "#ffffff",
          surface2: "#ecf4f1",
          text: "#2f3a36",
          muted: "#6f7b75",
          accent: "#a8d5c9",
          accent2: "#dff0ea",
          danger: "#c96b6b",
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(168,213,201,0.65), 0 14px 30px rgba(47,58,54,0.08)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(120deg, #a8d5c9 0%, #dff0ea 100%)",
      },
    },
  },
  plugins: [],
}

