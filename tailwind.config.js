/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4CAF50",   // Verde principal
          dark: "#2E7D32",      // Verde oscuro
          light: "#A5D6A7"      // Verde claro
        }
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"]
      }
    },
  },
  plugins: [],
};
