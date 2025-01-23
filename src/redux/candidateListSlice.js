import { createSlice } from "@reduxjs/toolkit";

export const candidadateListSlice = createSlice({
    name: 'candidates',
    isFetch: false,
    isErr: false,
    reducers:{
        deleteCandidateSuccess(state,action) {
            state.isFetch = false;
            state.isErr = false;
            const arrIds = action.payload;
            state.candidates = state.candidates.filter(
                (candidate) => !arrIds.includes(candidate._id)
            )
        }
    }
});

export const {
    deleteCandidateSuccess,
} = candidadateListSlice.actions;
export default candidadateListSlice.reducer;