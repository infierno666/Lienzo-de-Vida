// src/components/Testimonials.jsx
import { useState } from "react";

export default function Testimonials({ items = [] }) {
    const [index, setIndex] = useState(0);
    if (!items.length) return null;

    const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
    const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-heading text-text text-center mb-6">
                Lo que Opinan Nuestros Clientes
            </h2>

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-soft p-6">
                    <p className="text-gray-700 italic mb-4">“{items[index].quote}”</p>
                    <div className="flex items-center gap-3">
                        <img src={items[index].avatar || "/assets/placeholder-avatar.png"} alt={items[index].name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                            <p className="font-heading text-sm text-text">{items[index].name}</p>
                            <p className="text-xs text-gray-500">{items[index].meta}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <button onClick={prev} className="px-3 py-1 border rounded-md">Anterior</button>
                    <button onClick={next} className="px-3 py-1 border rounded-md">Siguiente</button>
                </div>
            </div>
        </section>
    );
}
