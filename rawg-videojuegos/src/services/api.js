// src/services/api.js

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

/**
 * Realiza una llamada a la API RAWG.
 * @param {string} endpoint - El endpoint que deseas consultar, por ejemplo: '/games'.
 * @param {Object} params - Un objeto con parámetros de consulta adicionales.
 * @returns {Promise<Object>} - Los datos de la API en formato JSON.
 */
export const fetchFromAPI = async (endpoint, params = {}) => {
    try {
        // Crea los parámetros de la URL
        const urlParams = new URLSearchParams({ key: API_KEY, ...params });
        const response = await fetch(`${BASE_URL}${endpoint}?${urlParams}`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al conectar con la API:", error);
        throw error; // Propaga el error para manejarlo en los componentes
    }
};

/**
 * Obtiene los videojuegos más populares.
 * @returns {Promise<Object>} - Los datos de los videojuegos populares.
 */
export const getPopularGames = async () => {
    const data = await fetchFromAPI("/games", { ordering: "-rating", page_size: 10 });
    return data.results || [];  // Asegúrate de devolver los juegos desde la propiedad 'results'
};

/**
 * Busca videojuegos según el término de búsqueda.
 * @param {string} query - El término de búsqueda.
 * @returns {Promise<Object>} - Los datos de los videojuegos que coinciden con la búsqueda.
 */
export const searchGames = async (query) => {
    return fetchFromAPI("/games", { search: query, page_size: 10 });
};

/**
 * Obtiene los detalles de un videojuego específico por su ID.
 * @param {string} id - El ID del videojuego.
 * @returns {Promise<Object>} - Los datos detallados del videojuego.
 */
export const getGameDetails = async (id) => {
    return fetchFromAPI(`/games/${id}`);
};

