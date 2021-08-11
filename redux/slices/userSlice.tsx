/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    setUserName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;

// Selectors

export const selectUser = (state: { user: { value: string } }) =>
  state.user.value;

export default userSlice.reducer;
