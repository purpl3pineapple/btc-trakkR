import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceLightning = new TrakkrDataSlice('lightning', {
    latest: {},
    twentyFourHr: {},
    threeDay: [],
    topNodes: {
        connectivity: null,
        liquiduty: null,
        age: null
    },
    loading: true
},
{

    updateLightningLatestID: (state, action) => {

        state.latest.id = action.payload.id;
        state.loading = false;
    },

    updateLightningLatestAdded: (state, action) => {

        state.latest.added = action.payload.added;
        state.loading = false;
    },

    updateLightningSize: (state, action) => {

        state.latest.total_capacity = action.payload.total_capacity;
        state.latest.avg_capacity = action.payload.avg_capacity;
        state.latest.med_capacity = action.payload.med_capacity;
        state.latest.channel_count = action.payload.channel_count;
        state.loading = false;
    },

    updateLightningFees: (state, action) => {

        state.latest.avg_fee_rate = action.payload.avg_fee_rate;
        state.latest.avg_base_fee_mtokens = action.payload.avg_base_fee_mtokens;
        state.latest.med_fee_rate = action.payload.med_fee_rate;
        state.latest.med_base_fee_mtokens = action.payload.med_base_fee_mtokens;
        state.loading = false;
    },

    updateLightningNodes: (state, action) => {

        state.latest.node_count = action.payload.node_count;
        state.latest.clearnet_nodes = action.payload.clearnet_nodes;
        state.latest.clearnet_tor_nodes = action.payload.clearnet_tor_nodes;
        state.latest.tor_nodes = action.payload.tor_nodes;
        state.latest.unannounced_nodes = action.payload.unannounced_nodes;
        state.loading = false;
    },

    updateLightning24HrSize: (state, action) => {

        state.twentyFourHr.added = action.payload.added;
        state.twentyFourHr.total_capacity = action.payload.total_capacity;
        state.twentyFourHr.channel_count = action.payload.channel_count;
        state.loading = false;
    },

    updateLightning24HrNodes: (state, action) => {

        state.twentyFourHr.clearnet_nodes = action.payload.clearnet_nodes;
        state.twentyFourHr.clearnet_tor_nodes = action.payload.clearnet_tor_nodes;
        state.twentyFourHr.tor_nodes = action.payload.tor_nodes;
        state.twentyFourHr.unannounced_nodes = action.payload.unannounced_nodes;
        state.loading = false;
    },

    update3Day: (state, action) => {

        state.threeDay = action.payload;
        state.loading = false;
    },

    updateTopLiquidityNodes: (state, action) => {

        state.topNodes.liquidity = action.payload;
        state.loading = false;
    },

    updateTopConnectivityNodes: (state, action) => {

        state.topNodes.connectivity = action.payload;
        state.loading = false;
    },

    updateTopAgeNodes: (state, action) => {

        state.topNodes.age = action.payload;
        state.loading = false;
    },
});

export default sliceLightning;