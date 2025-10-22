/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",        // Fondo principal
        soft: "#F0F0F0",        // Fondo secundario / contraste suave
        text: {
          DEFAULT: "#333333",   // Texto principal
          light: "#808080",     // Texto secundario / detalles
        },
        brand: {
          DEFAULT: "#4CAF50",   // Verde principal (acento)
          dark: "#2E7D32",      // Verde oscuro
          light: "#A5D6A7",     // Verde claro
        },
        danger: "#FF0000",      // Rojo (alertas o errores)
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)", // sombras suaves y limpias
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
