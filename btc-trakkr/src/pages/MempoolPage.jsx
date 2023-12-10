import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import CardGroup from "react-bootstrap/Card";

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
      <Container className="mempool-data-container d-flex flex-column justify-content-center text-center p-3 bg-body-tertiary rounded">
        <h1 className="mb-3 container-fluid mempool-data-header">
          <span className="bg-info fs-2 fw-bold p-3 my-4 rounded d-inline-block text-decoration-underline shadow text-reset">
            Mempool Stats
          </span>
        </h1>
        {/* <CardGroup className="h-auto d-flex flex-row justify-content-between bg-secondary border-none"> */}
        <Row xs={1} md={4} className="g-3 flex-nowrap">
          <Card className='mempool-card h-auto mx-3 flex-shrink-1 rounded-circle'>
            <Card.Body>
              <Card.Title className="fw-bold fs-6">
                Transaction ID
              </Card.Title>
              <Card.Text className="fs-6">
                00000000000000000000000000000000000
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='mempool-card h-auto mx-3 flex-shrink-1 rounded-circle'>
            <Card.Body>
              <Card.Title className="text-center fw-bold fs-6">
                Transaction ID
              </Card.Title>
              <Card.Text className="fs-6">
                This card has supporting text below as a natural lead-in
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='mempool-card h-auto mx-3 flex-shrink-1 rounded-circle'>
            <Card.Body>
              <Card.Title className="text-center fw-bold fs-6">
                Card title
              </Card.Title>
              <Card.Text className="fs-6">
                This is a wider card with supporting text below as 
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className='mempool-card h-auto mx-3 flex-shrink-1 rounded-circle'>
            <Card.Body>
              <Card.Title className="text-center fw-bold fs-6">
                Card title
              </Card.Title>
              <Card.Text className="fs-6">
                This is a wider card with supporting text below 
              </Card.Text>
            </Card.Body>
          </Card>
          </Row>
        {/* </CardGroup> */}
      </Container>
    </Container>
  );
};

export default MempoolPage;