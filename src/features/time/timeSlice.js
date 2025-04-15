// src/features/time/timeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const timeSlice = createSlice({
  name: "time",
  initialState: {
    selectedTime: null,
  },
  reducers: {
    setTime: (state, action) => {
      state.selectedTime = action.payload;
    },
    clearTime: (state) => {
      state.selectedTime = null;
    },
  },
});

export const { setTime, clearTime } = timeSlice.actions;
export default timeSlice.reducer;
