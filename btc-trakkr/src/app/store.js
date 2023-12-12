import { configureStore } from "@reduxjs/toolkit";
import sliceBTC from "../context/BTC-price/btcPrice.slice";
import blocksReducer from "../context/mempool/blocks"

export const store = configureStore({
    reducer: {
        BTC: sliceBTC.reducer,
        mempool: blocksReducer
    },
});