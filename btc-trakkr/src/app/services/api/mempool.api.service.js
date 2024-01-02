import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import sliceMempool from "../../slices/mempool.slice";
import sliceLightning from "../../slices/lightning.slice";

const { updateBlocks } = sliceMempool.actions;

const {
  updateLightningSize,
  updateLightningNodes,
  updateLightningFees,
  updateLightningLatestID,
  updateLightningLatestAdded,
  updateLightning24HrSize,
  updateLightning24HrNodes,
  update3Day,
  updateTopLiquidityNodes,
  updateTopConnectivityNodes,
  updateTopAgeNodes,
} = sliceLightning.actions;

const mempoolAPI = createApi({
  reducerPath: "mempoolAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MEMPOOL_API_URL }),
  endpoints: builder => ({
    getBlocks: builder.query({
      query: () => "v1/blocks",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateBlocks({ blocks: data }));
        } catch (error) {
          console.log("Couldn't update Mempool blocks...", { error });
        }
      },
    }),

    getBlockByHash: builder.query({
      query: hash => `block/${hash}`,
      async onQueryStarted(hash, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.log("Couldn't get Mempool block...", { error });
        }
      },
    }),

    getTxById: builder.query({
      query: txid => `tx/${txid}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {
          console.log("Couldn't get Mempool transaction...", { error });
        }
      },
    }),

    getLightningLatestStats: builder.query({
      query: () => "v1/lightning/statistics/latest",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const {
            id,
            added,
            total_capacity,
            avg_capacity,
            med_capacity,
            channel_count,
            node_count,
            clearnet_nodes,
            clearnet_tor_nodes,
            tor_nodes,
            unannounced_nodes,
            avg_fee_rate,
            avg_base_fee_mtokens,
            med_fee_rate,
            med_base_fee_mtokens,
          } = data.latest;

          dispatch(updateLightningLatestID({ id, loading: false }));

          dispatch(updateLightningLatestAdded({ added, loading: false }));

          dispatch(
            updateLightningSize({
              total_capacity,
              avg_capacity,
              med_capacity,
              channel_count,
              loading: false,
            })
          );

          dispatch(
            updateLightningNodes({
              node_count,
              clearnet_nodes,
              clearnet_tor_nodes,
              tor_nodes,
              unannounced_nodes,
              loading: false,
            })
          );

          dispatch(
            updateLightningFees({
              avg_fee_rate,
              avg_base_fee_mtokens,
              med_fee_rate,
              med_base_fee_mtokens,
              loading: false,
            })
          );
        } catch (error) {
          console.log("Couldn't get Lightning stats...", { error });
        }
      },
    }),

    getLightning24hStats: builder.query({
      query: () => "v1/lightning/statistics/24h",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            updateLightning24HrSize({
              added: data[0].added,
              total_capacity: data[0].total_capacity,
              channel_count: data[0].channel_count,
              loading: false,
            })
          );

          dispatch(
            updateLightning24HrNodes({
              clearnet_nodes: data[0].clearnet_nodes,
              clearnet_tor_nodes: data[0].clearnet_tor_nodes,
              tor_nodes: data[0].tor_nodes,
              unannounced_nodes: data[0].unannounced_nodes,
              loading: false,
            })
          );
        } catch (error) {
          console.log("Couldn't get Lightning 24-hour stats...", { error });
        }
      },
    }),

    getLightning3dStats: builder.query({
      query: () => "v1/lightning/statistics/3d",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(update3Day(data));
        } catch (error) {
          console.log("Couldn't get Lightning 3-Day stats...", { error });
        }
      },
    }),

    getTopNodesByLiquidity: builder.query({
      query: () => "v1/lightning/nodes/rankings/liquidity",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateTopLiquidityNodes(data));
        } catch (error) {
          console.log("Couldn't get Lightning top liquid nodes...", { error });
        }
      },
    }),

    getTopNodesByConnectivity: builder.query({
      query: () => "v1/lightning/nodes/rankings/connectivity",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateTopConnectivityNodes(data));
        } catch (error) {
          console.log("Couldn't get Lightning top connective nodes...", {
            error,
          });
        }
      },
    }),

    getTopNodesByAge: builder.query({
      query: () => "v1/lightning/nodes/rankings/age",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateTopAgeNodes(data));
        } catch (error) {
          console.log("Couldn't get Lightning top oldest nodes...", { error });
        }
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
  //refetchOnFocus: true,
  refetchOnReconnect: true,
});

export default mempoolAPI;
