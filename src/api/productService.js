// src/api/productService.js

import { fetchApi } from './client.js';

/** --- PRODUCTOS --- **/

// R: Obtener todos los productos
export const getAllProducts = () => fetchApi('/products', 'GET');

// R: Obtener un producto por ID
export const getProductById = (id) => fetchApi(`/products/${id}`, 'GET');

// C: Crear un nuevo producto
export const createProduct = (productData) => fetchApi('/products', 'POST', productData);
export const getProductBySlug = (slug) => fetchApi(`/products/slug/${slug}`, "GET");

// U: Actualizar un producto
export const updateProduct = (id, productData) => fetchApi(`/products/${id}`, 'PUT', productData);

// D: Eliminar un producto
export const deleteProduct = (id) => fetchApi(`/products/${id}`, 'DELETE');


/** --- IMÁGENES --- **/
// ----------------------------------------------------------------------
// 🆕 Obtener todas las imágenes del Storage para la MediaLibrary
// ----------------------------------------------------------------------
export const listAllProductImages = async () => {
    try {
        const data = await fetchApi("/products/images", "GET");
        // El endpoint devuelve { media: [...] }, por lo que retornamos solo la lista
        return data.media; 
    } catch (error) {
        console.error("Error en listAllProductImages:", error);
        throw new Error("Fallo al listar las imágenes del storage.");
    }
};
/**
 * Sube un archivo de imagen a Supabase Storage
 * @param {File} file - El archivo de imagen a subir
 * @returns {Promise<{url: string, storagePath: string}>} Objeto con URL y ruta de almacenamiento
 */
export const uploadProductImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        // isFile = true evita que fetchApi ponga Content-Type: application/json
        const data = await fetchApi('/products/upload', 'POST', formData, true);
        return data; // { url, storagePath }
    } catch (error) {
        console.error("Error en uploadProductImage:", error);
        throw new Error("Fallo al subir la imagen.");
    }
};

/**
 * Elimina una imagen de Supabase Storage
 * @param {string} filePath - La ruta del archivo en Supabase Storage
 * @returns {Promise<any>}
 */
export const deleteStorageFile = async (filePath) => {
    if (!filePath) throw new Error("Debe proporcionarse la ruta del archivo.");

    try {
        // ✅ Enviar filePath como body JSON, como espera el backend
        return await fetchApi('/products/storage', 'DELETE', { filePath });
    } catch (error) {
        console.error("Error en deleteStorageFile:", error);
        throw new Error("Fallo al eliminar la imagen del storage.");
    }
};
