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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {games.map((game) => (
        <div key={game.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-md" />
          <h3 className="mt-2 text-lg font-bold">{game.name}</h3>
          <p className="text-sm text-gray-400">⭐ {game.rating}</p>
        </div>
      ))}
    </div>
    );
};

export default PopularGames;
