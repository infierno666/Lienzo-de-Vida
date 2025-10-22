// src/components/FilterSidebar.jsx
export default function FilterSidebar({
    categoriesWithCounts = {},
    categories = [],
    petTypes = [],
    sizes = [],
    materials = [],
    activeFilters = {},
    onToggleCategory,
    onTogglePetType,
    onToggleSize,
    onToggleMaterial,
    onApply,
    onClear,
}) {
    const counts = categoriesWithCounts || { categories: {}, petTypes: {}, sizes: {}, materials: {} };

    return (
        <aside className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-heading text-lg mb-4">Filtrar por:</h3>

            {/* Categories */}
            <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Categorías</h4>
                <ul className="space-y-2">
                    <li>
                        <button
                            onClick={() => onToggleCategory && onToggleCategory("Todos")}
                            className={`block w-full text-left px-3 py-2 rounded-md ${activeFilters.categories?.length === 0 ? "bg-brand text-white" : "hover:bg-soft text-text"}`}
                        >
                            Todos <span className="text-sm text-text-light ml-2">({Object.values(counts.categories || {}).reduce((a, b) => a + b, 0)})</span>
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat}>
                            <label className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-soft cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.categories?.includes(cat)}
                                    onChange={() => onToggleCategory && onToggleCategory(cat)}
                                    className="w-4 h-4"
                                />
                                <span className="flex-1 text-sm">{cat}</span>
                                <span className="text-xs text-text-light">({counts.categories?.[cat] || 0})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pet types */}
            <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Tipo de Mascota</h4>
                <ul className="space-y-2">
                    {["Canes", "Felinos"].map((pt) => (
                        <li key={pt}>
                            <label className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-soft cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.petTypes?.includes(pt)}
                                    onChange={() => onTogglePetType && onTogglePetType(pt)}
                                    className="w-4 h-4"
                                />
                                <span className="flex-1 text-sm">{pt}</span>
                                <span className="text-xs text-text-light">({counts.petTypes?.[pt] || 0})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sizes */}
            <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Tamaño</h4>
                <ul className="space-y-2">
                    {["Pequeño", "Mediano", "Grande"].map((sz) => (
                        <li key={sz}>
                            <label className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-soft cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={activeFilters.sizes?.includes(sz)}
                                    onChange={() => onToggleSize && onToggleSize(sz)}
                                    className="w-4 h-4"
                                />
                                <span className="flex-1 text-sm">{sz}</span>
                                <span className="text-xs text-text-light">({counts.sizes?.[sz] || 0})</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Materials (optional) */}
            {materials.length > 0 && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Material</h4>
                    <ul className="space-y-2">
                        {materials.map((m) => (
                            <li key={m}>
                                <label className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-soft cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.materials?.includes(m)}
                                        onChange={() => onToggleMaterial && onToggleMaterial(m)}
                                        className="w-4 h-4"
                                    />
                                    <span className="flex-1 text-sm">{m}</span>
                                    <span className="text-xs text-text-light">({counts.materials?.[m] || 0})</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex gap-3 mt-4">
                <button onClick={onApply} className="flex-1 bg-brand text-white px-4 py-2 rounded-md">Aplicar Filtros</button>
                <button onClick={onClear} className="flex-1 border border-gray-300 px-4 py-2 rounded-md">Limpiar</button>
            </div>
        </aside>
    );
}
