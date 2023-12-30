import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import sliceBTC from "../context/BTC-price/btcPrice.slice";

const { updateStats } = sliceBTC.actions;

const coincapAPI = createApi({
  reducerPath: "coincapAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_COINCAP_API_URL,
  }),
  endpoints: (builder) => ({
    getBitcoinStats: builder.query({
      query: () => "/bitcoin",
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(updateStats(data.data));
        } catch (error) {
          console.log("Couldn't update Bitcoin stats...", { error });
        }
      },
    }),
  }),
  refetchOnMountOrArgChange: true,
  //refetchOnFocus: true,
  refetchOnReconnect: true,
});

export default coincapAPI;
