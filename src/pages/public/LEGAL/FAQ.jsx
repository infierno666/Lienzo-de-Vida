import { motion } from "framer-motion";

const preguntas = [
    {
        q: "¿Hacen envíos a todo Bolivia?",
        a: "Sí, realizamos envíos a todas las ciudades principales del país mediante transportadoras confiables.",
    },
    {
        q: "¿Puedo personalizar el tamaño o color del producto?",
        a: "En algunos productos sí, especialmente camas o muebles de madera. Contáctanos por WhatsApp para cotizar.",
    },
    {
        q: "¿Qué métodos de pago aceptan?",
        a: "Transferencias bancarias, QR y pago contra entrega en Quillacollo y Cochabamba.",
    },
];

export default function FAQ() {
    return (
        <main className="max-w-5xl mx-auto px-6 py-12">
            <motion.h1
                className="text-3xl md:text-4xl font-heading font-bold text-text mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Preguntas Frecuentes (FAQ)
            </motion.h1>

            <div className="space-y-6">
                {preguntas.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white shadow-soft rounded-xl p-6"
                    >
                        <h3 className="font-heading text-lg text-text mb-2">{p.q}</h3>
                        <p className="text-text-light">{p.a}</p>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
