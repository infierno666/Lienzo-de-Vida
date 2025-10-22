import { useParams } from "react-router-dom";

function Product() {
    const { id } = useParams();
    return (
        <section className="container mx-auto py-12">
            <h2 className="text-3xl font-heading text-brand mb-4">Producto {id}</h2>
            <p className="text-gray-600">Detalles del producto seleccionado.</p>
        </section>
    );
}
export default Product;
