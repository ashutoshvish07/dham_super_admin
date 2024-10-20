import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../Axios';


export const getDashboardAsync = createAsyncThunk(
    'dashboard/getDashboardAsync',
    async (_, { rejectWithValue }) => {
        try {
            let url = `/get-dashboard-data`
            const response = await Axios.get(url)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)
export const getDashboardGraphDataAsync = createAsyncThunk(
    'dashboard/getDashboardGraphDataAsync',
    async (_, { rejectWithValue }) => {
        try {
            let url = `/get-month-wise-booking`
            const response = await Axios.get(url)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)



const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        dashboardData: {},
        graphData: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboardAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardData = action.payload?.dashBoardData;
            })
            .addCase(getDashboardAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get Month Wise Booking
            .addCase(getDashboardGraphDataAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDashboardGraphDataAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.graphData = action.payload?.monthlyBookingCounts;
            })
            .addCase(getDashboardGraphDataAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;
