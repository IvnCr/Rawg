import React, { useEffect, useState } from "react";
import { getGameDetails } from "../services/api";
import { useParams } from "react-router-dom";

const GameDetails = () => {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getGameDetails(id); 
                setGame(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <p>Cargando detalles del juego...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{game.name}</h1>
            <p>Descripción: {game.description_raw}</p>
            <p>Fecha de lanzamiento: {game.released}</p>
            <p>Rating: {game.rating}</p>
        </div>
    );
};

export default GameDetails;
