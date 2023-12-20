import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceMempoolBlocks = new TrakkrDataSlice('mempool/blocks', {
    blocks: null,
    loading: true
},
{
    updateMempoolBlocks: (state, action) => {

        state.blocks = action.payload.blocks;
        state.loading = false;
    }
});

export default sliceMempoolBlocks;