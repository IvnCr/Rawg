import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularGames } from "../services/api";
import Button from "../components/Button";
import { FaGamepad, FaStar, FaArrowRight, FaHeart } from "react-icons/fa"; // Ya tienes FaHeart importado
import { fetchGamesThunk } from "../redux/slices/gamesSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../redux/slices/favoritesSlice";
/**
 * @file HomePage.js
 * @brief Componente de la página de inicio
 * @description Muestra la lista de juegos populares y permite buscar juegos
 */

/**
 * @brief Función que devuelve el componente de la página de inicio
 * @return {JSX.Element} El componente de la página de inicio
 */
function HomePage() {
    const dispatch = useDispatch();
    const { games, loading, error } = useSelector((state) => state.games); // Usamos Redux
    const favorites = useSelector((state) => state.favorites);
    const [currentPage, setCurrentPage] = useState(1);

    const images = [
        "./images/fondoVideojuego.jpg",
        "./images/fondoVideojuego2.webp",
        "./images/fondoVideojuego3.webp",
        "./images/fondoVideojuego4.webp",
        "./images/fondoVideojuego5.webp",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Aquí se agrega el estado

    const gamesPerPage = 6;

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchGamesThunk({ currentPage, gamesPerPage }));
    }, [dispatch, currentPage]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="text-center text-white text-lg mt-10">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;
    }

    if (!games.length) {
        return <div className="text-center text-gray-400 text-lg mt-10">No se encontraron videojuegos populares.</div>;
    }

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="grayPink min-h-screen text-white rounded-xl z-50 shadow-outset-pink">
            {/* Código de la imagen de fondo */}
            <div className="relative p-6 text-center">
                <img
                    src={images[currentImageIndex]}
                    alt="Fondo de juegos"
                    className="absolute top-0 left-0 w-full h-64 object-cover opacity-40"
                />
                <div className="relative z-10 mt-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white">Descubre los Mejores Videojuegos</h1>
                    <p className="text-base sm:text-lg mt-2">Explora y encuentra información detallada sobre los títulos más populares</p>
                    <Link to="/search">
                        <Button className="mt-5">
                            Explorar Juegos
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Sección de Juegos Populares */}
            <div className="mt-12 ml-5 mr-5 px-6 bg-pink-950 rounded-lg py-8 shadow-inset-yellow">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
                    <FaGamepad className="inline mr-2" /> Juegos Populares
                </h2>
                <div className="relative">
                    <div className="flex overflow-x-auto space-x-4 sm:space-x-6 p-4 scrollbar-hide scrollbar-custom">
                        {games.map((game) => {
                            const isFavorite = favorites.some((fav) => fav.id === game.id);

                            return (
                                <div key={game.id} className="w-52 sm:w-60 flex-shrink-0 transform transition duration-700 hover:scale-105 hover:shadow-2xl">
                                    <Link to={`/games/${game.id}`}>
                                        <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow hover:brightness-110 relative">
                                            <img
                                                src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                                alt={game.name}
                                                className="rounded-lg w-full h-40 object-cover transition-transform transform"
                                            />
                                            <h3 className="text-white hover:text-yellow-100 mt-3 text-base sm:text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
                                                {game.name || "Juego sin nombre"}
                                            </h3>
                                            <p className="text-white">⭐ {game.rating || "No disponible"}</p>

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(toggleFavorite(game));
                                                }}
                                                className={`bg-pink-950 shadow-inset-yellow absolute top-2 right-2 text-lg ${isFavorite ? "text-red-500" : "text-gray-400"} hover:text-red-600 transition duration-700`}
                                            >
                                                <FaHeart />
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="my-6 mx-5 border-t-8 border-pink-900 rounded shadow-outset-yellow"></div>

            {/* Sección de Novedades */}
            <div className="mt-12 ml-5 mr-5 px-6 bg-pink-950 rounded-lg py-8 shadow-inset-yellow">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">🔥 Novedades</h2>
                <div className="relative">
                    <div className="flex overflow-x-auto space-x-4 sm:space-x-6 p-4">
                        {games.slice(0, 3).map((game) => {
                            const isFavorite = favorites.some((fav) => fav.id === game.id);

                            return (
                                <div key={game.id} className="w-52 sm:w-64 flex-shrink-0 transform transition duration-700 hover:scale-105">
                                    <Link to={`/games/${game.id}`}>
                                        <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-games hover:brightness-110 relative">
                                            <img
                                                src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                                alt={game.name}
                                                className="rounded-lg w-full h-40 object-cover"
                                            />
                                            <h3 className="text-white hover:text-yellow-100 mt-3 text-base sm:text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
                                                {game.name || "Juego sin nombre"}
                                            </h3>
                                            <p className="text-white">⭐ {game.rating || "No disponible"}</p>

                                            {/* Botón de Favorito */}
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(toggleFavorite(game));
                                                }}
                                                className={`bg-pink-950 shadow-inset-yellow absolute top-2 right-2 text-lg ${isFavorite ? "text-red-500" : "text-gray-400"} hover:text-red-600 transition duration-700`}
                                            >
                                                <FaHeart />
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="bg-pink-600 text-white shadow-outset-yellow py-4 text-center mt-12 ml-5 mr-5 rounded-lg">
                <p className="text-lg sm:text-xl font-bold">¡Gran Oferta! 50% de descuento en juegos seleccionados. ¡No te lo pierdas!</p>
                <Link to="/promotions">
                    <Button className="mt-5">
                        Ver Ofertas <FaArrowRight className="inline ml-2" />
                    </Button>
                </Link>
            </div>

            <div className="text-center mt-12">
                <Button className="mb-8" onClick={handleLoadMore}>Cargar Más Juegos</Button>
            </div>
        </div>
    );
}

export default HomePage;
