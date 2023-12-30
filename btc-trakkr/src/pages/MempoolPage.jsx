import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import MempoolFees from "../components/MempoolFees";
import MempoolTxns from "../components/MempoolTxns";
import sliceMempool from "../context/mempool/mempool.slice";
import MempoolUpcomingBlocks from "../components/MempoolUpcomingBlocks";
import MempoolNewestBlock from "../components/MempoolNewestBlock";
import MempoolPreviousBlocks from "../components/MempoolPreviousBlocks";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import Row from "react-bootstrap/Row";
import MempoolLive2HrStats from "../components/MempoolLive2HrStats";
import mempoolAPI from "../api-services/mempool.service";
import { useEffect } from "react";

const MempoolPage = () => {
  const { REACT_APP_MEMPOOL_WS_URL } = process.env;

  const { newBlockDetected } = useSelector((state) => state.mempool.blocks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (newBlockDetected) {
      const prevMempoolBlocks = dispatch(
        mempoolAPI.endpoints.getBlocks.initiate()
      );

      return prevMempoolBlocks.unsubscribe;
    }
  }, [dispatch, newBlockDetected]);

  const {
    updateInfo,
    updateDiffAdj,
    updateNewestBlock,
    updateTxs,
    updateFees,
    updateConversions,
    updateLiveStats,
    updateUpcomingBlocks,
    updateNewBlockDetectedStatus,
  } = sliceMempool.actions;

  const { sendJsonMessage } = useWebSocket(REACT_APP_MEMPOOL_WS_URL, {
    onOpen: () => {
      sendJsonMessage({
        action: "want",
        data: ["mempool-blocks", "blocks", "stats", "live-2h-chart"],
      });
    },

    onMessage: async (msg) => {
      const data = JSON.parse(msg.data);

      if (data["live-2h-chart"] !== undefined) {
        dispatch(updateLiveStats({ data: data["live-2h-chart"] }));
      }

      if (data["mempool-blocks"] !== undefined) {
        dispatch(updateUpcomingBlocks(data["mempool-blocks"]));
      }

      if (data.da !== undefined) {
        const { da } = data;

        dispatch(updateDiffAdj({ da }));
      }

      if (data.block !== undefined) {
        dispatch(updateNewBlockDetectedStatus(true));
        dispatch(updateNewestBlock({ block: data.block }));

        setTimeout(() => dispatch(updateNewBlockDetectedStatus(false)), 15000);
      }

      if (data.transactions !== undefined) {
        const { transactions } = data;

        dispatch(updateTxs({ transactions }));
      }

      if (data.mempoolInfo !== undefined) {
        const { mempoolInfo, vBytesPerSecond } = data;

        dispatch(updateInfo({ mempoolInfo, vBytesPerSecond }));

        if (data.fees !== undefined) {
          const { fees } = data;

          dispatch(updateFees({ fees, totalFee: mempoolInfo.total_fee }));
        }
      }

      if (data.conversions !== undefined) {
        const { conversions } = data;

        dispatch(updateConversions({ conversions }));
      }
    },

    shouldReconnect: () => true,
  });

  return (
    <main
      id="mempool"
      className="flex-fill container-fluid d-flex flex-column align-items-center w-100 mh-100 p-5"
    >
      <MempoolDataSection
        title="General"
        content={
          <>
            <Row>
              <MempoolLive2HrStats />
              <MempoolFees />
            </Row>
            <Row className="pt-5">
              <MempoolTxns />
            </Row>
          </>
        }
      />

      <MempoolUpcomingBlocks />
      <MempoolNewestBlock />
      <MempoolPreviousBlocks />
    </main>
  );
};

export default MempoolPage;
