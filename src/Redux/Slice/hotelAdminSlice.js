import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../Axios';


export const getHotelRoomsAsync = createAsyncThunk(
    'hotelRooms/getHotelRoomsAsync',
    async ({ id, page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `/get-my-rooms?page=${page}&page_size=${page_size}`
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


export const createHotelRoomAsync = createAsyncThunk(
    'hotelRooms/createHotelRoomAsync',

    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-my-room`, formData, {
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

export const updateHotelRoomAsync = createAsyncThunk(
    'hotelRooms/updateHotelRoomAsync',

    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-room-by-admin/${id}`, formData, {
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

export const deleteHotelRoomAsync = createAsyncThunk(
    'hotelRooms/deleteHotelRoomAsync',

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


const hotelAdminSlice = createSlice({
    name: 'adminhotelRooms',
    initialState: {
        rooms: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHotelRoomsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHotelRoomsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(getHotelRoomsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default hotelAdminSlice.reducer;