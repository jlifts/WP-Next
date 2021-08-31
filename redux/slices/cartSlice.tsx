/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface CartState {
  items: { [productId: string]: number };
}

const initialState: CartState = {
  items: {},
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setToCart(state, action: PayloadAction<string>) {
      if (state.items[action.payload]) {
        state.items[action.payload]++;
      } else {
        state.items[action.payload] = 1;
      }
    },
  },
});

export const { setToCart } = cartSlice.actions;

// Selectors
export const selectCart = createSelector(
  (state: RootState) => state.cart.items,
  (items) => {
    console.log('calling getMemoizedNumItems');
    let numItems = 0;
    for (const id in items) {
      numItems += items[id];
    }
    return numItems;
  },
);

export const selectSubTotalPrice = createSelector(
  (state: RootState) => state.cart.items,
  (state: RootState) => state.product.products,
  (items, products) => {
    let total = 0;
    for (const id in items) {
      total +=
        products[id].regularPrice.replace('$', '').parseInt() * items[id];
    }
    return total.toFixed(2);
  },
);

export default cartSlice.reducer;
