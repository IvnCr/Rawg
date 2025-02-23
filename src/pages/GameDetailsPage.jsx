import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        window.scrollTo(0, 0);
        getGameDetails(id).then(setGame);
    }, [id]);

    if (!game) return <p className="text-center text-xl">Cargando detalles...</p>;

    const description = game.description_raw || "Descripción no disponible.";
    const formattedDescription = convertLinksToHTML(description);

    return (
        <div className="grayPink min-h-screen w-max text-white rounded-xl z-50 mt-10 flex flex-col items-center px-6 shadow-outset-pink">
            <h2 className="text-3xl font-bold text-center my-6">
                {game.name || "Detalles del Juego"}
            </h2>

            {/* Contenedor principal */}
            <div className="w-screen max-w-4xl flex flex-col items-center mb-20">
                <img
                    src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                    alt={game.name}
                    className="w-full lg:h-96 md:h-96 sm:h-60 object-cover mb-6 rounded-lg shadow-2xl shadow-outset-pink"
                />

                {/* Descripción */}
                <div className="w-full max-w-4/5 text-left mb-6">
                    <h3 className="text-xl font-semibold mb-2">📜 Descripción:</h3>
                    <div
                        className="text-white px-4 sm:px-8 lg:text-lg md:text-lg sm:text-sm max-h-96 overflow-auto"
                        dangerouslySetInnerHTML={{ __html: formattedDescription }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl text-lg text-center mt-5">
                    <div className="bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-md hover:text-yellow-100 transition duration-700">
                        <strong>⭐ Rating:</strong> {game.rating || "No disponible"}
                    </div>

                    <div className="bg-pink-600 p-4 rounded-lg shadow-md hover:text-yellow-100 transition duration-700 flex items-center space-x-2 justify-center">
                        <strong className="text-white mr-1">🏢 Publisher:</strong>
                        {game.publishers?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {game.publishers.map((publisher) => (
                                    <Link
                                        key={publisher.id}
                                        to={`/publisher/${publisher.slug}`}
                                        className="text-gray-300 hover:text-yellow-200 transition duration-500 inline-block"
                                    >
                                        {publisher.name}
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            "No disponible"
                        )}
                    </div>

                    {/* Géneros */}
                    <div className="bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-md hover:text-yellow-100 transition duration-700 justify-start inline-block">
                        <strong>🎮 Géneros: </strong>
                        {game.genres?.length > 0 ? (
                            game.genres.map((genre) => (
                                <Link
                                    key={genre.id}
                                    to={`/games/genre/${genre.slug}`}
                                    className="text-gray-300 hover:text-yellow-200 transition duration-500 ml-2 inline-block"
                                >
                                    {genre.name}
                                </Link>
                            ))
                        ) : (
                            <span className="ml-2">No disponible</span>
                        )}
                    </div>




                    {/* Fecha de lanzamiento */}
                    <div className="bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-md hover:text-yellow-100 transition duration-700">
                        <strong>📅 Fecha de lanzamiento:</strong> {game.released || "No disponible"}
                    </div>

                    {/* Plataformas */}
                    <div className="bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-md hover:text-yellow-100 transition duration-700">
                        <strong>🖥️ Plataformas:</strong> {game.platforms?.length > 0
                            ? game.platforms.map((platformObj) => platformObj.platform.name).join(', ')
                            : "No disponible"}
                    </div>

                    {/* Tags */}
                    <div className="bg-pink-600 shadow-outset-pink p-4 rounded-lg shadow-md hover:text-yellow-100 transition duration-700 justify-start">
                        <strong>🏷️ Tags:</strong>
                        {game.tags?.length > 0
                            ? game.tags.map((tag) => (
                                <Link
                                    key={tag.id}
                                    to={`/games/tag/${tag.slug}`}
                                    className="text-gray-300 hover:text-yellow-200 transition duration-500 ml-2 inline-block"
                                >
                                    {tag.name}
                                </Link>
                            ))
                            : (
                                <span className="ml-2">No disponible</span>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameDetailsPage;
