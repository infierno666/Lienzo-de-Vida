// src/components/RelatedProducts.jsx
import ProductCard from "./ProductCard";

export default function RelatedProducts({ products = [] }) {
    if (!products.length) return null;

    const shouldCenter = products.length < 4;

    return (
        <section className="mt-12 md:mt-16 py-8 md:py-12 bg-gray-50 rounded-xl">
            <div className="container mx-auto px-4">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-text mb-6 md:mb-8 text-center">
                    Completa tu pedido: Productos Similares
                </h3>

                <div
                    className={`${ 
                        shouldCenter
                            ? "flex justify-center gap-6 md:gap-8 flex-wrap"
                            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
                    }`}
                >
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="flex justify-center"
                            style={{
                                width: "16rem", // = w-64 (tamaño fijo original)
                            }}
                        >
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
