import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const initialState = {
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};

const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload];
        },
        setMenu: (state, action) => {
            state.opened = action.payload;
        },
        setFontFamily: (state, action) => {
            state.fontFamily = action.payload;
        },
        setBorderRadius: (state, action) => {
            state.borderRadius = action.payload;
        }
    }
});

export const { menuOpen, setMenu, setFontFamily, setBorderRadius } = customizationSlice.actions;

export default customizationSlice.reducer;