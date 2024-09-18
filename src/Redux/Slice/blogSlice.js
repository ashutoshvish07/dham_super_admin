import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../Axios';


export const getblogsAsync = createAsyncThunk(
    'blogs/getblogsAsync',
    async ({ page, page_size, search }, { rejectWithValue }) => {
        try {
            let url = `/get-blog-by-admin?page=${page}&page_size=${page_size}`
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

export const getblogsDataByIdAsync = createAsyncThunk(
    'blogs/getblogsDataByIdAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            let url = `/get-blog-by-id/${id}`
            const response = await Axios.get(url)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const createblogsAsync = createAsyncThunk(
    'blogs/createblogsAsync',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await Axios.post(`/create-blog`, formData, {
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
export const updateblogsAsync = createAsyncThunk(
    'blogs/updateblogsAsync',
    async ({ formData, id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/update-blog/${id}`, formData, {
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

export const deleteblogsAsync = createAsyncThunk(
    'blogs/deleteblogsAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.delete(`/delete-blog/${id}`)
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateblogsStatusAsync = createAsyncThunk(
    'blogs/updateblogsStatusAsync',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await Axios.put(`/publish-blog/${id}`)
            return response.data;

        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)


const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: [],
        singleBlog: {},
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
            .addCase(getblogsAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getblogsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getblogsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getblogsDataByIdAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(getblogsDataByIdAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.singleBlog = action.payload.data;
            })
            .addCase(getblogsDataByIdAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    },
});
export const { clearSingleBlog } = blogsSlice.actions;

export default blogsSlice.reducer;
