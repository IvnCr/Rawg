import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvents } from "../../services/events";

// Thunk para obtener eventos
export const getEvents = createAsyncThunk("events/getEvents", async () => {
    return await fetchEvents();
});

const eventsSlice = createSlice({
    name: "events",
    initialState: {
        events: [],
        userEvents: JSON.parse(localStorage.getItem("userEvents")) || [],
        loading: false,
        error: null,
    },
    reducers: {
        joinEvent: (state, action) => {
            // Verificar si el evento ya está en la lista de eventos del usuario
            if (!state.userEvents.find((event) => event.id === action.payload.id)) {
                state.userEvents.push(action.payload);
                localStorage.setItem("userEvents", JSON.stringify(state.userEvents));
            }
        },
        leaveEvent: (state, action) => {
            state.userEvents = state.userEvents.filter((event) => event.id !== action.payload);
            localStorage.setItem("userEvents", JSON.stringify(state.userEvents));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { joinEvent, leaveEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
