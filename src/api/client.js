// src/api/client.js

// 🚨 Asegúrate de reemplazar esta URL con la de tu servidor (ej: http://localhost:4000)
const API_BASE_URL = 'https://lienzo-backend.onrender.com/api/v1';

// Función para obtener el token JWT almacenado (ej: en localStorage)
const getAuthToken = () => {
    return localStorage.getItem('admin_token');
};

/**
 * Función genérica para hacer peticiones autenticadas a la API.
 * @param {string} endpoint - La ruta específica (ej: '/products/123').
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE).
 * @param {object} body - Datos a enviar para POST/PUT.
 * @param {boolean} isFile - Indica si el body es FormData (para subir archivos).
 */
export const fetchApi = async (endpoint, method = 'GET', body = null, isFile = false) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();

    const headers = {};
    if (token) {
        // Añadir el token a todas las peticiones, incluida la de login (aunque esté vacío, no pasa nada)
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Solo si NO estamos subiendo un archivo, añadimos Content-Type: application/json
    // Nota: El navegador añade automáticamente 'Content-Type: multipart/form-data' con FormData.
    if (!isFile) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        method,
        headers,
        body: body && (isFile ? body : JSON.stringify(body)),
    };

    try {
        const response = await fetch(url, config);

        // Si no hay contenido (ej: DELETE 204), devolvemos éxito sin parsear JSON
        if (response.status === 204) {
            return { success: true };
        }

        // Leer la respuesta como JSON
        const data = await response.json();

        if (!response.ok) {
            // 🚨 MANEJO MEJORADO DE ERRORES:
            // 1. Manejar el token expirado/inválido
            if (response.status === 401 && token) {
                console.error("Token expirado o inválido. Redirigiendo a login...");
                // Aquí debes limpiar el token y redirigir (ej. usando window.location.href o un contexto)
                localStorage.removeItem('admin_token');
                localStorage.removeItem('userRole');
                // window.location.href = '/admin/login'; // Descomentar en producción
            }

            // 2. Lanzar el error con el mensaje directo del backend (data.error)
            // Esto asegura que mensajes como "Credenciales inválidas" lleguen al frontend.
            const errorMessage = data.error || `Error del servidor. Status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return data; // Retorna la data del éxito (incluido el token en el login)
    } catch (error) {
        // 🚨 CORRECCIÓN: Evitar re-envolver un error ya existente
        // Si el error ya es un 'Error' de JavaScript (incluidos los lanzados arriba), lo relanzamos.
        // Esto captura fallos de red (TypeError: Failed to fetch) o el error lanzado por nosotros.

        // Si es un error de red (TypeError), lanzamos un mensaje amigable
        if (error.name === 'TypeError' && !error.message.includes('HTTP error')) {
            error.message = 'Error de conexión. ¿Está el servidor activo (http://localhost:4000)?';
        }

        console.error("Error en fetchApi:", error);
        throw error;
    }
};