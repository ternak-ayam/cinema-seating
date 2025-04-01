import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import seatReducer from '../features/seating/seatSlice';
import paymentReducer from '../features/payment/paymentSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        seats: seatReducer,
        payment: paymentReducer,
    },
})  