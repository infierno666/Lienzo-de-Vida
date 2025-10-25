// src/pages/admin/ProductsList.jsx
import { useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaEye,
    FaCheckCircle,
    FaClock,
    FaRedo,
    FaFilter,
} from "react-icons/fa";
// ¡Importamos tu mockData real!
import { mockProducts } from "../../data/mockData";

// --- FUNCIONES DE UTILIDAD ---

// 💡 Simulamos el status ya que no está en el mock. ¡Ajusta esta lógica cuando tengas una API!
const getProductStatus = (id) => {
    // Ejemplo: Publicado para impares, Borrador para pares
    return id % 2 !== 0 ? "Publicado" : "Borrador";
};

// --- Componente de Estado (Badge) ---
const StatusBadge = ({ status }) => {
    const isPublished = status === "Publicado";
    const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide";

    return (
        <span
            className={`${baseClasses} ${isPublished
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
                }`}
        >
            {isPublished ? <FaCheckCircle className="w-3 h-3" /> : <FaClock className="w-3 h-3" />}
            {status}
        </span>
    );
};


export default function ProductsList() {
    // Estados
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [statusFilter, setStatusFilter] = useState(""); // Renombrado a statusFilter

    // Obtener categorías únicas
    const allCategories = useMemo(() => {
        const categories = [...new Set(mockProducts.map(p => p.category))];
        return categories.sort();
    }, []);

    // 💡 Lógica de Filtrado Centralizada (useMemo)
    const filteredProducts = useMemo(() => {
        return mockProducts.filter((p) => {
            // 1. Búsqueda por nombre (y ahora también por precio)
            const matchesSearch =
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.price.toString().includes(search); // Busca también por el precio

            // 2. Filtro de Categoría
            const matchesCategory = category ? p.category === category : true;

            // 3. Filtro de Estado (Usando la función simulada)
            const currentStatus = getProductStatus(p.id);
            const matchesStatus = statusFilter ? currentStatus === statusFilter : true;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [search, category, statusFilter]);

    // Función para resetear filtros
    const resetFilters = useCallback(() => {
        setSearch("");
        setCategory("");
        setStatusFilter("");
    }, []);


    return (
        <div className="space-y-6 lg:space-y-8 animate-fadeIn p-4 md:p-6 lg:p-8">
            {/* 🔹 Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    Catálogo de Productos ({mockProducts.length})
                </h1>

                <Link
                    to="/admin/productos/nuevo"
                    className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/30 transition transform hover:scale-[1.02]"
                >
                    <FaPlus className="text-base" /> Nuevo Producto
                </Link>
            </div>

            {/* 🔹 Filtros */}
            <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-wrap items-end gap-5 border border-gray-50">
                <FaFilter className="text-indigo-500 w-5 h-5 hidden sm:block mb-1" />

                {/* Búsqueda */}
                <div className="flex-1 min-w-[200px]">
                    <label htmlFor="search-product" className="block text-xs font-medium uppercase text-gray-500 mb-1">
                        Buscar producto
                    </label>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        <input
                            id="search-product"
                            type="text"
                            placeholder="Ej. cama deluxe o 150..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl w-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Categoría */}
                <div className="min-w-[150px]">
                    <label htmlFor="category-select" className="block text-xs font-medium uppercase text-gray-500 mb-1">
                        Categoría
                    </label>
                    <select
                        id="category-select"
                        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 w-full"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {allCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* Estado */}
                <div className="min-w-[150px]">
                    <label htmlFor="status-select" className="block text-xs font-medium uppercase text-gray-500 mb-1">
                        Estado
                    </label>
                    <select
                        id="status-select"
                        className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 w-full"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Publicado">Publicado</option>
                        <option value="Borrador">Borrador</option>
                    </select>
                </div>

                {/* Botón de Reset */}
                {(search || category || statusFilter) && (
                    <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-200 transition font-semibold text-sm"
                        title="Resetear Filtros"
                    >
                        <FaRedo className="w-4 h-4" /> Resetear
                    </button>
                )}
            </div>

            {/* 🔹 Tabla */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-50">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-100">
                        <thead className="bg-gray-50 text-left uppercase text-gray-500 text-xs tracking-wider">
                            <tr>
                                <th className="p-4 w-10">
                                    <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                                </th>
                                <th className="p-4">Producto</th>
                                <th className="p-4 hidden sm:table-cell">Categoría</th>
                                <th className="p-4 text-right">Precio</th>
                                <th className="p-4 text-center">Estado</th>
                                <th className="p-4 text-center">Acciones</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center p-12 text-gray-400 font-medium text-lg">
                                        😔 No se encontraron productos que coincidan con los filtros.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-indigo-50/30 transition duration-150">
                                        <td className="p-4 text-center">
                                            <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" />
                                        </td>

                                        {/* Producto (Imagen + Nombre) */}
                                        <td className="p-4 flex items-center gap-3">
                                            {/* Usamos el primer elemento de tu array de imágenes */}
                                            <img
                                                src={p.images[0]}
                                                alt={p.name}
                                                className="h-14 w-14 object-cover rounded-lg border border-gray-200 shadow-sm flex-shrink-0"
                                            />
                                            <Link
                                                to={`/admin/productos/editar/${p.id}`}
                                                className="font-semibold text-gray-800 hover:text-indigo-600 transition truncate max-w-[200px]"
                                                title={p.name}
                                            >
                                                {p.name}
                                                {/* Añadimos el short description como un detalle */}
                                                <span className="block text-xs font-normal text-gray-400 truncate">{p.short}</span>
                                            </Link>
                                        </td>

                                        {/* Categoría */}
                                        <td className="p-4 text-gray-500 hidden sm:table-cell">{p.category}</td>

                                        {/* Precio (Añadimos la moneda "Bs.") */}
                                        <td className="p-4 font-bold text-gray-900 text-right whitespace-nowrap">
                                            Bs. {p.price.toFixed(2)}
                                        </td>

                                        {/* Estado (Usando la función simulada) */}
                                        <td className="p-4 text-center">
                                            <StatusBadge status={getProductStatus(p.id)} />
                                        </td>

                                        {/* Acciones */}
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <Link
                                                    to={`/admin/productos/editar/${p.id}`}
                                                    className="p-2 text-indigo-500 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition"
                                                    title="Editar Producto"
                                                >
                                                    <FaEdit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    className="p-2 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition"
                                                    title="Eliminar Producto"
                                                >
                                                    <FaTrash className="w-4 h-4" />
                                                </button>
                                                <a
                                                    href={`/producto/${p.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-800 transition"
                                                    title="Ver en el Sitio Web"
                                                >
                                                    <FaEye className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 🔹 Paginación */}
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 pt-2 border-t border-gray-100">
                <p className="order-2 sm:order-1 mt-3 sm:mt-0">Mostrando **{filteredProducts.length}** de **{mockProducts.length}** productos</p>
                <div className="flex gap-2 order-1 sm:order-2">
                    <button className="px-4 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                        &larr; Anterior
                    </button>
                    <button className="px-4 py-2 rounded-xl border border-indigo-500 bg-indigo-500 text-white hover:bg-indigo-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                        Siguiente &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}