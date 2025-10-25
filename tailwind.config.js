/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Contenido y rutas (SE MANTIENEN)
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  // 2. Definición del tema y extensiones
  theme: {
    extend: {
      // --- Colores y Tipografía (COPIADO de la primera exportación) ---
      colors: {
        base: "#FFFFFF",
        soft: "#F0F0F0",
        text: {
          DEFAULT: "#333333",
          light: "#808080",
        },
        brand: {
          DEFAULT: "#4CAF50", // <-- El verde de la marca
          dark: "#2E7D32",
          light: "#A5D6A7",
        },
        danger: "#FF0000",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Lato", "sans-serif"],
      },

      // --- Keyframes (Añadimos 'fade-in') ---
      keyframes: {
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '20%': { transform: 'scale(1.1)', opacity: 0.7 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        // 💡 NUEVO KEYFRAME: Para el desvanecimiento de los testimonios
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },

      // --- Animaciones (Añadimos 'fade-in') ---
      animation: {
        'ping-once': 'ping-once 1.5s ease-out 1', // WhatsApp
        // 💡 NUEVA ANIMACIÓN: Para que el testimonio se desvanezca al cambiar
        'fade-in': 'fade-in 0.5s ease-out', // Testimonios
      }
    },
  },

  // 3. Plugins (SE MANTIENEN)
  plugins: [require('tailwind-scrollbar-hide')],

};