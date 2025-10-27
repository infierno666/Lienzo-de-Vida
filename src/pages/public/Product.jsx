// src/pages/Product.jsx - VERSIÓN FUNCIONAL CON BACKEND
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductBySlug, getAllProducts } from "../../api/productService"; // Importamos el servicio
import Breadcrumbs from "../../components/products/Breadcrumbs";
import ImageGallery from "../../components/products/ImageGallery";
import RelatedProducts from "../../components/products/RelatedProducts";
import { FaWhatsapp, FaCheckCircle, FaSpinner } from "react-icons/fa"; // Añadimos FaSpinner para carga

// Componente principal de la página de producto
export default function ProductPage() {
    const { slug } = useParams();
    
    // Estados para manejar la carga de datos
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [related, setRelated] = useState([]); // Estado para productos relacionados

    // -----------------------------------------------------------
    // LÓGICA DE CARGA DEL PRODUCTO PRINCIPAL
    // -----------------------------------------------------------
    useEffect(() => {
        const fetchProductAndRelated = async () => {
            setLoading(true);
            setError(null);
            setProduct(null);

            if (!slug) {
                setError("No se proporcionó un identificador de producto (slug).");
                setLoading(false);
                return;
            }

            try {
                // 1. Cargar Producto por Slug
                const productResponse = await getProductBySlug(slug);
                const fetchedProduct = productResponse.product; // Tu endpoint devuelve { product: data }
                
                if (!fetchedProduct) {
                    setError("Producto no encontrado o no disponible.");
                    setLoading(false);
                    return;
                }
                setProduct(fetchedProduct);

                // 2. Cargar Productos Relacionados (por categoría)
                // NOTA: En un entorno de producción real, este filtro se haría mejor en el backend.
                const allProductsResponse = await getAllProducts();
                const allProducts = allProductsResponse.products || [];

                const relatedProducts = allProducts
                    .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
                    .slice(0, 4);

                setRelated(relatedProducts);

            } catch (err) {
                console.error("Error al cargar el producto:", err);
                // Aquí capturamos el error 404 del backend
                setError(err.message || "No se pudo conectar con el servidor para obtener el producto.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductAndRelated();
    }, [slug]); // Se vuelve a ejecutar si el slug de la URL cambia

    // -----------------------------------------------------------
    // RENDERIZADO DE ESTADOS (Carga/Error/No encontrado)
    // -----------------------------------------------------------

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-32 text-center text-brand">
                <FaSpinner className="animate-spin w-8 h-8 mx-auto mb-4" />
                <h1 className="text-xl font-heading">Cargando detalles del producto...</h1>
            </div>
        );
    }
    
    // Si hay un error (incluyendo el 404 de "Producto no encontrado")
    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-heading text-text mb-4">
                    {product ? "Producto no disponible 😢" : "Producto no encontrado 😢"}
                </h1>
                <p className="text-text-light">{error || "El producto solicitado no existe o fue movido."}</p>
                <Link to="/catalogo" className="mt-6 inline-block bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors">Volver al Catálogo</Link>
            </div>
        );
    }

    // -----------------------------------------------------------
    // DATOS DINÁMICOS Y LÓGICA DEL UI
    // -----------------------------------------------------------

    // Generar breadcrumbs
    const crumbs = [
        { label: "Inicio", to: "/" },
        { label: "Catálogo", to: "/catalogo" },
        { label: product.category || "Categoría", to: `/catalogo?cat=${encodeURIComponent(product.category || "")}` },
        { label: product.name },
    ];

    // Lógica de WhatsApp (usando datos del producto)
    const phone = "59170000000"; // Número de ejemplo
    const whatsappText = `Hola 👋, quisiera información sobre el producto "${product.name}". ¿Me puedes ayudar?`;
    const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappText)}`;

    // -----------------------------------------------------------
    // RENDERIZADO FINAL DEL PRODUCTO
    // -----------------------------------------------------------

    return (
        <main className="">
            <section className="max-w-7xl mx-auto px-4 py-8 md:py-10">
                <Breadcrumbs items={crumbs} />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LEFT: Gallery */}
                    <div>
                        <ImageGallery images={product.images || []} altPrefix={product.name} video={product.video} />
                    </div>

                    {/* RIGHT: Info */}
                    <div className="lg:sticky lg:top-8 h-max">
                        {/* Categoría */}
                        {product.category && <p className="text-sm font-semibold text-text-light uppercase mb-1">{product.category}</p>}

                        {/* Nombre y Descripción Corta */}
                        <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-text mb-3">{product.name}</h1>
                        {product.short && <p className="text-base text-text-light mb-6 font-body leading-relaxed">{product.short}</p>}

                        {/* Precio */}
                        <div className="mb-6">
                            {product.price ? (
                                <p className="text-4xl lg:text-5xl font-extrabold text-text">Bs {Number(product.price).toFixed(2)}</p>
                            ) : (
                                <p className="text-xl font-heading text-text font-semibold">Consultar Precio</p>
                            )}
                        </div>

                        {/* Llamada a la Acción (CTA) */}
                        <div className="mb-8">
                            <a
                                href={whatsappHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-heading font-bold text-xl shadow-md hover:shadow-lg transition-all"
                                aria-label="Consultar por WhatsApp"
                            >
                                <FaWhatsapp className="w-5 h-5" /> ¡Consultar por WhatsApp Ahora!
                            </a>
                        </div>

                        {/* Separador visual ligero */}
                        <hr className="mb-8 border-gray-100" />

                        {/* Highlights (Características Clave) */}
                        {product.highlights?.length > 0 ? (
                            <div className="mb-8">
                                <h3 className="font-heading text-xl font-semibold mb-4 text-text">Características Clave</h3>
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
                            // Fallback de detalles rápidos
                            <div className="space-y-3 mb-8">
                                <h3 className="font-heading text-xl font-semibold mb-2 text-text">Detalles Rápidos</h3>
                                <p className="text-sm text-text">
                                    {product.material && <span className="mr-4">Material: <span className="font-medium">{product.material}</span></span>}
                                    {product.size && <span className="mr-4">Tamaño: <span className="font-medium">{product.size}</span></span>}
                                    {/* NOTA: Corregido a pet_types (snake_case) */}
                                    {product.pet_types?.length > 0 && <span>Para: <span className="font-medium">{product.pet_types.join(", ")}</span></span>} 
                                </p>
                            </div>
                        )}

                        {/* Separador visual */}
                        <hr className="mb-8 border-gray-100" />

                        {/* Descripción Detallada */}
                        <div className="mb-8">
                            <h3 className="font-heading text-xl font-semibold mb-3 text-text">Acerca del Producto</h3>
                            <p className="text-text-light text-base leading-relaxed">{product.description}</p>
                        </div>

                        {/* Specs (Especificaciones Técnicas) */}
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-heading text-xl font-semibold mb-3 text-text">Especificaciones Técnicas</h3>
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
                                {/* NOTA: weightCapacity y colors no están en tu esquema DB, los eliminé o comenté */}
                                {/* {product.weightCapacity && ( ... )} */}
                                {/* {product.colors && ( ... )} */}
                            </dl>
                        </div>
                    </div>
                </div>
            </section>

            {/* Productos Relacionados */}
            {related.length > 0 && <RelatedProducts products={related} />}
        </main>
    );
}