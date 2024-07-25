import { createSlice } from '@reduxjs/toolkit';

const laundryJobSlice = createSlice({
  name: 'laundry',
  initialState: {
    Laundry: null,
  },
  reducers: {
    setLaundry: (state, action) => {
      state.Laundry = action.payload;
    },
  },
});

export const { setLaundry } = laundryJobSlice.actions;

export default laundryJobSlice.reducer;
