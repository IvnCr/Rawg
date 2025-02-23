import React, { useEffect, useState } from "react";
import { getGames } from "../services/api";
import { Link } from "react-router-dom";


function AllGamesPage() {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchGames(currentPage);
    }, [currentPage]);

    const fetchGames = async (page) => {
        try {
            const data = await getGames(page);
            setGames(data.results);
            setTotalPages(data.count ? Math.ceil(data.count / 20) : 1); // 20 juegos por página
        } catch (error) {
            console.error("Error cargando juegos:", error);
        }
    };

    return (
        <div className="mt-12 px-6 py-8 rounded-lg shadow-outset-pink grayPink">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
                🎮 Todos los Juegos
            </h2>

            {/* Grid de Juegos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((game) => (
                    <div key={game.id} className="bg-pink-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:brightness-105 transition duration-300 shadow-inset-yellow">
                        <Link to={`/games/${game.id}`}>
                            <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
                            <div className="p-4 text-center">
                                <h3 className="text-white text-lg font-semibold truncate">{game.name}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-pink-700 hover:bg-pink-800 text-white"}`}
                >
                    ← Anterior
                </button>

                <span className="text-yellow-100 font-bold text-xl">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-pink-700 hover:bg-pink-800 text-white"}`}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
}

export default AllGamesPage;
