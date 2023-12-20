import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const mempoolAPI = createApi({
  reducerPath: 'mempoolAPI',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MEMPOOL_API_URL }),
  endpoints: (builder) => ({

    getDifficultyAdjustment: builder.query({
      query: () => 'v1/difficulty-adjustment',
    }),

    getBlocks: builder.query({
      query: () => 'v1/blocks',
    }),

    getBlockByHash: builder.query({
      query: (hash) => `block/${hash}`,
    }),

    getRecentTxs: builder.query({
      query: () => 'mempool/recent',
    }),

    getTxById: builder.query({
      query: (txid) => `tx/${txid}`,
    }),

    getRecommendedFees: builder.query({
      query: () => 'v1/fees/recommended',
    }),

    getLightningLatestStats: builder.query({
      query: () => 'v1/lightning/statistics/latest',
    }),

    getLightning24hStats: builder.query({
      query: () => 'v1/lightning/statistics/24h',
    }),

    getLightning3dStats: builder.query({
      query: () => 'v1/lightning/statistics/3d',
    }),

    getTopNodesByLiquidity: builder.query({
      query: () => 'v1/lightning/nodes/rankings/liquidity',
    }),

    getTopNodesByConnectivity: builder.query({
      query: () => 'v1/lightning/nodes/rankings/connectivity',
    }),

    getTopNodesByAge: builder.query({
      query: () => 'v1/lightning/nodes/rankings/age',
    }),
  }),
  refetchOnMountOrArgChange: true,
  //refetchOnFocus: true,
  refetchOnReconnect: true
});

export default mempoolAPI;

export const { 
    useGetBlocksQuery, 
    useGetDifficultyAdjustmentQuery, 
    useGetLightningLatestStatsQuery,
    useGetRecentTxsQuery,
    useGetRecommendedFeesQuery,
    useGetLightning24hStatsQuery,
    useGetLightning3dStatsQuery,
    useGetTopNodesByConnectivityQuery,
    useGetTopNodesByLiquidityQuery,
    useGetTopNodesByAgeQuery,
    useGetBlockByHashQuery,
    useGetTxByIdQuery
} = mempoolAPI;