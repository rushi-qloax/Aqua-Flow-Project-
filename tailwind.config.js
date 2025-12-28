
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neon: '#00f2ff',
        deep: '#000000',
        surface: '#0a0a0a',
      }
    },
  },
  plugins: [],
}
