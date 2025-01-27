import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";

function Header() {
    return (
        <header className="bg-gradient-to-r from-red-600 to-purple-800 text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold tracking-tight">
                    RAWG Videojuegos
                </Link>

                {/* Navegación */}
                <nav className="hidden md:flex space-x-6">
                    <Link
                        to="/"
                        className="hover:underline hover:text-gray-200 transition"
                    >
                        Inicio
                    </Link>
                    <Link
                        to="/search"
                        className="hover:underline hover:text-gray-200 transition"
                    >
                        Buscar
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:underline hover:text-gray-200 transition"
                    >
                        Contacto
                    </Link>
                </nav>

                {/* Barra de búsqueda */}
                <div className="relative flex items-center w-full max-w-sm">
                    <Search className="absolute left-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar videojuegos..."
                        className="w-full py-2 pl-10 pr-4 bg-gray-100 text-gray-800 rounded-lg focus:outline-none focus:ring focus:ring-purple-400"
                    />
                </div>

                {/* Botón de perfil */}
                <div className="hidden md:flex items-center space-x-4">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        Login
                    </button>
                    <User className="text-white w-6 h-6 cursor-pointer" />
                </div>
            </div>
        </header>
    );
}

export default Header;
