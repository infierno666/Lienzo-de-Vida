// src/layouts/AdminLayout.jsx 

import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
    FaBoxOpen, FaChartBar, FaCog, FaHome, FaImage, FaSignOutAlt,
    FaUser, FaUsers, FaFileAlt, FaEye, FaChevronLeft, FaBars, FaTimes,
} from "react-icons/fa";

// Colores consistentes
const BRAND_COLOR = "text-blue-600";
const ACTIVE_BG_COLOR = "bg-blue-50";
const ACTIVE_TEXT_COLOR = "text-blue-700";
const TRANSITION_DURATION = "duration-500";

// --- Función de Logout ---
const handleLogout = (navigate) => {
    // 🚨 CORRECCIÓN CLAVE: Usamos 'admin_token' en lugar de 'isLoggedIn'
    localStorage.removeItem("admin_token");
    localStorage.removeItem("userRole");
    navigate("/admin/login", { replace: true });
};

// --- Subcomponente: Contenido de la Sidebar (Reutilizable en Desktop y Móvil) ---
function SidebarContent({ open, navigate, setOpen }) {
    // El resto de la lógica de SidebarContent es correcto
    return (
        <>
            {/* Logo & Toggle */}
            <div className={`flex items-center ${open ? "justify-between" : "justify-center"} p-4 h-16 border-b border-gray-100 overflow-hidden`}>
                <Link to="/admin" className={`flex items-center gap-2 ${open ? "translate-x-0" : "translate-x-0"}`}>
                    <div className={`text-3xl font-extrabold ${BRAND_COLOR} flex-shrink-0`}>
                        <FaChartBar />
                    </div>
                    {/* 🔑 CLAVE: El texto animado */}
                    <span className={`font-heading font-extrabold text-xl text-gray-900 whitespace-nowrap overflow-hidden ${open ? "opacity-100 w-auto" : "opacity-0 w-0"} transition-all ${TRANSITION_DURATION}`}>
                        Lienzo Admin
                    </span>
                </Link>

                {/* Botón de Colapso (Desktop) / Cierre (Mobile) */}
                <button
                    onClick={() => setOpen(!open)}
                    className={`text-gray-400 hover:text-gray-700 transition ${open ? "block" : "hidden"} lg:block`}
                    title={open ? "Colapsar menú" : "Expandir menú"}
                >
                    <FaChevronLeft className={`${open ? "rotate-0" : "rotate-180"} transition-transform ${TRANSITION_DURATION} ease-in-out`} />
                </button>

                {/* Botón de Cierre (Solo visible en Móvil) */}
                <button
                    onClick={() => setOpen(false)}
                    className={`text-gray-500 hover:text-gray-800 transition lg:hidden ${open ? "block" : "hidden"}`}
                    title="Cerrar menú"
                >
                    <FaTimes />
                </button>
            </div>

            {/* Navegación Principal */}
            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                {/* Secciones de menú (Sección Principal) */}
                <div className={`px-5 my-2 ${open ? "block" : "hidden"}`}>
                    <h3 className={`text-xs uppercase text-gray-400 font-semibold mb-1`}>Menú Principal</h3>
                </div>

                <SidebarItem to="/admin" icon={<FaHome />} label="Dashboard" open={open} />
                <SidebarItem to="/admin/productos" icon={<FaBoxOpen />} label="Productos" open={open} />
                <SidebarItem to="/admin/medios" icon={<FaImage />} label="Biblioteca de Medios" open={open} />

                <div className="px-5 my-4 border-t border-gray-100 pt-4">
                    <h3 className={`text-xs uppercase text-gray-400 font-semibold mb-2 ${open ? "block" : "hidden"}`}>
                        Herramientas
                    </h3>
                </div>

                <SidebarItem to="/admin/paginas" icon={<FaFileAlt />} label="Páginas CMS" open={open} />
                <SidebarItem to="/admin/usuarios" icon={<FaUsers />} label="Gestión de Usuarios" open={open} />
                <SidebarItem to="/admin/analiticas" icon={<FaChartBar />} label="Reportes & Data" open={open} />
                <SidebarItem to="/admin/ajustes" icon={<FaCog />} label="Configuración" open={open} />
            </nav>

            {/* Botón de Logout */}
            <div className="border-t border-gray-100 p-4">
                <button
                    onClick={() => handleLogout(navigate)}
                    className={`w-full flex items-center ${open ? "justify-start px-3 gap-3" : "justify-center"} text-red-500 hover:text-red-700 transition p-2 rounded-lg hover:bg-red-50`}
                    title={!open ? "Cerrar sesión" : undefined}
                >
                    <FaSignOutAlt className="text-lg flex-shrink-0" />
                    <span className={`font-semibold whitespace-nowrap text-sm overflow-hidden transition-all ${TRANSITION_DURATION} ${open ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}`}>
                        Cerrar sesión
                    </span>
                </button>
            </div>
        </>
    );
}

