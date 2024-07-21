import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../Axios';


export const getGuidAsync = createAsyncThunk(
    'guid/getGuidAsync',
    async ({ page, page_size }, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-all-guid?page=${page}&page_size=${page_size}`)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const createGuidAsync = createAsyncThunk(
    'guid/createGuidAsync',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-guid`, formData, {
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
export const updateGuidAsync = createAsyncThunk(
    'guid/updateGuidAsync',
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-guid/${id}`, formData, {
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
export const deleteGuidAsync = createAsyncThunk(
    'guid/deleteGuidAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-guid/${id}`)
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)


const guidSlice = createSlice({
    name: 'guid',
    initialState: {
        guids: [],
        status: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Hotels
            .addCase(getGuidAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(getGuidAsync.fulfilled, (state, action) => {
                state.status = false;
                state.guids = action.payload;
            })
            .addCase(getGuidAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })


    },
});

export default guidSlice.reducer;
