// src/components/PopularGames.jsx
import React, { useEffect, useState } from "react";
import { getPopularGames } from "../services/api";


const PopularGames = () => {
    const [games, setGames] = useState([]); // Estado para guardar los juegos
    const [loading, setLoading] = useState(true); // Estado para mostrar un cargando
    const [error, setError] = useState(null); // Estado para errores

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getPopularGames(); // Llamada a la API
                setGames(data.results); // Guardamos los juegos en el estado
            } catch (err) {
                setError(err.message); // Manejamos cualquier error
            } finally {
                setLoading(false); // Quitamos el estado de "cargando"
            }
        };

        fetchGames();
    }, []);

    if (loading) return <p>Cargando juegos populares...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Juegos Populares</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        <h3>{game.name}</h3>
                        <p>Rating: {game.rating}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PopularGames;
