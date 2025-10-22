import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../../components/products/ProductForm";

function ProductFormPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const product = state?.product;

    const handleSubmit = (data) => {
        console.log("Producto guardado:", data);
        navigate("/admin/productos");
    };

    return (
        <div>
            <ProductForm onSubmit={handleSubmit} initialData={product} />
        </div>
    );
}

export default ProductFormPage;
