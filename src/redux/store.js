import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./slices/gamesSlice";
import eventsReducer from "./slices/eventsSlice";
import favoritesReducer from "./slices/favoritesSlice"; // Importamos favoritos

export const store = configureStore({
    reducer: {
        games: gamesReducer,
        events: eventsReducer,
        favorites: favoritesReducer,
    },
});

export default store;
