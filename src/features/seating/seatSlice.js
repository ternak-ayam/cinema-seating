import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seats: Array(25).fill(false), 
  selectedSeats: [],
};

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seatIndex = action.payload;

      if (state.selectedSeats.includes(seatIndex)) {
        state.selectedSeats = state.selectedSeats.filter((seat) => seat !== seatIndex);
      } else {
        state.selectedSeats.push(seatIndex);
      }
    },
  },
});

export const { toggleSeat } = seatSlice.actions;
export default seatSlice.reducer;


