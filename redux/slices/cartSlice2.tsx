/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface CartState {
  items: { [productId: string]: number };
}

const initialState: CartState = {
  items: {},
};

// export const cartSlice2 = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart(state, action: PayloadAction<string>) {
//       const id = action.payload;
//       if (state.items[id]) {
//         state.items[id]++;
//       } else {
//         state.items[id] = 1;
//       }
//     },
//   },
// });

// export const { addToCart } = cartSlice2.actions;

// // Selectors
// export const selectCart2 = (state: RootState) => {
//   let numItems = 0;
//   for (let id in state.cart.items) {
//     numItems += state.cart.items[id];
//   }
//   return numItems;
// };

// export const selectMemoizedNumItems = createSelector(
//   (state: RootState) => state.cart.items,
//   (items) => {
//     let numItems = 0;
//     for (let id in items) {
//       numItems += state.cart.items[id];
//     }
//     return numItems;
//   },
// );

// export default cartSlice2.reducer;
