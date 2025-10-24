// src/pages/Product.jsx - VERSIÓN COMPACTA
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../../data/mockData";
import Breadcrumbs from "../../components/products/Breadcrumbs";
import ImageGallery from "../../components/products/ImageGallery";
import RelatedProducts from "../../components/products/RelatedProducts";
import { FaWhatsapp, FaCheckCircle } from "react-icons/fa";

export default function ProductPage() {
    const { slug } = useParams();
    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-heading text-text mb-4">Producto no encontrado 😢</h1>
                <p className="text-text-light">El producto solicitado no existe o fue movido.</p>
                <Link to="/catalogo" className="mt-6 inline-block bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">Volver al Catálogo</Link>
            </div>
        );
    }

    const crumbs = [
        { label: "Inicio", to: "/" },
        { label: "Catálogo", to: "/catalogo" },
        { label: product.category || "Categoría", to: `/catalogo?cat=${encodeURIComponent(product.category || "")}` },
        { label: product.name },
    ];

    const phone = "59170000000";
    const whatsappText = `Hola 👋, quisiera información sobre el producto "${product.name}". ¿Me puedes ayudar?`;
    const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappText)}`;

    const related = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <main className="">
            <section className="max-w-7xl mx-auto px-4 py-8 md:py-10">
                <Breadcrumbs items={crumbs} />

                {/* Diseño más compacto: grid con gap-6 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LEFT: Gallery */}
                    <div>
                        {/* Añadimos un poco de margen para separar de Breadcrumbs si no es sticky */}
                        <ImageGallery images={product.images || []} altPrefix={product.name} video={product.video} />
                    </div>

                    {/* RIGHT: Info - Se mantiene el sticky para mejorar la UX en desktop */}
                    <div className="lg:sticky lg:top-8 h-max">

                        {/* Categoría (opcional, como en el ejemplo) */}
                        {product.category && <p className="text-sm font-semibold text-text-light uppercase mb-1">{product.category}</p>}

                        {/* Nombre y Descripción Corta */}
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-text mb-3">{product.name}</h1>
                        {/* Descripción corta: separada y con texto más sutil */}
                        {product.short && <p className="text-base text-text-light mb-6 font-body leading-relaxed">{product.short}</p>}

                        {/* Precio - Más grande, pero con menos margen */}
                        <div className="mb-6">
                            {product.price ? (
                                <p className="text-4xl lg:text-5xl font-extrabold text-text">Bs {product.price.toFixed(2)}</p>
                            ) : (
                                <p className="text-xl font-heading text-text font-semibold">Consultar Precio</p>
                            )}
                        </div>

                        {/* Llamada a la Acción (CTA) - Mismo estilo impactante */}
                        <div className="mb-8">
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                // Botón grande y verde, como en el ejemplo
                                className="w-full inline-flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-heading font-bold text-xl shadow-md hover:shadow-lg transition-all"
                                aria-label="Consultar por WhatsApp"
                            >
                                <FaWhatsapp className="w-5 h-5" /> ¡Consultar por WhatsApp Ahora!
                            </a>
                        </div>

                        {/* Separador visual ligero */}
                        <hr className="mb-8 border-gray-100" />

                        {/* Highlights (Características Clave) - Diseño en 2 columnas para ser más compacto */}
                        {product.highlights?.length ? (
                            <div className="mb-8">
                                <h3 className="font-heading text-xl font-semibold mb-4 text-text">Características Clave</h3>
                                {/* Diseño de rejilla de 2 columnas para compactar la lista */}
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {product.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <FaCheckCircle className="text-brand w-4 h-4 mt-1 flex-shrink-0" />
                                            <span className="text-sm text-text">{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            // Fallback más compacto (opcional, depende de la estructura de tus datos)
                            <div className="space-y-3 mb-8">
                                <h3 className="font-heading text-xl font-semibold mb-2 text-text">Detalles Rápidos</h3>
                                <p className="text-sm text-text">
                                    {product.material && <span className="mr-4">Material: <span className="font-medium">{product.material}</span></span>}
                                    {product.size && <span className="mr-4">Tamaño: <span className="font-medium">{product.size}</span></span>}
                                    {product.petTypes && <span>Para: <span className="font-medium">{product.petTypes.join(", ")}</span></span>}
                                </p>
                            </div>
                        )}

                        {/* Separador visual */}
                        <hr className="mb-8 border-gray-100" />

                        {/* Descripción Detallada - Título más destacado y cuerpo más legible */}
                        <div className="mb-8">
                            <h3 className="font-heading text-xl font-semibold mb-3 text-text">Acerca del Producto</h3>
                            <p className="text-text-light text-base leading-relaxed">{product.description}</p>
                        </div>

                        {/* Specs (Especificaciones Técnicas) - Diseño tipo lista de definiciones para minimalismo */}
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-heading text-xl font-semibold mb-3 text-text">Especificaciones Técnicas</h3>

                            {/* Usamos DL/DT/DD para una lista de definiciones con estilo más simple que la tabla */}
                            <dl className="divide-y divide-gray-200">
                                {product.dimensions && (
                                    <div className="flex justify-between py-3">
                                        <dt className="font-medium text-sm text-text-light">Dimensiones</dt>
                                        <dd className="font-semibold text-sm text-text">{product.dimensions}</dd>
                                    </div>
                                )}
                                {product.material && (
                                    <div className="flex justify-between py-3">
                                        <dt className="font-medium text-sm text-text-light">Materiales</dt>
                                        <dd className="font-semibold text-sm text-text">{product.material}</dd>
                                    </div>
                                )}
                                {product.weightCapacity && (
                                    <div className="flex justify-between py-3">
                                        <dt className="font-medium text-sm text-text-light">Peso soportado</dt>
                                        <dd className="font-semibold text-sm text-text">{product.weightCapacity}</dd>
                                    </div>
                                )}
                                {product.colors && (
                                    <div className="flex justify-between py-3">
                                        <dt className="font-medium text-sm text-text-light">Colores</dt>
                                        <dd className="font-semibold text-sm text-text">{product.colors.join(", ")}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                    </div>
                </div>
            </section>

            {related.length > 0 && <RelatedProducts products={related} />}

        </main>

    );
}