import { createSlice } from '@reduxjs/toolkit';
import initialState from './State';

export const authReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    authAction: (state, action) => {
      state.auth = action.payload;
    },
    authTokenAction: (state, action) => {
      state.authToken = action.payload
    }
  },
});

export const { authAction, authTokenAction } = authReducer.actions;

export default authReducer.reducer;
