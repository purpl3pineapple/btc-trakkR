import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceMempoolRecommendedFees = new TrakkrDataSlice('mempool/fees', {
    fastest: null,
    halfHour: null,
    hour: null,
    economy: null,
    minimum: null,
    loading: true
},
{
    updateMempoolFees: (state, action) => {

        state.fastest = action.payload.fastest
        state.halfHour = action.payload.halfHour
        state.hour = action.payload.hour
        state.economy = action.payload.economy
        state.minimum = action.payload.minimum
        state.loading = false;
    }
});

export default sliceMempoolRecommendedFees;