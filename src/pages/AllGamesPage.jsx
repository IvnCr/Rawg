import { useEffect, useState } from 'react';
import { searchGames } from '../services/api';

function AllGamesPage() {
    const [query, setQuery] = useState('');
    const [games, setGames] = useState([]);

    const handleSearch = () => {
        searchGames(query).then(setGames);
    };
}

export default AllGamesPage;
