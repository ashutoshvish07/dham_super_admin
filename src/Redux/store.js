import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authSlice from './Slice/authSlice';
import customizationReducer from 'store/customizationReducer';
import locationSlice from './Slice/locationSlice';
import hotelSlice from './Slice/hotelSlice';

const authPersistConfig = {
    key: 'auth',
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice),
    customization: customizationReducer,
    location: locationSlice,
    hotel: hotelSlice
});
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export { store, persistor };

