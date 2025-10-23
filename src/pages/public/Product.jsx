// src/pages/Product.jsx
import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../../data/mockData";
import Breadcrumbs from "../../components/Breadcrumbs";
import ImageGallery from "../../components/ImageGallery";
import RelatedProducts from "../../components/RelatedProducts";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductPage() { 
    const { slug } = useParams();
    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-heading text-text mb-4">Producto no encontrado</h1>
                <p className="text-text-light">El producto solicitado no existe o fue movido.</p>
                <Link to="/catalogo" className="mt-6 inline-block btn btn-primary">Volver al Catálogo</Link>
            </div>
        );
    }

    // Breadcrumbs: Inicio > Catálogo > Category > Product
    const crumbs = [
        { label: "Inicio", to: "/" },
        { label: "Catálogo", to: "/catalogo" },
        { label: product.category || "Categoría", to: `/catalogo?cat=${encodeURIComponent(product.category || "")}` },
        { label: product.name },
    ];

    // WhatsApp link
    const phone = "59170000000"; // reemplaza por tu número
    const whatsappText = `Hola 👋, quisiera información sobre el producto "${product.name}". ¿Me puedes ayudar?`;
    const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappText)}`;

    // Related products: mismos category, excluyendo el actual
    const related = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <main className="container mx-auto px-4 py-10">
            <Breadcrumbs items={crumbs} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT: Gallery */}
                <div>
                    <ImageGallery images={product.images || []} altPrefix={product.name} video={product.video} />
                </div>

                {/* RIGHT: Info */}
                <div>
                    <h1 className="font-heading font-extrabold text-2xl md:text-3xl text-text mb-3">{product.name}</h1>
                    {product.short && <h2 className="text-md text-text-light mb-4 font-body">{product.short}</h2>}

                    {/* Price */}
                    <div className="mb-4">
                        {product.price ? (
                            <p className="text-2xl md:text-3xl font-heading text-text font-bold">Bs {product.price.toFixed(2)}</p>
                        ) : (
                            <p className="text-lg font-heading text-text">Consultar por WhatsApp</p>
                        )}
                    </div>

                    {/* Highlights */}
                    {product.highlights?.length ? (
                        <ul className="space-y-2 mb-4">
                            {product.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="text-brand mt-1">•</span>
                                    <span className="text-sm text-text-light">{h}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        // fallback: use some fields
                        <ul className="space-y-2 mb-4">
                            {product.material && <li className="flex items-start gap-3"><span className="text-brand mt-1">•</span><span className="text-sm text-text-light">Material: {product.material}</span></li>}
                            {product.size && <li className="flex items-start gap-3"><span className="text-brand mt-1">•</span><span className="text-sm text-text-light">Tamaño: {product.size}</span></li>}
                            {product.petTypes && <li className="flex items-start gap-3"><span className="text-brand mt-1">•</span><span className="text-sm text-text-light">Para: {product.petTypes.join(", ")}</span></li>}
                        </ul>
                    )}

                    {/* Detailed description */}
                    <div className="mb-6">
                        <h3 className="font-heading text-lg mb-2">Descripción</h3>
                        <p className="text-text-light text-sm">{product.description}</p>
                    </div>

                    {/* Specs */}
                    <div className="mb-6">
                        <h3 className="font-heading text-lg mb-2">Especificaciones</h3>

                        <table className="w-full text-sm text-text-light">
                            <tbody>
                                {product.dimensions && (
                                    <tr>
                                        <td className="py-2 font-medium">Dimensiones</td>
                                        <td className="py-2 text-right">{product.dimensions}</td>
                                    </tr>
                                )}
                                {product.material && (
                                    <tr>
                                        <td className="py-2 font-medium">Materiales</td>
                                        <td className="py-2 text-right">{product.material}</td>
                                    </tr>
                                )}
                                {product.weightCapacity && (
                                    <tr>
                                        <td className="py-2 font-medium">Peso soportado</td>
                                        <td className="py-2 text-right">{product.weightCapacity}</td>
                                    </tr>
                                )}
                                {product.colors && (
                                    <tr>
                                        <td className="py-2 font-medium">Colores</td>
                                        <td className="py-2 text-right">{product.colors.join(", ")}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Questions & CTA */}
                    <div className="mb-6">
                        <p className="text-text-light mb-3">¿Dudas con el tamaño o envío?</p>
                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-5 py-3 rounded-lg font-heading font-semibold"
                            aria-label="Consultar por WhatsApp"
                        >
                            <FaWhatsapp className="w-5 h-5" /> ¡Consultar por WhatsApp Ahora!
                        </a>
                    </div>
                </div>
            </div>

            {/* Related */}
            <RelatedProducts products={related} />
        </main>
    );
}
