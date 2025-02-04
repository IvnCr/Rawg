import { Link } from "react-router-dom";
import { Search, User, Menu, X, Lock, AlertTriangle } from "lucide-react";
import SearchGames from "./SearchGames";
import { useState } from "react";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false); 

    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#212121] to-pink-700 text-white shadow-lg z-50 shadow-outset-pink">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center hover:scale-110 transition-transform duration-700 ">
                    <img src="/logo.png" alt="Logo de RAWG" className="h-11 mr-2" />
                    <span className="text-2xl text-white hover:text-yellow-100">RAWG</span>
                </Link>

                <nav className="hidden md:flex space-x-6">
                    <Link to="/" className="text-xl font-bold text-white hover:text-yellow-100 py-2 px-4 rounded-lg transition-all duration-300">
                        INICIO
                    </Link>
                    <Link to="/search" className="text-xl font-bold text-white hover:text-yellow-100 py-2 px-4 rounded-lg transition-all duration-300">
                        BUSCAR
                    </Link>
                    <Link to="/contact" className="text-xl font-bold text-white hover:text-yellow-100 py-2 px-4 rounded-lg transition-all duration-300">
                        CONTACTO
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-4">
                    <button className="px-4 py-2 rounded-lg flex items-center space-x-2 transition border-2 border-transparent bg-transparent text-white shadow-inset-yellow  hover:bg-pink-700 hover:text-yellow-100 hover:border-yellow-100 hover:scale-105">
                    <span>Login</span>
                            <Lock className="w-4 h-4" /> 
                        </button>
                        <User className="text-white w-6 h-6 cursor-pointer" />
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir menú"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

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
