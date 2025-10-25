import { motion } from "framer-motion";

export default function TerminosServicio() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <motion.h1
                className="text-3xl md:text-4xl font-heading font-bold text-text mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Términos de Servicio
            </motion.h1>

            <motion.div
                className="space-y-5 text-text-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <p>
                    El uso de nuestro sitio web implica la aceptación de los presentes
                    Términos y Condiciones. Nos reservamos el derecho de actualizar esta
                    información sin previo aviso.
                </p>
                <p>
                    Los precios, promociones y disponibilidad de productos pueden variar
                    sin previo aviso.
                </p>
                <p>
                    Para consultas adicionales, contáctanos a{" "}
                    <a
                        href="mailto:contacto@lienzodevida.com"
                        className="text-brand hover:underline"
                    >
                        contacto@lienzodevida.com
                    </a>
                    .
                </p>
            </motion.div>
        </main>
    );
}
