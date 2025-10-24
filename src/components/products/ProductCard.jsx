import { Link } from "react-router-dom";
// Mantenemos las importaciones de íconos necesarias
import { AiOutlineEye } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCard({ product }) {
    const whatsappPhone = "59170049343";
    const whatsappMsg = encodeURIComponent(`Hola, me interesa el producto: ${product.name}. ¿Podrían darme más detalles?`);
    const whatsappURL = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

    // Función para formatear el precio
    const formatPrice = (price) => {
        return `Bs ${price ? price.toLocaleString('es-BO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : '??'}`;
    }

    return (
        // Ajuste en el redondeo y espaciado para mejor aspecto en móvil
        <article className="group relative bg-white rounded-lg lg:rounded-xl shadow-md overflow-hidden 
                            transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

            {/* --- Sección de Imagen --- */}
            <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <img
                    src={product.images?.[0] || "/assets/placeholder-1.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Insignia de Destacado */}
                {product.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-brand text-white rounded-full z-10 shadow-md">
                        DESTACADO
                    </span>
                )}
            </div>

            {/* --- Sección de Información y Botones --- */}
            <div className="p-3 sm:p-4"> {/* Reducción de padding para móvil */}
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-text mb-1 truncate" title={product.name}>
                    {product.name}
                </h3>

                <p className="text-text-light text-xs sm:text-sm mb-3 h-8 sm:h-10 overflow-hidden line-clamp-2"> {/* Texto más pequeño y altura menor en móvil */}
                    {product.short || product.description}
                </p>

                {/* --- Bloque de Precio y Acciones (COMBINADO) --- */}
                <div className="pt-2 border-t border-gray-100 mt-3 sm:mt-4">
                    {/* Precio */}
                    <p className="text-xl font-bold text-brand mb-3">
                        {formatPrice(product.price)}
                    </p>

                    {/* Botones de acción */}
                    <div className="flex justify-between items-center gap-2">

                        {/* Botón 1: Ver Detalles (Icono en móvil, Texto en SM+) */}
                        <Link
                            to={`/producto/${product.slug}`}
                            aria-label={`Ver detalles de ${product.name}`}
                            // Móvil: w-9 h-9 (mejor target táctil) y text-xs. Desktop (sm:): padding y text-sm
                            className="flex-shrink-0 w-9 h-9 sm:w-auto sm:flex-1 flex items-center justify-center gap-1.5 text-xs sm:text-sm sm:px-3 sm:py-2 font-medium border border-gray-300 text-text rounded-lg hover:bg-soft transition duration-300"
                            title="Ver Detalles"
                        >
                            <AiOutlineEye className="w-4 h-4" />
                            <span className="hidden sm:inline">Detalles</span> {/* Oculta texto en móvil */}
                        </Link>

                        {/* Botón 2: Consultar por WhatsApp (CTA Principal) */}
                        <a
                            href={whatsappURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Consultar ${product.name} por WhatsApp`}
                            // Ajuste para móvil: padding menor (py-1.5, px-2) y text-xs. Desktop: padding y text-sm
                            className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm font-medium bg-brand text-white rounded-lg hover:bg-brand-dark transition duration-300"
                            title="Consultar por WhatsApp"
                        >
                            <FaWhatsapp className="w-4 h-4" /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
