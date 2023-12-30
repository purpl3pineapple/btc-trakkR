import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import sliceBTC from "../context/BTC-price/btcPrice.slice";
import btcMiddleware from "../context/BTC-price/btcPriceMiddleware";
import sliceLightning from "../context/lightning/lightning.slice";
import sliceMempool from "../context/mempool/mempool.slice";
import mempoolAPI from "../api-services/mempool.service";
import mempoolMiddleware from "../context/mempool/mempoolMiddleware";
import coincapAPI from "../api-services/coincap.service";

export const store = configureStore({
    reducer: {
        BTC: sliceBTC.reducer,
        coincapAPI: coincapAPI.reducer,
        lightning: sliceLightning.reducer,
        mempool: sliceMempool.reducer,
        mempoolAPI: mempoolAPI.reducer,
    },
    immutableCheck: false,
    serializableCheck: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(mempoolAPI.middleware)
    .concat(btcMiddleware.middleware)
    .concat(mempoolMiddleware.middleware)
    .concat(coincapAPI.middleware)
});

setupListeners(store.dispatch);