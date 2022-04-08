import {combineReducers, configureStore} from '@reduxjs/toolkit'

import createCounter from "../features/counter/counterSlice";

const rootReducer = combineReducers({
    counterRoma: createCounter("counterRoma"),
    counterLiza: createCounter("counterLiza"),
    counterArseny: createCounter("counterArseny"),
    counterDima: createCounter("counterDima"),
    counterOksana: createCounter("counterOksana")
})


const store = configureStore({
    reducer: rootReducer,
});

export default store;
