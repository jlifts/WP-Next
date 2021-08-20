/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
};

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: { value: initialState },
  reducers: {
    setCollection: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { setCollection } = collectionSlice.actions;

// Selectors
export const selectCollection = (state: { collection: { value: string } }) =>
  state.collection.value;

export default collectionSlice.reducer;
