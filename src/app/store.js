import {configureStore} from '@reduxjs/toolkit';
import seatReducer from '../features/seating/seatSlice';
import paymentReducer from '../features/payment/paymentSlice';
import timeReducer from '../features/time/timeSlice';

export default configureStore({
    reducer: {
        seats: seatReducer,
        payment: paymentReducer,
        time: timeReducer,
    },
})  