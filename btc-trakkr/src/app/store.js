import { configureStore } from "@reduxjs/toolkit";
import btcReducer from "../context/BTC-price/btcPrice.slice";

export const store = configureStore({
    reducer: {
        BTC: btcReducer
    },
});