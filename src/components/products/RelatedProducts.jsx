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

                {/* Carrusel en móvil / Grid o centrado en desktop */}
                <div
                    className={`${shouldCenter
                            ? "md:flex md:justify-center md:flex-wrap md:gap-8"
                            : "md:grid md:grid-cols-4 md:gap-8"
                        } 
                    flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide`}
                >
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="flex justify-center flex-shrink-0 snap-center"
                            style={{
                                width: "16rem", // mantiene el tamaño original (w-64)
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
