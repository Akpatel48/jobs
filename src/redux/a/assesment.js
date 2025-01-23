import { createSlice } from '@reduxjs/toolkit';


export const assesment = createSlice({
  name: 'assesment',
  initialState: {
    assesment: {},
  },
  reducers: {
    assesmentforsubmit: (state, action) => {
      state.assesment = action.payload;
    },
  },
});

export const { assesmentforsubmit } = assesment.actions;

export default assesment.reducer;
