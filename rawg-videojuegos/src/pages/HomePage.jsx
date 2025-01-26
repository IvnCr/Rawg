import { useEffect, useState } from 'react';
import { getPopularGames } from '../services/api';

function HomePage() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga

    useEffect(() => {
        getPopularGames()
            .then((data) => {
                setGames(data);
                setLoading(false); // Termina la carga
            })
            .catch((error) => {
                console.error("Error al obtener los juegos:", error);
                setLoading(false); // En caso de error, también dejamos de mostrar el mensaje de carga
            });
    }, []);

    // Mostrar mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">Videojuegos Populares</h1>
            <div className="carousel flex space-x-4 overflow-auto">
                {/* Comprobamos si games es un array antes de usar .map */}
                {Array.isArray(games) && games.map((game) => (
                    <div key={game.id} className="w-64">
                        <img src={game.background_image} alt={game.name} className="rounded-lg" />
                        <h2 className="text-lg">{game.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
