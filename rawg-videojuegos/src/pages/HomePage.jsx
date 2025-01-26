import { useEffect, useState } from 'react';
import { getPopularGames } from '../services/api';

function HomePage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getPopularGames().then(setGames);
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Videojuegos Populares</h1>
            <div className="carousel flex space-x-4 overflow-auto">
                {games.map((game) => (
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
