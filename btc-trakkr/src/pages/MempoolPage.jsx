import Container from "react-bootstrap/Container";
import useWebSocket from "react-use-websocket";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import MempoolDataRow from "../components/layout/MempoolDataRow";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector, useDispatch } from "react-redux";
import { useGetBlocksQuery } from "../api-services/mempool.service";

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

  if(mempoolBlocks.status === 'fulfilled'){

    console.log(mempoolBlocks.data)
  };

  return (
    <Container fluid id="mempool" className="d-flex flex-column align-items-center w-100 vh-75 p-5">
      <MempoolDataSection title="Mempool Block Info" content={
        <Table responsive striped bordered hover variant="dark-info">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Pool Name</th>
              <th>Median Fee</th>
              <th>Match Rate</th>
              <th>Size</th>
              <th>Txn Count</th>
              <th>Timestamp</th>
              <th>Median Time</th>
              <th>Nonce</th>
            </tr>
          </thead>
          <tbody className="fs-7">
            {mempoolBlocks.status === 'fulfilled' && mempoolBlocks.data.map((block, idx) => <tr key={idx}>
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
      <MempoolDataSection title="Mempool Stats" content={
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
          {/* <Container className="h-100 w-50 p-4 d-flex flex-column align-items-center">
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
          </Container> */}
          </Container>
        </>
      }/>
      <MempoolDataSection title="Mempool Blocks" content={
        <MempoolDataRow data={[
          {title: 'Block ID 1', value: '11111111111111111111111111111111'},
          {title: 'Block ID 2', value: '11111111111111111111111111111111'},
          {title: 'Block ID 3', value: '11111111111111111111111111111111'},
          {title: 'Block ID 4', value: '11111111111111111111111111111111'},
        ]}/>
      }/>
      <MempoolDataSection title="List Group Sample" content={
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
      }/>
    </Container>
  );
};

export default MempoolPage;