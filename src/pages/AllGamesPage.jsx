import React, { useEffect } from "react";
import { fetchGamesThunk } from "../redux/slices/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";  // Importamos el ícono del corazón
import { toggleFavorite } from "../redux/slices/favoritesSlice";  // Asegúrate de que tienes esta acción

function AllGamesPage() {
    const dispatch = useDispatch();
    const { games, currentPage, totalPages } = useSelector((state) => state.games); // Juegos de Redux
    const { favorites } = useSelector((state) => state.favorites); // Favoritos desde Redux

    useEffect(() => {
        // Llamamos al thunk para obtener los juegos
        dispatch(fetchGamesThunk(currentPage));
    }, [currentPage, dispatch]);

    // Función para manejar la paginación
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(fetchGamesThunk(newPage)); // Actualizamos la página
        }
    };

    // Función para verificar si el juego está en favoritos
    const isFavorite = (gameId) => {
        return Array.isArray(favorites) ? favorites.some((fav) => fav.id === gameId) : false;
    };

    return (
        <div className="mt-12 px-6 py-8 rounded-lg shadow-outset-pink grayPink">
            <h2 className="text-3xl font-bold text-center text-white mb-6">🎮 Todos los Juegos</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {games.map((game) => (
                    <div key={game.id} className="bg-pink-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 hover:brightness-105 transition duration-300 shadow-inset-yellow">
                        <Link to={`/games/${game.id}`}>
                            <div className="relative"> {/* Agregamos 'relative' aquí */}
                                <img
                                    src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                    alt={game.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4 text-center">
                                    <h3 className="text-white text-lg font-semibold truncate">{game.name}</h3>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(toggleFavorite(game)); // Agrega o quita el juego de favoritos
                                        }}
                                        className={`bg-pink-950 shadow-inset-yellow absolute top-2 right-2 text-lg ${isFavorite(game.id) ? "text-red-500" : "text-gray-400"} hover:text-red-600 transition duration-700`}
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>


            {/* Paginación */}
            <div className="flex justify-center mt-8 space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-600 cursor-not-allowed" : "bg-pink-700 hover:bg-pink-800 text-white"}`}
                >
                    ← Anterior
                </button>

                <span className="text-yellow-100 font-bold text-xl">
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-600 cursor-not-allowed" : "bg-pink-700 hover:bg-pink-800 text-white"}`}
                >
                    Siguiente →
                </button>
            </div>
        </div>
    );
}

export default AllGamesPage;
