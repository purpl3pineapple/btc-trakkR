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

  const { REACT_APP_MEMPOOL_WS_URL, REACT_APP_MEMPOOL_API_URL } = process.env;

  const dispatch = useDispatch();

  const mempoolBlocks = useSelector((state) => state.mempool);

  const { sendJsonMessage } = useWebSocket(REACT_APP_MEMPOOL_WS_URL, {
    onOpen: () => {
      
      sendJsonMessage({
        "action": "want",
        "data": [
          "live-2h-chart",
          "stats",
          "mempool-blocks",
          "blocks",
        ]
      });
    },

    onMessage: async msg => {

      const getMempoolBlocks = await fetch(`${REACT_APP_MEMPOOL_API_URL}/blocks`);


      const blocks = await getMempoolBlocks.json();

      //dispatch(getBlocks(blocks));

      console.log(JSON.parse(msg.data));
      
    },


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
          <MempoolDataRow data={[
            {title: 'Size', value: '00000000000000000000000000000000'},
            {title: 'Usage', value: '00000000000000000000000000000000'},
            {title: 'Bytes', value: '00000000000000000000000000000000'},
            {title: 'vBytes/s', value: '00000000000000000000000000000000'},
          ]}/>
          <MempoolDataRow data={[
            {title: 'Unbraodcast', value: '00000000000000000000000000000000'},
            {title: 'Full RBF', value: '00000000000000000000000000000000'},
            {title: 'Loaded', value: '00000000000000000000000000000000'},
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
          <Table responsive striped bordered hover variant="dark-info">
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Fee</th>
              <th>vSize</th>
              <th>Value</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody className="fs-7">
            <tr>
              <td>1</td>
              <td>909e033aa30840da039882d0bff2ec5a011cc94c3c96855880b4280ff23bb709</td>
              <td>19932</td>
              <td>150.5</td>
              <td>546</td>
              <td>132.43853820598008</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>Username 2</td>
              <td>Username 3</td>
              <td>Email</td>
            </tr>
            <tr>
              <td>Block 3</td>
              <td>Larry the Bird</td>
              <td>Username 2</td>
              <td>Username 3</td>
              <td>Email</td>
            </tr>
          </tbody>
        </Table>
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
      <MempoolDataSection title="Mempool Block Info" content={
        <Table responsive striped bordered hover variant="dark-info">
          <thead>
            <tr>
              <th>#</th>
              <th>Hash</th>
              <th>Tx Count</th>
              <th>Username 1</th>
              <th>Username 2</th>
              <th>Username 3</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody className="fs-7">
            <tr>
              <td>Block 1</td>
              <td>00000000000000000000000000000000</td>
              <td>00000000000000000000000000000000</td>
              <td>@00000000000000000000000000000000</td>
              <td>00000000000000000000000000000000</td>
              <td>00000000000000000000000000000000</td>
              <td>00000000000000000000000000000000</td>
            </tr>
            <tr>
              <td>Block 2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Username 2</td>
              <td>Username 3</td>
              <td>Email</td>
            </tr>
            <tr>
              <td>Block 3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
              <td>Username 2</td>
              <td>Username 3</td>
              <td>Email</td>
            </tr>
          </tbody>
        </Table>
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