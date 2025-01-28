function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-6 w-full flex items-center justify-center mt-auto">
            <div className="max-w-6xl mx-auto text-center w-full">
                <p>&copy; 2025 RAWG Videojuegos. Todos los derechos reservados.</p>
                <nav className="space-x-4 mt-4">
                    <a href="/privacy" className="hover:underline">Política de Privacidad</a>
                    <a href="/terms" className="hover:underline">Términos y Condiciones</a>
                </nav>
                <div className="mt-4">
                    <p>Síguenos en nuestras redes sociales:</p>
                    <div className="space-x-6 mt-2">
                        <a href="https://facebook.com" className="hover:text-blue-600">Facebook</a>
                        <a href="https://twitter.com" className="hover:text-blue-400">Twitter</a>
                        <a href="https://instagram.com" className="hover:text-pink-500">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

