import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import MempoolFees from "../components/mempool/MempoolFees";
import MempoolTxns from "../components/mempool/MempoolTxns";
import sliceMempool from "../app/slices/mempool.slice";
import DataSection from "../components/mempool/DataSection";
import Row from "react-bootstrap/Row";
import MempoolLive2HrStats from "../components/mempool/MempoolLive2HrStats";
import MempoolBlocks from "../components/mempool/MempoolBlocks";

const MempoolPage = () => {
  const { REACT_APP_MEMPOOL_WS_URL } = process.env;

  const { previous } = useSelector((state) => state.mempool.blocks);

  const dispatch = useDispatch();

  const {
    updateNewestBlock,
    updateInfo,
    updateDiffAdj,
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
        const { block } = data;
        dispatch(updateNewBlockDetectedStatus(true));

        dispatch(updateNewestBlock({ blocks: [block, ...previous] }));

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
      <DataSection
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

      <MempoolBlocks />
    </main>
  );
};

export default MempoolPage;
