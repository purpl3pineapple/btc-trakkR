import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
import LightningTopNodes from "../components/lightning/LightningTopNodes";
import LightningStats from "../components/lightning/LightningStats";

const LightningNetworkPage = () => {
  return (
    <Container
      fluid
      id="lightning"
      className="d-flex flex-column align-items-center w-100 mh-100 p-5 flex-grow-1"
    >
      <Accordion id="lightning-acdn" defaultActiveKey="0" className="w-100">
        <Accordion.Item
          eventKey="0"
          id="lightning-latest-item"
          className="bg-dark"
        >
          <Accordion.Header
            id="lightning-latest-hdr"
            className="lightning-hdr text-center fw-bolder fs-3 rounded"
          >
            Lightning Stats
          </Accordion.Header>
          <Accordion.Body
            id="lightning-latest-body"
            className="lightning-body d-flex flex-column gx-5 align-items-center justify-content-between"
          >
            <LightningStats />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          eventKey="1"
          id="lightning-24h-item"
          className="bg-dark"
        >
          <Accordion.Header
            id="lightning-24h-hdr"
            className="lightning-hdr text-center fw-bolder fs-3 rounded"
          >
            Top 100 Nodes
          </Accordion.Header>
          <Accordion.Body
            id="lightning-top-nodes"
            className="lightning-body d-flex flex-column gx-5 align-items-center justify-content-between"
          >
            <LightningTopNodes />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default LightningNetworkPage;
