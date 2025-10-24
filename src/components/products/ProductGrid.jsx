import ProductCard from "./ProductCard";

function ProductGrid({ products }) {
    if (!products || products.length === 0) {
        // Mejor UX: Muestra un mensaje amigable si no hay productos
        return (
            <div className="text-center py-10">
                <p className="text-xl text-text-light font-heading">
                    ¡Ups! No encontramos productos en esta sección.
                </p>
            </div>
        );
    }

    return (
        // 1. Contenedor Grid con espaciado mejorado:
        //    - gap-x-6: Espacio horizontal moderado.
        //    - gap-y-10: Mayor espacio vertical para que las tarjetas respiren.
        // 2. Definición de columnas: 
        //    - sm:grid-cols-2 (Móvil/Tablet: 2 columnas)
        //    - md:grid-cols-3 (Tablet grande/Desktop: 3 columnas)
        //    - lg:grid-cols-4 (Desktop grande: 4 columnas para maximizar el catálogo)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}

export default ProductGrid;