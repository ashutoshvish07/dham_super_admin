import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';


// Create async thunk for location management
export const createCountryAsync = createAsyncThunk(
    'location/createCountryAsync',

    async ({ name }, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-country`, { name });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const editCountryAsync = createAsyncThunk(
    'location/editCountryAsync',

    async ({ name, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-country/${id}`, { name });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deleteCountryAsync = createAsyncThunk(
    'location/deleteCountryAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-country/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCountryBySuperAdminAsync = createAsyncThunk(
    'location/getCountryBySuperAdminAsync',
    async ({ page, page_size }, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-country-by-super-admin?page=${page}&page_size=${page_size}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


// State -->>>  get, create, update, delete
export const createStateAsync = createAsyncThunk(
    'location/createStateAsync',
    async ({ state, countryId }, { rejectWithValue }) => {

        try {
            const response = await Axios.post(`/create-state`, { name: state, countryId });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateStateAsync = createAsyncThunk(
    'location/updateStateAsync',
    async ({ state, countryId, stateId }, { rejectWithValue }) => {

        try {
            const response = await Axios.put(`/update-state/${stateId}`, { name: state, countryId: countryId });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteStateAsync = createAsyncThunk(
    'location/deleteStateAsync',
    async ({ state_id }, { rejectWithValue }) => {

        try {
            const response = await Axios.delete(`/delete-state/${state_id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllStateAsync = createAsyncThunk(
    'location/getAllStateAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-all-states`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


// City -->>>  get , create , update , delete
export const createCityAsync = createAsyncThunk(
    'location/createCityAsync',
    async ({ name, stateId, file }, { rejectWithValue }) => {
        debugger
        try {
            const response = await Axios.post(`/create-city`, { name, stateId, file });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateCityAsync = createAsyncThunk(
    'location/updateCityAsync',
    async ({ city_id, file }, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-city/${city_id}`, { file });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllCityAsync = createAsyncThunk(
    'location/getAllCityAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-all-city`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const getCityByStateAsync = createAsyncThunk(
    'location/getCityByStateAsync',
    async ({ city_id }, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-city-by-state/${city_id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);



const locationSlice = createSlice({
    name: 'location',
    initialState: {
        countries: [],
        states: [],
        cities: [],
        loading: false,
        error: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Country
            .addCase(createCountryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCountryAsync.fulfilled, (state, action) => {
                state.loading = false;
                // state.countries.push(action.payload.data);
            })
            .addCase(createCountryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(editCountryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCountryAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(editCountryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Countries by Super Admin
            .addCase(getCountryBySuperAdminAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCountryBySuperAdminAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(getCountryBySuperAdminAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create State
            .addCase(createStateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createStateAsync.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createStateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get All States
            .addCase(getAllStateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.states = action.payload;
            })
            .addCase(getAllStateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create City
            .addCase(createCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                // state.cities.push(action.payload);
            })
            .addCase(createCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update City
            .addCase(updateCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.cities.findIndex(city => city.id === action.payload.id);
                if (index !== -1) {
                    state.cities[index] = action.payload;
                }
            })
            .addCase(updateCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get All Cities
            .addCase(getAllCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(getAllCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get City By State
            .addCase(getCityByStateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCityByStateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(getCityByStateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError } = locationSlice.actions;
export default locationSlice.reducer;