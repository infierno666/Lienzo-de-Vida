function Contacto() {
    return (
        <section className="container mx-auto py-16 px-4 text-center">
            <h1 className="text-4xl font-heading text-brand mb-6">Contáctanos</h1>
            <p className="text-gray-600 mb-4">
                Escríbenos si tienes dudas, pedidos personalizados o colaboraciones.
            </p>
            <a
                href="https://wa.me/59170000000"
                target="_blank"
                className="inline-block bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg shadow-md transition"
            >
                WhatsApp Directo
            </a>
        </section>
    );
}
export default Contacto;
