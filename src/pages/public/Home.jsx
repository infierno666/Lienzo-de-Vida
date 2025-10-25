import { Link } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard";
import { mockProducts } from "../../data/mockData";
import Testimonials from "../../components/Testimonials";
// Se mantienen los íconos originales para el Hero
import { FiShoppingCart, FiTruck, FiHeart, FiAward, FiMessageCircle } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoPaw, IoLogoWhatsapp } from 'react-icons/io5';

export default function Home() {
    // ... (Mantén tus datos, mockProducts, destacados, gallery, testimonials, y heroImage) ...
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

    const heroImage =
        "src/assets/hero.webp";

    // Framer Motion variants
    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };

    const itemUp = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
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
                {/* Overlay Oscuro para mejor legibilidad */}
                <motion.div
                    className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" // Mejor Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    aria-hidden="true"
                />

                {/* Contenido animado */}
                <motion.div
                    className="relative z-10 text-center text-white px-4 max-w-4xl" // Este es el contenedor padre del botón
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {/* Título y Párrafo */}
                    <motion.h1
                        className="font-heading text-4xl font-black sm:text-6xl md:text-7xl lg:text-7xl leading-none mb-6"
                        variants={itemUp}
                    >
                        Diseño &amp; Confort Exclusivo para Tu Compañero Fiel
                    </motion.h1>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 font-body font-light"
                        variants={itemUp}
                    >
                        Camas y Muebles Pensados para el Bienestar de Canes y Felinos. Calidad que se siente y se ve.
                    </motion.p>

                    {/* Contenedor de botones (Principal) */}
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
                        variants={itemUp}
                    >
                        {/* ... Botones Catálogo y WhatsApp ... */}
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-heading font-bold text-xl transition shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                            aria-label="Explorar catálogo"
                        >
                            <FiShoppingCart className="w-6 h-6" /> Explorar Catálogo
                        </Link>

                        <a
                            href={`https://wa.me/59170000000?text=${encodeURIComponent(
                                "Hola, quiero más información sobre sus productos."
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border-2 border-white hover:bg-white/20 text-white px-8 py-4 rounded-xl font-heading font-bold text-xl transition"
                            aria-label="Contactar por WhatsApp"
                        >
                            <FaWhatsapp className="w-6 h-6" /> Contacta por WhatsApp
                        </a>
                    </motion.div>
                    {/* FIN Contenedor de botones */}
                    {/* INICIO Botón de Scroll: FUERA del div de botones, DENTRO de la sección Hero */}
                    <motion.button
                        onClick={() =>
                            document
                                .getElementById("destacados")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }

                        className="absolute  left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center justify-center text-white/80 hover:text-white transition z-20"
                        aria-label="Desplazarse hacia abajo"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className="text-sm mt-1">Ver más</span>
                    </motion.button>
                    {/* FIN Botón de Scroll */}
                </motion.div>

            </section>

            {/* --- Productos destacados (Animado) --- */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-20" // Mayor padding vertical
                id="destacados"
                variants={container}
                initial="hidden"
                whileInView="show" // Se anima al entrar en el viewport
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.span variants={itemUp} className="block text-center text-brand font-medium mb-1 tracking-widest uppercase">
                    Lo Mejor de la Tienda
                </motion.span>
                <motion.h2 variants={itemUp} className="text-3xl md:text-4xl font-heading text-text text-center mb-4 font-extrabold">
                    Los Más Buscados
                </motion.h2>
                <motion.p variants={itemUp} className="text-center text-text-light mb-12 max-w-2xl mx-auto text-lg">
                    Descubre la calidad, el diseño y el confort que marcan la diferencia en el descanso de tu mascota.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Mayor gap */}
                    {(destacados.length ? destacados : gallery.slice(0, 3)).map((p) => (
                        <motion.div key={p.id} variants={itemUp}> {/* Aplica animación a cada tarjeta */}
                            <ProductCard product={p} />
                        </motion.div>
                    ))}
                </div>

                <motion.div variants={itemUp} className="text-center mt-12">
                    <Link to="/catalogo" className="text-brand font-semibold text-lg hover:text-brand-dark transition inline-flex items-center gap-1">
                        Ver todo el catálogo <svg className="w-4 h-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </motion.div>
            </motion.section>

            {/* --- Filosofía / Por qué elegir (Animado con iconos) --- */}
            <motion.section
                className="py-24 bg-soft" // Aumentamos un poco el padding vertical
                id="filosofia"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="container mx-auto px-6">
                    <motion.h2 variants={itemUp} className="text-3xl md:text-4xl font-heading text-text text-center mb-4 font-extrabold">
                        Por Qué Elegir Lienzo de Vida
                    </motion.h2>
                    <motion.p variants={itemUp} className="text-center text-text-light mb-16 max-w-3xl mx-auto text-lg">
                        Somos la elección de quienes buscan productos que combinan **estilo, calidad superior y el máximo bienestar** para sus mascotas.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                        {/* 1. Calidad Premium */}
                        <motion.div
                            variants={itemUp}
                            className="relative bg-white p-8 pt-12 rounded-2xl text-center shadow-xl border-t-4 border-brand-light 
                           transition duration-300 ease-in-out hover:bg-brand/5 hover:shadow-2xl hover:scale-[1.03]"
                        >
                            <FiAward className="w-10 h-10 text-brand mx-auto mb-4" />
                            <h3 className="font-heading text-xl mb-2 text-text font-semibold">Calidad Premium</h3>
                            <p className="text-text-light text-base">Materiales seleccionados y diseños exclusivos que garantizan durabilidad y confort superior.</p>

                            {/* Decoración: Número de paso */}
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 
                                 flex items-center justify-center rounded-full bg-brand text-white text-sm font-bold shadow-md">1</span>
                        </motion.div>

                        {/* 2. Pasión */}
                        <motion.div
                            variants={itemUp}
                            className="relative bg-white p-8 pt-12 rounded-2xl text-center shadow-xl border-t-4 border-brand-light 
                           transition duration-300 ease-in-out hover:bg-brand/5 hover:shadow-2xl hover:scale-[1.03]"
                        >
                            <FiHeart className="w-10 h-10 text-brand mx-auto mb-4" />
                            <h3 className="font-heading text-xl mb-2 text-text font-semibold">Pasión por las Mascotas</h3>
                            <p className="text-text-light text-base">Cada producto está pensado para la salud y comodidad de tu compañero, hecho con amor y detalle.</p>
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 
                                 flex items-center justify-center rounded-full bg-brand text-white text-sm font-bold shadow-md">2</span>
                        </motion.div>

                        {/* 3. Envío Seguro */}
                        <motion.div
                            variants={itemUp}
                            className="relative bg-white p-8 pt-12 rounded-2xl text-center shadow-xl border-t-4 border-brand-light 
                           transition duration-300 ease-in-out hover:bg-brand/5 hover:shadow-2xl hover:scale-[1.03]"
                        >
                            <FiTruck className="w-10 h-10 text-brand mx-auto mb-4" />
                            <h3 className="font-heading text-xl mb-2 text-text font-semibold">Envío Seguro</h3>
                            <p className="text-text-light text-base">Entregamos en todo Bolivia con embalaje especializado para proteger cada producto y su inversión.</p>
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 
                                 flex items-center justify-center rounded-full bg-brand text-white text-sm font-bold shadow-md">3</span>
                        </motion.div>

                        {/* 4. Garantía / Soporte */}
                        <motion.div
                            variants={itemUp}
                            className="relative bg-white p-8 pt-12 rounded-2xl text-center shadow-xl border-t-4 border-brand-light 
                           transition duration-300 ease-in-out hover:bg-brand/5 hover:shadow-2xl hover:scale-[1.03]"
                        >
                            <FiMessageCircle className="w-10 h-10 text-brand mx-auto mb-4" />
                            <h3 className="font-heading text-xl mb-2 text-text font-semibold">Soporte Postventa</h3>
                            <p className="text-text-light text-base">Respaldamos la calidad con garantía y soporte rápido para que tu satisfacción sea completa.</p>
                            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 
                                 flex items-center justify-center rounded-full bg-brand text-white text-sm font-bold shadow-md">4</span>
                        </motion.div>

                    </div>
                </div>
            </motion.section>


            {/* --- CTA general (Mantenemos la mejora anterior con corrección de shadow) --- */}
            <section className="py-32 bg-soft">
                <div
                    className="container mx-auto px-6 py-16 text-center 
                               bg-white rounded-3xl shadow-2xl 
                               transition duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.01]" // Corregido: shadow-3xl -> shadow-2xl
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold text-heading mb-4">
                        ¿Listo para dar lo mejor a tu mascota?
                    </h2>

                    <p className="max-w-3xl mx-auto text-lg text-text-light mb-10">
                        Explora nuestro catálogo completo con productos de alta calidad o contáctanos directamente para una atención personalizada y rápida.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">

                        <Link
                            to="/catalogo"
                            className="btn-primary flex items-center justify-center gap-2 px-8 py-4 text-lg 
                                       shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <IoPaw className="text-xl" />
                            Ver Todo el Catálogo
                        </Link>

                        <a
                            href={`https://wa.me/59170000000?text=${encodeURIComponent("Hola! quiero asistencia personalizada")}`}
                            className="border-2 border-brand text-brand bg-white px-8 py-4 rounded-lg font-heading font-semibold 
                                       hover:bg-brand hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 text-lg"
                        >
                            <IoLogoWhatsapp className="text-xl" />
                            Chatea con Nosotros
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}