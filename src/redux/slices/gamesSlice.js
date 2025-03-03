import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPopularGames } from "../../services/api"; // Asegúrate de que la ruta es correcta

export const fetchGamesThunk = createAsyncThunk(
    "games/fetchGames",
    async (page, { rejectWithValue }) => {
        try {
            return await getPopularGames(page, 6);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const gamesSlice = createSlice({
    name: "games",
    initialState: {
        games: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGamesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGamesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.games = [...state.games, ...action.payload]; // Concatenamos juegos nuevos
            })
            .addCase(fetchGamesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default gamesSlice.reducer;
