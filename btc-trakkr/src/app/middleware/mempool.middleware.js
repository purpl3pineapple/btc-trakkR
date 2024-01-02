import { createListenerMiddleware } from "@reduxjs/toolkit";
import sliceMempool from "../slices/mempool.slice";
import MempoolUtility from "../services/utility/mempool.utility";

const {
  updateBlocks,
  updateUpcomingBlocks,
  updateLiveStats,
  updateNewestBlock,
} = sliceMempool.actions;

const { convertMempoolBlockFormat, findRange } = MempoolUtility;

const mempoolMiddleware = createListenerMiddleware();

mempoolMiddleware.startListening({
  actionCreator: updateBlocks,
  effect: async (action, listenerAPI) => {
    try {
      listenerAPI.unsubscribe();

      const mempoolBlocks = action.payload.blocks.map((block) =>
        convertMempoolBlockFormat(block)
      );

      listenerAPI.dispatch(
        updateBlocks({
          blocks: mempoolBlocks,
        })
      );
    } catch (error) {
      console.log("Blocks middleware error...", error);
    } finally {
      listenerAPI.subscribe();
    }
  },
});

mempoolMiddleware.startListening({
  actionCreator: updateNewestBlock,
  effect: async (action, listenerAPI) => {
    try {
      listenerAPI.unsubscribe();

      action.payload.blocks = [...action.payload.blocks].slice(0, 15);
      action.payload.blocks[0] = convertMempoolBlockFormat(
        action.payload.blocks[0]
      );

      listenerAPI.dispatch(
        updateNewestBlock({
          blocks: action.payload.blocks,
        })
      );
    } catch (error) {
      console.log("New block middleware error...", error);
    } finally {
      listenerAPI.subscribe();
    }
  },
});

mempoolMiddleware.startListening({
  actionCreator: updateUpcomingBlocks,
  effect: async (action, listenerAPI) => {
    try {
      listenerAPI.unsubscribe();

      listenerAPI.dispatch(
        updateUpcomingBlocks(
          action.payload.map((item) => {
            return {
              ...item,
              medianFee: item.medianFee.toFixed(2),
              feeRange: findRange(item.feeRange),
            };
          })
        )
      );
    } catch (error) {
      console.log("Upcoming blocks middleware error...", error);
    } finally {
      listenerAPI.subscribe();
    }
  },
});

mempoolMiddleware.startListening({
  actionCreator: updateLiveStats,
  effect: async (action, listenerAPI) => {
    try {
      listenerAPI.unsubscribe();

      listenerAPI.dispatch(
        updateLiveStats({
          data: {
            ...action.payload.data,
            vsizes: findRange(action.payload.data.vsizes),
          },
        })
      );
    } catch (error) {
      console.log("Live stats middleware error...", error);
    } finally {
      listenerAPI.subscribe();
    }
  },
});

export default mempoolMiddleware;
