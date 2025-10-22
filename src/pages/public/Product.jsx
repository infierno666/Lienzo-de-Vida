import { useParams } from "react-router-dom";
import { mockProducts } from "../../data/mockData";

function Product() {
    const { slug } = useParams();
    const product = mockProducts.find((p) => p.slug === slug);

    if (!product) {
        return (
            <div className="container mx-auto py-16 text-center text-gray-600">
                <h1 className="text-3xl font-heading text-brand mb-4">
                    Producto no encontrado
                </h1>
                <p>El artículo que buscas no existe.</p>
            </div>
        );
    }

    const whatsappMsg = `Hola 👋 Estoy interesado en el producto *${product.name}*. ¿Podrías darme más información?`;
    const whatsappURL = `https://wa.me/59170000000?text=${encodeURIComponent(
        whatsappMsg
    )}`;

    return (
        <section className="container mx-auto py-16 px-4 grid md:grid-cols-2 gap-8">
            <div>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="rounded-2xl shadow-md"
                />
            </div>

            <div className="flex flex-col justify-center">
                <h1 className="text-4xl font-heading text-brand mb-4">
                    {product.name}
                </h1>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-2xl font-bold text-gray-800 mb-6">
                    Bs {product.price.toFixed(2)}
                </p>
                <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg shadow-lg transition"
                >
                    Consultar por WhatsApp
                </a>
            </div>
        </section>
    );
}

export default Product;
