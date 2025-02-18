// src/services/api.js

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Función para realizar la llamada a la API
export const fetchFromAPI = async (endpoint, params = {}) => {
    try {
        const urlParams = new URLSearchParams({ key: API_KEY, ...params });
        const response = await fetch(`${BASE_URL}${endpoint}?${urlParams}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        throw error;
    }
};

// Función para obtener los juegos populares
export const getPopularGames = async () => {
    const data = await fetchFromAPI("/games", { ordering: "-rating", page_size: 10 });
    return data.results || [];
};

// Función para buscar juegos según un término
export const searchGames = async (query) => {
    return fetchFromAPI("/games", { search: query, page_size: 10 });
};

// Función para obtener los detalles de un videojuego
const fetchGameDetails = async () => {
    try {
        const data = await getGameDetails(id);
        setGame(data);
    } catch (error) {
        console.error("Error cargando los detalles del juego:", error);
    }
};
export const getGameDetails = async (gameId) => {
    try {
        const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
        if (!response.ok) {
            throw new Error("No se pudieron obtener los detalles del juego.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getGameDetails:", error);
        throw error;
    }
};


// Función para obtener juegos en promoción
export const getPromotions = async () => {
    return fetchFromAPI("/games", { ordering: "-metacritic", page_size: 10 });
};

export const getGamesByGenre = async (genreSlug) => {
    try {
        const response = await fetch(`${BASE_URL}/games?genres=${genreSlug}&key=${API_KEY}`);
        const data = await response.json();
        return data.results;  // Devuelve los juegos que devuelve la API
    } catch (error) {
        console.error('Error al obtener los juegos por género:', error);
        return [];
    }
};




export const getGamesByTag = async (tagSlug) => {
    try {
        const response = await fetch(`${BASE_URL}/games?tags=${tagSlug}&key=${API_KEY}`);
        const data = await response.json();
        return data.results;  // Devuelve los juegos que devuelve la API
    } catch (error) {
        console.error('Error al obtener los juegos por tag:', error);
        return [];
    }
};

