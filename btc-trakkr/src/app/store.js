import { configureStore } from "@reduxjs/toolkit";
import sliceBTC from "../context/BTC-price/btcPrice.slice";
import mempoolAPI from "../api-services/mempool.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import sliceMempoolBlocks from "../context/mempool/mempool.blocks.slice";
import sliceMempoolRecommendedFees from "../context/mempool/mempool.fees.slice";
import sliceMempoolTxns from "../context/mempool/mempool.txns.slice";
import sliceLightning from "../context/lightning/lightning.slice";
import sliceMempool from "../context/mempool/mempool.slice";
import btcMiddleware from "../context/BTC-price/btcPriceMiddleware";

export const store = configureStore({
    reducer: {
        BTC: sliceBTC.reducer,
        mempool: sliceMempool.reducer,
        mempoolAPI: mempoolAPI.reducer,
        mempoolBlocks: sliceMempoolBlocks.reducer,
        mempoolFees: sliceMempoolRecommendedFees.reducer,
        mempoolTxns: sliceMempoolTxns.reducer,
        lightning: sliceLightning.reducer,
    },
    immutableCheck: false,
    serializableCheck: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(mempoolAPI.middleware)
    .concat(btcMiddleware.middleware)
});

setupListeners(store.dispatch);