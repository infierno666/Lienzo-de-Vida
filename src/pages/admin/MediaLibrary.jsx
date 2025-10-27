import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
    FaUpload,
    FaSearch,
    FaImage,
    FaTrash,
    FaEdit,
    FaTimes,
    FaRegCalendarAlt,
    FaFilter,
    FaSpinner, // ⬅️ Añadido para el estado de carga
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// 🚨 IMPORTAR EL SERVICIO REAL
// Reemplaza '../api/productService' con la ruta correcta en tu proyecto.
import { 
    listAllProductImages, 
    uploadProductImage, 
    deleteStorageFile 
// Subir dos niveles (pages/admin -> src) y luego bajar a api
} from "../../api/productService";


// -----------------------------------------------------------
// Componente MediaGridItem (Se mantiene igual, ahora usa la data real)
// -----------------------------------------------------------
const MediaGridItem = ({ media, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md cursor-pointer 
                        transition-all duration-300 hover:shadow-xl hover:ring-2 hover:ring-indigo-500"
            onClick={() => onClick(media)}
        >
            {/* Contenido (Miniatura) */}
            <img
                src={media.url}
                alt={media.name}
                className="w-full h-40 object-cover"
            />

            {/* Overlay de Hover para mostrar nombre */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                <p className="text-white font-semibold text-sm truncate max-w-full">{media.name}</p>
            </div>

            {/* Pie de página con tipo/tamaño */}
            <div className='p-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center'>
                <span className='text-xs font-medium text-gray-600 truncate'>{media.name}</span>
                <span className='text-xs text-gray-400 font-medium'>{media.size}</span>
            </div>
        </motion.div>
    );
};

// -----------------------------------------------------------
// Componente DataRow (Se mantiene igual)
// -----------------------------------------------------------
const DataRow = ({ label, value, icon: Icon, isURL = false }) => (
    <div className="flex justify-between items-start border-b border-gray-100 py-2">
        <span className="text-sm font-semibold text-gray-600 flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-indigo-400" />}
            {label}
        </span>
        {isURL ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-800 break-all text-right max-w-[60%] transition">
                {value.substring(0, 30)}...
            </a>
        ) : (
            <span className="text-sm text-gray-800 font-medium text-right max-w-[60%]">{value}</span>
        )}
    </div>
);


