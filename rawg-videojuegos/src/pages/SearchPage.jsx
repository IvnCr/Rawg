import { useState } from "react";
import { searchGames } from "../services/api";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; 

function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const data = await searchGames(query);
            setResults(data.results || []);
        } catch (err) {
            console.error("Error al buscar juegos:", err);
            setError("Hubo un error al obtener los resultados.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-800 to-gray-900 text-white p-8">
            {/* Encabezado */}
            <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text text-yellow-50 mb-10 mt-11">
                Buscar Videojuegos
            </h1>

            {/* Barra de búsqueda */}
            <div className="flex justify-center mb-8">
                <div className="flex w-full max-w-4xl bg-pink-700 shadow-outset-yellow p-4 rounded-lg shadow-2xl hover:scale-105 transition-all duration-1000 ease-in-out ">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Escribe el nombre del videojuego..."
                        className="flex-grow p-3 bg-transparent text-white border-2  border-yellow-100 rounded-lg focus:shadow-inner focus:shadow-inset-yellow transition-all"
                    />
                    <button
                        onClick={handleSearch}
                        className="ml-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none transition duration-300 ease-in-out"
                    >
                        <FaSearch className="inline-block mr-2" /> Buscar
                    </button>
                </div>
            </div>

            {/* Mensajes de estado */}
            {loading && (
                <p className="text-center text-xl text-gray-300 animate-pulse">
                    Cargando...
                </p>
            )}
            {error && (
                <p className="text-center text-xl text-red-500 animate-shake">
                    {error}
                </p>
            )}
            {results.length === 0 && !loading && !error && (
                <p className="text-center text-gray-400 text-lg">No se encontraron resultados.</p>
            )}

            {/* Resultados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
                {results.map((game) => (
                    <div
                        key={game.id}
                        className="bg-gray-700 rounded-lg shadow-2xl shadow-inset-games hover:brightness-110 hover:scale-105 transition-transform duration-300 ease-in-out"
                    >
                        <Link to={`/game/${game.id}`}>
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="rounded-t-lg w-full h-48 object-cover "
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold">{game.name}</h2>
                                <p className="text-gray-400">⭐ {game.rating}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
