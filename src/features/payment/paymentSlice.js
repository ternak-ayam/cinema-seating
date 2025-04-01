import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPaymentMethod: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
    clearPaymentMethod: (state) => {
      state.selectedPaymentMethod = null;
    },
  },
});

export const { setPaymentMethod, clearPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
