/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        soft: "#F0F0F0",
        text: {
          DEFAULT: "#333333",
          light: "#808080",
        },
        brand: {
          DEFAULT: "#4CAF50",   // <-- aquí debe estar el verde
          dark: "#2E7D32",
          light: "#A5D6A7",
        },
        danger: "#FF0000",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
