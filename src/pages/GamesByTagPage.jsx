// src/pages/GamesByTagPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGamesByTag } from "../services/api";  // Asegúrate de tener esta función en tu api.js

function GamesByTagPage() {
    const { slug } = useParams();  // Obtén el 'slug' del tag desde la URL
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGamesByTag(slug).then(setGames);  // Llama a la API para obtener los juegos por tag
    }, [slug]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Juegos con el Tag: {slug}</h2>

            {/* Contenedor para los juegos con scroll horizontal */}
            <div className="relative">
                <div className="flex overflow-x-auto space-x-4 sm:space-x-6 p-4 scrollbar-hide scrollbar-custom">
                    {/* Mapeamos los juegos y los mostramos con el diseño que proporcionaste */}
                    {games.length > 0 ? (
                        games.map((game) => (
                            <div
                                key={game.id}
                                className="w-52 sm:w-60 flex-shrink-0 transform transition duration-700 hover:scale-105 hover:shadow-2xl"
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
                        <p>No se encontraron juegos para este tag.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GamesByTagPage;
