import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../services/api"; 


const GameDetails = ({ game }) => {
    if (!game) return <p className="text-center text-white">Cargando detalles...</p>;
};

export default GameDetails;

