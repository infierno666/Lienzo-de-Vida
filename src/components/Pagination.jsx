// src/components/Pagination.jsx
export default function Pagination({ current = 1, total = 1, onChange }) {
    const pages = [];
    const maxShown = 7; // max page numbers to show
    const start = Math.max(1, Math.min(current - 3, Math.max(1, total - maxShown + 1)));

    for (let i = start; i <= Math.min(total, start + maxShown - 1); i++) pages.push(i);

    return (
        <nav className="flex items-center justify-center gap-2">
            <button
                onClick={() => onChange(Math.max(1, current - 1))}
                className="px-3 py-1 border rounded-md"
                disabled={current === 1}
            >
                Prev
            </button>

            {start > 1 && <span className="px-2">...</span>}

            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onChange(p)}
                    className={`px-3 py-1 border rounded-md ${p === current ? "bg-brand text-white" : ""}`}
                    aria-current={p === current ? "page" : undefined}
                >
                    {p}
                </button>
            ))}

            {start + pages.length - 1 < total && <span className="px-2">...</span>}

            <button
                onClick={() => onChange(Math.min(total, current + 1))}
                className="px-3 py-1 border rounded-md"
                disabled={current === total}
            >
                Next
            </button>
        </nav>
    );
}
