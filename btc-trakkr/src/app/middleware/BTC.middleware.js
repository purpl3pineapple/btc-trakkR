import { createListenerMiddleware } from "@reduxjs/toolkit";
import sliceBTC from "../slices/BTC.slice";

const { updatePrice, updateStats } = sliceBTC.actions;

const btcMiddleware = createListenerMiddleware();

btcMiddleware.startListening({
  actionCreator: updatePrice,
  effect: async (action, listenerAPI) => {
    listenerAPI.unsubscribe();

    const {
      BTC: { currentPrice },
    } = listenerAPI.getOriginalState();

    const { BTC } = action.payload;

    const numCurrentPrice =
      currentPrice === null ? 0 : Number(currentPrice.replace(/,/g, ""));

    const numBTC = Number(BTC.replace(/,/g, ""));

    const increased = numBTC > numCurrentPrice;

    const decreased = numBTC < numCurrentPrice;

    const change = [
      { value: "increased", result: increased },
      { value: "decreased", result: decreased },
    ].find(({ result }) => result === true).value;

    listenerAPI.dispatch(
      updatePrice({
        BTC,
        change,
        loading: false,
      })
    );

    listenerAPI.subscribe();
  },
});

btcMiddleware.startListening({
  actionCreator: updateStats,
  effect: async (action, listenerAPI) => {
    listenerAPI.unsubscribe();

    //console.log(action.payload);

    /* listenerAPI.dispatch(
            updateStats()
        ); */

    listenerAPI.subscribe();
  },
});

export default btcMiddleware;
