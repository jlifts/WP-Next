/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  quantity: 0,
  subtotal: 0,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState: { value: initialState },
  reducers: {
    setItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setItem } = itemSlice.actions;

// Selectors
export const selectItem = (state: { item: { value: string } }) =>
  state.item.value;

export default itemSlice.reducer;
