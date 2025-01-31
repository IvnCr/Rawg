import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../services/api";

// Función para convertir enlaces en la descripción
const convertLinksToHTML = (text) => {
    return text.replace(
        /https?:\/\/[^\s]+/g,
        (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-600">${url}</a>`
    );
};

function GameDetailsPage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        getGameDetails(id).then(setGame);
    }, [id]);


    if (!game) return <p className="text-center text-xl">Cargando detalles...</p>;

    const description = game.description_raw || "Descripción no disponible.";
    const formattedDescription = convertLinksToHTML(description);

    return (
        <div className="grayPink min-h-screen w-full text-white shadow-outset-yellow rounded-xl z-50">
            <h2 className="text-3xl font-bold text-center text-white mb-6 mt-10">
                {game.name || "Detalles del Juego"}
            </h2>
            <div className="relative px-4 sm:px-8">
                <div className="flex justify-center items-center flex-col">
                    {/* Imagen principal del juego */}
                    <img
                        src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                        alt={game.name}
                        className="w-full max-w-lg h-96 object-cover mb-6 rounded-lg shadow-2xl"
                    />

                    {/* Descripción */}
                    <div
                        className="text-white mb-6  px-4 sm:px-8"
                        dangerouslySetInnerHTML={{ __html: formattedDescription }}
                    />

                    {/* Rating */}
                    <div className="text-center mb-4">
                        <p className="text-lg">
                            <strong>⭐ Rating:</strong> {game.rating || "No disponible"}
                        </p>
                    </div>

                    {/* Plataformas */}
                    <div className="text-center mb-4">
                        <p className="text-lg">
                            <strong>Plataformas: </strong>
                            {game.platforms?.length > 0 ? (
                                game.platforms.map((platformObj, index) => (
                                    <span key={index} className="mr-2">{platformObj.platform.name}{index < game.platforms.length - 1 && ","}</span>
                                ))
                            ) : (
                                "No disponible"
                            )}
                        </p>
                    </div>

                    {/* Género */}
                    <div className="text-center mb-4">
                        <p className="text-lg">
                            <strong>Género:</strong> {game.genres?.map(genre => genre.name).join(', ') || "No disponible"}
                        </p>
                    </div>

                    {/* Fecha de lanzamiento */}
                    <div className="text-center mb-6">
                        <p className="text-lg">
                            <strong>Fecha de lanzamiento:</strong> {game.released || "No disponible"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetailsPage;
