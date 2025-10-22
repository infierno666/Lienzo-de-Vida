import { useState } from "react";

function ProductForm({ onSubmit, initialData = {} }) {
    const [form, setForm] = useState({
        name: initialData.name || "",
        price: initialData.price || "",
        category: initialData.category || "",
        description: initialData.description || "",
        image: initialData.image || "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md p-8 rounded-2xl max-w-lg"
        >
            <h2 className="text-2xl font-heading text-brand mb-6">
                {initialData.id ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre"
                className="w-full border p-3 mb-3 rounded-md"
                required
            />

            <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Precio"
                className="w-full border p-3 mb-3 rounded-md"
                required
            />

            <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Categoría"
                className="w-full border p-3 mb-3 rounded-md"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción"
                className="w-full border p-3 mb-3 rounded-md h-24"
            ></textarea>

            <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="URL de la imagen"
                className="w-full border p-3 mb-4 rounded-md"
            />

            <button
                type="submit"
                className="w-full bg-brand text-white py-3 rounded-md hover:bg-brand-dark transition"
            >
                Guardar
            </button>
        </form>
    );
}

export default ProductForm;
