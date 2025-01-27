function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 text-center">
            <p>&copy; 2025 RAWG Videojuegos. Todos los derechos reservados.</p>
            <nav className="space-x-4">
                <a href="/privacy" className="hover:underline">Política de Privacidad</a>
                <a href="/terms" className="hover:underline">Términos y Condiciones</a>
            </nav>
        </footer>
    );
}

export default Footer;
