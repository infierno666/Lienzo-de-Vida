import { useState } from "react";
import { mockProducts } from "../../data/mockData";
import DataTable from "../../components/DataTable";
import { useNavigate } from "react-router-dom";

function ProductsList() {
    const [products, setProducts] = useState(mockProducts);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleEdit = (product) => {
        navigate(`/admin/productos/editar/${product.id}`, { state: { product } });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-heading text-brand">Gestión de Productos</h1>
                <button
                    onClick={() => navigate("/admin/productos/nuevo")}
                    className="bg-brand text-white px-4 py-2 rounded-md hover:bg-brand-dark"
                >
                    + Nuevo Producto
                </button>
            </div>
            <DataTable
                columns={["ID", "Name", "Price", "Category"]}
                data={products}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
}

export default ProductsList;