// -----------------------------------------------------------
// Componente MediaDetailModal (Añadida la prop onDeleted)
// -----------------------------------------------------------
const MediaDetailModal = ({ media, onClose, onDeleted }) => {
    if (!media) return null;

    // Lógica de Eliminación
    const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar la imagen "${media.name}"? Esta acción es irreversible.`)) {
            return;
        }

        try {
            // El campo 'storagePath' es crucial para el endpoint de eliminación
            await deleteStorageFile(media.storagePath); 
            alert("Imagen eliminada exitosamente.");
            onDeleted(media.id); // Notifica al componente padre para refrescar la lista
            onClose(); // Cierra el modal
        } catch (error) {
            alert(`Error al eliminar la imagen: ${error.message}`);
            console.error("Error al eliminar imagen:", error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 truncate pr-4">Detalles de la Imagen</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition p-2 rounded-full hover:bg-gray-100">
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col md:flex-row max-h-[70vh] overflow-y-auto">
                    {/* Columna de Vista Previa */}
                    <div className="md:w-1/2 p-6 md:p-8 flex items-center justify-center bg-gray-50 flex-shrink-0">
                        <img
                            src={media.url} 
                            alt={media.name}
                            className="max-h-full max-w-full rounded-lg shadow-lg border border-gray-200"
                        />
                    </div>

                    {/* Columna de Metadatos */}
                    <div className="md:w-1/2 p-6 md:p-8 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Metadatos</h3>

                        <DataRow label="Nombre del Archivo" value={media.name} />
                        <DataRow label="Formato" value={media.mimeType.split('/')[1].toUpperCase()} /> 
                        <DataRow label="Fecha de Subida" value={media.date} icon={FaRegCalendarAlt} />
                        <DataRow label="Tamaño" value={media.size} />
                        <DataRow label="URL de Acceso" value={media.url} isURL={true} />

                        {/* Descripción/Alt Text */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-1">Descripción / Texto Alt</label>
                            <textarea
                                defaultValue={media.description}
                                rows="3"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                placeholder="Texto descriptivo para accesibilidad y SEO..."
                            />
                        </div>
                    </div>
                </div>

                {/* Footer del Modal con Acciones */}
                <div className="flex justify-end p-6 md:p-8 bg-gray-50 border-t border-gray-100 gap-3">
                    <button 
                        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                        onClick={handleDelete} // ⬅️ Lógica de Eliminación
                    >
                        <FaTrash className="w-4 h-4" /> Eliminar
                    </button>
                    <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition">
                        <FaEdit className="w-4 h-4" /> Guardar Cambios
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};


// -----------------------------------------------------------
// --- Componente Principal (Lógica de API y Subida) ---
// -----------------------------------------------------------
export default function MediaLibrary() {
    // ⬅️ Estados para manejar la data real
    const [mediaList, setMediaList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // Nuevo estado de subida

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMedia, setSelectedMedia] = useState(null);

    // Función de Carga de Datos
    const fetchMedia = useCallback(async () => {
        setLoading(true);
        setFetchError(null);
        try {
            const data = await listAllProductImages(); 
            setMediaList(data);
        } catch (error) {
            console.error("Error al cargar la biblioteca de Supabase:", error);
            setFetchError("No se pudieron cargar las imágenes. Revise la conexión del backend.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta al montar para cargar las imágenes
    useEffect(() => {
        fetchMedia();
    }, [fetchMedia]); 

    // Lógica de Eliminación (Llamada desde el Modal)
    const handleMediaDeleted = useCallback((deletedId) => {
        // Filtra la lista para eliminar la imagen
        setMediaList(prevList => prevList.filter(media => media.id !== deletedId));
    }, []);

    // Lógica de Subida de Archivos
    const handleUploadFiles = useCallback(async (files) => {
        if (files.length === 0) return;

        setIsUploading(true);
        try {
            // Solo se permite subir un archivo a la vez para simplificar la respuesta
            const file = files[0]; 
            alert(`Subiendo: ${file.name}`);

            const uploadedData = await uploadProductImage(file);
            
            // Re-fetch para obtener la lista actualizada (más fácil que construir el objeto)
            await fetchMedia(); 
            
            alert(`Imagen "${uploadedData.name}" subida exitosamente.`);
        } catch (error) {
            alert(`Fallo en la subida: ${error.message}`);
            console.error("Fallo de subida:", error);
        } finally {
            setIsUploading(false);
        }
    }, [fetchMedia]);

    // Lógica de Drag & Drop (Usa la función de subida)
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50/50');
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50/50');
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50/50');
        handleUploadFiles(e.dataTransfer.files); // Llama a la lógica de subida
    }, [handleUploadFiles]);
    
    // Lógica para el input de archivo
    const handleFileInputChange = (e) => {
        if (e.target.files.length > 0) {
            handleUploadFiles(e.target.files);
        }
    };


    // Lógica de Filtrado usando la data real (mediaList)
    const filteredMedia = useMemo(() => {
        return mediaList.filter(media => {
            const matchesSearch = media.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        }).sort((a, b) => new Date(b.date) - new Date(a.date)); // Ordenar por fecha de subida (más reciente primero)
    }, [searchTerm, mediaList]);

    return (
        <div className="space-y-6 lg:space-y-8 animate-fadeIn p-4 md:p-8 lg:p-10">
            {/* 1. Título y Botón de Subida */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Biblioteca de Imágenes ({mediaList.length})
                </h1>

                <button
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition transform hover:scale-[1.02] disabled:bg-indigo-400"
                    onClick={() => document.getElementById('fileInput').click()}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <>
                            <FaSpinner className="text-base animate-spin" /> Subiendo...
                        </>
                    ) : (
                        <>
                            <FaUpload className="text-base" /> Subir Nueva Imagen
                        </>
                    )}
                </button>
                {/* Input de archivo real y oculto */}
                <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileInputChange}
                    disabled={isUploading}
                /> 
            </div>

            {/* 2. Área de Arrastrar y Soltar (Dropzone) */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed ${isUploading ? 'border-gray-400 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:border-indigo-500 hover:text-indigo-600'} rounded-xl p-8 text-center text-gray-500 transition duration-300`}
            >
                {isUploading ? (
                    <>
                        <FaSpinner className="w-8 h-8 mx-auto mb-2 animate-spin text-indigo-500" />
                        <p className="font-semibold text-indigo-500">Subida en progreso...</p>
                    </>
                ) : (
                    <>
                        <FaUpload className="w-8 h-8 mx-auto mb-2" />
                        <p className="font-semibold">Arrastra y suelta imágenes aquí</p>
                        <p className="text-sm">Formatos aceptados: JPEG, PNG, WEBP.</p>
                    </>
                )}
            </div>

            {/* 3. Barra de Filtros y Búsqueda */}
            <div className="bg-white shadow-lg rounded-xl p-5 flex flex-wrap items-end gap-5 border border-gray-50">
                <FaFilter className="text-indigo-500 w-5 h-5 hidden sm:block mb-1" />
                <div className="flex-1 min-w-[200px]">
                    <label htmlFor="search-media" className="block text-xs font-medium uppercase text-gray-500 mb-1">
                        Buscar por nombre
                    </label>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        <input
                            id="search-media"
                            type="text"
                            placeholder="Ej. cama_ringo, banner, jpeg..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl w-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* 4. Vista de Grid de Miniaturas (Con estados de carga y error) */}
            <div className="mt-8">
                {/* Indicador de Carga de Datos */}
                {loading && (
                    <div className="text-center p-12 text-indigo-500 font-medium text-lg bg-white rounded-xl shadow-md">
                        <FaSpinner className="animate-spin w-6 h-6 mx-auto mb-2" />
                        Cargando imágenes...
                    </div>
                )}

                {/* Mensaje de Error */}
                {fetchError && (
                    <div className="text-center p-12 text-red-700 font-medium text-lg bg-red-100 rounded-xl shadow-md border border-red-300">
                        ❌ {fetchError}
                    </div>
                )}

                {/* No hay resultados de búsqueda/archivos */}
                {!loading && !fetchError && filteredMedia.length === 0 && (
                    <div className="text-center p-12 text-gray-400 font-medium text-lg bg-white rounded-xl shadow-md">
                        😔 No se encontraron imágenes que coincidan con la búsqueda.
                    </div>
                )}
                
                {/* Grid de Archivos */}
                {!loading && !fetchError && filteredMedia.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {filteredMedia.map(media => (
                            <MediaGridItem key={media.id} media={media} onClick={setSelectedMedia} />
                        ))}
                    </div>
                )}
            </div>

            {/* 5. Modal de Detalle */}
            <AnimatePresence>
                {selectedMedia && (
                    <MediaDetailModal
                        media={selectedMedia}
                        onClose={() => setSelectedMedia(null)}
                        onDeleted={handleMediaDeleted} // ⬅️ Pasar la función de actualización
                    />
                )}
            </AnimatePresence>
        </div>
    );
}