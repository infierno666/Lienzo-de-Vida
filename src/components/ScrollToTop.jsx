// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que se monta al inicio de la aplicación y usa un efecto
 * para forzar el scroll de la ventana al tope (0, 0) cada vez que
 * la ruta (pathname) cambia.
 */
export default function ScrollToTop() {
    // 1. Usa useLocation para obtener la ruta actual (incluye pathname)
    const { pathname } = useLocation();

    // 2. useEffect se dispara cada vez que 'pathname' cambia
    useEffect(() => {
        // 3. Ejecuta el desplazamiento al inicio de la página
        window.scrollTo(0, 0);

        // NOTA: Si necesitas un scroll suave, puedes usar:
        // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [pathname]); // El array de dependencias asegura que el efecto se ejecute solo cuando el pathname cambie

    // Este componente no renderiza HTML, solo maneja el efecto secundario.
    return null;
}