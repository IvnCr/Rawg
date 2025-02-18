// src/pages/GamesByTagPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getGamesByTag } from "../services/api";  // Asegúrate de tener esta función en tu api.js

// Componente para la tarjeta de juego
const GameCard = ({ game }) => (
    <div className="transform transition duration-700 hover:scale-105 hover:shadow-2xl">
        <Link to={`/games/${game.id}`}>
            <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow hover:brightness-110">
                <img
                    src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                    alt={game.name || "Imagen del juego"}
                    className="rounded-lg w-full h-40 object-cover transition-transform transform"
                />
                <h3 className="text-white hover:text-yellow-100 mt-3 text-base sm:text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
                    {game.name || "Juego sin nombre"}
                </h3>
                <p className="text-white">⭐ {game.rating || "No disponible"}</p>
            </div>
        </Link>
    </div>
);

function GamesByTagPage() {
    const { slug } = useParams();  // Obtén el 'slug' del tag desde la URL
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);  // Estado para la carga
    const [error, setError] = useState(null);  // Estado para los errores

    useEffect(() => {
        setLoading(true);  // Al iniciar la carga de los juegos, ponemos loading a true
        setError(null);    // Limpiar posibles errores anteriores
        getGamesByTag(slug)
            .then((data) => {
                setGames(data);
                setLoading(false);  // Una vez cargados los juegos, setea loading a false
            })
            .catch((err) => {
                setError("Hubo un error al cargar los juegos.");
                setLoading(false);  // Si hay error, dejamos de cargar
            });
    }, [slug]);

    return (
        <div className="mt-12 px-6 bg-pink-950 rounded-lg py-8 shadow-inset-yellow">
            <h2 className="text-3xl font-bold text-center mb-6">Juegos con el Tag: {slug}</h2>

            {loading ? (
                <div className="text-center text-white">Cargando juegos...</div> // Indicador de carga
            ) : error ? (
                <div className="text-center text-red-500">{error}</div> // Mensaje de error
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {games.length > 0 ? (
                        games.map((game) => <GameCard key={game.id} game={game} />)
                    ) : (
                        <p className="text-white text-center">No se encontraron juegos para este tag.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default GamesByTagPage;
