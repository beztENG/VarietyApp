import { createSlice } from '@reduxjs/toolkit';

export const historyPurchaseSlice = createSlice({
    name: 'historyPurchase',
    initialState: [],
    reducers: {
        addPurchaseToHistory: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addPurchaseToHistory } = historyPurchaseSlice.actions;

export default historyPurchaseSlice.reducer;
