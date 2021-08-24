/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  itemId: string;
  itemName: string;
  itemImageUrl: string | any;
  itemImageAlt: string;
  itemPrice: number;
}

export interface ProductState {
  products: { [id: string]: Product };
}

const initialState: ProductState = {
  products: {},
};

export const itemSlice = createSlice({
  name: 'item',
  // remove the {} on initailState
  initialState: { value: initialState },
  reducers: {
    // recievedProducts(state, action: PayloadAction<Product[]>) {
    //   const products = action.payload;
    //   products.forEach(product => {
    //     state.products[product.itemId] = product;
    //   })
    // }
    setItem: (state, action) => {
      // state.value.quantity * state.value.itemPrice = state.value.subtotal;
      state.value = action.payload;
    },
  },
});

// add recievedProducts
export const { setItem } = itemSlice.actions;

// Selectors
export const selectItem = (state: { item: { value: string } }) =>
  state.item.value;

export default itemSlice.reducer;
