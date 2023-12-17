import Container from "react-bootstrap/Container";
import useWebSocket from "react-use-websocket";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import MempoolDataRow from "../components/layout/MempoolDataRow";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector, useDispatch } from "react-redux";
import { useGetBlocksQuery, useGetRecentTxsQuery, useGetRecommendedFeesQuery } from "../api-services/mempool.service";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";

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


  const dispatch = useDispatch();

  const mempoolBlocks = useGetBlocksQuery();

  const mempoolFees = useGetRecommendedFeesQuery();

  const mempoolTxns = useGetRecentTxsQuery();

  return (
    <Container fluid id="mempool" className="overflow-auto position-static d-flex flex-column align-items-center w-100 vh-100 mh-100 p-5">
      <Container fluid id="mempool-breadcrumbs" className="d-flex flex-row justify-content-around align-items-center p-4">
        <Breadcrumb id="mempool-pg-nav-wrap" className="py-1 bg-dark rounded fs-4 w-50 d-flex justify-content-center align-items-center">
          {/* <Breadcrumb.Item href="#mempool-recd-fees" className="mempool-bcrmb text-info">
            <span>Fees</span>
          </Breadcrumb.Item> */}
          {/* <Breadcrumb.Item href="#mempool-recent-txs" className="mempool-bcrmb p-1">
            <span className="mempool-pg-nav-link">Recent Txs</span>
          </Breadcrumb.Item> */}
          <Breadcrumb.Item href="#mempool-blocks" className="mempool-bcrmb p-1">
            <span className="mempool-pg-nav-link">Blocks</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <MempoolDataRow id="mempool-recd-fees" data={[
          {
            title: 'Fastest Fee', 
            value: mempoolFees.data?.fastestFee
          },
          {
            title: 'Half-Hour Fee', 
            value: mempoolFees.data?.halfHourFee
          },
          {
            title: 'Hour Fee', 
            value: mempoolFees.data?.hourFee
          },
          {
            title: 'Economy Fee', 
            value: mempoolFees.data?.economyFee
          },
          {
            title: 'Minimum Fee', 
            value: mempoolFees.data?.minimumFee
          },
        ]}/>
      {/* <MempoolDataSection title="Mempool Recommended Fees" content={
        <Container className="h-100 w-75 p-4 d-flex flex-column align-items-center">
          <ListGroup className="mx-3 pe-0 align-items-center container">
            <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
              <div className="ms-2 me-auto">
                
              </div>
              <Badge bg="dark" pill className="w-auto">
              
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
              <div className="ms-2 me-auto">
                
              </div>
              <Badge bg="dark" pill className="w-auto">
                {}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
              <div className="ms-2 me-auto">
                
              </div>
              <Badge bg="dark" pill className="w-auto">
                {}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
              <div className="ms-2 me-auto">
                
              </div>
              <Badge bg="dark" pill className="w-auto">
                {}
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
              <div className="ms-2 me-auto">
                 Fee
              </div>
              <Badge bg="dark" pill className="w-auto">
                {}
              </Badge>
            </ListGroup.Item>
          </ListGroup>
        </Container>
      }/> */}
      <MempoolDataSection id="mempool-recent-txs" title="Mempool Recent Transactions" content={
        <Container className="h-100 w-100 p-4 d-flex flex-column align-items-center">
          <ListGroup as="ol" className="mx-3 pe-0 align-items-center container h-100">
            {mempoolTxns.status === 'fulfilled' && mempoolTxns.data?.map((txn, idx) => <ListGroup.Item as="li" key={idx} action className="text-break font-monospace w-100 d-flex justify-content-between align-items-start" variant="info">
              <div className="ms-2 me-auto p-3 d-flex flex-column align-items-start">
                <div className="fw-bold fs-7 p-2">{txn.txid}</div>
              </div>
              <Row className="container m-auto justify-content-around align-items-center">
              <Badge bg="dark" pill className="w-auto d-flex justify-content-evenly align-items-center">
                <span className="mempool-txn-data-hdr me-2 fw-bold">vSize:</span> <span>{txn.vsize} bytes</span>
              </Badge>
              <Badge bg="dark" pill className="w-auto d-flex justify-content-evenly align-items-center">
                <span className="mempool-txn-data-hdr me-2 fw-bold">Fee:</span> ${txn.fee}
              </Badge>
              <Badge bg="dark" pill className="w-auto d-flex justify-content-evenly align-items-center">
                <span className="mempool-txn-data-hdr me-2 fw-bold">Amount:</span> ${txn.value}
              </Badge>
              </Row>
            </ListGroup.Item>
            )}
          </ListGroup>
        </Container>
      }/>
      <MempoolDataSection id="mempool-blocks" title="Mempool Block Info" content={
        <Table responsive striped bordered hover variant="dark-info">
          <thead>
            <tr>
              <th><span className="mempool-data-table-hdr"></span></th>
              <th><span className="mempool-data-table-hdr">ID</span></th>
              <th><span className="mempool-data-table-hdr">Pool Name</span></th>
              <th><span className="mempool-data-table-hdr">Median Fee</span></th>
              <th><span className="mempool-data-table-hdr">Match Rate</span></th>
              <th><span className="mempool-data-table-hdr">Size</span></th>
              <th><span className="mempool-data-table-hdr">Txn Count</span></th>
              <th><span className="mempool-data-table-hdr">Timestamp</span></th>
              <th><span className="mempool-data-table-hdr">Median Time</span></th>
              <th><span className="mempool-data-table-hdr">Nonce</span></th>
            </tr>
          </thead>
          <tbody className="fs-7">
            {mempoolBlocks.status === 'fulfilled' && mempoolBlocks.data?.map((block, idx) => <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{block.id}</td>
              <td>{block.extras.pool.name}</td>
              <td>{block.extras.medianFee}</td>
              <td>{block.extras.matchRate}</td>
              <td>{block.size}</td>
              <td>{block.tx_count}</td>
              <td>{block.timestamp}</td>
              <td>{block.mediantime}</td>
              <td>{block.nonce}</td>
            </tr>)}
          </tbody>
        </Table>
      }/>
      {/* <MempoolDataSection title="Mempool Stats" content={
        <>
          <Container className="w-50 ps-2 pb-5 d-flex flex-column align-items-center">
            <h1 className="fs-4 fw-bold text-center">Hash</h1>
            <ListGroup className="mx-3 pe-0 align-items-center container">
              <ListGroup.Item className="w-100" variant="info">
                <p className="m-auto">
                  00000000000006436073c07dfa188a8fa54fefadf571fd774863cda1b884b90f
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Container>
          <MempoolDataRow data={[
            {title: 'nTx', value: '00000000000000000000000000000000'},
            {title: 'total BTC sent', value: '00000000000000000000000000000000'},
            {title: 'time', value: '00000000000000000000000000000000'},
            {title: 'size', value: '00000000000000000000000000000000'},
          ]}/>
          <MempoolDataRow data={[
            {title: 'block index', value: '00000000000000000000000000000000'},
            {title: 'block size', value: '00000000000000000000000000000000'},
            {title: 'block height', value: '00000000000000000000000000000000'},
          ]}/>
          <Container fluid className="d-flex flex-wrap align-items-center justify-content-around p-5">
          <Container className="h-100 w-50 p-4 d-flex flex-column align-items-center">
            <h1 className="fs-4 fw-bold text-center">Fees</h1>
            <ListGroup className="mx-3 pe-0 align-items-center container">
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Container>
          <Container className="h-100 w-50 p-4 d-flex flex-column align-items-center">
            <h1 className="fs-4 fw-bold text-center">Difficulty Adjustment</h1>
            <ListGroup className="mx-3 pe-0 align-items-center container">
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Container>
          <Container className="h-100 w-50 p-4 d-flex flex-column align-items-center">
            <h1 className="fs-4 fw-bold text-center">Fees</h1>
            <ListGroup className="mx-3 pe-0 align-items-center container">
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Container>
          <Container className="h-100 w-50 p-4 d-flex flex-column align-items-center">
            <h1 className="fs-4 fw-bold text-center">Difficulty Adjustment</h1>
            <ListGroup className="mx-3 pe-0 align-items-center container">
              <ListGroup.Item className="w-100 d-flex justify-content-between align-items-start" variant="info">
                <div className="ms-2 me-auto">
                  Cras justo odio
                </div>
                <Badge bg="dark" pill className="w-auto">
                  14
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </Container>
          </Container>
        </>
      }/> */}
      {/* <MempoolDataSection title="List Group Sample" content={
        <ListGroup className="mx-5 align-items-center">
          <ListGroup.Item className="w-75 d-flex justify-content-between align-items-start" variant="info">
          <div className="ms-2 me-auto">
            Cras justo odio
          </div>
          <Badge bg="info" pill>
            14
          </Badge>
          </ListGroup.Item>
        </ListGroup>
      }/> */}
    </Container>
  );
};

export default MempoolPage;