import { useEffect, useState } from "react";
import { getPromotions } from "../services/api";
import { FaSearch } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const PromotionsPage = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            const promoData = await getPromotions();
            setPromotions(promoData.results || []);
        };

        fetchPromotions();
    }, []);

    return (
        <div className="container mx-auto p-8 pb-5 grayPink">
            <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text text-yellow-50 mb-10 mt-11">Ofertas Especiales</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {promotions.length > 0 ? (
                    promotions.map((game) => (
                        <div key={game.id} className="w-60 flex-shrink-0 transform transition duration-700 hover:scale-105 hover:shadow-2xl">
                            <Link to={`/games/${game.id}`}>
                                <div className="bg-pink-900 p-4 rounded-lg shadow-lg shadow-inset-yellow hover:brightness-110">
                                    <img
                                        src={game.background_image || "https://via.placeholder.com/300x200?text=Imagen+no+disponible"}
                                        alt={game.name}
                                        className="rounded-lg w-full h-40 object-cover transition-transform transform"
                                    />
                                    <h3 className="text-white hover:text-yellow-100 mt-3 text-lg font-semibold truncate overflow-hidden whitespace-nowrap">
                                        {game.name || "Juego sin nombre"}
                                    </h3>
                                    <p className="text-white">⭐ {game.rating || "No disponible"}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-white">Cargando promociones...</p>
                )}
            </div>

        </div>
    );
};

export default PromotionsPage;
