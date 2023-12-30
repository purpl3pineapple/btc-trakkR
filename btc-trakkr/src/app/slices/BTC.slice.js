import TrakkrDataSlice from "./TrakkrDataSlice";

const sliceBTC = new TrakkrDataSlice('BTC', {
    currentPrice: null,
    change: null,
    stats: null,
    loading: true
},
{
    updatePrice: (state, action) => {

        state.currentPrice = action.payload.BTC;
        state.change = action.payload.change;
        state.loading = false;
    },

    updateStats: (state, action) => {

        state.stats = action.payload;
        state.loading = false;
    }
});

export default sliceBTC;