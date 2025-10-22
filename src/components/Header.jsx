import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <Link to="/" className="text-2xl font-heading text-brand">
                    Lienzo de Vida
                </Link>

                <ul className="flex gap-6 text-gray-700 font-body">
                    <li><Link to="/" className="hover:text-brand">Inicio</Link></li>
                    <li><Link to="/catalogo" className="hover:text-brand">Catálogo</Link></li>
                    <li><Link to="/nosotros" className="hover:text-brand">Nosotros</Link></li>
                    <li><Link to="/contacto" className="hover:text-brand">Contacto</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
