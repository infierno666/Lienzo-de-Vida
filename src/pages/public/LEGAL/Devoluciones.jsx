import { motion } from "framer-motion";
import {
    // Asegúrate de que FaWhatsapp esté aquí:
    FaUndoAlt,
    FaBoxOpen,
    FaSyncAlt,
    FaMoneyBillWave,
    FaWhatsapp,
    FaEnvelope
} from "react-icons/fa";
// ----------------------------------------------------
// 1. ANIMATION VARIANTS
// ----------------------------------------------------

// Animación de deslizamiento y aparición suave para cada sección
const sectionFade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ----------------------------------------------------
// 2. COMPONENTE REUTILIZABLE para secciones
// ----------------------------------------------------

const PolicySection = ({ title, icon: Icon, children }) => (
    <motion.section
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100"
        variants={sectionFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
    >
        <div className="flex items-center mb-4 border-b pb-3 border-blue-100">
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 mr-3 text-blue-600 flex-shrink-0" />
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-800">
                {title}
            </h2>
        </div>
        <div className="text-gray-700 space-y-4 text-base">{children}</div>
    </motion.section>
);

// ----------------------------------------------------
// 3. COMPONENTE PRINCIPAL
// ----------------------------------------------------

export default function Devoluciones() {
    return (
        <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 sm:py-16">
            <motion.header
                className="text-center mb-10 sm:mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-3">
                    Política de Devoluciones y Garantía
                </h1>
                <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl">
                    Tu satisfacción es nuestra prioridad. Entiende de forma clara las condiciones para cambios, devoluciones y reembolsos.
                </p>
            </motion.header>

            <motion.div
                className="space-y-8"
            >

                {/* 1. Plazo y Condiciones Generales */}
                <PolicySection title="Plazo y Condiciones Iniciales" icon={FaUndoAlt}>
                    <p>
                        Dispones de <strong>7 días hábiles</strong> a partir de la recepción de tu producto para iniciar el proceso de devolución o cambio.
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-4">
                        <li>El producto debe estar en <strong>perfectas condiciones, sin uso</strong> y apto para la reventa.</li>
                        <li>Debe incluir su <strong>empaque original</strong> completo, etiquetas, manuales y accesorios.</li>
                        <li>Es obligatorio presentar la <strong>factura o comprobante de compra</strong>.</li>
                    </ul>
                </PolicySection>

                {/* 2. Devolución por Defecto o Daño */}
                <PolicySection title="Productos Defectuosos o Dañados" icon={FaBoxOpen}>
                    <p>
                        Si recibes un mueble con defectos de fabricación o daños causados durante el transporte, <strong>asumiremos todos los costos</strong> de recolección y reenvío.
                    </p>
                    <p className="font-semibold text-red-600">
                        *Asegúrate de notificarnos el daño o defecto dentro de las primeras <strong>24 horas</strong> tras la recepción para validar el seguro de envío.*
                    </p>
                </PolicySection>

                {/* 3. Proceso de Cambio o Sustitución */}
                <PolicySection title="Proceso de Cambio de Producto" icon={FaSyncAlt}>
                    <p>
                        Una vez que recibamos el producto devuelto y verifiquemos que cumple con las condiciones (punto 1), tienes dos opciones:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 pl-4">
                        <li><strong>Cambio por otro producto:</strong> Puedes elegir otro artículo de nuestro catálogo. Si hay diferencia de precio, se ajustará el cobro o reembolso.</li>
                        <li><strong>Nota de Crédito:</strong> Emitiremos un vale por el valor de tu compra para usar en futuras adquisiciones.</li>
                    </ol>
                </PolicySection>

                {/* 4. Reembolsos */}
                <PolicySection title="Política de Reembolso Monetario" icon={FaMoneyBillWave}>
                    <p>
                        Los reembolsos monetarios solo se aplican en casos de <strong>defecto de fabricación irreparable</strong> o si el <strong>producto ya no está en stock</strong> para un cambio.
                    </p>
                    <p>
                        El tiempo de procesamiento del reembolso es de <strong>3 a 7 días hábiles</strong> a partir de la confirmación de la devolución. El dinero será devuelto a través del mismo método de pago utilizado en la compra (o por transferencia bancaria).
                    </p>
                </PolicySection>

                {/* 5. Contacto para Iniciar el Proceso */}
                <PolicySection title="¿Cómo Iniciar una Devolución?" icon={FaWhatsapp}>
                    <p>
                        Para garantizar una gestión rápida y eficiente, por favor, comunícate con nosotros por tu canal preferido:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <a
                            href="https://wa.me/59170000000?text=Hola,%20quiero%20gestionar%20una%20devolución."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            Chatear por WhatsApp
                        </a>
                        <a
                            href="mailto:contacto@lienzodevida.com"
                            className="flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
                        >
                            <FaEnvelope className="w-5 h-5" />
                            Enviar un Correo
                        </a>
                    </div>
                </PolicySection>

            </motion.div>
        </main>
    );
}