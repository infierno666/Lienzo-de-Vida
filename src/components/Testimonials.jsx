// src/components/Testimonials.jsx
import { useState } from "react";
// Importamos íconos de flecha y estrella para una mejor UI
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

// Componente auxiliar para renderizar las estrellas de calificación
const RatingStars = ({ rating = 5 }) => (
    <div className="flex items-center text-brand">
        {/* Crea un array de 5 elementos y mapea los que están calificados */}
        {[...Array(5)].map((_, i) => (
            <StarIcon
                key={i}
                className={`w-5 h-5 transition duration-300 ${i < rating ? 'text-brand' : 'text-gray-300'
                    }`}
            />
        ))}
    </div>
);


export default function Testimonials({ items = [] }) {
    const [index, setIndex] = useState(0);
    if (!items.length) return null;

    // Lógica para el cambio de índice con ciclo
    const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

    // Desestructuramos el testimonio actual para simplificar el JSX
    const currentItem = items[index];

    return (
        <section className="bg-soft py-16"> {/* Usamos el color 'soft' de fondo para destacar la sección */}
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text text-center mb-12">
                    Nuestros Clientes lo Confirman
                </h2>

                <div className="max-w-4xl mx-auto relative">
                    {/* --- Contenedor del Testimonio (Con Transición) --- */}
                    <div
                        key={index} // Cambiar la 'key' fuerza la re-renderización y la animación
                        className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 border-t-4 border-brand 
                                   transition-opacity duration-700 ease-in-out animate-fade-in"
                    >
                        {/* 💡 Mejorado: Icono de comillas grandes y sutiles */}
                        <p className="text-6xl font-serif text-brand/30 absolute top-4 left-6 leading-none select-none">“</p>

                        {/* Rating de Estrellas */}
                        <div className="flex justify-center mb-4 mt-4">
                            <RatingStars rating={currentItem.rating || 5} />
                        </div>

                        {/* Texto de la Cita */}
                        <p className="text-lg sm:text-xl text-gray-700 italic text-center mb-8 px-0 sm:px-8 leading-relaxed">
                            {currentItem.quote}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-gray-100 pt-6">
                            {/* Avatar del Cliente */}
                            <img
                                src={currentItem.avatar || "/assets/placeholder-avatar.png"}
                                alt={currentItem.name}
                                className="w-14 h-14 rounded-full object-cover border-2 border-brand/50 flex-shrink-0"
                            />

                            {/* Información del Cliente */}
                            <div className="text-center sm:text-left">
                                <p className="font-heading text-lg font-semibold text-text">{currentItem.name}</p>
                                {/* 💡 Mejorado: Añadir ubicación o contexto para mayor credibilidad */}
                                <p className="text-sm text-gray-500">{currentItem.meta || currentItem.location || 'Cliente verificado'}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- Controles de Navegación (Flechas Circulares) --- */}
                    <button
                        onClick={prev}
                        aria-label="Testimonio anterior"
                        className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 p-3 bg-white text-brand rounded-full shadow-lg transition hover:bg-brand hover:text-white hidden md:block"
                    >
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>

                    <button
                        onClick={next}
                        aria-label="Testimonio siguiente"
                        className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 p-3 bg-white text-brand rounded-full shadow-lg transition hover:bg-brand hover:text-white hidden md:block"
                    >
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>

                    {/* --- Puntos Indicadores (Dots) --- */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                aria-label={`Ir al testimonio ${i + 1}`}
                                className={`w-3 h-3 rounded-full transition-colors duration-300 ${i === index ? 'bg-brand scale-110' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// NOTA IMPORTANTE: Para que la animación funcione, debes tener 'animate-fade-in'
// definido en tu tailwind.config.js (ya que acabas de modificarlo, agrégalo aquí):

/* // Dentro de theme.extend.keyframes:
'fade-in': {
    '0%': { opacity: 0, transform: 'translateY(10px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
},
// Dentro de theme.extend.animation:
'fade-in': 'fade-in 0.5s ease-out', */