import { createListenerMiddleware } from "@reduxjs/toolkit";
import sliceMempool from "../slices/mempool.slice";
import MempoolUtility from "../services/utility/mempool.utility";

const {
  updateBlocks,
  updateNewestBlock,
  updateUpcomingBlocks,
  updateLiveStats,
} = sliceMempool.actions;

const { convertMempoolBlockFormat, findRange } = MempoolUtility;

const mempoolMiddleware = createListenerMiddleware();

mempoolMiddleware.startListening({
  actionCreator: updateBlocks,
  effect: async (action, listenerAPI) => {
    listenerAPI.unsubscribe();

    const {
      mempool: {
        blocks: { newest },
      },
    } = listenerAPI.getOriginalState();

    const mempoolBlocks = action.payload.blocks.map((block) =>
      convertMempoolBlockFormat(block)
    );

    listenerAPI.dispatch(updateBlocks({ blocks: mempoolBlocks.slice(1) }));

    if (newest === null) {
      listenerAPI.dispatch(updateNewestBlock({ block: mempoolBlocks[0] }));
    }

    listenerAPI.subscribe();
  },
});

mempoolMiddleware.startListening({
  actionCreator: updateNewestBlock,
  effect: async (action, listenerAPI) => {
    listenerAPI.unsubscribe();

    const {
      mempool: {
        blocks: { newest },
      },
    } = listenerAPI.getOriginalState();

    if (newest === null) {
      listenerAPI.dispatch(updateNewestBlock({ block: action.payload.block }));
    } else {
      listenerAPI.dispatch(
        updateNewestBlock({
          block: convertMempoolBlockFormat(action.payload.block),
        })
      );
    }

    listenerAPI.subscribe();
  },
});

mempoolMiddleware.startListening({
  actionCreator: updateUpcomingBlocks,
  effect: async (action, listenerAPI) => {
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

    listenerAPI.subscribe();
  },
});

mempoolMiddleware.startListening({
  actionCreator: updateLiveStats,
  effect: async (action, listenerAPI) => {
    listenerAPI.unsubscribe();

    listenerAPI.dispatch(
      updateLiveStats({
        data: {
          ...action.payload.data,
          vsizes: findRange(action.payload.data.vsizes),
        },
      })
    );

    listenerAPI.subscribe();
  },
});

export default mempoolMiddleware;
