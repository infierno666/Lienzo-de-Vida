// src/components/WhatsAppButton.jsx
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
    const phone = "59170000000"; // reemplaza por tu número
    const text = encodeURIComponent("Hola 👋 Estoy interesado en sus productos.");
    const href = `https://wa.me/${phone}?text=${text}`;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chatear por WhatsApp"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand text-white shadow-lg transform transition hover:scale-105 motion-safe:animate-pulse-slow"
            title="Chatea con nosotros"
        >
            <FaWhatsapp className="w-7 h-7" />
        </a>
    );
}
