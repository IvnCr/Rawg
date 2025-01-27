import { useState } from "react";
import { searchGames } from "../services/api";

function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const data = await searchGames(query);
        setResults(data.results || []);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Buscar Videojuegos</h1>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Escribe el nombre del videojuego..."
                    className="p-2 border rounded flex-grow"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((game) => (
                    <div key={game.id} className="border p-4 rounded">
                        <img
                            src={game.background_image}
                            alt={game.name}
                            className="rounded mb-2"
                        />
                        <h2 className="text-xl">{game.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchPage;
