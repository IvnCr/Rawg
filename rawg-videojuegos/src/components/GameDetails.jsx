import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../services/api"; 


const GameDetails = ({ game }) => {
    if (!game) return <p className="text-center text-white">Cargando detalles...</p>;

    return (
        <div className="container mx-auto p-8 text-white">
            <h1 className="text-5xl font-extrabold text-yellow-50 mb-6">{game.name}</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
                <img src={game.background_image} alt={game.name} className="w-full md:w-1/2 rounded-lg shadow-lg" />
                
                <div className="md:w-1/2">
                    <p className="text-lg"><strong>Rating:</strong> ⭐ {game.rating}</p>
                    
                    <p className="mt-3"><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(", ")}</p>
                    
                    <p className="mt-3"><strong>Géneros:</strong> {game.genres.map(g => g.name).join(", ")}</p>

                    <p className="mt-5 text-justify"><strong>Descripción:</strong> {game.description_raw}</p>
                </div>
            </div>
        </div>
    );
};

export default GameDetails;

