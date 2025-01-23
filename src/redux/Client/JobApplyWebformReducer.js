import { createSlice } from '@reduxjs/toolkit';

export const JobApplyWebFormReducer = createSlice({
  name: 'jobApplyWebForm',
  initialState: {},
  reducers: {
    setWebFormProperty: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
    setResume: (state, action) => {
      state.resume = action.payload.value;
    }
  },
});

export const { setWebFormProperty, setResume } = JobApplyWebFormReducer.actions;

export default JobApplyWebFormReducer.reducer;
