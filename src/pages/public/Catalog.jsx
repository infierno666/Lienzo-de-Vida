import { useMemo, useState } from "react";
import { mockProducts } from "../../data/mockData";
import ProductCard from "../../components/products/ProductCard";
import FilterSidebar from "../../components/FilterSidebar"; // Componente externo
import SortDropdown from "../../components/SortDropdown";
import Pagination from "../../components/Pagination";
import { Filter, X, LayoutGrid } from "lucide-react"; // Iconos para mejor estética

// Se mantiene la lógica de cálculo de conteos fuera del componente principal
function computeCounts(products) {
    const counts = { categories: {}, petTypes: {}, sizes: {}, materials: {} };

    products.forEach((p) => {
        if (p.category) counts.categories[p.category] = (counts.categories[p.category] || 0) + 1;
        const pts = Array.isArray(p.petTypes) ? p.petTypes : p.tags || [];
        pts.forEach((t) => (counts.petTypes[t] = (counts.petTypes[t] || 0) + 1));
        if (p.size) counts.sizes[p.size] = (counts.sizes[p.size] || 0) + 1;
        if (p.material) counts.materials[p.material] = (counts.materials[p.material] || 0) + 1;
    });

    return counts;
}

export default function Catalog() {
    // Estado filtros
    const [filters, setFilters] = useState({
        categories: [], 	// multiple
        petTypes: [], 	// Canes, Felinos
        sizes: [], 		// Pequeño, Mediano, Grande
        materials: [], 	// Madera, Tela, Plastico
    });

    const [sortBy, setSortBy] = useState("novedad"); // "novedad" | "price-asc" | "price-desc" | "alpha"
    const [page, setPage] = useState(1);
    const pageSize = 9;

    // Mobile: mostrar/ocultar sidebar
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);


    // Extrae listas únicas para mostrar en el sidebar
    const allCategories = useMemo(
        () => Array.from(new Set(mockProducts.map((p) => p.category).filter(Boolean))),
        []
    );
    const allPetTypes = useMemo(
        () =>
            Array.from(
                new Set(
                    mockProducts.flatMap((p) => (Array.isArray(p.petTypes) ? p.petTypes : p.tags || [])).filter(Boolean)
                )
            ),
        []
    );
    const allSizes = useMemo(
        () =>
            Array.from(
                new Set(
                    mockProducts.map((p) => p.size).filter(Boolean)
                )
            ),
        []
    );
    const allMaterials = useMemo(
        () =>
            Array.from(
                new Set(mockProducts.map((p) => p.material).filter(Boolean))
            ),
        []
    );

    const productCounts = useMemo(() => computeCounts(mockProducts), []);


    // Filtrado principal
    const filtered = useMemo(() => {
        let items = [...mockProducts];

        // categories (multiple)
        if (filters.categories.length) {
            items = items.filter((p) => filters.categories.includes(p.category));
        }

        // petTypes (multiple) - product may have petTypes array or tags array
        if (filters.petTypes.length) {
            items = items.filter((p) => {
                const pts = Array.isArray(p.petTypes) ? p.petTypes : p.tags || [];
                return pts.some((pt) => filters.petTypes.includes(pt));
            });
        }

        // sizes
        if (filters.sizes.length) {
            items = items.filter((p) => filters.sizes.includes(p.size));
        }

        // materials
        if (filters.materials.length) {
            items = items.filter((p) => p.material && filters.materials.includes(p.material));
        }

        // sorting
        switch (sortBy) {
            case "price-asc":
                items.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case "price-desc":
                items.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            case "alpha":
                items.sort((a, b) => (a.name ?? "").localeCompare(b.name ?? ""));
                break;
            case "novedad":
            default:
                // keep original order (assume mockProducts already newest first)
                break;
        }

        return items;
    }, [filters, sortBy]);

    // pagination
    const totalResults = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
    if (page > totalPages) setPage(1);
    const start = (page - 1) * pageSize;
    const pagedItems = filtered.slice(start, start + pageSize);
    const showingStart = Math.min(totalResults, start + 1);
    const showingEnd = Math.min(totalResults, start + pageSize);
    const totalActiveFilters = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);


    // handlers for filter changes
    const toggleArrayValue = (key, value) => {
        setFilters((prev) => {
            const arr = prev[key] || [];
            const exists = arr.includes(value);
            return {
                ...prev,
                [key]: exists ? arr.filter((x) => x !== value) : [...arr, value],
            };
        });
        setPage(1);
    };

    const applyFilters = () => {
        setShowFiltersMobile(false);
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ categories: [], petTypes: [], sizes: [], materials: [] });
        setPage(1);
    };

    return (
        <main className="max-w-7xl mx-auto px-6 py-16">

            {/* ENCABEZADO Y TÍTULO MEJORADO */}
            <header className="mb-10 border-b border-gray-200 pb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-text tracking-tight">
                    Catálogo de Productos
                </h1>
                <p className="text-lg text-text-light mt-1">
                    Explora nuestra colección y encuentra el producto perfecto para tu mascota.
                </p>
            </header>

            <div className="flex flex-col lg:flex-row gap-8"> {/* Aumento de gap */}

                {/* SIDEBAR - Desktop View */}
                <aside className="hidden lg:block lg:w-1/4">
                    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-md sticky top-6">
                        <FilterSidebar
                            counts={productCounts}
                            categories={allCategories}
                            petTypes={allPetTypes}
                            sizes={allSizes}
                            materials={allMaterials}
                            activeFilters={filters}
                            onToggleCategory={(cat) => toggleArrayValue("categories", cat)}
                            onTogglePetType={(pt) => toggleArrayValue("petTypes", pt)}
                            onToggleSize={(sz) => toggleArrayValue("sizes", sz)}
                            onToggleMaterial={(m) => toggleArrayValue("materials", m)}
                            onApply={applyFilters}
                            onClear={clearFilters}
                        />
                    </div>
                </aside>

                {/* PRODUCTS AREA */}
                <div className="flex-1">

                    {/* BARRA SUPERIOR DE CONTROLES (Móvil y Desktop) */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">

                        {/* Botón de Filtros Móviles (Ajuste estético) */}
                        <div className="lg:hidden flex justify-between items-center w-full">
                            <button
                                onClick={() => setShowFiltersMobile(true)}
                                className="bg-brand text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-brand-dark transition duration-300 inline-flex items-center gap-2 flex-grow sm:flex-grow-0"
                            >
                                <Filter className="w-5 h-5" />
                                {totalActiveFilters > 0 ? `Filtros Activos (${totalActiveFilters})` : "Abrir Filtros"}
                            </button>
                            {/* Ordenar (en móvil) */}
                            <div className="flex items-center gap-3">
                                <label htmlFor="sort-dropdown-mobile" className="text-sm text-text-light font-medium whitespace-nowrap hidden sm:block">Ordenar:</label>
                                <SortDropdown
                                    id="sort-dropdown-mobile"
                                    value={sortBy}
                                    onChange={(v) => {
                                        setSortBy(v);
                                        setPage(1);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Indicador de Resultados (Mejora estética) */}
                        <div className="hidden lg:block">
                            <div className="inline-flex items-center gap-2 text-text-light text-base">
                                <LayoutGrid className="w-4 h-4 text-brand" />
                                {totalResults === 0 ? (
                                    <span className="font-semibold text-text">0 resultados</span>
                                ) : (
                                    <span className="font-medium">
                                        Mostrando <span className="font-semibold text-text">{showingStart}-{showingEnd}</span> de <span className="font-semibold text-text">{totalResults}</span> productos
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Ordenar (en desktop) */}
                        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                            <label className="text-sm text-text-light font-medium whitespace-nowrap">Ordenar por:</label>
                            <SortDropdown value={sortBy} onChange={(v) => { setSortBy(v); setPage(1); }} />
                        </div>
                    </div>

                    {/* Grid */}
                    {totalResults > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Ajuste de grid */}
                            {pagedItems.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <h3 className="text-2xl font-bold text-text mb-4">¡Ups! No encontramos coincidencias.</h3>
                            <p className="text-text-light mb-6">
                                Intenta limpiar o ajustar tus filtros.
                            </p>
                            {totalActiveFilters > 0 && (
                                <button onClick={clearFilters} className="bg-brand text-white px-8 py-3 rounded-xl font-semibold hover:bg-brand-dark transition duration-300 shadow-md">
                                    Limpiar {totalActiveFilters} Filtros
                                </button>
                            )}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center">
                            <Pagination current={page} total={totalPages} onChange={setPage} />
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL DE FILTROS MÓVILES (Full-screen overlay) */}
            {showFiltersMobile && (
                <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm lg:hidden transition-opacity duration-300 overflow-y-auto">
                    <div className="p-6 h-full">
                        <div className="flex justify-between items-center border-b pb-4 mb-6 sticky top-0 bg-white z-10">
                            <h3 className="text-2xl font-bold text-text">Refinar Búsqueda</h3>
                            <button onClick={() => setShowFiltersMobile(false)} className="text-text hover:text-brand p-1 rounded-full hover:bg-gray-100 transition">
                                <X className="w-7 h-7" />
                            </button>
                        </div>
                        <FilterSidebar
                            counts={productCounts}
                            categories={allCategories}
                            petTypes={allPetTypes}
                            sizes={allSizes}
                            materials={allMaterials}
                            activeFilters={filters}
                            onToggleCategory={(cat) => toggleArrayValue("categories", cat)}
                            onTogglePetType={(pt) => toggleArrayValue("petTypes", pt)}
                            onToggleSize={(sz) => toggleArrayValue("sizes", sz)}
                            onToggleMaterial={(m) => toggleArrayValue("materials", m)}
                            onApply={applyFilters} // Aplica y cierra el modal
                            onClear={clearFilters}
                            isMobile={true} // Se asume que el FilterSidebar maneja el estilo del botón Apply/Clear internamente para móvil.
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
