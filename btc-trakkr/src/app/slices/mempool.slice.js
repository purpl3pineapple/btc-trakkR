import TrakkrDataSlice from "./TrakkrDataSlice";

const sliceMempool = new TrakkrDataSlice(
  "mempool",
  {
    liveStats: {},
    info: {
      loaded: null,
      size: null,
      bytes: null,
      usage: null,
      maxmempool: null,
      mempoolminfee: null,
      minrelaytxfee: null,
      incrementalrelayfee: null,
      unbroadcastcount: null,
      fullrbf: null,
      vBytesPerSecond: null,
      loading: true,
    },
    da: {
      progressPercent: null,
      difficultyChange: null,
      estimatedRetargetDate: null,
      remainingBlocks: null,
      remainingTime: null,
      previousRetarget: null,
      previousTime: null,
      nextRetargetHeight: null,
      timeAvg: null,
      timeOffset: null,
      expectedBlocks: null,
      loading: true,
    },
    blocks: {
      newBlockDetected: false,
      newest: null,
      previous: null,
      upcoming: null,
      modals: [],
      loading: true,
    },
    txs: [],
    fees: {
      totalFee: null,
      fastestFee: null,
      halfHourFee: null,
      hourFee: null,
      economyFee: null,
      minimumFee: null,
      loading: true,
    },
    conversions: null,
    loading: true,
  },
  {
    updateLiveStats: (state, action) => {
      state.liveStats = action.payload.data;
      state.info.loading = false;
      state.loading = false;
    },

    updateInfo: (state, action) => {
      state.info = {
        ...action.payload.mempoolInfo,
        vBytesPerSecond: action.payload.vBytesPerSecond,
      };
      state.info.loading = false;
      state.loading = false;
    },

    updateDiffAdj: (state, action) => {
      state.da = action.payload.da;
      state.da.loading = false;
      state.loading = false;
    },

    updateBlocks: (state, action) => {
      state.blocks.previous = action.payload.blocks;
      state.blocks.modals = action.payload.blocks.map(block => {
        return { id: block.id, show: false };
      });
      state.blocks.loading = false;
      state.loading = false;
    },

    updateNewestBlock: (state, action) => {
      state.blocks.previous = action.payload.blocks;
      state.blocks.modals = [
        { id: action.payload.blocks[0].id, show: false },
        ...state.blocks.modals,
      ].slice(0, -1);
      state.blocks.loading = false;
      state.loading = false;
    },

    updateNewBlockDetectedStatus: (state, action) => {
      state.blocks.newBlockDetected = action.payload;
      state.blocks.loading = false;
      state.loading = false;
    },

    updateUpcomingBlocks: (state, action) => {
      state.blocks.upcoming = action.payload;
      state.blocks.loading = false;
      state.loading = false;
    },

    updateTxs: (state, action) => {
      state.txs = action.payload.transactions;
      state.loading = false;
    },

    updateFees: (state, action) => {
      state.fees = {
        ...action.payload.fees,
        totalFee: action.payload.totalFee,
        loading: false,
      };
      state.loading = false;
    },

    updateConversions: (state, action) => {
      state.conversions = action.payload.conversions;
      state.loading = false;
    },

    controlBlockModal: (state, action) => {
      state.blocks.modals = state.blocks.modals.map(modal =>
        modal.id === action.payload.id
          ? { id: modal.id, show: action.payload.show }
          : modal
      );

      state.blocks.loading = false;
      state.loading = false;
    },
  }
);

export default sliceMempool;
