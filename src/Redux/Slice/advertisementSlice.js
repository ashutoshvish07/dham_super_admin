import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../Axios"


export const getAdvertisement = createAsyncThunk(
    'advertisement/getAdvertisement',
    async ({ page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `/get-advertisement-for-admin?page=${page}&page_size=${page_size}`
            if (search) {
                url += `&search=${search}`
            }

            const response = await Axios.get(url)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
// get - advertisement - by - id
export const getAdvertisementById = createAsyncThunk(
    'advertisement/getAdvertisementById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-advertisement-by-id/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const createAdvertisement = createAsyncThunk(
    'advertisement/createAdvertisement',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-advertisement`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const updateAdvertisement = createAsyncThunk(
    'advertisement/updateAdvertisement',
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-advertisement/${id}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const deleteAdvertisement = createAsyncThunk(
    'advertisement/deleteAdvertisement',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-advertisement/${id}`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)




const advertisementSlice = createSlice({
    name: 'advertisement',
    initialState: {
        advertisements: [],
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAdvertisement.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAdvertisement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.advertisements = action.payload;
            })
            .addCase(createAdvertisement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getAdvertisement.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAdvertisement.fulfilled, (state, action) => {
                state.isLoading = false;
                state.advertisements = action.payload;
            })
            .addCase(getAdvertisement.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }

})

export default advertisementSlice.reducer;