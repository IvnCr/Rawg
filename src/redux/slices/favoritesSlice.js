import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const game = action.payload;
            const existingFavorite = state.find(fav => fav.id === game.id);
            if (existingFavorite) {
                // Si el juego ya es favorito, lo eliminamos
                return state.filter(fav => fav.id !== game.id);
            } else {
                // Si no es favorito, lo agregamos
                return [...state, game];
            }
        }
    }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
