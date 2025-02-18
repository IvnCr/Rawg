import { useParams } from "react-router-dom";
import { getGamesByGenre } from "../services/api";  // Función para obtener juegos por género

function GamesByGenrePage() {
    const { slug } = useParams();
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGamesByGenre(slug).then(setGames);
    }, [slug]);

    return (
        <div>
            <h2>Juegos en el Género: {slug}</h2>
            <div>
                {games.length > 0 ? (
                    games.map((game) => (
                        <div key={game.id}>
                            <h3>{game.name}</h3>
                            <img src={game.background_image} alt={game.name} />
                        </div>
                    ))
                ) : (
                    <p>No se encontraron juegos para este género.</p>
                )}
            </div>
        </div>
    );
}

export default GamesByGenrePage;
