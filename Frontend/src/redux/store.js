import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';
import productReducer from './productSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    products: productReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Set up listeners for RTK Query
setupListeners(store.dispatch);