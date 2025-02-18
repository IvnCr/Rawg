import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGamesByGenre } from "../services/api";  // Asegúrate de tener esta función en tu api.js

function GamesByGenrePage() {
    const { slug } = useParams();  // Obtiene el slug del género desde la URL
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGamesByGenre(slug).then(setGames);  // Llama a la API para obtener los juegos por género
    }, [slug]);

    return (
        <div className="mt-12 px-6 bg-pink-950 rounded-lg py-8 shadow-inset-yellow">
            <h2 className="text-3xl font-bold text-center mb-6">Juegos con Género: {slug}</h2>

            {/* Contenedor en forma de grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {games.length > 0 ? (
                    games.map((game) => (
                        <div
                            key={game.id}
                            className="transform transition duration-700 hover:scale-105 hover:shadow-2xl"
                        >
                            <Link to={`/games/${game.id}`}>
                                <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow hover:brightness-110">
                                    <img
                                        src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                        alt={game.name}
                                        className="rounded-lg w-full h-40 object-cover transition-transform transform"
                                    />
                                    <h3 className="text-white hover:text-yellow-100 mt-3 text-base sm:text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
                                        {game.name || "Juego sin nombre"}
                                    </h3>
                                    <p className="text-white">⭐ {game.rating || "No disponible"}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron juegos para este género.</p>
                )}
            </div>
        </div>
    );
}

export default GamesByGenrePage;
