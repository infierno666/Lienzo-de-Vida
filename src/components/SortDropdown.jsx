// src/components/SortDropdown.jsx
export default function SortDropdown({ value, onChange }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
            aria-label="Ordenar productos"
        >
            <option value="novedad">Novedad</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
            <option value="alpha">Alfabético</option>
        </select>
    );
}
