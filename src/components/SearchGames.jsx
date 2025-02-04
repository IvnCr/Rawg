import React, { useState } from "react";
import { searchGames } from "../services/api";

const SearchGames = ({ className }) => {
    const [query, setQuery] = useState(""); 
    const [results, setResults] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await searchGames(query); 
            setResults(data.results); 
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
};

export default SearchGames;
