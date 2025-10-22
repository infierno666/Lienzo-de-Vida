import { mockProducts } from "../../data/mockData";
import ProductGrid from "../../components/products/ProductGrid";
import { Link } from "react-router-dom";

function Home() {
    const destacados = mockProducts.slice(0, 3);

    return (
        <>
            {/* Hero Section */}
            <section className="bg-[url('src/assets/Lienzo.png')] bg-cover bg-center text-white py-32 text-center">
                <div className="bg-black/50 p-10 rounded-xl inline-block">
                    <h1 className="text-5xl font-heading mb-4">Lienzo de Vida</h1>
                    <p className="text-lg max-w-2xl mx-auto mb-6">
                        Confort y diseño para el hogar de tus mascotas 🐾
                    </p>
                    <Link
                        to="/catalogo"
                        className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-lg shadow-lg transition"
                    >
                        Ver Catálogo
                    </Link>
                </div>
            </section>

            {/* Filosofía */}
            <section className="container mx-auto py-16 px-4 text-center">
                <h2 className="text-3xl font-heading text-brand mb-6">Nuestra Filosofía</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Cada mueble cuenta una historia. Fusionamos diseño, sostenibilidad y el
                    amor por los animales en cada pieza.
                </p>
            </section>

            {/* Productos Destacados */}
            <section className="container mx-auto py-16 px-4">
                <h2 className="text-3xl font-heading text-brand mb-8 text-center">
                    Productos Destacados
                </h2>
                <ProductGrid products={destacados} />
            </section>

            {/* CTA */}
            <section className="bg-brand text-white py-16 text-center">
                <h2 className="text-3xl font-heading mb-4">
                    Dale a tu mascota el confort que merece
                </h2>
                <Link
                    to="/catalogo"
                    className="bg-white text-brand px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                    Explorar Catálogo
                </Link>
            </section>
        </>
    );
}

export default Home;
