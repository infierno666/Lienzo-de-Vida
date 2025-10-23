// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaFacebookF } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [catOpenMobile, setCatOpenMobile] = useState(false);
    const mobileRef = useRef();

    useEffect(() => {
        const handleOutside = (e) => {
            if (mobileRef.current && !mobileRef.current.contains(e.target)) {
                setMobileOpen(false);
                setCatOpenMobile(false);
            }
        };
        document.addEventListener("click", handleOutside);
        return () => document.removeEventListener("click", handleOutside);
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
        <header className="fixed inset-x-0 top-0 z-50 bg-base/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="src/assets/logo.png" alt="Lienzo de Vida" className="h-10 w-13" />
                        <span className="font-heading text-text text-xl hidden sm:inline">Lienzo de Vida</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-6">
                        {menu.map((item) =>
                            item.submenu ? (
                                <div key={item.name} className="relative group">
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `px-2 py-1 font-medium inline-flex items-center gap-2 ${isActive ? "text-brand" : "text-text"
                                            }`
                                        }
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                    </NavLink>

                                    {/* Submenu: hover (desktop) */}
                                    <div className="absolute left-0 mt-2 w-56 bg-base rounded-xl shadow-soft border border-gray-100 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto">
                                        <ul className="p-3">
                                            {item.submenu.map((s) => (
                                                <li key={s.name}>
                                                    <Link to={s.path} className="block px-3 py-2 rounded-md text-text hover:bg-soft hover:text-brand">
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
                                    className={({ isActive }) => `px-2 py-1 font-medium ${isActive ? "text-brand" : "text-text"}`}
                                >
                                    {item.name}
                                </NavLink>
                            )
                        )}

                        {/* Social icons (discrete) */}
                        <div className="flex items-center gap-3 ml-4 text-gray-500">
                            <a href="#" aria-label="TikTok" className="hover:text-brand transition">
                                <SiTiktok className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Facebook" className="hover:text-brand transition">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                        </div>
                    </nav>

                    {/* Mobile controls */}
                    <div className="md:hidden flex items-center" ref={mobileRef}>
                        <button
                            onClick={() => setMobileOpen((s) => !s)}
                            aria-label="Abrir menú"
                            className="p-2 rounded-md text-text hover:bg-soft transition"
                        >
                            {mobileOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            {mobileOpen && (
                <div className="md:hidden bg-base border-t border-gray-100">
                    <div className="container mx-auto px-4 py-4">
                        <ul className="space-y-2">
                            {menu.map((item) => (
                                <li key={item.name}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => setCatOpenMobile((s) => !s)}
                                                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-text hover:bg-soft"
                                                aria-expanded={catOpenMobile}
                                            >
                                                <span>{item.name}</span>
                                                <ChevronDownIcon className={`w-4 h-4 transform transition ${catOpenMobile ? "rotate-180" : ""}`} />
                                            </button>
                                            {catOpenMobile && (
                                                <ul className="mt-2 pl-4 space-y-1">
                                                    {item.submenu.map((s) => (
                                                        <li key={s.name}>
                                                            <Link to={s.path} className="block px-3 py-2 rounded-md hover:bg-soft text-text">
                                                                {s.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <NavLink to={item.path} className="block px-3 py-2 rounded-md hover:bg-soft text-text">
                                            {item.name}
                                        </NavLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}
