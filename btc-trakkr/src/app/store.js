import { configureStore } from "@reduxjs/toolkit";
import sliceBTC from "../context/BTC-price/btcPrice.slice";
import mempoolAPI from "../api-services/mempool.service";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        BTC: sliceBTC.reducer,
        mempool: mempoolAPI.reducer
    },
    immutableCheck: false,
    serializableCheck: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(mempoolAPI.middleware)
});

setupListeners(store.dispatch);