import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceBTC = new TrakkrDataSlice('BTC', {
    currentPrice: null,
    change: null,
    loading: true
},
{
    updatePrice: (state, action) => {

        state.currentPrice = action.payload.BTC;
        state.change = action.payload.change;
        state.loading = false;
    }
});

export default sliceBTC;