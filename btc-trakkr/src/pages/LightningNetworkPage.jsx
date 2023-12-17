import Container from "react-bootstrap/Container";
import { useGetLightningLatestStatsQuery } from "../api-services/mempool.service";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const LightningNetworkPage = () => {

  const lightningStatsLatest = useGetLightningLatestStatsQuery();

  if(lightningStatsLatest.status === 'fulfilled'){

    console.log(lightningStatsLatest.data)
  };

  return (
    <Container fluid id="lightning" className="d-flex flex-column align-items-center w-100 vh-100 mh-100 p-5 overflow-auto">
      <Accordion id="lightning-acdn" defaultActiveKey={0} className="w-100">
        <Accordion.Item eventKey={0} id="lightning-latest-item" className="bg-dark">
          <Accordion.Header id="lightning-latest-hdr" className="lightning-hdr text-center fw-bolder fs-3 rounded">
            Lightning Latest
          </Accordion.Header>
          <Accordion.Body id="lightning-latest-body" className="lightning-body">
            <Container className="d-flex align-items-end">
              <ToggleButtonGroup type="radio" name="lightning-stats" size="sm" className="ms-auto">
                <ToggleButton type="radio" checked value={1} name="lightning-stats" id="lightning-latest" className="bg-dark lightning-tgl-btn">Latest</ToggleButton>
                <ToggleButton type="radio" value={2} name="lightning-stats" id="lightning-24h" className="bg-dark lightning-tgl-btn">24-Hour</ToggleButton>
                <ToggleButton type="radio" value={3} name="lightning-stats" id="lightning-3d" className="bg-dark lightning-tgl-btn">3-Day</ToggleButton>
              </ToggleButtonGroup>
            </Container>
            <Container className="py-3 mb-4">
              <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-50 mx-auto py-2 my-3 rounded">
                <span className="me-2 lightning-id-label">ID:</span> <span className="text-reset ms-auto">{lightningStatsLatest.data?.latest.id}</span>
              </h2>
            </Container>
            <Container className="py-3 mb-5">
              <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
                <span className="lightning-id-label">Size</span>
              </h2>
              <ListGroup horizontal className="w-100 overflow-auto py-3">
                <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    Total Capacity
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.total_capacity}
                  </Badge>
                </ListGroup.Item>
                  <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                      Avg. Capacity
                    </div>
                    <Badge bg="dark" pill className="mb-2 w-auto px-4">
                      {lightningStatsLatest.data?.latest.avg_capacity}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                      Med. Capacity
                    </div>
                    <Badge bg="dark" pill className="mb-2 w-auto px-4">
                      {lightningStatsLatest.data?.latest.med_capacity}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                      Channel Count
                    </div>
                    <Badge bg="dark" pill className="mb-2 w-auto px-4">
                      {lightningStatsLatest.data?.latest.channel_count}
                    </Badge>
                  </ListGroup.Item>
              </ListGroup>
            </Container>
            <Container className="py-3 mb-5 d-flex flex-column justify-content-center align-items-center">
              <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
              <span className="lightning-id-label">Fees</span>
              </h2>
              <ListGroup horizontal className="w-75 py-3">
                <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    Avg. Fee Rate
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.avg_fee_rate}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    Avg. Base Fee mTokens
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.avg_base_fee_mtokens}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="w-75">
                <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    Med. Fee Rate
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.med_fee_rate}
                  </Badge>
                </ListGroup.Item>
                <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    Med. Base Fee mTokens
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.med_base_fee_mtokens}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
            </Container>
            <Container className="py-3 mb-5">
              <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
                <span className="lightning-id-label">Nodes</span>
              </h2>
              <ListGroup horizontal className="w-100 overflow-auto py-3">
                <ListGroup.Item variant="info" className='w-auto p-2 mx-auto d-flex flex-column justify-content-center align-items-center lightning-node-count-ctnr'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    Node Count
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.node_count}
                  </Badge>
                </ListGroup.Item>
              </ListGroup>
              <ListGroup horizontal className="w-100 overflow-auto py-3">
                <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                  <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                    ClearNet Nodes
                  </div>
                  <Badge bg="dark" pill className="mb-2 w-auto px-4">
                    {lightningStatsLatest.data?.latest.clearnet_nodes}
                  </Badge>
                </ListGroup.Item>
                  <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                      ClearNet Tor Nodes
                    </div>
                    <Badge bg="dark" pill className="mb-2 w-auto px-4">
                      {lightningStatsLatest.data?.latest.clearnet_tor_nodes}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                      Tor Nodes
                    </div>
                    <Badge bg="dark" pill className="mb-2 w-auto px-4">
                      {lightningStatsLatest.data?.latest.tor_nodes}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                      Unannounced Nodes
                    </div>
                    <Badge bg="dark" pill className="mb-2 w-auto px-4">
                      {lightningStatsLatest.data?.latest.unannounced_nodes}
                    </Badge>
                  </ListGroup.Item>
              </ListGroup>
            </Container>
            <Card className="p-1 m-5 lightning-card">
              <Card.Header className="bg-dark lightning-card-hdr fs-5 fw-bold text-center">Nodes</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="info">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="info">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="info">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={1} id="lightning-24h-item" className="bg-dark">
          <Accordion.Header id="lightning-24h-hdr" className="lightning-hdr text-center fw-bolder fs-3 rounded">
            Lightning 24h
          </Accordion.Header>
          <Accordion.Body id="lightning-24h-body" className="lightning-body">
          <Card className="p-3 m-4 lightning-24h-card">
              <Card.Header className="bg-dark fs-5 fw-bold text-center">General</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="warning">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="warning">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="warning">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="p-3 m-4 lightning-24h-card">
              <Card.Header className="bg-dark fs-5 fw-bold text-center">Fees</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="warning">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="warning">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="warning">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="p-3 m-4 lightning-24h-card">
              <Card.Header className="bg-dark fs-5 fw-bold text-center">Nodes</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="warning">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="warning">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="warning">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey={2} id="lightning-3d-item" className="bg-dark">
          <Accordion.Header id="lightning-3d-hdr" className="lightning-hdr text-center fw-bolder fs-3 rounded">
            Lightning 3d
          </Accordion.Header>
          <Accordion.Body id="lightning-3d-body" className="lightning-body">
          <Card className="bg-secondary p-3 m-4 lightning-3d-card">
              <Card.Header className="fs-5 fw-bold text-center lightning-3d-hdr text-warning">General</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="dark">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="dark">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="dark">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="bg-secondary p-3 m-4 lightning-3d-card">
              <Card.Header className="fs-5 fw-bold text-center lightning-3d-hdr text-warning">Fees</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="dark">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="dark">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="dark">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className="bg-secondary p-3 m-4 lightning-3d-card">
              <Card.Header className="fs-5 fw-bold text-center lightning-3d-hdr text-warning">Nodes</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item variant="dark">Cras justo odio</ListGroup.Item>
                <ListGroup.Item variant="dark">Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item variant="dark">Vestibulum at eros</ListGroup.Item>
              </ListGroup>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      
    </Container>
  );
};

export default LightningNetworkPage;