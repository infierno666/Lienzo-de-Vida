// src/components/Breadcrumbs.jsx - MEJORADO
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; 

/**
 * Breadcrumbs mejorado para diseño compacto.
 * Props:
 * - items: [{ label, to (optional) }]
 */
export default function Breadcrumbs({ items = [] }) {
    return (
        // Quitamos el margen inferior aquí (mb-4) para ajustarlo manualmente donde se usa (ProductPage.jsx) si es necesario, pero lo dejamos por defecto para este ejemplo.
        <nav aria-label="breadcrumb" className="text-sm mb-6">
            <ol className="flex flex-wrap items-center space-x-2"> {/* Usamos space-x para un espaciado consistente */}
                {items.map((it, i) => {
                    const last = i === items.length - 1;
                    return (
                        <li key={i} className="flex items-center">
                            {!last ? (
                                // Enlaces: más sutiles, pero con un hover claro y rápido
                                <Link
                                    to={it.to || "#"}
                                    className="text-text-light hover:text-brand transition-colors font-medium"
                                >
                                    {it.label}
                                </Link>
                            ) : (
                                // Último elemento: texto más oscuro y en negrita para destacar la posición actual
                                <span className="text-text font-semibold">
                                    {it.label}
                                </span>
                            )}

                            {/* Separador moderno con icono (FaChevronRight) */}
                            {!last && (
                                <FaChevronRight className="w-3 h-3 text-gray-400 ml-2 flex-shrink-0" />
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}