import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
            <Link to={`/producto/${product.slug}`}>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                />
            </Link>

            <div className="p-4 text-center">
                <h3 className="text-lg font-heading text-brand mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                <p className="text-gray-800 font-semibold mb-3">
                    Bs {product.price.toFixed(2)}
                </p>
                <Link
                    to={`/producto/${product.slug}`}
                    className="inline-block bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark transition"
                >
                    Ver detalles
                </Link>
            </div>
        </div>
    );
}

export default ProductCard;
