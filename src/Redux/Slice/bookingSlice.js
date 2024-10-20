import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../Axios';


export const getBookingsAsync = createAsyncThunk(
    'bookings/getBookingsAsync',
    async ({ page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `/get-booking-by-admin?page=${page}&page_size=${page_size}`
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
export const getGuidBookingsAsync = createAsyncThunk(
    'bookings/getGuidBookingsAsync',
    async ({ page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `/get-guide-booking-by-admin?page=${page}&page_size=${page_size}`
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



const bookingSlice = createSlice({
    name: 'bookings',
    initialState: {
        bookings: {},
        guidBooking: {},
        loading: false,
        error: null,
    },
    reducers: {
        clearSingleBlog: (state) => {
            state.singleBlog = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Hotels
            .addCase(getBookingsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBookingsAsync.fulfilled, (state, action) => {
                state.loading = false;

                state.bookings = action.payload;
            })
            .addCase(getBookingsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getGuidBookingsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getGuidBookingsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.guidBooking = action.payload;
            })
            .addCase(getGuidBookingsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});
export const { clearSingleBlog } = bookingSlice.actions;

export default bookingSlice.reducer;
