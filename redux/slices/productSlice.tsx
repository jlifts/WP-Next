/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  quantity: number;
  id: string;
  name: string;
  imageUrl: string | any;
  imageAlt: string;
  regularPrice: any;
  slug: string;
}

export interface ProductState {
  products: { [id: string]: Product };
}

const initialState: ProductState = {
  products: {},
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    recievedProducts(state, action: PayloadAction<Product[]>) {
      const products = action.payload;
      products.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

export const { recievedProducts } = productSlice.actions;

// Selectors
export const selectProduct = (state: { item: { value: string } }) =>
  state.item.value;

export default productSlice.reducer;
