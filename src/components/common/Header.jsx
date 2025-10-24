import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaFacebookF } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [catOpenMobile, setCatOpenMobile] = useState(false);
    // 💡 NUEVO ESTADO: Para controlar el despliegue del catálogo en desktop
    const [catOpenDesktop, setCatOpenDesktop] = useState(false);

    const mobileRef = useRef(null);
    const menuContentRef = useRef(null);
    // 💡 NUEVO REF: Para el botón y el submenú del Catálogo en Desktop
    const catDesktopRef = useRef(null);

    // Función para manejar el clic en un enlace y cerrar todos los menús
    const handleLinkClick = () => {
        setMobileOpen(false);
        setCatOpenMobile(false);
        setCatOpenDesktop(false); // Cierra el menú de escritorio también
    };

    useEffect(() => {
        const handleOutside = (e) => {
            // Cierre general para Mobile
            if (mobileRef.current && !mobileRef.current.contains(e.target)) {
                setMobileOpen(false);
                setCatOpenMobile(false);
            }

            // 💡 NUEVA LÓGICA: Cierre para Desktop Catalog
            if (catDesktopRef.current && !catDesktopRef.current.contains(e.target)) {
                setCatOpenDesktop(false);
            }
        };

        const timeout = setTimeout(() => {
            // Usamos mousedown para cerrar antes de que se complete el click, mejor UX
            document.addEventListener("mousedown", handleOutside);
        }, 100);

        return () => {
            clearTimeout(timeout);
            document.removeEventListener("mousedown", handleOutside);
        };
    }, []);

    const menu = [
        { name: "Inicio", path: "/" },
        {
            name: "Catálogo",
            path: "/catalogo",
            submenu: [
                { name: "Camas", path: "/catalogo?cat=Camas" },
                { name: "Muebles en General", path: "/catalogo?cat=Muebles" },
                { name: "Juguetes", path: "/catalogo?cat=Juguetes" },
                { name: "Accesorios", path: "/catalogo?cat=Accesorios" },
            ],
        },
        { name: "Nosotros", path: "/nosotros" },
        { name: "Envíos y cobertura", path: "/envios-y-cobertura" },
        { name: "Contacto", path: "/contacto" },
    ];

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-base/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3" onClick={handleLinkClick}>
                        <img src="src/assets/logo.png" alt="Lienzo de Vida" className="h-10 w-auto" />
                        <span className="font-heading text-text text-xl font-bold tracking-tight">Lienzo de Vida</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {menu.map((item) =>
                            item.submenu ? (
                                // 💡 Implementación de Clic en Desktop
                                <div key={item.name} className="relative" ref={catDesktopRef}>
                                    <NavLink
                                        // Usamos el evento onClick del Link/NavLink para manejar el submenú
                                        onClick={(e) => {
                                            // Evita navegar si hay submenú y lo abre/cierra
                                            e.preventDefault();
                                            setCatOpenDesktop((s) => !s);
                                        }}
                                        to={item.path}
                                        className={
                                            `px-2 py-1 font-medium inline-flex items-center gap-1.5 transition-colors text-lg ${
                                            // Clase activa si está abierto o la ruta coincide
                                            (catOpenDesktop || location.pathname.startsWith(item.path))
                                                ? "text-brand font-semibold"
                                                : "text-text hover:text-brand"
                                            }`
                                        }
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDownIcon
                                            className={`w-3.5 h-3.5 text-gray-400 transition-transform ${catOpenDesktop ? "rotate-180 text-brand" : ""}`}
                                        />
                                    </NavLink>

                                    {/* Submenu: VISIBILIDAD CONTROLADA POR catOpenDesktop */}
                                    {/* FIX: Se eliminó la clase 'lg:hidden' que causaba que el submenú de escritorio desapareciera en pantallas grandes. */}
                                    <div className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ease-out z-50 
                                            ${catOpenDesktop
                                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                                            : 'opacity-0 translate-y-2 pointer-events-none'
                                        }`}
                                    >
                                        <ul className="p-2">
                                            {item.submenu.map((s) => (
                                                <li key={s.name}>
                                                    <Link
                                                        to={s.path}
                                                        className="block px-3 py-2 rounded-lg text-text hover:bg-soft hover:text-brand text-base font-normal transition-colors"
                                                        onClick={handleLinkClick}
                                                    >
                                                        {s.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            ) : (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `px-2 py-1 font-medium transition-colors text-lg ${isActive ? "text-brand font-semibold border-b-2 border-brand" : "text-text hover:text-brand"
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            )
                        )}

                        {/* Social icons (discrete) */}
                        <div className="flex items-center gap-3 ml-4 text-gray-400">
                            <a href="#" aria-label="TikTok" className="hover:text-brand transition" target="_blank" rel="noopener noreferrer">
                                <SiTiktok className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Facebook" className="hover:text-brand transition" target="_blank" rel="noopener noreferrer">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                        </div>
                    </nav>

                    {/* Mobile controls */}
                    <div className="md:hidden flex items-center" ref={mobileRef}>
                        <button
                            onClick={() => setMobileOpen((s) => !s)}
                            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                            className="p-2 rounded-full text-text hover:bg-soft transition"
                        >
                            {mobileOpen ? (
                                <XMarkIcon className="w-6 h-6 text-brand" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel con transición de altura (SLIDE IN/OUT) */}
            <div
                className={`md:hidden bg-white/95 border-t border-gray-100 transition-all duration-300 ease-in-out overflow-hidden`}
                style={{ height: mobileOpen ? `${menuContentRef.current?.scrollHeight}px` : '0' }}
            >
                <div ref={menuContentRef} className="container mx-auto px-4 py-4">
                    <ul className="space-y-1">
                        {menu.map((item) => (
                            <li key={item.name}>
                                {item.submenu ? (
                                    <>
                                        <button
                                            onClick={() => setCatOpenMobile((s) => !s)}
                                            className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-text font-medium transition-colors ${catOpenMobile ? "bg-soft text-brand" : "hover:bg-soft"
                                                }`}
                                            aria-expanded={catOpenMobile}
                                        >
                                            <span>{item.name}</span>
                                            <ChevronDownIcon className={`w-4 h-4 transform transition-transform ${catOpenMobile ? "rotate-180 text-brand" : ""}`} />
                                        </button>
                                        <div className={`transition-all duration-300 ease-in-out overflow-hidden`}
                                            style={{ height: catOpenMobile ? `${item.submenu.length * 40}px` : '0' }}
                                        >
                                            <ul className="mt-1 pl-4 space-y-1 border-l border-soft ml-3">
                                                {item.submenu.map((s) => (
                                                    <li key={s.name}>
                                                        <NavLink
                                                            to={s.path}
                                                            onClick={handleLinkClick}
                                                            className={({ isActive }) =>
                                                                `block px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? "bg-soft text-brand font-semibold" : "hover:bg-soft text-text"
                                                                }`
                                                            }
                                                        >
                                                            {s.name}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <NavLink
                                        to={item.path}
                                        onClick={handleLinkClick}
                                        className={({ isActive }) =>
                                            `block px-3 py-2 rounded-lg font-medium transition-colors ${isActive ? "bg-brand text-white" : "hover:bg-soft text-text"
                                            }`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                    {/* Iconos Sociales en Mobile al final del menú */}
                    <div className="flex items-center gap-6 pt-4 mt-4 border-t border-gray-100 justify-center">
                        <a href="#" aria-label="TikTok" className="text-gray-400 hover:text-brand transition" target="_blank" rel="noopener noreferrer">
                            <SiTiktok className="w-6 h-6" />
                        </a>
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-brand transition" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
