import {createSlice} from '@reduxjs/toolkit'

const countersByName = {};

const initialState = {
    value: 0,
}

export const createGenericSlice = (sliceName) => {
    return createSlice({
        name: sliceName,
        initialState,
        reducers: {
            increment: (state) => {
                state.value += 1;
            },
            decrement: (state) => {
                state.value -= 1;
            },
            incrementByAmount: (state, {payload}) => {
                state.value += payload;
            },
            setState: (state, {payload}) => {
                state.value += payload;
            }
        },
    });
};

export const increment = (counterName) =>
    countersByName[counterName].actions.increment;
export const decrement = (counterName) =>
    countersByName[counterName].actions.decrement;
export const incrementByAmount = (counterName) =>
    countersByName[counterName].actions.incrementByAmount;
export const setState = (counterName) =>
    countersByName[counterName].actions.setState;

export const selectCount = (counterName) => (state) => state[counterName].value;

const createCounter = (name) => {
    const slice = createGenericSlice(name);

    countersByName[name] = {
        actions: slice.actions
    };

    return slice.reducer;
};

export default createCounter;
