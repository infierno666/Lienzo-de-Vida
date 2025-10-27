// src/components/AuthGuard.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Obtener los dos valores necesarios
        // 🚨 CAMBIO CLAVE: Usar 'admin_token' en lugar de 'isLoggedIn'
        const token = localStorage.getItem("admin_token");
        const role = localStorage.getItem("userRole");

        // 2. Definir la condición de acceso: DEBE existir el token Y DEBE ser 'admin'
        // NOTA: La existencia del token (token !== null) equivale a estar logueado.
        const isAdmin = !!token && role === "admin";

        if (isAdmin) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);

            // Opcional: Limpiar cualquier sesión incompleta/inválida
            if (token || role) { // Si existe el token O el rol
                localStorage.removeItem("admin_token");
                localStorage.removeItem("userRole");
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        // Muestra un loader mientras verifica la sesión (está bien mantenerlo)
        return <div className="text-center p-10">Verificando acceso...</div>;
    }

    // Si está autenticado como ADMIN, permite que se renderice el AdminLayout
    if (isAuthenticated) {
        return <Outlet />;
    }

    // Si NO está autenticado como ADMIN, redirige al login
    return <Navigate to="/admin/login" replace />;
}