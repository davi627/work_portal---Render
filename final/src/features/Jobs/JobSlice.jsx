import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: null,
  },
  reducers: {
    setJobsData: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { setJobsData } = jobSlice.actions;

export default jobSlice.reducer;
