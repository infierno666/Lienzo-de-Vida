import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Componente: FiltersBar
const FiltersBar = ({ filters, setFilters, categories, statuses }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // No necesitamos un botón "Aplicar Filtros" porque los filtros se aplican inmediatamente (reactivos)
    // al cambiar el estado (onChange). Esto mejora la UX.

    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center">

            {/* 1. Barra de Búsqueda por Nombre */}
            <div className="relative flex-grow w-full sm:w-auto">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar por nombre de producto..."
                    value={filters.search}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
            </div>

            {/* 2. Dropdown de Categoría */}
            <div className="w-full sm:w-48">
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                    <option value="Todos">Todas las Categorías</option>
                    {categories
                        .filter(c => c !== 'Todos') // Evitar duplicar 'Todos'
                        .map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                </select>
            </div>

            {/* 3. Dropdown de Estado */}
            <div className="w-full sm:w-40">
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                    <option value="Todos">Todos los Estados</option>
                    {statuses
                        .filter(s => s !== 'Todos') // Evitar duplicar 'Todos'
                        .map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                </select>
            </div>

            {/* Opcional: Botón para Limpiar Filtros */}
            {(filters.search || filters.category !== 'Todos' || filters.status !== 'Todos') && (
                <button
                    onClick={() => setFilters({ search: '', category: 'Todos', status: 'Todos' })}
                    className="flex-shrink-0 text-sm text-gray-500 hover:text-gray-700 py-2 transition duration-150"
                >
                    Limpiar Filtros
                </button>
            )}
        </div>
    );
};

export default FiltersBar;