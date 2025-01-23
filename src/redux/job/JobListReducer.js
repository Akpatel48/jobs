import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allJobs: []
}

export const jobListReducer = createSlice({
  name: 'jobList',
  initialState,
  reducers: {
    setJobList: (state, action) => {
      state.allJobs = action.payload
    },
  },
});

export const { setJobList } = jobListReducer.actions;

export default jobListReducer.reducer;
