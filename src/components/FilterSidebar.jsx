function FilterSidebar({ categories, activeCategory, onFilterChange }) {
    return (
        <aside className="bg-white rounded-xl shadow-md p-4 mb-6 lg:mb-0 lg:w-1/4">
            <h3 className="font-heading text-brand text-xl mb-4">Filtrar por categoría</h3>
            <ul className="space-y-2">
                <li>
                    <button
                        onClick={() => onFilterChange("Todos")}
                        className={`block w-full text-left px-3 py-2 rounded-md transition ${activeCategory === "Todos"
                                ? "bg-brand text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                    >
                        Todos
                    </button>
                </li>
                {categories.map((cat) => (
                    <li key={cat}>
                        <button
                            onClick={() => onFilterChange(cat)}
                            className={`block w-full text-left px-3 py-2 rounded-md transition ${activeCategory === cat
                                    ? "bg-brand text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                                }`}
                        >
                            {cat}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default FilterSidebar;
