// Asegúrate de que tu cliente Axios/Fetch tiene configurado el token JWT 
// para que verifyAdminAuth funcione correctamente.
import axios from 'axios'; 

const API_BASE_URL = '/api/products'; // Asumiendo que tus rutas están bajo /api/products

export async function listAllImages() {
    const response = await axios.get(`${API_BASE_URL}/images`); // <-- Llama al nuevo endpoint
    return response.data.media; // Devuelve la lista de imágenes formateadas
}