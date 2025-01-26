import { useEffect, useState } from 'react';
import { searchGames } from '../services/api';

function AllGamesPage() {
    const [query, setQuery] = useState('');
    const [games, setGames] = useState([]);

    const handleSearch = () => {
        searchGames(query).then(setGames);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Explorar Videojuegos</h1>
            <div className="my-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar videojuegos..."
                    className="border p-2 rounded"
                />
                <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">
                    Buscar
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {games.map((game) => (
                    <div key={game.id} className="p-4 border rounded">
                        <img src={game.background_image} alt={game.name} className="rounded-lg" />
                        <h2 className="text-lg">{game.name}</h2>
                        <p>Calificación: {game.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllGamesPage;
