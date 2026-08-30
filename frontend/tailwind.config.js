/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Overrides the default font for the entire site
        sans: ['Inter', 'sans-serif'], 
        // Creates a custom utility class specifically for headers
        heading: ['Montserrat', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}