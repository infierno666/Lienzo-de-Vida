// src/pages/Catalog.jsx
import { useMemo, useState } from "react";
import { mockProducts } from "../../data/mockData";
import ProductCard from "../../components/products/ProductCard";
import FilterSidebar from "../../components/FilterSidebar";
import SortDropdown from "../../components/SortDropdown";
import Pagination from "../../components/Pagination";

export default function Catalog() {
    // Estado filtros
    const [filters, setFilters] = useState({
        categories: [],    // multiple
        petTypes: [],      // Canes, Felinos
        sizes: [],         // Pequeño, Mediano, Grande
        materials: [],     // Madera, Tela, Plastico
    });

    const [sortBy, setSortBy] = useState("novedad"); // "novedad" | "price-asc" | "price-desc" | "alpha"
    const [page, setPage] = useState(1);
    const pageSize = 9;

    // Mobile: mostrar/ocultar sidebar
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);

    // Extrae listas únicas para mostrar en el sidebar (a partir de mockProducts)
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

    // Filtrado principal (tolerante si campos faltan)
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
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    // if current page > totalPages, reset to 1
    if (page > totalPages) setPage(1);
    const start = (page - 1) * pageSize;
    const pagedItems = filtered.slice(start, start + pageSize);

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
        <div className="container mx-auto px-4 py-8">
            <header className="mb-6">
                <h1 className="text-2xl md:text-3xl font-heading text-text">Nuestro Catálogo Completo</h1>
            </header>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* SIDEBAR - Mobile toggle */}
                <div className="lg:w-1/4">
                    <div className="flex items-center justify-between mb-4 lg:hidden">
                        <h3 className="font-heading">Filtrar por</h3>
                        <button
                            onClick={() => setShowFiltersMobile((s) => !s)}
                            className="text-sm px-3 py-2 border rounded-md"
                            aria-expanded={showFiltersMobile}
                        >
                            {showFiltersMobile ? "Cerrar" : "Abrir filtros"}
                        </button>
                    </div>

                    {/* Desktop always visible, mobile toggled */}
                    <div className={`lg:block ${showFiltersMobile ? "block" : "hidden"}`}>
                        <FilterSidebar
                            categoriesWithCounts={computeCounts(mockProducts)}
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
                </div>

                {/* PRODUCTS AREA */}
                <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div>
                            <p className="text-sm text-text-light">
                                Mostrando <span className="font-semibold">{filtered.length}</span> productos
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="text-sm text-text-light">Ordenar:</label>
                            <SortDropdown value={sortBy} onChange={(v) => { setSortBy(v); setPage(1); }} />
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pagedItems.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8">
                        <Pagination current={page} total={totalPages} onChange={setPage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * computeCounts(products) -> returns object with counts per category, petType, size, material
 * useful to show counters in the sidebar without re-scanning all the time.
 */
function computeCounts(products) {
    const counts = {
        categories: {},
        petTypes: {},
        sizes: {},
        materials: {},
    };

    products.forEach((p) => {
        if (p.category) counts.categories[p.category] = (counts.categories[p.category] || 0) + 1;

        const pts = Array.isArray(p.petTypes) ? p.petTypes : p.tags || [];
        pts.forEach((t) => (counts.petTypes[t] = (counts.petTypes[t] || 0) + 1));

        if (p.size) counts.sizes[p.size] = (counts.sizes[p.size] || 0) + 1;
        if (p.material) counts.materials[p.material] = (counts.materials[p.material] || 0) + 1;
    });

    return counts;
}
