import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularGames } from "../services/api";
import PromotionBanner from "../components/PromotionBanner";
import Button from "../components/Button";
import { FaGamepad, FaStar, FaArrowRight } from "react-icons/fa";

function HomePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Arreglo de imágenes para el fondo
    const images = [
        "./images/fondoVideojuego.jpg",
        "./images/fondoVideojuego2.webp",
        "./images/fondoVideojuego3.webp",
        "./images/fondoVideojuego4.webp",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Aquí se agrega el estado

    const gamesPerPage = 6; // Número de juegos por página

    useEffect(() => {
        // Obtener los juegos populares
        getPopularGames(currentPage, gamesPerPage)
            .then((data) => {
                setGames(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los juegos:", error);
                setError("No se pudieron cargar los juegos.");
                setLoading(false);
            });
    }, [currentPage]);

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
        <div className="grayPink min-h-screen w-full text-white mt-5 shadow-outset-yellow rounded-xl">
            <div className="relative bg-black bg-opacity-60 p-6 rounded-lg text-center ">
                <img
                    src={images[currentImageIndex]}
                    alt="Fondo de juegos"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                />

                <div className="relative z-10 mt-10">
                    <h1 className="text-4xl font-bold text-white">Descubre los Mejores Videojuegos</h1>
                    <p className="text-lg mt-2">Explora y encuentra información detallada sobre los títulos más populares</p>
                    <Link to="/search">
                        <Button className="mt-5">
                            Explorar Juegos
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-12 ml-5 mr-5 px-6 bg-pink-950 rounded-lg py-8  shadow-inset-yellow">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    <FaGamepad className="inline mr-2" /> Juegos Populares
                </h2>
                <div className="relative">
                <div className="flex overflow-x-auto space-x-6  scrollbar-hide p-4 scrollbar-custom">
                    {/* Tu contenido aquí */}
                        {games.map((game) => (
                            <div key={game.id} className="w-60 flex-shrink-0 transform transition duration-700 hover:scale-105 hover:shadow-2xl">
                                <Link to={`/game/${game.id}`}>
                                    <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow hover:brightness-110">
                                        <img
                                            src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                            alt={game.name}
                                            className="rounded-lg w-full h-40 object-cover transition-transform transform"
                                        />
                                        <h3 className="text-white hover:text-yellow-100 mt-3 text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{game.name || "Juego sin nombre"}</h3>
                                        <p className="text-white">⭐ {game.rating || "No disponible"}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-6 mx-5 border-t-8 border-pink-900 rounded shadow-outset-yellow"></div>

            <div className="mt-12 ml-5 mr-5 px-6 bg-pink-950 rounded-lg py-8 shadow-inset-yellow">
                <h2 className="text-3xl font-bold text-center text-white mb-6">🔥 Novedades</h2>
                <div className="relative">
                    <div className="flex overflow-x-auto space-x-6 scrollbar-hide p-4">
                        {games.slice(0, 3).map((game) => (
                            <div key={game.id} className="w-64 flex-shrink-0 transform transition duration-700 hover:scale-105">
                                <Link to={`/game/${game.id}`}>
                                    <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-games hover:brightness-110">
                                        <img
                                            src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                            alt={game.name}
                                            className="rounded-lg w-full h-40 object-cover"
                                        />
                                        <h3 className="text-white hover:text-yellow-100 mt-3 text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{game.name || "Juego sin nombre"}</h3>
                                        <p className="text-white">⭐ {game.rating || "No disponible"}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-pink-600 text-white shadow-outset-yellow py-4 text-center mt-12 ml-5 mr-5 rounded-lg">
                <p className="text-xl font-bold">¡Gran Oferta! 50% de descuento en juegos seleccionados. ¡No te lo pierdas!</p>
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
