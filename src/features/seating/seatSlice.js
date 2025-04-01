import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
  labels: Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i)), 
};

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    toggleSeat: (state, action) => {
      const seatIndex = action.payload; 
      const row = Math.floor(seatIndex / 10); 
      const col = seatIndex % 10; 
      const seatLabel = `${state.labels[row]}${col + 1}`; 

      if (state.selectedSeats.includes(seatLabel)) {
        state.selectedSeats = state.selectedSeats.filter((seat) => seat !== seatLabel);
      } else {
        state.selectedSeats.push(seatLabel);
      }
    },
    clearSeats: (state) => {
      state.selectedSeats = [];
    },
  },
});

export const { toggleSeat, clearSeats } = seatSlice.actions;
export default seatSlice.reducer;
