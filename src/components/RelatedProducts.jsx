// src/components/RelatedProducts.jsx
import ProductCard from "./products/ProductCard"; // ajusta la ruta si tu ProductCard está en otra carpeta

export default function RelatedProducts({ products = [] }) {
    if (!products.length) return null;

    return (
        <section className="py-8">
            <h3 className="text-xl font-heading text-text mb-4 text-center">También Te Podría Interesar</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
