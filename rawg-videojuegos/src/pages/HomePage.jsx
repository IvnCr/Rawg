import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPopularGames } from '../services/api';

function HomePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPopularGames()
            .then((data) => {
                setGames(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener los juegos:", error);
                setError("No se pudieron cargar los juegos.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!games.length) {
        return <div>No se encontraron videojuegos populares.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Videojuegos Populares</h1>
            <div className="carousel flex space-x-4 overflow-x-scroll p-4 scrollbar-hide">
                {games.map((game) => (
                    <div key={game.id} className="w-64 flex-shrink-0">
                        {/* Enlace a la página de detalles */}
                        <Link to={`/game/${game.id}`}>
                            <img
                                src={game.background_image}
                                alt={game.name}
                                className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                            />
                            <h2 className="text-lg font-medium mt-2">{game.name}</h2>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;

