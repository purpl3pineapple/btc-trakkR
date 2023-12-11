import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/Card";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import MempoolDataValue from "../components/MempoolDataValue";
import MempoolDataRow from "../components/layout/MempoolDataRow";
import Table from "react-bootstrap/Table";

const MempoolPage = () => {

  //const { REACT_APP_MEMPOOL_WS_URL } = process.env;

  //const [loading, setLoading] = useState(true);

  /* const { sendJsonMessage, lastJsonMessage } = useWebSocket(REACT_APP_MEMPOOL_WS_URL, {
    onOpen: () => {

      setLoading(false);
      
      sendJsonMessage({
        "action": "want",
        "data": [
          "blocks",
          "stats",
          "live-2h-chart"
        ]
      });
    },
    shouldReconnect: () => true,
  });


  useEffect(() => {
    
    console.log(lastJsonMessage);

  }, [lastJsonMessage]); */

  return (
    <Container fluid id="mempool" className="d-flex flex-column justify-content-center w-100 vh-75 p-5">
      <MempoolDataSection title="Mempool Stats" content={
        <>
          <MempoolDataRow data={[
            {title: 'Transaction ID 1', value: '00000000000000000000000000000000'},
            {title: 'Transaction ID 2', value: '00000000000000000000000000000000'},
            {title: 'Transaction ID 3', value: '00000000000000000000000000000000'},
            {title: 'Transaction ID 4', value: '00000000000000000000000000000000'},
          ]}/>
          <MempoolDataRow data={[
            {title: 'Transaction ID 5', value: '00000000000000000000000000000000'},
            {title: 'Transaction ID 6', value: '00000000000000000000000000000000'},
            {title: 'Transaction ID 7', value: '00000000000000000000000000000000'},
            {title: 'Transaction ID 8', value: '00000000000000000000000000000000'},
          ]}/>
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
    </Container>
  );
};

export default MempoolPage;