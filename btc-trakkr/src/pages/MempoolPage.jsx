import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MempoolBlocks from "../components/MempoolBlocks";
import MempoolFees from "../components/MempoolFees";
import MempoolTxns from "../components/MempoolTxns";
import useWebSocket from "react-use-websocket";
import sliceMempool from "../context/mempool/mempool.slice";
import { useDispatch } from "react-redux";
import mempoolAPI from "../api-services/mempool.service";
import { useEffect, useState } from "react";

const MempoolPage = () => {

  const { REACT_APP_MEMPOOL_WS_URL } = process.env;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {

    const prevMempoolBlocks = dispatch(mempoolAPI.endpoints.getBlocks.initiate());

    return prevMempoolBlocks.unsubscribe;

  }, [dispatch]);


  const {
    updateInfo,
    updateDiffAdj,
    updateNewestBlock,
    updateTxs,
    updateFees,
    updateConversions,
    updateLiveStats
  } = sliceMempool.actions;


  const { sendJsonMessage } = useWebSocket(REACT_APP_MEMPOOL_WS_URL, {
    onOpen: () => {

      sendJsonMessage({
        "action": "want",
        "data": [
          "blocks",
          "stats",
          "live-2h-chart"
        ]
      });
    },

    onMessage: async msg => {

      const data = JSON.parse(msg.data);


      if(data["live-2h-chart"] !== undefined){

        dispatch(updateLiveStats({ data: data["live-2h-chart"] }));
      };


      if(data.da !== undefined){

        const { da } = data;

        dispatch(updateDiffAdj({ da }));
      };


      if(data.block !== undefined){

        dispatch(updateNewestBlock({ block: data.block }))
      };


      if(data.transactions !== undefined){

        const { transactions } = data;

        dispatch(updateTxs({ transactions }));
      };


      if(data.mempoolInfo !== undefined){

        const { mempoolInfo, vBytesPerSecond } = data;

        dispatch(updateInfo({ mempoolInfo, vBytesPerSecond }));

        if(data.fees !== undefined){

          const { fees } = data;
  
          dispatch(updateFees({ fees, totalFee: mempoolInfo.total_fee }));
        };
      };


      if(data.conversions !== undefined){

        const { conversions } = data;

        dispatch(updateConversions({ conversions }));
      };
    },

    shouldReconnect: () => true,
  });
  

  return (
    <main id="mempool" className="container-fluid d-flex flex-column align-items-center w-100 mh-100 p-5">
      <Container fluid id="mempool-breadcrumbs" className="d-flex flex-row justify-content-around align-items-center p-4">
        <Breadcrumb id="mempool-pg-nav-wrap" className="py-1 bg-dark rounded fs-4 w-50 d-flex justify-content-center align-items-center">
          <Breadcrumb.Item href="#mempool-blocks" className="mempool-bcrmb p-1">
            <span className="mempool-pg-nav-link">Blocks</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <MempoolFees />
      <MempoolTxns />
      <MempoolBlocks />
    </main>
  );
};

export default MempoolPage;