function Contacto() {
    return (
        <section className="container mx-auto py-12 text-center">
            <h2 className="text-3xl font-heading text-brand mb-4">Contáctanos</h2>
            <p className="text-gray-600 mb-4">¿Tienes dudas o pedidos especiales?</p>
            <a
                href="https://wa.me/591XXXXXXXXX"
                className="inline-block bg-brand text-white px-6 py-3 rounded-lg shadow-md hover:bg-brand-dark transition"
            >
                Escríbenos por WhatsApp
            </a>
        </section>
    );
}
export default Contacto;
