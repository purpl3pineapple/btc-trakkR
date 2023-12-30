import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import sliceBTC from "./slices/BTC.slice";
import btcMiddleware from "./middleware/BTC.middleware";
import sliceLightning from "./slices/lightning.slice";
import sliceMempool from "./slices/mempool.slice";
import mempoolAPI from "./services/api/mempool.api.service";
import mempoolMiddleware from "./middleware/mempool.middleware";
import coincapAPI from "./services/api/coincap.api.service";

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