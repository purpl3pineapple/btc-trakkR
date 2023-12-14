import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const mempoolAPI = createApi({
    reducerPath: 'mempool',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_MEMPOOL_API_URL }),
    endpoints: (builder) => ({

      getBlocks: builder.query({
        query: () => 'v1/blocks',
      }),

      getRecentTxs: builder.query({
        query: () => 'mempool/recent',
      }),

      getRecommendedFees: builder.query({
        query: () => 'v1/fees/recommended',
      }),

      getLightningLatestStats: builder.query({
        query: () => 'v1/lightning/statistics/latest',
      }),

      getDifficultyAdjustment:builder.query({
        query: () => 'v1/difficulty-adjustment',
      }),
    }),
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true
});

export default mempoolAPI;

export const { 
    useGetBlocksQuery, 
    useGetDifficultyAdjustmentQuery, 
    useGetLightningLatestStatsQuery,
    useGetRecentTxsQuery,
    useGetRecommendedFeesQuery
} = mempoolAPI;