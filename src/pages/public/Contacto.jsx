// src/pages/public/Contacto.jsx - UI/UX Mejorada con Layout 2 Columnas

import { useState } from "react";
import { motion } from "framer-motion";
import {
    FaWhatsapp,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebook,
    FaTiktok,
    FaSpinner,
    FaChevronRight,
} from "react-icons/fa";

// Animaciones (sin cambios)
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Datos centralizados para reutilizar y facilitar la edición
const CONTACT_INFO = [
    {
        icon: FaWhatsapp,
        title: "Línea Directa",
        value: "+591 700 00000",
        href: "https://wa.me/59170000000?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20productos.",
        target: "_blank"
    },
    {
        icon: FaEnvelope,
        title: "Correo Electrónico",
        value: "contacto@lienzodevida.com",
        href: "mailto:contacto@lienzodevida.com"
    },
    {
        icon: FaMapMarkerAlt,
        title: "Ubicación Principal",
        value: "Quillacollo, Cochabamba, Bolivia",
        href: "https://www.google.com/maps?q=Quillacollo,+Cochabamba,+Bolivia",
        target: "_blank"
    },
];

export default function Contacto() {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        setTimeout(() => {
            alert("Mensaje enviado con éxito (modo demo). ¡Gracias por contactarnos!");
            setIsSending(false);
            e.target.reset();
        }, 1800);
    };

    return (
        <main className="max-w-6xl mx-auto px-6 py-12">

            {/* Título principal (Mantiene mejoras de tipografía) */}
            <motion.header
                className="text-center mb-12"
                initial="hidden"
                animate="show"
                variants={container}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-4"
                    variants={fadeUp}
                >
                    Hablemos
                </motion.h1>
                <motion.p
                    className="text-text-light max-w-2xl mx-auto text-lg"
                    variants={fadeUp}
                >
                    ¿Tienes alguna duda, sugerencia o quieres cotizar un producto especial?
                    ¡Estamos aquí para ayudarte! Elige el medio que prefieras.
                </motion.p>
            </motion.header>

            {/* Contenido principal - Restaurado a 2 columnas (lg:grid-cols-2) */}
            <motion.section
                className="grid grid-cols-1 lg:grid-cols-2 gap-10" // <-- AQUÍ SE RESTAURA EL LAYOUT
                initial="hidden"
                animate="show"
                variants={container}
            >
                {/* COLUMNA 1 - Formulario de Contacto (Mejorado) */}
                <motion.div
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-10" // <-- Se elimina 'lg:col-span-2'
                    variants={fadeUp}
                >
                    <h2 className="font-heading text-2xl text-text mb-6 border-b pb-3">
                        Envíanos un Mensaje
                    </h2>

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {/* Campos del formulario */}
                        {['Nombre Completo', 'Correo Electrónico', 'Asunto'].map((label, i) => (
                            <motion.div variants={fadeUp} key={i}>
                                <label className="block text-sm font-semibold text-text-light mb-1">
                                    {label}
                                </label>
                                <input
                                    type={label.includes('Correo') ? 'email' : 'text'}
                                    placeholder={`Ingresa ${label.toLowerCase()}`}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition"
                                    required
                                />
                            </motion.div>
                        ))}

                        <motion.div variants={fadeUp}>
                            <label className="block text-sm font-semibold text-text-light mb-1">Mensaje</label>
                            <textarea
                                placeholder="Escribe tu mensaje aquí..."
                                rows="5"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition resize-none"
                                required
                            ></textarea>
                        </motion.div>

                        {/* Botón de envío */}
                        <motion.button
                            type="submit"
                            disabled={isSending}
                            variants={fadeUp}
                            className={`flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-heading font-semibold py-3 rounded-xl transition duration-300 mt-2 ${isSending ? "opacity-70 cursor-not-allowed" : "shadow-md hover:shadow-lg"}`}
                        >
                            {isSending ? (
                                <>
                                    <FaSpinner className="animate-spin w-5 h-5" />
                                    Enviando...
                                </>
                            ) : (
                                "Enviar Mensaje"
                            )}
                        </motion.button>
                    </form>
                </motion.div>

                {/* COLUMNA 2 - Información Directa y Mapa */}
                <motion.div className="flex flex-col gap-8" variants={fadeUp}> {/* <-- Se elimina 'lg:col-span-1' */}

                    {/* Tarjetas de Contacto Directo (Mantiene mejoras UI) */}
                    <motion.div
                        className="space-y-4"
                        variants={container}
                    >
                        {CONTACT_INFO.map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                target={item.target || '_self'}
                                rel={item.target === '_blank' ? "noopener noreferrer" : undefined}
                                className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300 hover:bg-gray-50 group cursor-pointer"
                                variants={fadeUp}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className="text-brand text-2xl group-hover:text-brand-dark transition-colors" />
                                    <div>
                                        <p className="text-sm font-bold text-text mb-0.5">{item.title}</p>
                                        <p className="text-xs text-text-light">{item.value}</p>
                                    </div>
                                </div>
                                <FaChevronRight className="text-gray-400 text-sm group-hover:text-brand transition-transform group-hover:translate-x-1" />
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Horarios y Redes (Mantiene mejoras UI) */}
                    <motion.div
                        className="p-6 bg-white rounded-xl shadow-md"
                        variants={fadeUp}
                    >
                        <h3 className="font-heading text-lg text-text mb-3 border-b pb-2">
                            Horarios y Redes
                        </h3>
                        <div className="mb-4">
                            <p className="text-text-light text-sm font-semibold">Horarios de Atención:</p>
                            <p className="text-text-light text-sm">Lunes a Viernes: 9:00 - 18:00</p>
                            <p className="text-text-light text-sm">Sábados: 9:00 - 13:00</p>
                        </div>

                        {/* Redes sociales */}
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                            <a
                                href="https://www.tiktok.com/@lienzodevida"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-black text-2xl transition"
                                aria-label="Síguenos en TikTok"
                            >
                                <FaTiktok />
                            </a>
                            <a
                                href="https://www.facebook.com/lienzodevida"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-blue-600 text-2xl transition"
                                aria-label="Síguenos en Facebook"
                            >
                                <FaFacebook />
                            </a>
                        </div>
                    </motion.div>

                    {/* Mapa de Google */}
                    <motion.div
                        className="rounded-2xl overflow-hidden shadow-xl"
                        variants={fadeUp}
                    >
                        <iframe
                            title="Mapa de ubicación Lienzo de Vida"
                            src="https://www.google.com/maps?q=Quillacollo,+Cochabamba,+Bolivia&output=embed"
                            width="100%"
                            height="250"
                            loading="lazy"
                            className="border-0"
                            allowFullScreen
                        ></iframe>
                    </motion.div>
                </motion.div>
            </motion.section>
        </main>
    );
}