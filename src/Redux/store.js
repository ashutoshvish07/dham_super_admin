// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { combineReducers } from 'redux';
// import authSlice from './Slice/authSlice';
// import customizationReducer from 'store/customizationReducer';
// import locationSlice from './Slice/locationSlice';
// import hotelSlice from './Slice/hotelSlice';
// import guidSlice from './Slice/guidSlice';
// import advertisementSlice from './Slice/advertisementSlice';
// import blogSlice from './Slice/blogSlice';
// import eventTourSlice from './Slice/eventTourSlice';

// const authPersistConfig = {
//     key: 'auth',
//     storage,
// };

// const rootReducer = combineReducers({
//     auth: persistReducer(authPersistConfig, authSlice),
//     customization: customizationReducer,
//     location: locationSlice,
//     hotel: hotelSlice,
//     guid: guidSlice,
//     advertisement: advertisementSlice,
//     blogs: blogSlice,
//     eventTour: eventTourSlice,
// });
// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['auth'], // only auth will be persisted
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authSlice from './Slice/authSlice';
import customizationReducer from 'store/customizationReducer';
import locationSlice from './Slice/locationSlice';
import hotelSlice from './Slice/hotelSlice';
import guidSlice from './Slice/guidSlice';
import advertisementSlice from './Slice/advertisementSlice';
import blogSlice from './Slice/blogSlice';
import eventTourSlice from './Slice/eventTourSlice';
import bookingSlice from './Slice/bookingSlice';
import dashboardSlice from './Slice/dashboardSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'], // only auth will be persisted
};

const rootReducer = combineReducers({
    auth: authSlice,
    customization: customizationReducer,
    location: locationSlice,
    hotel: hotelSlice,
    guid: guidSlice,
    advertisement: advertisementSlice,
    blogs: blogSlice,
    eventTour: eventTourSlice,
    bookings: bookingSlice,
    dashboard: dashboardSlice,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };
