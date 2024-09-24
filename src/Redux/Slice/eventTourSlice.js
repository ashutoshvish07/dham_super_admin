import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../Axios';


export const geteventTourAsync = createAsyncThunk(
    'eventtour/geteventTourAsync',
    async ({ page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `/all-events-tours?page=${page}&page_size=${page_size}`
            if (search) {
                url += `&search=${search}`;
            }
            const response = await Axios.get(url)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const geteventtourIdAsync = createAsyncThunk(
    'eventtour/geteventTourIdAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            let url = `/event-tour-by-id/${id}`
            const response = await Axios.get(url)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const createeventtourAsync = createAsyncThunk(
    'eventtour/createeventTourAsync',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-tour-event`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const updateeventtourAsync = createAsyncThunk(
    'eventtour/updateeventTourAsync',
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-tour-event/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const deleteeventTourAsync = createAsyncThunk(
    'eventtour/deleteeventTourAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-event-tour/${id}`)
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)



const eventTourSlice = createSlice({
    name: 'eventtours',
    initialState: {
        eventTour: [],
        loading: false,
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // Get event tour
            .addCase(geteventTourAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(geteventTourAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.eventTour = action.payload;
            })
            .addCase(geteventTourAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get event tour by id
            .addCase(geteventtourIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(geteventtourIdAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.eventTour = action.payload;
            })
            .addCase(geteventtourIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create event tour
            .addCase(createeventtourAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(createeventtourAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createeventtourAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update event tour
            .addCase(updateeventtourAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateeventtourAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateeventtourAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete event tour
            .addCase(deleteeventTourAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteeventTourAsync.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteeventTourAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});

export default eventTourSlice.reducer;
