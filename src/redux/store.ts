import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { salesReducer } from './slices';
import { rootSaga } from './sagas';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
    reducer: {
        sales: salesReducer,
        // Add other reducers here if necessary
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check if using non-serializable data
        }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
    preloadedState: {}, // You can preload initial state here if necessary
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
