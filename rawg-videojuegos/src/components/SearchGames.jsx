// src/components/SearchGames.jsx
import React, { useState } from "react";
import { searchGames } from "../services/api";

const SearchGames = () => {
    const [query, setQuery] = useState(""); // Estado para la búsqueda
    const [results, setResults] = useState([]); // Juegos encontrados
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await searchGames(query); // Llamada a la API
            setResults(data.results); // Guardamos los resultados
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Buscar Juegos</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Escribe el nombre de un juego"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Actualizamos el estado
                />
                <button type="submit">Buscar</button>
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
