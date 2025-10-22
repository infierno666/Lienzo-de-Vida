function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-100 py-6 mt-8">
            <div className="container mx-auto text-center font-body">
                <p>&copy; {new Date().getFullYear()} Lienzo de Vida. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;
