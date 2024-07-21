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
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-city`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateCityAsync = createAsyncThunk(
    'location/updateCityAsync',
    async ({ city_id, formData }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-city/${city_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllCityAsync = createAsyncThunk(
    'location/getAllCityAsync',
    async ({ page, page_size }, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-all-city?page=${page}&page_size=${page_size}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteCityAsync = createAsyncThunk(
    'location/deleteCityAsync',
    async ({ city_id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-city/${city_id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
)

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


//* Nearby get , create, update and delete  *//

export const getNearByAsync = createAsyncThunk(
    'location/getNearByAsync',
    async ({ page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `get-all-nearby?page=${page}&page_size=${page_size}`
            if (search) {
                url += `&search=${search}`;
            }
            const response = await Axios.get(url, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const createNearByAsync = createAsyncThunk(
    'location/createNearByAsync',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-nearby/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateNearByAsync = createAsyncThunk(
    'location/updateNearByAsync',
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`update-nearby/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deleteNearByAsync = createAsyncThunk(
    'location/deleteNearByAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-nearby/${id}`,);
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
        nearBy: [],
        loading: false,
        error: null,
        status: 'idle',
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
                state.status = 'loading';
            })
            .addCase(createCountryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';

                // state.countries.push(action.payload.data);
            })
            .addCase(createCountryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(editCountryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(editCountryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
            })
            .addCase(editCountryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Get Countries by Super Admin
            .addCase(getCountryBySuperAdminAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getCountryBySuperAdminAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
                state.status = 'success';
            })
            .addCase(getCountryBySuperAdminAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Create State
            .addCase(createStateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createStateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
            })
            .addCase(createStateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Get All States
            .addCase(getAllStateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getAllStateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.states = action.payload;
                state.status = 'success';
            })
            .addCase(getAllStateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Create City
            .addCase(createCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                // state.cities.push(action.payload);
            })
            .addCase(createCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Update City
            .addCase(updateCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(updateCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                // const index = state.cities.findIndex(city => city.id === action.payload.id);
                // if (index !== -1) {
                //     state.cities[index] = action.payload;
                // }
            })
            .addCase(updateCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Get All Cities
            .addCase(getAllCityAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getAllCityAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
                state.status = 'success';
            })
            .addCase(getAllCityAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Get City By State
            .addCase(getCityByStateAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getCityByStateAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
                state.status = 'success';
            })
            .addCase(getCityByStateAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Create NearBy
            .addCase(createNearByAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(createNearByAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
                // state.nearBy.push(action.payload);
            })
            .addCase(createNearByAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Update NearBy
            .addCase(updateNearByAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(updateNearByAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.status = 'success';
            })
            .addCase(updateNearByAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
            // Get All Nearby
            .addCase(getNearByAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = 'loading';
            })
            .addCase(getNearByAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.nearBy = action.payload;
                state.status = 'success';
            })
            .addCase(getNearByAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = 'failed';
            })
        // Get NearBy By City


    }
});

export const { clearError } = locationSlice.actions;
export default locationSlice.reducer;
