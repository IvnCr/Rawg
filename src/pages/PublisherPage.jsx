import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublisherInfo, getGamesByPublisher } from "../services/api";

function PublisherPage() {
    const { slug } = useParams();
    const [publisher, setPublisher] = useState(null);
    const [games, setGames] = useState([]);

    useEffect(() => {
        getPublisherInfo(slug).then(setPublisher);
        getGamesByPublisher(slug).then(setGames);
    }, [slug]);

    return (
        <div className="mt-12 px-6 bg-pink-950 rounded-lg py-8 shadow-inset-yellow">
            {publisher ? (
                <>
                    <h2 className="text-3xl font-bold text-center mb-6">🎮 Juegos de {publisher.name}</h2>
                </>
            ) : (
                <p className="text-center">Cargando información...</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {games.length > 0 ? (
                    games.map((game) => (
                        <div key={game.id} className="transform transition duration-700 hover:scale-105 hover:shadow-2xl">
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
                    <p className="text-center">No se encontraron juegos para este publisher.</p>
                )}
            </div>
        </div>
    );
}

export default PublisherPage;
