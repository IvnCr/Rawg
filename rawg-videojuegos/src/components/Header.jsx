import { Link } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#212121] to-[#3498db] text-white shadow-lg z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center">
                    <img src="/logo.png" alt="Logo de RAWG" className="h-10 mr-2" />
                    RAWG
                </Link>

                {/* Navegación para pantallas grandes */}
                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline hover:text-[#3498db] transition">
                        INICIO
                    </Link>
                    <Link to="/search" className="hover:underline hover:text-[#3498db] transition">
                        BUSCAR
                    </Link>
                    <Link to="/contact" className="hover:underline hover:text-[#3498db] transition">
                        CONTACTO
                    </Link>
                </nav>

                {/* Barra de búsqueda */}
                <div className="relative hidden md:flex items-center w-full max-w-sm md:mx-6">
                    <Search className="absolute left-3 text-[#3498db] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar videojuegos..."
                        className="w-full py-2 pl-10 pr-4 bg-white text-[#212121] rounded-lg focus:outline-none focus:ring focus:ring-[#3498db] shadow-sm"
                    />
                </div>

                {/* Botón de perfil y menú hamburguesa */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="bg-[#3498db] hover:bg-[#212121] text-white px-4 py-2 rounded-lg transition">
                            Login
                        </button>
                        <User className="text-white w-6 h-6 cursor-pointer" />
                    </div>

                    {/* Botón hamburguesa */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir menú"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Navegación móvil */}
            {menuOpen && (
                <nav className="md:hidden bg-[#212121]">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:underline hover:text-[#3498db] transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                INICIO
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/search"
                                className="text-white hover:underline hover:text-[#3498db] transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                BUSCAR
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-white hover:underline hover:text-[#3498db] transition"
                                onClick={() => setMenuOpen(false)}
                            >
                                CONTACTO
                            </Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;
