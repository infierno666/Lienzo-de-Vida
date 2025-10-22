// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [catOpenMobile, setCatOpenMobile] = useState(false);
    const mobileRef = useRef();

    // close mobile menu on outside click
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
        <header className="fixed inset-x-0 top-0 z-50 bg-base/80 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3">
                        <img src="/assets/logo.svg" alt="Lienzo de Vida" className="h-10 w-10" />
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
                                            `px-2 py-1 font-medium ${isActive ? "text-brand" : "text-text"}`
                                        }
                                    >
                                        {item.name}
                                    </NavLink>

                                    {/* Submenu: appears on hover (desktop) */}
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
                        <div className="flex items-center gap-3 ml-4">
                            <a href="#" aria-label="TikTok" className="text-gray-500 hover:text-brand transition">
                                {/* TikTok simple icon */}
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 8v8a4 4 0 1 0 4-4V6h3a6 6 0 1 1-6 6z" /></svg>
                            </a>
                            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-brand transition">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 4.99 3.66 9.12 8.44 9.95v-7.04H8.1v-2.91h2.34V9.41c0-2.31 1.38-3.59 3.5-3.59.99 0 2.03.18 2.03.18v2.23h-1.14c-1.12 0-1.47.7-1.47 1.42v1.7h2.5l-.4 2.91h-2.1V22c4.78-.83 8.44-4.96 8.44-9.93z" /></svg>
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
                            {/* hamburger */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                            </svg>
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
                                                <svg className={`w-4 h-4 transform transition ${catOpenMobile ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06-.02L10 10.94l3.71-3.75a.75.75 0 111.06 1.06l-4.24 4.29a.75.75 0 01-1.06 0L5.25 8.25a.75.75 0 01-.02-1.04z" /></svg>
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

export default Header;
