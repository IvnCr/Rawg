import React, { useState } from "react";
import { searchGames } from "../services/api";

const SearchGames = ({ className }) => {
    const [query, setQuery] = useState(""); 
    const [results, setResults] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await searchGames(query); 
            setResults(data.results); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <form onSubmit={handleSearch} className="flex items-center">
                <input
                    type="text"
                    placeholder="Escribe el nombre de un juego"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} 
                    className="w-full py-2 pl-10 pr-4 bg-transparent text-white border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] focus:border-[#3498db] shadow-sm shadow-inset-games transition-all duration-300"
                />
                <button type="submit" className="ml-2 bg-[#3498db] text-white px-4 py-2 rounded-lg hover:bg-[#212121] transition">
                    Buscar
                </button>
            </form>

            {loading && <p>Cargando resultados...</p>}
            {error && <p>Error: {error}</p>}

            <ul>
                {results.map((game) => (
                    <li key={game.id}>
                        <h3>{game.name}</h3>
                        <p>Lanzamiento: {game.released}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchGames;
