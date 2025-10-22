// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

export default function ProductCard({ product }) {
    const whatsappPhone = "59170000000";
    const whatsappMsg = encodeURIComponent(`Hola, quiero consultar por el producto ${product.name}`);
    const whatsappURL = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

    return (
        <article className="relative bg-white rounded-2xl shadow-soft overflow-hidden">
            {product.featured && (
                <span className="badge-pill">Destacado</span>
            )}

            <div className="w-full aspect-square bg-gray-100 overflow-hidden">
                <img
                    src={product.images?.[0] || "/assets/placeholder-1.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            <div className="p-4">
                <h3 className="font-heading text-lg text-text mb-1">{product.name}</h3>
                <p className="text-text-light text-sm mb-3">{product.short ?? product.description}</p>

                <div className="flex items-center justify-between mt-3">
                    <div>
                        <p className="text-text font-semibold">Bs {product.price?.toFixed(0)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            to={`/producto/${product.slug}`}
                            className="btn-outline-green"
                            aria-label={`Ver detalles de ${product.name}`}
                        >
                            <AiOutlineEye className="w-4 h-4" /> Ver Detalles
                        </Link>

                        <a
                            href={whatsappURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand text-white px-3 py-2 rounded-md"
                            aria-label={`Consultar ${product.name} por WhatsApp`}
                            title="Consultar por WhatsApp"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
