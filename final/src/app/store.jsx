import { configureStore } from "@reduxjs/toolkit";
import JobSlice from "../features/Jobs/JobSlice";
import singleJobSlice from "../features/singleJob/singleJobSlice";
import gardeningSlice from "../features/gardening/gardeningSlice";
import laundryJobSlice from "../features/Laundry/laundryJobSlice";



export const store = configureStore({
    reducer:{
        jobSlice:JobSlice,
        singleJobData:singleJobSlice,
        GardeningData:gardeningSlice,
        LaundryData:laundryJobSlice,


    }
})