// --- Componente SidebarItem (Fluidez Optimizada) ---
function SidebarItem({ to, icon, label, open }) {
    const location = useLocation();
    const isActive = location.pathname === to ||
        (to !== "/admin" && location.pathname.startsWith(to));

    return (
        <Link
            to={to}
            className={`
                flex items-center 
                ${open ? "justify-start px-5" : "justify-center px-0"}
                gap-3 py-2 
                rounded-lg mx-3 transition-colors duration-200
                ${isActive
                    ? `font-semibold ${ACTIVE_TEXT_COLOR} ${ACTIVE_BG_COLOR} shadow-sm`
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }
            `}
            title={!open ? label : undefined}
        >
            <span className={`text-xl flex-shrink-0 ${isActive ? ACTIVE_TEXT_COLOR : "text-gray-500"}`}>{icon}</span>
            {/* 🔑 CLAVE: Mejor control del texto para que se oculte sin afectar el ícono */}
            <span className={`
                text-sm whitespace-nowrap overflow-hidden 
                transition-all ${TRANSITION_DURATION} ease-in-out
                ${open ? "opacity-100 max-w-full" : "opacity-0 max-w-0"}
            `}>
                {label}
            </span>
        </Link>
    );
}


// --- AdminLayout Principal (Contenedor) ---
export default function AdminLayout() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-700">

            {/* 1. SIDEBAR DESKTOP (Fija y Fluida) */}
            <aside
                className={`
                    ${sidebarOpen ? "w-64" : "w-20"} 
                    bg-white shadow-lg flex-shrink-0 h-screen sticky top-0 z-30 
                    transition-all ${TRANSITION_DURATION} ease-in-out flex-col border-r border-gray-100
                    hidden lg:flex
                `}
            >
                <SidebarContent open={sidebarOpen} navigate={navigate} setOpen={setSidebarOpen} />
            </aside>

            {/* 2. CONTENIDO PRINCIPAL Y HEADER */}
            <div className="flex-1 flex flex-col">

                {/* Header Superior (Sticky) */}
                <header className="flex justify-between items-center bg-white shadow-sm px-6 py-3 h-16 sticky top-0 z-20 border-b border-gray-100">

                    {/* Sección IZQUIERDA: Mobile Toggle / Botón Principal */}
                    <div className="flex items-center gap-4">
                        {/* Botón de Menú (Visible en Móvil) */}
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-gray-500 hover:text-gray-900 transition lg:hidden"
                            title="Abrir menú"
                        >
                            <FaBars className="text-xl" />
                        </button>

                        {/* Botón Ver Sitio (Siempre visible) */}
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-blue-600 transition"
                        >
                            <FaEye className="text-base" />
                            <span className="hidden sm:inline">Ver sitio web</span>
                        </a>
                    </div>

                    {/* Sección DERECHA: Perfil del Usuario */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-700 hidden sm:inline">Hola, Admin</span>
                        <div className={`w-9 h-9 rounded-full bg-blue-100 ${BRAND_COLOR} flex items-center justify-center font-bold border border-blue-200`}>
                            <FaUser />
                        </div>
                    </div>
                </header>

                {/* Contenido Dinámico (Outlet) */}
                <main className="flex-1 p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* 3. SIDEBAR MÓVIL (Overlay y Contenido) */}
            {sidebarOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
                    ></div>

                    {/* Sidebar Móvil Real */}
                    <aside
                        className={`w-64 bg-white shadow-2xl fixed inset-y-0 left-0 z-40 flex flex-col transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform ${TRANSITION_DURATION} lg:hidden`}
                    >
                        <SidebarContent open={true} navigate={navigate} setOpen={setSidebarOpen} />
                    </aside>
                </>
            )}
        </div>
    );
}