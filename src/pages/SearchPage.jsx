import { useState } from "react";
import { useEffect } from "react";
import { searchGames } from "../services/api";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Button from "../components/Button";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
        <div className="min-h-screen grayPink text-white p-8  rounded-xl shadow-outset-pink">
            {/* Encabezado */}
            <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text text-yellow-50 mb-10 mt-11">
                Buscar Videojuegos
            </h1>

            {/* Barra de búsqueda */}
            <div className="flex justify-center mb-8 ">
                <div className="flex w-full max-w-4xl bg-pink-600 shadow-outset-yellow p-4 rounded-lg shadow-2xl hover:scale-105 transition-all duration-1000 ease-in-out ">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Escribe el nombre del videojuego..."
                        className="flex-grow p-3 bg-transparent text-white border-2  border-yellow-100 rounded-lg focus:shadow-inner focus:shadow-inset-yellow transition-all"
                    />
                    <Button className="ml-4 px-6 py-3" onClick={handleSearch}>
                        <FaSearch className="inline-block mr-2" /> Buscar
                    </Button>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5 ">
                {results.map((game) => (
                    <div
                        key={game.id}
                        className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow  hover:brightness-110"
                    >
                        <Link to={`/games/${game.id}`}>
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="rounded-t-lg w-full h-48 object-cover "
                            />
                            <div className="p-4">
                                <h2 className="text-white text-xl font-semibold">{game.name}</h2>
                                <p className="text-white">⭐ {game.rating}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
