import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../Axios';


export const getHotelAsync = createAsyncThunk(
    'hotel/getHotelAsync',
    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-my-hotels`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const createHotelAsync = createAsyncThunk(
    'hotel/createHotelAsync',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-hotel`, formData, {
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
export const updateHotelAsync = createAsyncThunk(
    'hotel/updateHotelAsync',

    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-hotel/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);
export const deleteHotelAsync = createAsyncThunk(
    'hotel/deleteHotelAsync',

    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-hotel/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// get-all-room-categories
export const getRoomCateAsync = createAsyncThunk(
    'hotel/getRoomCateAsync',

    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-all-room-categories`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// room-category is created
export const createRoomCateAsync = createAsyncThunk(
    'hotel/createRoomCateAsync',

    async ({ name }, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-room-category`, { name: name });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// update room categories

export const updateRoomCateAsync = createAsyncThunk(
    'hotel/updateRoomCateAsync',

    async ({ id, name }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-room-category/${id}`, { name: name });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deleteRoomCateAsync = createAsyncThunk(
    'hotel/deleteRoomCateAsync',

    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-room-category/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


// amenities
export const getAmenitiesAsync = createAsyncThunk(
    'hotel/getAmenitiesAsync',

    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-amenities`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const createAmenitiesAsync = createAsyncThunk(
    'hotel/createAmenitiesAsync',

    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-amenity`, formData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const updateAmenitiesAsync = createAsyncThunk(
    'hotel/updateAmenitiesAsync',

    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`update-amenity/${id}`, formData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deleteAmenitiesAsync = createAsyncThunk(
    'hotel/deleteAmenitiesAsync',

    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-amenity/${id}`);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// rooms are created

export const getAllRoomsAsync = createAsyncThunk(
    'hotel/getAllRoomsAsync',

    async (_, { rejectWithValue }) => {
        try {
            const response = await Axios.get(`/get-rooms-by-admin`,);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// room is created

export const createRoomAsync = createAsyncThunk(
    'hotel/createRoomAsync',

    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-room-by-admin`, formData, {
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
export const deleteRoomAsync = createAsyncThunk(
    'hotel/deleteRoomAsync',

    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-room/${id}`, {
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



const hotelSlice = createSlice({
    name: 'hotel',
    initialState: {
        hotels: [],
        roomCategories: [],
        amenities: [],
        rooms: [],
        status: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get Hotels
            .addCase(getHotelAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(getHotelAsync.fulfilled, (state, action) => {
                state.status = false;
                state.hotels = action.payload;
            })
            .addCase(getHotelAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Create Hotel
            .addCase(createHotelAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(createHotelAsync.fulfilled, (state, action) => {
                state.status = false;
                state.hotels.push(action.payload);
            })
            .addCase(createHotelAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Update Hotel
            .addCase(updateHotelAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(updateHotelAsync.fulfilled, (state, action) => {
                state.status = false;
                // const index = state.hotels.findIndex((hotel) => hotel._id === action.payload._id);
                // if (index !== -1) {
                //     state.hotels[index] = action.payload;
                // }
            })
            .addCase(updateHotelAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Get Room Categories
            .addCase(getRoomCateAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(getRoomCateAsync.fulfilled, (state, action) => {
                state.status = false;
                state.roomCategories = action.payload;
            })
            .addCase(getRoomCateAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Create Room Category
            .addCase(createRoomCateAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(createRoomCateAsync.fulfilled, (state, action) => {
                state.status = false;
                // state.roomCategories.push(action.payload);
            })
            .addCase(createRoomCateAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Get Amenities
            .addCase(getAmenitiesAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(getAmenitiesAsync.fulfilled, (state, action) => {
                state.status = false;
                state.amenities = action.payload;
            })
            .addCase(getAmenitiesAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Create Amenities
            .addCase(createAmenitiesAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(createAmenitiesAsync.fulfilled, (state, action) => {
                state.status = false;
                // state.amenities.push(action.payload);
            })
            .addCase(createAmenitiesAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Get All Rooms
            .addCase(getAllRoomsAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(getAllRoomsAsync.fulfilled, (state, action) => {
                state.status = false;
                state.rooms = action.payload;
            })
            .addCase(getAllRoomsAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })
            // Create Room
            .addCase(createRoomAsync.pending, (state) => {
                state.status = true;
            })
            .addCase(createRoomAsync.fulfilled, (state, action) => {
                state.status = false;
            })
            .addCase(createRoomAsync.rejected, (state, action) => {
                state.status = false;
                state.error = action.payload;
            })

    },
});

export default hotelSlice.reducer;
