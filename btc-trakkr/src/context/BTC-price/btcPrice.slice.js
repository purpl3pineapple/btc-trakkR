import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceBTC = new TrakkrDataSlice('BTC', {
    currentPrice: null,
    increased: null,
    decreased: null,
    loading: true
},
{
    updatePrice: (state, action) => {

        state.currentPrice = action.payload.BTC;
        state.increased = action.payload.increased;
        state.decreased = action.payload.decreased;
        state.loading = false;
    }
});

export default sliceBTC;