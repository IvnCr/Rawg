import { useEffect, useState } from "react";
import { getPromotions } from "../services/api";
import { FaSearch } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const PromotionsPage = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        window.scrollTo(0,0);
        const fetchPromotions = async () => {
            const promoData = await getPromotions();
            setPromotions(promoData.results || []);
        };

        fetchPromotions();
    }, []);

    return (
        <div className="container mx-auto px-6 py-12 grayPink shadow-lg shadow-outset-pink rounded-lg">
            <h1 className="text-5xl font-extrabold text-center text-white mb-12">
                Ofertas Especiales
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {promotions.length > 0 ? (
                    promotions.map((game) => (
                        <div 
                            key={game.id} 
                            className="w-full max-w-xs mx-auto transform transition duration-500 hover:scale-105"
                        >
                            <Link to={`/games/${game.id}`}>
                                <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow hover:brightness-110">
                                    <img
                                        src={game.background_image || "https://via.placeholder.com/300x200?text=No+Image"}
                                        alt={game.name}
                                        className="rounded-lg w-full h-44 object-cover"
                                    />
                                    <h3 className="text-white hover:text-yellow-300 mt-4 text-lg font-semibold truncate">
                                        {game.name || "Juego sin nombre"}
                                    </h3>
                                    <p className="text-gray-300 text-sm">⭐ {game.rating || "No disponible"}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-300 text-lg">Cargando promociones...</p>
                )}
            </div>
        </div>
    );
};


export default PromotionsPage;
