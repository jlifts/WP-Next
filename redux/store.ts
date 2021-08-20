/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import itemReducer from './slices/itemSlice';
import collectionReducer from './slices/collectionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    item: itemReducer,
    collection: collectionReducer,
  },
});
