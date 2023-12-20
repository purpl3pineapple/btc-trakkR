import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MempoolBlocks from "../components/MempoolBlocks";
import MempoolFees from "../components/MempoolFees";
import MempoolTxns from "../components/MempoolTxns";

const MempoolPage = () => {

/* const { REACT_APP_MEMPOOL_WS_URL, REACT_APP_MEMPOOL_API_URL, REACT_APP_BLOCKCHAIN_WS_URL } = process.env;

const { sendJsonMessage } = useWebSocket(REACT_APP_BLOCKCHAIN_WS_URL, {
  onOpen: () => {
    
    sendJsonMessage({
      "op": "unconfirmed_sub"
    });

    sendJsonMessage({
      "op": "blocks_sub"
    })
  },

  onMessage: async msg => {

    console.log(JSON.parse(msg.data));

    const { op } = JSON.parse(msg.data);

    if(op === 'block') alert("NEW BLOCK DETECTED!!!");
    
  },

  shouldReconnect: () => true,
}); */

 /* const { updateMempoolFees } = sliceMempoolRecommendedFees.actions;

  const dispatch = useDispatch();

  const { economy, fastest, halfHour, hour, minimum, loading } = useSelector(state => state.mempoolFees);


  const mempoolFees = useGetRecommendedFeesQuery();

  const { isSuccess } = mempoolFees;
  
  useEffect(() => {

    dispatch(updateMempoolFees({ 
      fastest: isSuccess ? mempoolFees.data.fastestFee : null,
      halfHour: isSuccess ? mempoolFees.data.halfHourFee : null,
      hour: isSuccess ? mempoolFees.data.hourFee : null,
      economy: isSuccess ? mempoolFees.data.economyFee : null,
      minimum: isSuccess ? mempoolFees.data.minimumFee : null,
      loading: isSuccess ? false : true
    }));

  }); */

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