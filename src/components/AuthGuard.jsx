// src/components/AuthGuard.jsx

import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AuthGuard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Obtener los dos valores necesarios
        const logged = localStorage.getItem("isLoggedIn");
        const role = localStorage.getItem("userRole"); // 💡 CLAVE: Obtener el rol

        // 2. Definir la condición de acceso: DEBE estar logueado Y DEBE ser 'admin'
        const isAdmin = logged === "true" && role === "admin";

        if (isAdmin) {
            // Si cumple ambas condiciones, el acceso es exitoso
            setIsAuthenticated(true);
        } else {
            // Si falta alguno (no logueado, o logueado pero sin rol 'admin'), el acceso falla
            setIsAuthenticated(false);

            // Opcional: Limpiar cualquier sesión incompleta para forzar un nuevo login
            if (logged) {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("userRole");
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        // Muestra un loader mientras verifica la sesión (evita el "flicker")
        return <div className="text-center p-10">Verificando acceso...</div>;
    }

    // Si está autenticado como ADMIN, permite que se renderice el AdminLayout
    if (isAuthenticated) {
        return <Outlet />;
    }

    // Si NO está autenticado como ADMIN, redirige al login
    // El 'replace' asegura que el historial del navegador no guarde la ruta /admin
    return <Navigate to="/admin/login" replace />;
}