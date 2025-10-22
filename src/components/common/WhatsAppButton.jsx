// src/components/WhatsAppButton.jsx
function WhatsAppButton() {
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
            {/* WhatsApp icon */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.5 3.5A11 11 0 1 0 12 23l-1.2-.3A10.9 10.9 0 0 1 3.5 20.5 11 11 0 0 0 20.5 3.5zM16.5 15.2c-.4 1.1-1.6 2-2.3 2.2-.9.2-1.5.3-3.2-.5-3.3-1.5-5.5-5.8-5.5-6 0-.2 0-.2.1-.3.1-.1.9-1.1 1-.1.2.9.9 2.3 2 3.1.7.5 1.3.7 2.1.9.5.1 1.1.1 1.6-.2.5-.3 1.2-.8 1.7-1.4.1-.1.2-.2.3-.1.1.2.5 1.1.5 1.5z" />
            </svg>
        </a>
    );
}

export default WhatsAppButton;
