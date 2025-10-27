// src/api/client.js

// 🌍 Detectar entorno automáticamente
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// 🔗 URL base dinámica (automática)
const API_BASE_URL = isLocal
    ? 'http://localhost:4000/api/v1' // cuando trabajas localmente
    : 'https://backend-lienzo-de-vida.onrender.com/api/v1'; // backend en Render

// Función para obtener el token JWT almacenado
const getAuthToken = () => localStorage.getItem('admin_token');

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
    if (token) headers['Authorization'] = `Bearer ${token}`;

    if (!isFile) headers['Content-Type'] = 'application/json';

    const config = {
        method,
        headers,
        body: body && (isFile ? body : JSON.stringify(body)),
    };

    try {
        const response = await fetch(url, config);

        if (response.status === 204) return { success: true };

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401 && token) {
                console.error("Token expirado o inválido. Redirigiendo a login...");
                localStorage.removeItem('admin_token');
                localStorage.removeItem('userRole');
                // window.location.href = '/admin/login';
            }

            const errorMessage = data.error || `Error del servidor. Status: ${response.status}`;
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error.name === 'TypeError' && !error.message.includes('HTTP error')) {
            error.message = 'Error de conexión. ¿Está el servidor activo o accesible?';
        }
        console.error("Error en fetchApi:", error);
        throw error;
    }
};
