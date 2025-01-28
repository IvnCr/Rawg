// src/components/PopularGames.jsx
import React, { useEffect, useState } from "react";
import { getPopularGames } from "../services/api";

const PopularGames = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await getPopularGames(); 
                setGames(data.results); 
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchGames();
    }, []);

    if (loading) return <p className="text-center text-xl">Cargando juegos populares...</p>;
    if (error) return <p className="text-center text-xl text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
            {games.map((game) => (
                <div key={game.id} className="relative bg-gray-800 text-white p-4 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-600">
                    <div className="overflow-hidden rounded-md">
                        <img 
                            src={game.background_image} 
                            alt={game.name} 
                            className="w-full h-40 object-cover rounded-md transition-transform duration-300 transform hover:scale-110" 
                        />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{game.name}</h3>
                    <p className="text-sm text-gray-400">⭐ {game.rating}</p>
                    <a href={`/game/${game.id}`} className="absolute bottom-4 left-4 text-xs bg-blue-600 text-white px-2 py-1 rounded-full hover:bg-blue-500 transition-colors duration-300">
                        Ver más
                    </a>
                </div>
            ))}
        </div>
    );
};

export default PopularGames;
