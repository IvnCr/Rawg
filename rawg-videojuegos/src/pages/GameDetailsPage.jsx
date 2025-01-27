import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../services/api";

function GameDetailsPage() {
    const { id } = useParams();
    const [game, setGame] = useState(null);

    useEffect(() => {
        getGameDetails(id).then(setGame);
    }, [id]);

    if (!game) return <p>Cargando detalles...</p>;

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">{game.name}</h1>
            <img
                src={game.background_image}
                alt={game.name}
                className="rounded mb-4"
            />
            <p>{game.description_raw}</p>
        </div>
    );
}

export default GameDetailsPage;
