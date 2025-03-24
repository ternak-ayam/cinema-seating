import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import seatReducer from '../features/seating/seatSlice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        seats: seatReducer,
    },
})  