import { createSlice } from '@reduxjs/toolkit';

export const jobSelectReducer = createSlice({
  name: 'selectJob',
  initialState: {
    job: {},
  },
  reducers: {
    selectJobForApply: (state, action) => {
      state.job = action.payload;
    },
  },
});

export const { selectJobForApply } = jobSelectReducer.actions;

export default jobSelectReducer.reducer;
