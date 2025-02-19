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

export const getGames = async (page = 1) => {
    const response = await fetch(`https://api.rawg.io/api/games?page=${page}&page_size=20&key=${API_KEY}`);
    return await response.json();
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

// Obtener todos los publishers
export async function getPublishers(page = 1, pageSize = 40) {
    try {
        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=${pageSize}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error obteniendo publishers:", error);
        return [];
    }
}


// Obtener información detallada de un publisher
export async function getPublisherInfo(slug) {
    try {
        const response = await fetch(`${BASE_URL}/publishers/${slug}?key=${API_KEY}`);
        const data = await response.json();
        return data || null;
    } catch (error) {
        console.error(`Error obteniendo información del publisher ${slug}:`, error);
        return null;
    }
}

// Obtener juegos de un publisher específico
export async function getGamesByPublisher(slug) {
    try {
        const response = await fetch(`${BASE_URL}/games?publishers=${slug}&key=${API_KEY}`);
        const data = await response.json();
        return data.results || []; // Retorna la lista de juegos
    } catch (error) {
        console.error(`Error obteniendo juegos del publisher ${slug}:`, error);
        return [];
    }
}