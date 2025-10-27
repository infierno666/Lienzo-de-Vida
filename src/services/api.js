const API_URL = import.meta.env.VITE_API_URL;

export async function getProducts() {
    const res = await fetch(API_URL);
    return res.json();
}

export async function getProductById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
}

export async function createProduct(product) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return res.json();
}

export async function updateProduct(id, product) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });
    return res.json();
}

export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });
    return res.json();
}
