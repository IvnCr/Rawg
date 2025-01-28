import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPopularGames } from "../services/api";
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

    // Cambiar la imagen de fondo automáticamente cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Cambiar cada 5 segundos

        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []); // Este useEffect se ejecuta solo una vez al montar el componente

    if (loading) {
        return <div className="text-center text-white text-lg mt-10">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-lg mt-10">{error}</div>;
    }

    if (!games.length) {
        return <div className="text-center text-gray-400 text-lg mt-10">No se encontraron videojuegos populares.</div>;
    }

    // Función para manejar el clic en "Cargar más juegos"
    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white mt-5">
            <div className="relative bg-black bg-opacity-60 p-6 rounded-lg text-center">
        {/* Imagen de fondo solo en este div */}
        <img
            src={images[currentImageIndex]}
            alt="Fondo de juegos"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-50"  // Aquí aseguramos que la imagen sea de fondo y con opacidad
        />
        
        {/* Contenido encima de la imagen */}
        <div className="relative z-10 mt-10">
            <h1 className="text-4xl font-bold">Descubre los Mejores Videojuegos</h1>
            <p className="text-lg mt-2">Explora y encuentra información detallada sobre los títulos más populares</p>
            <Link to="/search">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition">
                    Explorar Juegos
                </button>
            </Link>
        </div>
    </div>

            {/* Carrusel de Juegos Populares */}
            <div className="mt-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6">
                    <FaGamepad className="inline mr-2" /> Juegos Populares
                </h2>
                <div className="relative">
                    <div className="flex overflow-x-auto space-x-6 scrollbar-hide p-4">
                        {games.map((game) => (
                            <div key={game.id} className="w-64 flex-shrink-0 transform transition duration-300 hover:scale-110 hover:shadow-2xl">
                                <Link to={`/game/${game.id}`}>
                                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                        <img
                                            src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                            alt={game.name}
                                            className="rounded-lg w-full h-40 object-cover transition-transform transform hover:scale-110"
                                        />
                                        <h3 className="mt-3 text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{game.name || "Juego sin nombre"}</h3>
                                        <p className="text-gray-400">⭐ {game.rating || "No disponible"}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sección de Novedades */}
            <div className="mt-10 px-6">
                <h2 className="text-3xl font-bold text-center mb-6">🔥 Novedades</h2>
                <div className="relative">
                    <div className="flex overflow-x-auto space-x-6 scrollbar-hide p-4">
                        {/* Aquí se podrían mapear nuevos juegos o juegos más relevantes */}
                        {games.slice(0, 3).map((game) => (
                            <div key={game.id} className="w-64 flex-shrink-0 transform transition duration-300 hover:scale-105">
                                <Link to={`/game/${game.id}`}>
                                    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                                        <img
                                            src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                            alt={game.name}
                                            className="rounded-lg w-full h-40 object-cover"
                                        />
                                        <h3 className="mt-3 text-lg font-semibold truncate overflow-hidden whitespace-nowrap">{game.name || "Juego sin nombre"}</h3>
                                        <p className="text-gray-400">⭐ {game.rating || "No disponible"}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Banner Promocional */}
            <div className="bg-blue-600 text-white py-4 text-center">
                <p className="text-xl font-bold">¡Gran Oferta! 50% de descuento en juegos seleccionados. ¡No te lo pierdas!</p>
                <Link to="/promotions">
                    <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-200 transition">
                        Ver Ofertas <FaArrowRight className="inline ml-2" />
                    </button>
                </Link>
            </div>

            {/* Cargar Más Juegos */}
            <div className="text-center mt-6">
                <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Cargar Más Juegos
                </button>
            </div>
        </div>
    );
}

export default HomePage;
