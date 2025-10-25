// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
    FaWhatsapp,
    FaFacebookF,
    FaEnvelope,
    FaMapMarkerAlt,
    FaInstagram,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = {
        whatsapp:
            "https://wa.me/59170000000?text=Quiero%20información%20sobre%20sus%20muebles%20para%20mascotas",
        facebook: "#",
        tiktok: "#",
        instagram: "#",
        email: "mailto:contacto@lienzodevida.com",
    };

    return (
        <footer className="bg-gray-800 text-gray-200 pt-16">
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
                {/* --- Columna 1: Branding --- */}
                <div className="lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <img
                            src="src/assets/logo.png"
                            alt="Lienzo de Vida"
                            className="h-10 w-auto"
                        />
                        <span className="font-heading text-white text-xl font-bold">
                            Lienzo de Vida
                        </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                        Diseño, Confort y Calidad para tus mascotas desde{" "}
                        {currentYear - 1}. Creamos muebles únicos y duraderos para esos
                        miembros especiales de tu familia.
                    </p>
                </div>

                {/* --- Columna 2: Navegación --- */}
                <div>
                    <h4 className="font-heading text-white mb-4 border-b border-brand/50 pb-1 text-lg font-semibold">
                        Navegación
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-3">
                        <li>
                            <Link to="/" className="hover:text-brand transition duration-200">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/catalogo"
                                className="hover:text-brand transition duration-200"
                            >
                                Catálogo Completo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/nosotros"
                                className="hover:text-brand transition duration-200"
                            >
                                Nuestra Historia
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/envios-y-cobertura"
                                className="hover:text-brand transition duration-200"
                            >
                                Envíos y Cobertura
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contacto"
                                className="hover:text-brand transition duration-200"
                            >
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* --- Columna 3: Legal & Ayuda --- */}
                <div>
                    <h4 className="font-heading text-white mb-4 border-b border-brand/50 pb-1 text-lg font-semibold">
                        Legal & Ayuda
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-3">
                        <li>
                            <Link
                                to="/politica-de-privacidad"
                                className="hover:text-brand transition duration-200"
                            >
                                Política de Privacidad
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/terminos-de-servicio"
                                className="hover:text-brand transition duration-200"
                            >
                                Términos de Servicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/preguntas-frecuentes"
                                className="hover:text-brand transition duration-200"
                            >
                                Preguntas Frecuentes (FAQ)
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/devoluciones"
                                className="hover:text-brand transition duration-200"
                            >
                                Devoluciones
                            </Link>
                        </li>

                        {/* 🚀 BOTÓN DE LOGIN AÑADIDO AQUÍ */}
                        <li className="pt-2">
                            <Link
                                to="admin/login" // Asegúrate de que esta sea la ruta pública del login
                                className="text-xs text-gray-500 hover:text-brand italic transition duration-200 border border-gray-700 hover:border-brand px-2 py-1 rounded-md inline-block"
                            >
                                Acceso Admin
                            </Link>
                        </li>
                        {/* 🚀 FIN DEL BOTÓN DE LOGIN */}

                    </ul>
                </div>

                {/* --- Columna 4: Contacto & Redes --- */}
                <div>
                    <h4 className="font-heading text-white mb-4 border-b border-brand/50 pb-1 text-lg font-semibold">
                        Contáctanos
                    </h4>
                    <ul className="text-sm text-gray-400 space-y-3 mb-6">
                        <li className="flex items-start gap-3">
                            <FaMapMarkerAlt className="w-4 h-4 mt-1 text-brand flex-shrink-0" />
                            <span>Quillacollo, Cochabamba, Bolivia</span>
                        </li>
                        <li>
                            <a
                                href={socialLinks.email}
                                className="flex items-center gap-3 hover:text-brand transition duration-200"
                            >
                                <FaEnvelope className="w-4 h-4 text-brand" />
                                contacto@lienzodevida.com
                            </a>
                        </li>
                    </ul>

                    {/* Botón WhatsApp */}
                    <a
                        href={socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-brand text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-dark transition duration-300 w-full text-sm shadow-lg"
                    >
                        <FaWhatsapp className="w-5 h-5" /> Escríbenos por WhatsApp
                    </a>

                    {/* Redes Sociales */}
                    <h4 className="font-heading text-white mb-3 mt-8 text-sm uppercase tracking-wider">
                        Síguenos en redes
                    </h4>
                    <div className="flex items-center gap-4">
                        <a
                            href={socialLinks.tiktok}
                            aria-label="TikTok"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-brand transition duration-200"
                        >
                            <SiTiktok className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.facebook}
                            aria-label="Facebook"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-brand transition duration-200"
                        >
                            <FaFacebookF className="w-6 h-6" />
                        </a>
                        <a
                            href={socialLinks.instagram}
                            aria-label="Instagram"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-brand transition duration-200"
                        >
                            <FaInstagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* --- Copyright --- */}
            <div className="border-t border-gray-700 py-4 bg-gray-900">
                <div className="container mx-auto px-6 text-center text-sm text-gray-500">
                    © {currentYear} Lienzo de Vida. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}