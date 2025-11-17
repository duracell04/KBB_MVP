/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1221",
        midnight: "#101A32",
        cyan: "#1EE6D3",
        teal: "#11B5B8",
        slate: "#94A3B8",
        cloud: "#E2E8F0"
      },
      fontFamily: {
        display: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        glow: "0 40px 80px -40px rgba(30, 230, 211, 0.45)"
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at center, rgba(30, 230, 211, 0.12), transparent 60%)"
      }
    }
  },
  plugins: []
};
