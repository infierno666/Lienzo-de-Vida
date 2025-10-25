import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProducts } from "../../data/mockData";
import {
    FaSave,
    FaArrowLeft,
    FaPlus,
    FaTrash,
    FaImage,
    FaUpload,
} from "react-icons/fa";

export default function ProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const editing = Boolean(id);

    const [product, setProduct] = useState({
        slug: "",
        name: "",
        short: "",
        price: "",
        category: "",
        tags: [],
        petTypes: [],
        size: "",
        material: "",
        dimensions: "",
        highlights: [],
        description: "",
        images: [],
    });

    // Cargar datos si estamos editando
    useEffect(() => {
        if (editing) {
            const found = mockProducts.find((p) => p.id === Number(id));
            if (found) setProduct(found);
        }
    }, [id, editing]);

    // Cambiar texto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Cambiar arrays
    const handleArrayChange = (key, index, value) => {
        const updated = [...product[key]];
        updated[index] = value;
        setProduct({ ...product, [key]: updated });
    };

    // Añadir / eliminar
    const handleAddArrayItem = (key) => {
        setProduct((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
    };
    const handleRemoveArrayItem = (key, index) => {
        setProduct((prev) => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index),
        }));
    };

    // Subir imágenes
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...previews],
        }));
    };

    const triggerFileInput = () => fileInputRef.current.click();

    // Guardar
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(editing ? "✅ Producto actualizado" : "✅ Producto creado");
        console.log("🧩 Producto:", product);
        navigate("/admin/productos");
    };

    return (
        <div className="animate-fadeIn max-w-5xl mx-auto space-y-10">
            {/* HEADER */}
            <div className="flex items-center justify-between mt-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">
                        {editing ? `Editar: ${product.name}` : "Añadir Nuevo Producto"}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Completa o modifica los detalles del producto.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/admin/productos")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition"
                >
                    <FaArrowLeft /> Volver
                </button>
            </div>

            {/* FORMULARIO */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 space-y-8"
            >
                {/* === DATOS PRINCIPALES === */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Datos Principales
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre del Producto
                            </label>
                            <input
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60 focus:border-brand transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Slug (URL)
                            </label>
                            <input
                                name="slug"
                                value={product.slug}
                                onChange={handleChange}
                                placeholder="cama-ringo"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60 focus:border-brand transition"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción Corta
                        </label>
                        <input
                            name="short"
                            value={product.short}
                            onChange={handleChange}
                            placeholder="Breve descripción..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60 focus:border-brand transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción Detallada
                        </label>
                        <textarea
                            name="description"
                            rows={5}
                            value={product.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60 focus:border-brand transition resize-none"
                        />
                    </div>
                </section>

                {/* === IMÁGENES === */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Imágenes del Producto
                    </h2>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <div className="flex flex-wrap gap-4">
                        {product.images.map((img, i) => (
                            <div key={i} className="relative group">
                                <img
                                    src={img}
                                    alt={`Imagen ${i + 1}`}
                                    className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveArrayItem("images", i)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs hidden group-hover:flex items-center justify-center shadow-md"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-brand hover:text-brand transition cursor-pointer"
                        >
                            <FaImage className="text-xl mb-1" />
                            <span className="text-xs">Subir</span>
                        </button>
                    </div>
                </section>

                {/* === DATOS TÉCNICOS === */}
                <section className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                        Especificaciones Técnicas
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Precio (Bs.)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría
                            </label>
                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Camas">Camas</option>
                                <option value="Muebles">Muebles</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tamaño
                            </label>
                            <input
                                name="size"
                                value={product.size}
                                onChange={handleChange}
                                placeholder="Grande / Mediano"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Material
                            </label>
                            <input
                                name="material"
                                value={product.material}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dimensiones
                            </label>
                            <input
                                name="dimensions"
                                value={product.dimensions}
                                onChange={handleChange}
                                placeholder="Ej. 100 x 70 x 25 cm"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                            />
                        </div>
                    </div>
                </section>

                {/* === ARRAYS (TAGS, PET TYPES, HIGHLIGHTS) === */}
                {["tags", "petTypes", "highlights"].map((key) => (
                    <section key={key} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800 capitalize">
                                {key === "tags"
                                    ? "Etiquetas (Tags)"
                                    : key === "petTypes"
                                        ? "Tipo de Mascota"
                                        : "Puntos Destacados"}
                            </h2>
                            <button
                                type="button"
                                onClick={() => handleAddArrayItem(key)}
                                className="flex items-center gap-1 text-sm bg-brand text-white px-2 py-1 rounded-md hover:bg-brand-dark transition"
                            >
                                <FaPlus className="w-3 h-3" /> Añadir
                            </button>
                        </div>

                        <div className="space-y-2">
                            {product[key].map((value, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={value}
                                        onChange={(e) => handleArrayChange(key, i, e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveArrayItem(key, i)}
                                        className="px-2 text-red-600 hover:text-red-800 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                {/* === ACCIONES === */}
                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => alert("💾 Guardado como borrador")}
                        className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                    >
                        Guardar Borrador
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold flex items-center gap-2 transition"
                    >
                        <FaSave />
                        {editing ? "Actualizar Producto" : "Publicar Producto"}
                    </button>
                </div>
            </form>
        </div>
    );
}
