import Container from "react-bootstrap/Container";
import { useGetLightning24hStatsQuery, useGetLightning3dStatsQuery, useGetLightningLatestStatsQuery, useGetTopNodesByAgeQuery, useGetTopNodesByConnectivityQuery, useGetTopNodesByLiquidityQuery } from "../api-services/mempool.service";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sliceLightning from "../context/lightning/lightning.slice";
import LightningGeneral from "../components/LightningGeneral";
import LightningLatestSize from "../components/LightningLatestSize";
import Lightning24Hr from "../components/Lightning24Hr";
import LightningFees from "../components/LightningFees";
import LightningTimeframeToggler from "../components/LightningTimeframeToggler";
import LightningLatestNodes from "../components/LightningLatestNodes";
import Lightning3Day from "../components/Lightning3Day";
import LightningNodeListToggler from "../components/LightningNodeListToggler";
import { ProgressBar } from "react-bootstrap";

const LightningNetworkPage = () => {

  const topNodesByConnectivity = useGetTopNodesByConnectivityQuery();

  const topNodesByLiquidity = useGetTopNodesByLiquidityQuery();

  const topNodesByAge = useGetTopNodesByAgeQuery();

  const lightningNodes = [{
    listType:"liquid",
    nodeList: "Liquidity",
    nodes: topNodesByLiquidity
  },
  {
    listType:"connect",
    nodeList: "Connectivity",
    nodes: topNodesByConnectivity
  },
  {
    listType:"old",
    nodeList: "Oldest",
    nodes: topNodesByAge
  }];

  console.log({topNodesByAge: topNodesByAge.data, topNodesByConnectivity: topNodesByConnectivity.data, topNodesByLiquidity: topNodesByLiquidity.data})

  const [currentTimeframe, setCurrentTimeframe] = useState('latest');

  const [topNodes, setTopNodes] = useState('liquid');

  const handleTimeframeChange = value => {

    setCurrentTimeframe(value);
  };

  const handleNodesChange = value => {

    setTopNodes(value);
  };

  return (
    <Container fluid id="lightning" className="d-flex flex-column align-items-center w-100 mh-100 p-5 flex-grow-1">
      <Accordion id="lightning-acdn" defaultActiveKey="0" className="w-100">
        <Accordion.Item eventKey="0" id="lightning-latest-item" className="bg-dark">
          <Accordion.Header id="lightning-latest-hdr" className="lightning-hdr text-center fw-bolder fs-3 rounded">
            Lightning Stats
          </Accordion.Header>
          <Accordion.Body id="lightning-latest-body" className="lightning-body d-flex flex-column gx-5 align-items-center justify-content-between">
            <LightningTimeframeToggler toggleTimeframe={(e) => handleTimeframeChange(e.currentTarget.value)} />
            <LightningGeneral />
            {
              [{
                timeframe:"latest",
                template: <>
                    <LightningFees />
                    <LightningLatestSize />
                    <LightningLatestNodes />
                </>
              },
              {
                timeframe:"24h", 
                template: <Lightning24Hr />
              },
              {
                timeframe:"3d", 
                template: <Lightning3Day />
              }].find(stats => stats.timeframe === currentTimeframe).template
            }
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" id="lightning-24h-item" className="bg-dark">
          <Accordion.Header id="lightning-24h-hdr" className="lightning-hdr text-center fw-bolder fs-3 rounded">
            Top 100 Nodes
          </Accordion.Header>
          <Accordion.Body id="lightning-top-nodes" className="lightning-body d-flex flex-column gx-5 align-items-center justify-content-between">
          <Container className='my-3 py-2 rounded shadow d-flex flex-column align-items-center'>
            <LightningNodeListToggler toggleNodeList={(e) => handleNodesChange(e.currentTarget.value)}/>
            <Card className="p-1 my-5 w-75 lightning-card">
              <Card.Header className="bg-dark fs-5 fw-bold text-center">
                {lightningNodes.find(({listType}) => listType === topNodes).nodeList}
              </Card.Header>
              <ListGroup as="ol" numbered>{
                lightningNodes.find(({listType}) => listType === topNodes).nodes.data === null ||
                lightningNodes.find(({listType}) => listType === topNodes).nodes.data === undefined
                ? <ProgressBar animated variant="secondary" now={100} />
                : lightningNodes.find(({listType}) => listType === topNodes).nodes.data.map((node, idx) => <ListGroup.Item as="li" variant="info" key={idx} className="overflow-auto">
                  <span className="ms-2 font-monospace fs-7 text-break">{node.publicKey}</span>
                  <p className="m-5">{node.alias}</p>
                  {/* <p>{node.city.en}</p> */}
                </ListGroup.Item>)
              }</ListGroup>
            </Card>
          </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default LightningNetworkPage;