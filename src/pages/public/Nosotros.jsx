import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// **CORREGIDO:** Importamos todos los íconos necesarios desde lucide-react.
import { Award, Feather, PawPrint, MessageCircle, Heart, Users } from "lucide-react";


// --- Framer Motion Variants ---

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] } }, // Curva de Bezier para elegancia
};

const cardHover = {
    rest: { scale: 1, boxShadow: "0 10px 25px rgba(0,0,0,0.05)", transition: { duration: 0.3 } },
    hover: {
        scale: 1.03, // Suave zoom
        boxShadow: "0 18px 45px rgba(0,0,0,0.15)", // Sombra profunda
        transition: { duration: 0.35, ease: "easeOut" },
    },
};

// --- Componente Principal ---

export default function Nosotros() {
    return (
        <main>
            {/* Header / Hero Section (Más amplio y con fondo de contraste) */}
            <header className="bg-soft py-24 sm:py-32 border-b border-gray-100">
                <motion.div
                    className="max-w-7xl mx-auto px-6 text-center"
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    <motion.p className="text-sm font-semibold uppercase text-brand tracking-widest mb-3" variants={fadeUp}>
                        Nuestra Esencia
                    </motion.p>
                    <motion.h1
                        className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl text-text leading-tight mb-6"
                        variants={fadeUp}
                    >
                        Donde el Diseño se Encuentra con el <span className="text-brand">Cariño</span>
                    </motion.h1>
                    <motion.p className="mt-4 text-text-light max-w-4xl mx-auto text-xl sm:text-2xl" variants={fadeUp}>
                        En Lienzo de Vida, cada producto es una promesa de confort, estilo y durabilidad,
                        pensado para integrarse perfectamente en tu hogar y enriquecer la vida de tus mascotas.
                    </motion.p>
                </motion.div>
            </header>


            {/* Sección 1: Historia, Misión y Visión (Layout moderno con énfasis) */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-20 lg:py-28"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={container}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div className="lg:order-1" variants={fadeUp}>
                        <h2 className="font-heading text-4xl font-bold text-text mb-6 border-l-4 border-brand pl-4">
                            Un Viaje de Diseño y Pasión
                        </h2>

                        <div className="space-y-8 text-lg">
                            <div>
                                {/* Uso del ícono Users */}
                                <h3 className="font-heading text-2xl font-semibold text-brand mb-2 inline-flex items-center gap-2">
                                    <Users className="w-5 h-5" /> Nuestra Historia
                                </h3>
                                <p className="text-text-light leading-relaxed">
                                    Nacimos en 2024 por la necesidad de ofrecer soluciones de descanso para mascotas que no sacrificaran la estética del hogar. Iniciamos como artesanos del diseño, y hoy somos un referente en mobiliario para mascotas que combina lujo responsable y funcionalidad.
                                </p>
                            </div>

                            <div>
                                {/* Uso del ícono Heart */}
                                <h3 className="font-heading text-2xl font-semibold text-text mb-2 inline-flex items-center gap-2">
                                    <Heart className="w-5 h-5" /> Misión
                                </h3>
                                <p className="text-text-light leading-relaxed">
                                    Proveer productos de la más alta calidad que garanticen el bienestar físico y mental de los animales, a través de diseños ergonómicos, materiales hipoalergénicos y un proceso de fabricación ético.
                                </p>
                            </div>

                            <div>
                                {/* Uso del ícono Feather */}
                                <h3 className="font-heading text-2xl font-semibold text-text mb-2 inline-flex items-center gap-2">
                                    <Feather className="w-5 h-5" /> Visión
                                </h3>
                                <p className="text-text-light leading-relaxed">
                                    Liderar el mercado latinoamericano de accesorios para mascotas, estableciendo el estándar de oro en salud, diseño sostenible y durabilidad, fomentando una comunidad consciente sobre el cuidado animal.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="lg:order-2" variants={fadeUp}>
                        <motion.img
                            src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=1600&auto=format&fit=crop"
                            alt="Mesa de trabajo de diseño con un perro"
                            className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-brand-light transform hover:rotate-1 transition duration-500"
                            loading="lazy"
                            initial={{ scale: 0.95, rotate: -1 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.9, ease: "easeInOut" }}
                        />
                    </motion.div>
                </div>
            </motion.section>


            {/* Sección 2: Valores Clave (Diseño de tarjeta más limpio y profesional) */}
            <motion.section
                className="bg-gray-50 py-20 lg:py-28"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={container}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2 className="font-heading text-4xl font-bold text-text text-center mb-6" variants={fadeUp}>
                        Nuestros Valores Fundamentales
                    </motion.h2>
                    <motion.p className="text-text-light text-center max-w-3xl mx-auto mb-16 text-lg" variants={fadeUp}>
                        Guiados por la empatía y la excelencia, estos pilares definen cada producto que creamos.
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Calidad Artesanal */}
                        <motion.article
                            className="bg-white rounded-xl p-10 text-left shadow-lg border-l-4 border-brand"
                            initial="rest"
                            whileHover="hover"
                            variants={cardHover}
                        >
                            <motion.div
                                className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-brand-light text-brand"
                                variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                            >
                                {/* Uso del ícono Award */}
                                <Award className="w-6 h-6" />
                            </motion.div>

                            <motion.h3 className="font-heading text-xl font-semibold mb-3 text-text" variants={fadeUp}>
                                Excelencia Artesanal
                            </motion.h3>
                            <motion.p className="text-text-light text-base" variants={fadeUp}>
                                Cada pieza es fabricada con el máximo rigor, asegurando la durabilidad y utilizando acabados que garantizan un producto premium.
                            </motion.p>
                        </motion.article>

                        {/* Diseño con Sentido */}
                        <motion.article
                            className="bg-white rounded-xl p-10 text-left shadow-lg border-l-4 border-brand"
                            initial="rest"
                            whileHover="hover"
                            variants={cardHover}
                        >
                            <motion.div
                                className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-brand-light text-brand"
                                variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                            >
                                {/* Uso del ícono Feather */}
                                <Feather className="w-6 h-6" />
                            </motion.div>

                            <motion.h3 className="font-heading text-xl font-semibold mb-3 text-text" variants={fadeUp}>
                                Estética Funcional
                            </motion.h3>
                            <motion.p className="text-text-light text-base" variants={fadeUp}>
                                Fusionamos la belleza del diseño contemporáneo con la ergonomía necesaria para la salud y el comportamiento natural de tu mascota.
                            </motion.p>
                        </motion.article>

                        {/* Bienestar Animal */}
                        <motion.article
                            className="bg-white rounded-xl p-10 text-left shadow-lg border-l-4 border-brand"
                            initial="rest"
                            whileHover="hover"
                            variants={cardHover}
                        >
                            <motion.div
                                className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-brand-light text-brand"
                                variants={{ rest: { x: 0 }, hover: { x: 5 } }}
                            >
                                {/* Uso del ícono PawPrint */}
                                <PawPrint className="w-6 h-6" />
                            </motion.div>

                            <motion.h3 className="font-heading text-xl font-semibold mb-3 text-text" variants={fadeUp}>
                                Bienestar Primero
                            </motion.h3>
                            <motion.p className="text-text-light text-base" variants={fadeUp}>
                                Nuestras decisiones de materiales y forma siempre priorizan la comodidad, seguridad y salud de los animales, sin excepción.
                            </motion.p>
                        </motion.article>
                    </div>
                </div>
            </motion.section>

            {/* Sección 3: Equipo (Estilo visual con efecto 'grayscale' para un look premium) */}
            <motion.section
                className="max-w-7xl mx-auto px-6 py-20 lg:py-28"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={container}
            >
                <motion.h2 className="font-heading text-4xl font-bold text-text text-center mb-6" variants={fadeUp}>
                    Conoce a la Familia Lienzo de Vida
                </motion.h2>

                <motion.p className="text-text-light text-center max-w-2xl mx-auto mb-16 text-lg" variants={fadeUp}>
                    Somos un pequeño equipo de profesionales dedicados, donde cada persona aporta su pasión por el diseño y el amor por los animales.
                </motion.p>

                {/* La cuadrícula se mantiene en 2 columnas para el diseño de 2 personas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {[
                        {
                            // Dueño del emprendimiento que hace todo lo demás
                            name: "Albaro Jhimy Maldonado Condori",
                            role: "Diseñador Principal & Jefe de Producción",
                            bio: "La mente creativa y artesanal detrás de cada cama. Lidera el diseño, la calidad de materiales y la producción.",
                            avatar: "src/assets/LV.webp",
                        },
                        {
                            // Daniel Maldonado Céspedes (Desarrollador y Coordinador de Página)
                            name: "Daniel Maldonado Céspedes",
                            role: "Desarrollador Web & Coordinador Digital",
                            bio: "Responsable de la plataforma online, desde el desarrollo web hasta la coordinación de la presencia digital.",
                            avatar: "src/assets/DEV.png",
                        },
                    ].map((m, i) => (
                        <motion.article
                            key={i}
                            className="text-center bg-white rounded-2xl p-6 shadow-xl overflow-hidden group"
                            initial="rest"
                            whileHover="hover"
                            variants={cardHover}
                        >
                            <motion.img
                                src={m.avatar}
                                alt={m.name}
                                className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-transparent group-hover:border-brand transition duration-300 filter grayscale group-hover:grayscale-0"
                                loading="lazy"
                            />
                            <motion.h4 className="font-heading text-xl font-bold mb-1 text-text" variants={fadeUp}>
                                {m.name}
                            </motion.h4>
                            <motion.p className="text-sm font-medium text-brand mb-3" variants={fadeUp}>
                                {m.role}
                            </motion.p>
                            <motion.p className="text-sm text-text-light/80" variants={fadeUp}>
                                {m.bio}
                            </motion.p>
                        </motion.article>
                    ))}
                </div>
            </motion.section>


            <motion.section
                // CLASE MODIFICADA: Cambiamos bg-brand-dark por un gris claro
                className="bg-gray-100 py-20 border-t border-gray-200"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={container}
            >
                <div className="max-w-5xl mx-auto px-6 text-center text-text"> {/* Texto a color oscuro */}
                    <motion.h3 className="font-heading text-4xl font-extrabold mb-4 text-text" variants={fadeUp}>
                        Tu Mascota Merece una Obra de Arte
                    </motion.h3>
                    {/* Texto de apoyo en un gris más oscuro */}
                    <motion.p className="text-text-light mb-10 text-xl" variants={fadeUp}>
                        Explora nuestra exclusiva colección y transforma el espacio de descanso de tu compañero.
                    </motion.p>

                    <motion.div className="flex flex-col sm:flex-row justify-center gap-6" variants={fadeUp}>
                        {/* Botón 1: Fondo de marca (brand) y texto blanco */}
                        <Link to="/catalogo" className="btn btn-primary bg-brand text-white hover:bg-brand-dark px-8 py-3 text-lg font-semibold shadow-xl">
                            Ver Colección Completa
                        </Link>

                        {/* Botón 2: Botón de borde, texto de marca (brand) y fondo blanco/transparente */}
                        <a
                            href={`https://wa.me/59170000000?text=${encodeURIComponent(
                                "Hola! Me gustaría conversar con Lienzo de Vida sobre un diseño personalizado o consulta general."
                            )}`}
                            className="btn inline-flex items-center gap-3 border-2 border-brand text-brand hover:bg-brand hover:text-white px-8 py-3 text-lg font-semibold transition duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MessageCircle className="w-5 h-5" /> ¿Preguntas? Hablemos por WhatsApp
                        </a>
                    </motion.div>
                </div>
            </motion.section>
        </main>
    );
}
