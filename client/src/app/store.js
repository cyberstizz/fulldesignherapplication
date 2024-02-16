// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from './features/cart/cartSlice';

// Create a persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Use combineReducers to combine reducers, if you have more than one reducer
const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers go here
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware and other store enhancers can go here
});

export const persistor = persistStore(store);
