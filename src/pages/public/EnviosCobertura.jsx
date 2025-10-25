// src/pages/public/EnviosCobertura.jsx - TOTALMENTE RESPONSIVE (Tabla Optimizada)

import { motion } from "framer-motion";
import {
    FaWhatsapp,
    FaTruck,
    FaCheckCircle,
    FaMapMarkerAlt // Icono adicional para la sección de cobertura
} from "react-icons/fa";

// ----------------------------------------------------
// 1. ANIMATION VARIANTS (SIN CAMBIOS)
// ----------------------------------------------------

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sectionFade = {
    hidden: { opacity: 0, scale: 0.98, y: 50 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// ----------------------------------------------------
// 2. COMPONENTES REUTILIZABLES (SIN CAMBIOS)
// ----------------------------------------------------

const InfoListItem = ({ children }) => (
    <motion.li
        className="flex items-start gap-3"
        variants={fadeUp}
    >
        <FaCheckCircle className="text-green-500 mt-1 w-4 h-4 flex-shrink-0" />
        <span className="text-gray-700">{children}</span>
    </motion.li>
);

const InfoCard = ({ title, icon: Icon, children }) => (
    <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="p-6 sm:p-8 rounded-2xl bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
    >
        <div className="flex items-center mb-5 border-b pb-3 border-gray-200">
            <Icon className="text-primary w-6 h-6 sm:w-8 sm:h-8 mr-3 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-800">
                {title}
            </h2>
        </div>
        {children}
    </motion.div>
);

// ----------------------------------------------------
// 3. COMPONENTE PRINCIPAL
// ----------------------------------------------------

export default function EnviosCobertura() {
    return (
        <main className="mx-auto px-4 py-8 sm:px-6 sm:py-16 relative min-h-screen">

            {/* 🏞️ MAPA CENTRADO Y RESPONSIVE (z-50, no bloquea clics) */}
            <div className=" absolute  inset-0 z-50  flex justify-center top-44 items-start pt-8 sm:pt-16 pointer-events-none">
                <img
                    src="src/assets/MapaBolivia.png"
                    alt="Mapa de Bolivia"
                    className="w-full max-w-sm sm:max-w-lg object-contain opacity-0 sm:opacity-30 transition-opacity duration-500"
                    style={{ opacity: 0.5 }}
                />
            </div>


            <div className="max-w-4xl mx-auto relative z-10">
                {/* Título principal con animación y responsive */}
                <motion.header
                    className="text-center mb-10 sm:mb-16"
                    initial="hidden"
                    animate="show"
                    variants={container}
                >
                    <motion.h1
                        className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 mb-3 sm:mb-4"
                        variants={fadeUp}
                    >
                        Nuestra Política de Envíos
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 max-w-3xl mx-auto text-base sm:text-xl"
                        variants={fadeUp}
                    >
                        Conoce las zonas, costos y tiempos de entrega para recibir tus productos con total tranquilidad.
                    </motion.p>
                </motion.header>

                {/* Secciones Interactivas con Scroll Animation */}
                <section className="space-y-8 sm:space-y-12">

                    {/* Zonas de Cobertura */}
                    <InfoCard title="Zonas de Cobertura Nacional" icon={FaMapMarkerAlt}>
                        <ul className="space-y-3">
                            <InfoListItem>
                                Realizamos envíos a todo el territorio nacional de Bolivia.
                            </InfoListItem>
                            <InfoListItem>
                                <strong>Quillacollo y Cercanías (área metropolitana):</strong> Entrega a domicilio <strong>gratuita</strong> o con costo simbólico.
                            </InfoListItem>
                            <InfoListItem>
                                <strong>Cochabamba Ciudad:</strong> Servicio de entrega rápida (mismo día o 24h).
                            </InfoListItem>
                            <InfoListItem>
                                <strong>Resto de Bolivia (Departamentos):</strong> Envíos gestionados por empresas transportadoras confiables (Laime, Correos de Bolivia, etc.).
                            </InfoListItem>
                        </ul>
                    </InfoCard>

                    {/* Costos de Envío */}
                    <InfoCard title="Estimación de Costos" icon={FaTruck}>
                        <p className="text-gray-700 mb-5">
                            Los costos son estimados y se basan en el tamaño del producto. El costo exacto se confirmará en el checkout.
                        </p>
                        {/* Tabla con animación y overflow-x-auto (CRUCIAL para responsive) */}
                        <motion.div
                            variants={fadeUp}
                            className="overflow-x-auto rounded-xl shadow-lg border border-gray-200"
                        >
                            <table className="min-w-full text-left border-collapse bg-white text-sm">
                                <thead className="bg-blue-50">
                                    <tr>
                                        <th className="px-3 sm:px-5 py-3 text-blue-700 font-medium uppercase text-xs tracking-wider">Zona</th>

                                        {/* 💡 ENCABEZADOS RESPONSIVE: Muestra el texto largo en sm: (escritorio) y el corto por defecto (móvil) */}
                                        <th className="px-3 sm:px-5 py-3 text-blue-700 font-medium uppercase text-xs tracking-wider whitespace-nowrap">
                                            <span className="sm:hidden">Pequeñas</span>
                                            <span className="hidden sm:inline">Camas Pequeñas</span>
                                        </th>
                                        <th className="px-3 sm:px-5 py-3 text-blue-700 font-medium uppercase text-xs tracking-wider whitespace-nowrap">
                                            <span className="sm:hidden">Grandes</span>
                                            <span className="hidden sm:inline">Muebles Grandes</span>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    <tr className="border-b border-gray-100"><td className="px-3 sm:px-5 py-4 font-semibold">Quillacollo</td><td className="px-3 sm:px-5 py-4 text-green-600">Gratuito</td><td className="px-3 sm:px-5 py-4 text-green-600">Gratuito</td></tr>
                                    <tr className="border-b border-gray-100 bg-white"><td className="px-3 sm:px-5 py-4 font-semibold">Cochabamba</td><td className="px-3 sm:px-5 py-4">15 - 20 Bs.</td><td className="px-3 sm:px-5 py-4">30 - 40 Bs.</td></tr>
                                    <tr className="bg-white"><td className="px-3 sm:px-5 py-4 font-semibold">Resto de Bolivia</td><td className="px-3 sm:px-5 py-4 italic">Consultar</td><td className="px-3 sm:px-5 py-4 italic">Consultar</td></tr>
                                </tbody>
                            </table>
                        </motion.div>
                    </InfoCard>

                    {/* Tiempos de Entrega */}
                    <InfoCard title="Tiempos de Entrega y Seguimiento" icon={FaCheckCircle}>
                        <p className="text-gray-700 mb-5">
                            Nos esforzamos por la rapidez y transparencia en la entrega:
                        </p>
                        <ul className="space-y-3">
                            <InfoListItem>
                                <strong>Quillacollo / Cochabamba:</strong> Entrega en <strong>1 a 3 días hábiles</strong> (luego de la fabricación/confirmación).
                            </InfoListItem>
                            <InfoListItem>
                                <strong>Resto de Bolivia:</strong> Entrega en <strong>3 a 7 días hábiles</strong> (dependiendo de la ubicación).
                            </InfoListItem>
                            <motion.li variants={fadeUp} className="flex items-start gap-3 border-t pt-3 mt-3">
                                <FaTruck className="text-blue-600 mt-1 w-4 h-4 flex-shrink-0" />
                                <span className="text-gray-700">Recibirás un <strong>código de seguimiento</strong> una vez que el pedido sea despachado.</span>
                            </motion.li>
                        </ul>
                    </InfoCard>

                    {/* CTA Final con Micro-interacción */}
                    <motion.div
                        className="text-center mt-8 sm:mt-10 p-6 sm:p-10 rounded-2xl bg-blue-50/70 shadow-inner"
                        variants={sectionFade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <p className="text-lg sm:text-xl text-gray-700 mb-6 font-semibold">
                            ¿Necesitas una cotización de envío personalizada?
                        </p>
                        <motion.a
                            href="https://wa.me/59170000000?text=Hola%2C%20quisiera%20consultar%20sobre%20envíos%20y%20zonas%20de%20cobertura."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-heading font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" /> Chatea con nosotros por WhatsApp
                        </motion.a>
                    </motion.div>
                </section>
            </div>
        </main>
    );
}