// src/api/authService.js

// Importa fetchApi desde tu módulo cliente
import { fetchApi } from './client.js'; 

export const loginAdmin = async (email, password) => {
    // 1. Llamada a la API del backend
    // No usamos 'try/catch' aquí. Si fetchApi lanza un Error (ej. 401, 403), 
    // lo dejamos que se propague hacia Login.jsx.
    const data = await fetchApi('/auth/login', 'POST', { email, password });
    
    // 2. Validación y Almacenamiento del Token (Este código solo se ejecuta si la API responde 200/201)
    if (data && data.token && data.user) {
        // Almacenar el token al iniciar sesión exitosamente
        localStorage.setItem('admin_token', data.token);
        // Almacenar el rol (útil para comprobaciones de ruta)
        localStorage.setItem('userRole', data.user.role); 
    } else {
        // En un caso muy raro de éxito 200 pero sin token/user, lanzamos un error interno
        // Esto previene la redirección si la respuesta es incompleta
        throw new Error("Respuesta del servidor incompleta. Contacte soporte.");
    }
    
    // 3. Retornar los datos del usuario para el componente
    return data.user;

    // NOTA: Si 'fetchApi' está diseñado para lanzar un 'Error' con el mensaje del servidor (ej. 403 Forbidden), 
    // ¡no necesitas un 'try/catch' en este nivel! El 'try/catch' del componente Login.jsx lo capturará.
};