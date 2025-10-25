import { motion } from "framer-motion";

export default function PoliticaPrivacidad() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <motion.h1
                className="text-3xl md:text-4xl font-heading font-bold text-text mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Política de Privacidad
            </motion.h1>

            <motion.div
                className="space-y-5 text-text-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <p>
                    En <strong>Lienzo de Vida</strong>, valoramos tu privacidad. Toda la
                    información personal que recopilamos se utiliza exclusivamente para
                    mejorar tu experiencia de compra y nunca se comparte con terceros sin
                    tu consentimiento.
                </p>
                <p>
                    Al utilizar nuestro sitio web, aceptas las prácticas descritas en esta
                    Política de Privacidad.
                </p>
                <p>
                    Si tienes preguntas sobre cómo manejamos tus datos, puedes escribirnos
                    a{" "}
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
