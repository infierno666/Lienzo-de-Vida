// ✅ src/pages/admin/ProductFormPage.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getProductById,
    createProduct,
    updateProduct,
    uploadProductImage,
    deleteStorageFile,
} from "../../api/productService";
import {
    FaSave,
    FaArrowLeft,
    FaPlus,
    FaTrash,
    FaImage,
    FaSpinner,
} from "react-icons/fa";

export default function ProductFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const editing = Boolean(id);

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [product, setProduct] = useState({
        slug: "",
        name: "",
        short: "",
        price: 0,
        category: "",
        tags: [],
        pet_types: [],
        size: "",
        material: "",
        dimensions: "",
        highlights: [],
        description: "",
        images: [], // { url, storagePath }
        status: "Publicado",
    });

    /** 🔹 Normalizadores */
    const normalizeArray = (arr) =>
        Array.isArray(arr) ? arr.map(String) : [];

    const normalizeImages = (imgs) => {
        if (!imgs) return [];
        try {
            const parsed = typeof imgs === "string" ? JSON.parse(imgs) : imgs;
            return Array.isArray(parsed)
                ? parsed.map((img) =>
                    typeof img === "string"
                        ? { url: img, storagePath: null }
                        : { url: img.url || "", storagePath: img.storagePath || null }
                )
                : [];
        } catch {
            return [];
        }
    };

    /** --- Cargar producto si se edita --- */
    useEffect(() => {
        if (!editing) return;

        const loadProduct = async () => {
            setLoading(true);
            try {
                const data = await getProductById(id);
                if (!data || !data.product) throw new Error("Producto no encontrado");

                const p = data.product; // ✅ ahora accedemos a la propiedad real

                console.log("🟡 Datos recibidos desde Supabase:", p);

                setProduct({
                    slug: p.slug || "",
                    name: p.name || "",
                    short: p.short || "",
                    price: Number(p.price) || 0,
                    category: p.category || "",
                    size: p.size || "",
                    material: p.material || "",
                    dimensions: p.dimensions || "",
                    description: p.description || "",
                    tags: normalizeArray(p.tags),
                    pet_types: normalizeArray(p.pet_types),
                    highlights: normalizeArray(p.highlights),
                    images: normalizeImages(p.images),
                    status: p.status || "Publicado",
                });
            } catch (err) {
                console.error("Error al cargar producto:", err);
                alert("❌ Error al cargar los datos del producto.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id, editing]);

    /** --- Inputs simples --- */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    /** --- Arrays dinámicos --- */
    const updateArrayItem = (key, index, value) =>
        setProduct((prev) => {
            const arr = [...prev[key]];
            arr[index] = value;
            return { ...prev, [key]: arr };
        });

    const addArrayItem = (key) =>
        setProduct((prev) => ({ ...prev, [key]: [...prev[key], ""] }));

    const removeArrayItem = (key, index) =>
        setProduct((prev) => ({
            ...prev,
            [key]: prev[key].filter((_, i) => i !== index),
        }));

    /** --- Subida de imágenes --- */
    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);

        try {
            const uploads = await Promise.all(
                files.map(async (file) => {
                    const res = await uploadProductImage(file);
                    return { url: res.url, storagePath: res.storagePath };
                })
            );
            setProduct((prev) => ({
                ...prev,
                images: [...prev.images, ...uploads],
            }));
        } catch (err) {
            console.error("Error al subir imágenes:", err);
            alert("❌ Error al subir imágenes.");
        } finally {
            setUploading(false);
        }
    };

    /** --- Eliminar imagen --- */
    const handleRemoveImage = async (index) => {
        const img = product.images[index];
        if (!img) return;

        try {
            if (img.storagePath) await deleteStorageFile(img.storagePath);
            setProduct((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            }));
        } catch (err) {
            console.warn("No se pudo eliminar la imagen del storage:", err);
            alert("⚠️ No se pudo eliminar la imagen del storage.");
        }
    };

    const triggerFileInput = () => fileInputRef.current.click();

    /** --- Guardar producto --- */
    const handleSubmit = async (e, overrideStatus = null) => {
        e.preventDefault();
        if (!product.name || !product.slug) {
            alert("⚠️ Nombre y slug son obligatorios.");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...product,
                price: Number(product.price) || 0,
                tags: Array.isArray(product.tags) ? product.tags : [],
                pet_types: Array.isArray(product.pet_types) ? product.pet_types : [],
                highlights: Array.isArray(product.highlights)
                    ? product.highlights
                    : [],
                images: Array.isArray(product.images)
                    ? product.images.map((img) =>
                        typeof img === "string" ? img : img.url
                    )
                    : [],
                status: overrideStatus || product.status,
            };

            if (editing) await updateProduct(id, payload);
            else await createProduct(payload);

            alert(
                `✅ Producto ${editing ? "actualizado" : "creado"
                } correctamente.`
            );
            navigate("/admin/productos");
        } catch (err) {
            console.error("Error al guardar producto:", err);
            alert("❌ Error al guardar el producto.");
        } finally {
            setLoading(false);
        }
    };

    /** --- Renderizado --- */
    return (
        <div className="animate-fadeIn max-w-5xl mx-auto space-y-10">
            {/* HEADER */}
            <div className="flex items-center justify-between mt-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-gray-900">
                        {editing
                            ? `Editar: ${product.name || "Producto"}`
                            : "Añadir Nuevo Producto"}
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

            {/* FORM */}
            {loading ? (
                <div className="flex justify-center py-20 text-gray-600">
                    <FaSpinner className="animate-spin text-3xl" />
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 space-y-8"
                >
                    {/* DATOS PRINCIPALES */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Datos Principales
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {["name", "slug"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field === "name"
                                            ? "Nombre del Producto"
                                            : "Slug (URL)"}
                                    </label>
                                    <input
                                        name={field}
                                        value={product[field]}
                                        onChange={handleChange}
                                        placeholder={
                                            field === "slug" ? "cama-ringo" : "Ej. Cama Ringo"
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60 focus:border-brand transition"
                                    />
                                </div>
                            ))}
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

                    {/* IMÁGENES */}
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
                                        src={img.url || img}
                                        alt={`Imagen ${i + 1}`}
                                        className="h-24 w-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(i)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs hidden group-hover:flex items-center justify-center shadow-md"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={triggerFileInput}
                                disabled={uploading}
                                className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-brand hover:text-brand transition cursor-pointer disabled:opacity-50"
                            >
                                {uploading ? (
                                    <FaSpinner className="animate-spin text-xl mb-1" />
                                ) : (
                                    <>
                                        <FaImage className="text-xl mb-1" />
                                        <span className="text-xs">Subir</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </section>

                    {/* ESPECIFICACIONES */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                            Especificaciones Técnicas
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {["price", "category", "size"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field === "price"
                                            ? "Precio (Bs.)"
                                            : field === "category"
                                                ? "Categoría"
                                                : "Tamaño"}
                                    </label>
                                    {field === "category" ? (
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
                                    ) : (
                                        <input
                                            type={field === "price" ? "number" : "text"}
                                            name={field}
                                            value={product[field]}
                                            onChange={handleChange}
                                            placeholder={field === "size" ? "Grande / Mediano" : ""}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {["material", "dimensions"].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {field === "material" ? "Material" : "Dimensiones"}
                                    </label>
                                    <input
                                        name={field}
                                        value={product[field]}
                                        onChange={handleChange}
                                        placeholder={
                                            field === "dimensions" ? "Ej. 100 x 70 x 25 cm" : ""
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ARRAYS DINÁMICOS */}
                    {["tags", "pet_types", "highlights"].map((key) => (
                        <section key={key} className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800 capitalize">
                                    {key === "tags"
                                        ? "Etiquetas (Tags)"
                                        : key === "pet_types"
                                            ? "Tipo de Mascota"
                                            : "Puntos Destacados"}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => addArrayItem(key)}
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
                                            onChange={(e) =>
                                                updateArrayItem(key, i, e.target.value)
                                            }
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(key, i)}
                                            className="px-2 text-red-600 hover:text-red-800 transition"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* STATUS */}
                    <section>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                        </label>
                        <select
                            name="status"
                            value={product.status}
                            onChange={handleChange}
                            className="w-48 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand/60"
                        >
                            <option value="Publicado">Publicado</option>
                            <option value="Borrador">Borrador</option>
                        </select>
                    </section>

                    {/* ACCIONES */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, "Borrador")}
                            className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                        >
                            Guardar Borrador
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-lg bg-brand hover:bg-brand-dark text-white font-semibold flex items-center gap-2 transition disabled:opacity-50"
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin" />
                            ) : (
                                <FaSave />
                            )}
                            {editing ? "Actualizar Producto" : "Publicar Producto"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
