import { createSlice } from '@reduxjs/toolkit';
import initialState from './State';

export const jobReducer = createSlice({
  name: 'job',
  initialState,
  reducers: {
    jobAction: (state, action) => {
      state.job = { ...state.job, ...action.payload };
    },
    clearJobData: (state) => {
      state.job = {}; // Reset the job state to an empty object or initial state
    },
  },
});

export const { jobAction ,clearJobData} = jobReducer.actions;

export default jobReducer.reducer;
