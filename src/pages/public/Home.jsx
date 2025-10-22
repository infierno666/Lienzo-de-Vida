// src/pages/Home.jsx
import { Link } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard";
import { mockProducts } from "../../data/mockData";
import Testimonials from "../../components/Testimonials";
import { FiShoppingCart } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
    const destacados = mockProducts.filter((p) => p.featured).slice(0, 3);
    const gallery = mockProducts.slice(0, 6);

    const testimonials = [
        {
            name: "María P.",
            quote: "La cama es fantástica, mi perro duerme mejor.",
            meta: "Santa Cruz",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
        },
        {
            name: "Carlos R.",
            quote: "Calidad y diseño, súper recomendados.",
            meta: "Cochabamba",
            avatar: "https://images.unsplash.com/photo-1545996124-1a8cbb0f0b5f?w=200&auto=format&fit=crop",
        },
    ];

    // Hero background (public CDN fallback ok)
    const heroImage =
        "src/assets/hero.webp";

    // Framer Motion variants
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };

    const itemUp = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
    };

    return (
        <>
            {/* --- HERO ANIMADO (100vh) --- */}
            <section
                id="hero"
                className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url('${heroImage}')` }}
                aria-label="Hero Lienzo de Vida"
            >
                {/* Overlay oscuro */}
                <motion.div
                    className="hero-overlay absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    aria-hidden="true"
                />

                {/* Contenido animado */}
                <motion.div
                    className="relative z-10 text-center text-white px-4 max-w-3xl"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.h1
                        className="font-heading text-4xl font-black sm:text-5xl md:text-6xl lg:text-6xl leading-tight mb-4"
                        variants={itemUp}
                    >
                        Diseño &amp; Confort Exclusivo para Tu Compañero Fiel
                    </motion.h1>

                    <motion.p
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-body font-medium"
                        variants={itemUp}
                    >
                        Camas y Muebles Pensados para el Bienestar de Canes y Felinos.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-3 mb-12"
                        variants={itemUp}
                    >
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg font-heading font-semibold text-lg transition"
                            aria-label="Explorar catálogo"
                        >
                            <FiShoppingCart className="w-5 h-5" /> Explorar Catálogo
                        </Link>

                        <a
                            href={`https://wa.me/59170000000?text=${encodeURIComponent(
                                "Hola, quiero más información sobre sus productos."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg font-heading font-semibold text-lg transition"
                            aria-label="Contactar por WhatsApp"
                        >
                            <FaWhatsapp className="w-5 h-5" /> Contacta por WhatsApp
                        </a>
                    </motion.div>

                    {/* Botón de scroll hacia la siguiente sección */}
                    <motion.button
                        onClick={() =>
                            document
                                .getElementById("destacados")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                        className="animate-bounce inline-flex  bottom-8 flex-col items-center justify-center text-white/80 hover:text-white transition"
                        aria-label="Desplazarse hacia abajo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <svg
                            className="w-8 h-8 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="text-xs mt-1">Ver más</span>
                    </motion.button>
                </motion.div>
            </section>

            {/* --- Productos destacados --- */}
            <section className="container mx-auto px-4 py-12" id="destacados">
                <h2 className="text-2xl md:text-3xl font-heading text-text text-center mb-3">
                    Los Más Buscados
                </h2>
                <p className="text-center text-text-light mb-8 max-w-2xl mx-auto">
                    Descubre la calidad y el diseño que marcan la diferencia.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(destacados.length ? destacados : gallery.slice(0, 3)).map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            {/* --- Filosofía / Por qué elegir --- */}
            <section className="py-12 bg-soft" id="filosofia">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-heading text-text text-center mb-8">
                        Por Qué Elegir Lienzo de Vida
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-xl text-center shadow-soft">
                            <div className="mx-auto icon-circle" aria-hidden="true">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-lg mb-2 text-text">Calidad Premium</h3>
                            <p className="text-text-light text-sm">
                                Materiales seleccionados y diseños exclusivos que garantizan durabilidad y confort superior.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl text-center shadow-soft">
                            <div className="mx-auto icon-circle" aria-hidden="true">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.46 4.46 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.54 3 22 5.46 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-lg mb-2 text-text">Pasión por las Mascotas</h3>
                            <p className="text-text-light text-sm">Cada producto está pensado para la salud y comodidad de tu compañero.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl text-center shadow-soft">
                            <div className="mx-auto icon-circle" aria-hidden="true">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 3h18v2H3zM3 7h18v2H3zM3 11h18v10H3z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-lg mb-2 text-text">Envío Seguro</h3>
                            <p className="text-text-light text-sm">Entregamos en todo Bolivia con embalaje especializado para proteger cada producto.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl text-center shadow-soft">
                            <div className="mx-auto icon-circle" aria-hidden="true">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 1l3 6 6 .5-4.5 4 .7 6L12 15l-5.2 2.5.7-6L3 7.5 9 7 12 1z" />
                                </svg>
                            </div>
                            <h3 className="font-heading text-lg mb-2 text-text">Garantía de Satisfacción</h3>
                            <p className="text-text-light text-sm">Respaldamos la calidad con garantía y soporte postventa.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA general */}
            <section className="py-12">
                <div className="container mx-auto px-4 text-center bg-soft rounded-2xl py-10">
                    <h2 className="text-2xl md:text-3xl font-heading text-text mb-3">¿Listo para dar lo mejor a tu mascota?</h2>
                    <p className="text-text-light mb-6">Explora nuestro catálogo completo o contáctanos directamente para una atención personalizada.</p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/catalogo" className="btn btn-primary">Ver Todo el Catálogo</Link>
                        <a
                            href={`https://wa.me/59170000000?text=${encodeURIComponent("Hola! quiero asistencia personalizada")}`}
                            className="border border-brand text-brand px-5 py-3 rounded-lg font-heading font-medium hover:bg-brand/5"
                        >
                            Chatea con Nosotros
                        </a>
                    </div>
                </div>
            </section>

            {/* testimonios */}
            <Testimonials items={testimonials} />
        </>
    );
}
