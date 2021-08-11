/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import itemReducer from './slices/itemSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    item: itemReducer,
  },
});
