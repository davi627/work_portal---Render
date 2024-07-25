import { createSlice } from '@reduxjs/toolkit';

const singleJobSlice = createSlice({
  name: 'singleJob',
  initialState: {
    singleJob: null,
  },
  reducers: {
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setSingleJob } = singleJobSlice.actions;

export default singleJobSlice.reducer;
