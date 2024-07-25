import { createSlice } from '@reduxjs/toolkit';

const gardeningJobSlice = createSlice({
  name: 'gardening',
  initialState: {
    Gardening: null,
  },
  reducers: {
    setGardening: (state, action) => {
      state.Gardening = action.payload;
    },
  },
});

export const { setGardening } = gardeningJobSlice.actions;

export default gardeningJobSlice.reducer;
