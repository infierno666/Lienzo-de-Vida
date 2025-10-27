import React, { useState, useMemo, useCallback, useEffect } from "react";
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
    FaSpinner,
} from "react-icons/fa";

import { getAllProducts, deleteProduct } from "../../api/productService.js";

// --- COMPONENTE DE ESTADO (Badge) ---
const StatusBadge = ({ status }) => {
    const currentStatus = status || "Borrador";
    const isPublished = currentStatus === "Publicado";
    const baseClasses =
        "inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide capitalize transition-colors duration-200 min-w-[90px]";

    return (
        <span
            className={`${baseClasses} ${isPublished
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
        >
            {isPublished ? (
                <FaCheckCircle className="w-3 h-3" />
            ) : (
                <FaClock className="w-3 h-3" />
            )}
            {isPublished ? "Publicado" : "Borrador"}
        </span>
    );
};

export default function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // 🔹 Cargar productos
    const loadProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllProducts();

            // 🔹 Asegurar formato correcto
            const productsArray = Array.isArray(data)
                ? data
                : data.products || [];

            // Normalizar estructura
            const normalized = productsArray.map((p) => ({
                id: p.id,
                slug: p.slug,
                name: p.name,
                short: p.short || "",
                price: Number(p.price) || 0,
                category: p.category || "",
                status: p.status || "Borrador",
                images:
                    typeof p.images === "string"
                        ? JSON.parse(p.images || "[]")
                        : Array.isArray(p.images)
                            ? p.images
                            : [],
            }));

            setProducts(normalized);
        } catch (err) {
            console.error("Error al cargar productos:", err);
            setError(
                "No se pudieron obtener los productos desde el servidor. Verifica tu conexión o token."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // 🔹 Eliminar producto
    const handleDelete = async (product) => {
        const confirmDelete = window.confirm(
            `¿Seguro que deseas eliminar el producto "${product.name}"?`
        );
        if (!confirmDelete) return;

        try {
            await deleteProduct(product.id);
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
        } catch (err) {
            console.error("Fallo al eliminar:", err);
            setError(`Fallo al eliminar el producto: ${err.message}`);
        }
    };

    // 🔹 Filtrar categorías
    const allCategories = useMemo(() => {
        const categories = [
            ...new Set(products.map((p) => p.category).filter(Boolean)),
        ];
        return categories.sort();
    }, [products]);

    // 🔹 Filtrar productos
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const searchLower = search.toLowerCase();
            const matchesSearch =
                p.name?.toLowerCase().includes(searchLower) ||
                p.slug?.toLowerCase().includes(searchLower) ||
                p.price?.toString().includes(searchLower);

            const matchesCategory = category ? p.category === category : true;
            const currentStatus = p.status || "Borrador";
            const matchesStatus = statusFilter
                ? currentStatus.toLowerCase() === statusFilter.toLowerCase()
                : true;

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [search, category, statusFilter, products]);

    const resetFilters = useCallback(() => {
        setSearch("");
        setCategory("");
        setStatusFilter("");
    }, []);

    // 🔹 Estados de carga y error
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px] text-indigo-600 bg-gray-50 rounded-2xl p-8">
                <FaSpinner className="animate-spin text-4xl mr-3" />
                <span className="text-xl font-semibold">
                    Cargando catálogo...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 border border-red-300 text-red-700 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
                <h2 className="text-xl font-bold mb-2">Error de Conexión</h2>
                <p className="mb-3">{error}</p>
                <button
                    onClick={loadProducts}
                    className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                    <FaRedo /> Reintentar
                </button>
            </div>
        );
    }

    // 🔹 Render principal
    return (
        <div className="space-y-6 lg:space-y-8 p-4 md:p-6 bg-gray-50 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Catálogo ({filteredProducts.length})
                </h1>

                <Link
                    to="/admin/productos/nuevo"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition"
                >
                    <FaPlus /> Nuevo Producto
                </Link>
            </div>

            {/* Filtros */}
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-wrap items-end gap-4 border border-gray-100">
                <FaFilter className="text-indigo-500 w-5 h-5 hidden sm:block mb-1" />
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs text-gray-500 mb-1">
                        Buscar
                    </label>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Ej. cama, 150..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl w-full text-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                        />
                    </div>
                </div>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white"
                >
                    <option value="">Todas las categorías</option>
                    {allCategories.map((cat) => (
                        <option key={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white"
                >
                    <option value="">Todos</option>
                    <option value="Publicado">Publicado</option>
                    <option value="Borrador">Borrador</option>
                </select>

                {(search || category || statusFilter) && (
                    <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition font-semibold text-sm"
                    >
                        <FaRedo /> Reset
                    </button>
                )}
            </div>

            {/* Tabla */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-100">
                        <thead className="bg-gray-50 text-left uppercase text-gray-500 text-xs tracking-wider">
                            <tr>
                                <th className="p-4">Producto</th>
                                <th className="p-4 hidden md:table-cell">
                                    Categoría
                                </th>
                                <th className="p-4 text-right">Precio</th>
                                <th className="p-4 text-center">Estado</th>
                                <th className="p-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((p) => (
                                    <tr
                                        key={p.id}
                                        className="hover:bg-indigo-50/50 transition"
                                    >
                                        <td className="p-4 flex items-center gap-3">
                                            <img
                                                src={
                                                    p.images?.[0] ||
                                                    "https://placehold.co/100x100/cccccc/333?text=Sin+Img"
                                                }
                                                alt={p.name}
                                                className="h-14 w-14 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div>
                                                <Link
                                                    to={`/admin/productos/editar/${p.id}`}
                                                    className="font-semibold text-gray-800 hover:text-indigo-600"
                                                >
                                                    {p.name}
                                                </Link>
                                                <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                                    {p.short || "Sin resumen"}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4 hidden md:table-cell">
                                            {p.category || "Sin categoría"}
                                        </td>
                                        <td className="p-4 font-bold text-right">
                                            Bs.{" "}
                                            {p.price
                                                ? p.price.toFixed(2)
                                                : "0.00"}
                                        </td>
                                        <td className="p-4 text-center">
                                            <StatusBadge status={p.status} />
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <a
                                                    href={`/producto/${p.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 text-gray-500 hover:text-gray-800 transition"
                                                >
                                                    <FaEye />
                                                </a>
                                                <Link
                                                    to={`/admin/productos/editar/${p.id}`}
                                                    className="p-2 text-indigo-500 hover:text-indigo-700 transition"
                                                >
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(p)
                                                    }
                                                    className="p-2 text-red-500 hover:text-red-700 transition"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center p-12 text-gray-500"
                                    >
                                        No se encontraron productos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
