/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "palette-1": "#321114",
        "palette-2": "#6b3f24", 
        "palette-3": "#a49837",
        "palette-4": "#a0c95e",
        "palette-5": "#a0dd98"
      }
    },
  },
  plugins: [],
  darkMode: 'class', // <-- important !
};