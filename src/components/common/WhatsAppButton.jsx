// src/components/WhatsAppButton.jsx
import { FaWhatsapp } from "react-icons/fa";

// Definición de la animación personalizada (no es una clase Tailwind estándar)
// Asegúrate de que tu configuración de Tailwind permite animaciones personalizadas
// o usa un enfoque más simple si no quieres configurar nuevas keyframes.

export default function WhatsAppButton() {
    const phone = "59170000000"; // Reemplaza por tu número
    const text = encodeURIComponent("Hola 👋 Estoy interesado en sus productos.");
    const href = `https://wa.me/${phone}?text=${text}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chatear por WhatsApp"
            title="Chatea con nosotros"
            // 💡 UX Mejorada: Ajuste de posición y estilo
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center 
                       w-16 h-16 sm:w-14 sm:h-14 
                       rounded-full bg-green-500 text-white shadow-xl 
                       transform transition duration-300 hover:scale-[1.1] hover:shadow-2xl 
                       
                       // 💡 Animación: Usamos una animación de latido más sutil y atractiva
                       animate-ping-once"

            style={{
                backgroundColor: '#25D366' // Color oficial de WhatsApp para mayor reconocimiento
            }}  
        >
            <FaWhatsapp className="w-8 h-8 sm:w-7 sm:h-7" />
        </a>
    );
}

// NOTA IMPORTANTE: Para usar "animate-ping-once" o similar,
// debes añadir la animación personalizada en tu archivo tailwind.config.js:

/* // tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'ping-once': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '20%': { transform: 'scale(1.1)', opacity: 0.7 }
        },
      },
      animation: {
        'ping-once': 'ping-once 1.5s ease-out 1', // Se ejecuta una sola vez al cargar
        // O si quieres un pulso continuo muy suave:
        // 'pulse-subtle': 'ping-once 2s infinite ease-in-out', 
      }
    }
  }
}
*/