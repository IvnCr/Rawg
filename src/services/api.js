/**
 * @file api.js
 * @description Archivo que contiene las funciones para interactuar con la API de Rawg.io
 */

/**
 * @constant {string} API_KEY
 * @description Clave de la API de Rawg.io
 * 
 * @constant {string} BASE_URL
 * @description URL base de la API de Rawg.io
 */
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

/**
 * @function fetchFromAPI
 * @description Realiza una llamada a la API de Rawg.io con los parámetros especificados
 * @param {string} endpoint - La ruta de la API que se desea llamar
 * @param {object} params - Un objeto con los parámetros adicionales que se deben enviar en la solicitud
 * @returns {Promise<object>} Un objeto con la respuesta de la API
 */
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

/**
 * @function getGames
 * @description Obtiene una lista de juegos de la API de Rawg.io
 * @param {number} page - El número de página que se desea obtener (opcional, por defecto es 1)
 * @returns {Promise<object>} Un objeto con la lista de juegos
 */
export const getGames = async (page = 1) => {
    const response = await fetch(`https://api.rawg.io/api/games?page=${page}&page_size=20&key=${API_KEY}`);
    return await response.json();
};


/**
 * @function getPopularGames
 * @description Obtiene una lista de juegos populares de la API de Rawg.io
 * @returns {Promise<object>} Un objeto con la lista de juegos populares
 */
export const getPopularGames = async () => {
    const data = await fetchFromAPI("/games", { ordering: "-rating", page_size: 10 });
    return data.results || [];
};

/**
 * @function searchGames
 * @description Busca juegos en la API de Rawg.io según un término de búsqueda
 * @param {string} query - El término de búsqueda
 * @returns {Promise<object>} Un objeto con la lista de juegos que coinciden con la búsqueda
 */
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

/**
 * @function getGameDetails
 * @description Obtiene los detalles de un juego específico de la API de Rawg.io
 * @param {number} gameId - El ID del juego que se desea obtener
 * @returns {Promise<object>} Un objeto con los detalles del juego
 */
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

/**
 * @function getPromotions
 * @description Obtiene una lista de juegos en promoción de la API de Rawg.io
 * @returns {Promise<object>} Un objeto con la lista de juegos en promoción
 */
export const getPromotions = async () => {
    return fetchFromAPI("/games", { ordering: "-metacritic", page_size: 10 });
};

/**
 * @function getGamesByGenre
 * @description Obtiene una lista de juegos de un género específico de la API de Rawg.io
 * @param {string} genreSlug - El slug del género que se desea obtener
 * @returns {Promise<object>} Un objeto con la lista de juegos del género
 */
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

/**
 * @function getGamesByTag
 * @description Obtiene una lista de juegos de un tag específico de la API de Rawg.io
 * @param {string} tagSlug - El slug del tag que se desea obtener
 * @returns {Promise<object>} Un objeto con la lista de juegos del tag
 */
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

/**
 * @function getPublishers
 * @description Obtiene una lista de editores de la API de Rawg.io
 * @param {number} page - El número de página que se desea obtener (opcional, por defecto es 1)
 * @param {number} pageSize - El tamaño de la página (opcional, por defecto es 40)
 * @returns {Promise<object>} Un objeto con la lista de editores
 */
export async function getPublishers(page = 1, pageSize = 300) {
    try {
        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&page=${page}&page_size=${pageSize}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error("Error obteniendo publishers:", error);
        return [];
    }
}

/**
 * @function getPublisherInfo
 * @description Obtiene la información detallada de un editor específico de la API de Rawg.io
 * @param {string} slug - El slug del editor que se desea obtener
 * @returns {Promise<object>} Un objeto con la información detallada del editor
 */
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

/**
 * @function getGamesByPublisher
 * @description Obtiene una lista de juegos de un editor específico de la API de Rawg.io
 * @param {string} slug - El slug del editor que se desea obtener
 * @returns {Promise<object>} Un objeto con la lista de juegos del editor
 */
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