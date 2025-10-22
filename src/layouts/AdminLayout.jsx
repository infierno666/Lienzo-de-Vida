import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminLayout() {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const logged = localStorage.getItem("isLoggedIn");
        if (!logged) navigate("/admin/login");
        else setIsAuth(true);
    }, [navigate]);

    if (!isAuth) return null;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="bg-brand-dark text-white w-64 p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-heading mb-8 text-center">Panel Admin</h1>
                    <nav className="space-y-4">
                        <Link to="/admin" className="block hover:text-brand-light">
                            Dashboard
                        </Link>
                        <Link to="/admin/productos" className="block hover:text-brand-light">
                            Productos
                        </Link>
                        <Link to="/admin/medios" className="block hover:text-brand-light">
                            Biblioteca de Medios
                        </Link>
                    </nav>
                </div>

                <button
                    onClick={() => {
                        localStorage.removeItem("isLoggedIn");
                        navigate("/admin/login");
                    }}
                    className="bg-red-500 hover:bg-red-600 mt-8 w-full py-2 rounded-lg transition"
                >
                    Cerrar sesión
                </button>
            </aside>

            {/* Contenido */}
            <main className="flex-1 p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
