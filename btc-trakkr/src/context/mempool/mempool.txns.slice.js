import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceMempoolTxns = new TrakkrDataSlice('mempool/txns', {
    txns: null,
    loading: true
},
{
    updateMempoolTxns: (state, action) => {

        state.txns = action.payload.txns;
        state.loading = false;
    }
});

export default sliceMempoolTxns;