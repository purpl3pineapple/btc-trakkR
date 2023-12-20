import TrakkrDataSlice from "../../components/TrakkrDataSlice";

const sliceLightning = new TrakkrDataSlice('lightning', {
    latest: {},
    twentyFourHr: {},
    threeDay: [],
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
    },

    updateLightning3DaySize: (state, action) => {

        console.log(action.payload)

        state.threeDay[0].added = action.payload[0].added;
        state.threeDay[0].total_capacity = action.payload[0].total_capacity;
        state.threeDay[0].channel_count = action.payload[0].channel_count;

        state.threeDay[1].added = action.payload[1].added;
        state.threeDay[1].total_capacity = action.payload[1].total_capacity;
        state.threeDay[1].channel_count = action.payload[1].channel_count;

        state.threeDay[2].added = action.payload[2].added;
        state.threeDay[2].total_capacity = action.payload[2].total_capacity;
        state.threeDay[2].channel_count = action.payload[2].channel_count;
        state.loading = false;
    },

    updateLightning3DayNodes: (state, action) => {

        state.threeDay[0].clearnet_nodes = action.payload[0].clearnet_nodes;
        state.threeDay[0].clearnet_tor_nodes = action.payload[0].clearnet_tor_nodes;
        state.threeDay[0].tor_nodes = action.payload[0].tor_nodes;
        state.threeDay[0].unannounced_nodes = action.payload[0].unannounced_nodes;

        state.threeDay[1].clearnet_nodes = action.payload[1].clearnet_nodes;
        state.threeDay[1].clearnet_tor_nodes = action.payload[1].clearnet_tor_nodes;
        state.threeDay[1].tor_nodes = action.payload[1].tor_nodes;
        state.threeDay[1].unannounced_nodes = action.payload[1].unannounced_nodes;

        state.threeDay[2].clearnet_nodes = action.payload[2].clearnet_nodes;
        state.threeDay[2].clearnet_tor_nodes = action.payload[2].clearnet_tor_nodes;
        state.threeDay[2].tor_nodes = action.payload[2].tor_nodes;
        state.threeDay[2].unannounced_nodes = action.payload[2].unannounced_nodes;
        state.loading = false;
    },
});

export default sliceLightning;