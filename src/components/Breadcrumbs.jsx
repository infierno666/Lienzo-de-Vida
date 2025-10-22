// src/components/Breadcrumbs.jsx
import { Link } from "react-router-dom";

/**
 * Breadcrumbs simple.
 * Props:
 *  - items: [{ label, to (optional) }]
 */
export default function Breadcrumbs({ items = [] }) {
    return (
        <nav aria-label="breadcrumb" className="text-sm text-text-light mb-4">
            <ol className="flex flex-wrap items-center gap-x-2">
                {items.map((it, i) => {
                    const last = i === items.length - 1;
                    return (
                        <li key={i} className="flex items-center">
                            {!last ? (
                                <Link to={it.to || "#"} className="hover:text-brand text-text-light">
                                    {it.label}
                                </Link>
                            ) : (
                                <span className="text-text">{it.label}</span>
                            )}

                            {!last && <span className="mx-2">›</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
