import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPrice: null,
    increased: null,
    decreased: null,
    loading: true
};

export const btcSlice = createSlice({
    name: 'BTC',
    initialState,
    reducers: {

        updatePrice: (state, action) => {

            state.currentPrice = action.payload.BTC;
            state.increased = action.payload.increased;
            state.decreased = action.payload.decreased;
            state.loading = false;
        }
    }
});

export const { updatePrice } = btcSlice.actions;

export default btcSlice.reducer;