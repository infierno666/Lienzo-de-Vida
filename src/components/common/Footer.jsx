// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 pt-10">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
                {/* Columna 1 - Branding */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/assets/logo.svg" alt="Lienzo de Vida" className="h-10 w-10" />
                        <span className="font-heading text-white text-lg">Lienzo de Vida</span>
                    </div>
                    <p className="text-sm text-gray-400">
                        Lienzo de Vida: Confort, Diseño y Calidad para tus mascotas desde 2024. Creamos muebles únicos para esos miembros especiales de tu familia.
                    </p>
                </div>

                {/* Columna 2 - Enlaces Rápidos */}
                <div>
                    <h4 className="font-heading text-white mb-3">Enlaces Rápidos</h4>
                    <ul className="text-sm text-gray-400 space-y-2">
                        <li><Link to="/" className="hover:text-brand">Inicio</Link></li>
                        <li><Link to="/catalogo" className="hover:text-brand">Catálogo</Link></li>
                        <li><a href="#" className="hover:text-brand">Ofertas</a></li>
                        <li><Link to="/nosotros" className="hover:text-brand">Nosotros</Link></li>
                        <li><Link to="/contacto" className="hover:text-brand">Contacto</Link></li>
                        <li><Link to="/envios-y-cobertura" className="hover:text-brand">Envíos y Cobertura</Link></li>
                        <li><a href="#" className="hover:text-brand">Política de Privacidad</a></li>
                    </ul>
                </div>

                {/* Columna 3 - Contacto */}
                <div>
                    <h4 className="font-heading text-white mb-3">Contacto</h4>
                    <ul className="text-sm text-gray-400 space-y-3">
                        <li>
                            <a href="https://wa.me/59170000000" className="flex items-center gap-2 hover:text-brand">
                                {/* WhatsApp icon */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M..." /></svg>
                                +591 70000000
                            </a>
                        </li>
                        <li>
                            <a href="mailto:contacto@lienzodevida.com" className="flex items-center gap-2 hover:text-brand">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M..." /></svg>
                                contacto@lienzodevida.com
                            </a>
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M..." /></svg>
                            Quillacollo, Cochabamba, Bolivia
                        </li>
                    </ul>
                </div>

                {/* Columna 4 - Redes */}
                <div>
                    <h4 className="font-heading text-white mb-3">Síguenos</h4>
                    <div className="flex items-center gap-4">
                        <a href="#" aria-label="TikTok" className="text-gray-300 hover:text-white">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M..." /></svg>
                        </a>
                        <a href="#" aria-label="Facebook" className="text-gray-300 hover:text-white">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M..." /></svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 py-4">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    © 2024 Lienzo de Vida. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
