import Container from "react-bootstrap/Container";
import mempoolAPI from "../api-services/mempool.service";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import LightningNodeListToggler from "./LightningNodeListToggler";

const LightningTopNodes = () => {
  const { age, connectivity, liquidity } = useSelector(
    (state) => state.lightning.topNodes
  );

  const dispatch = useDispatch();

  const lightningNodes = [
    {
      listType: "liquid",
      nodeList: "Liquidity",
      nodes: liquidity,
    },
    {
      listType: "connect",
      nodeList: "Connectivity",
      nodes: connectivity,
    },
    {
      listType: "old",
      nodeList: "Oldest",
      nodes: age,
    },
  ];

  const [topNodes, setTopNodes] = useState("liquid");

  const handleNodesChange = (value) => {
    setTopNodes(value);
  };

  useEffect(() => {
    const {
      getTopNodesByAge,
      getTopNodesByConnectivity,
      getTopNodesByLiquidity,
    } = mempoolAPI.endpoints;

    const liquid = dispatch(getTopNodesByLiquidity.initiate());

    const connect = dispatch(getTopNodesByConnectivity.initiate());

    const age = dispatch(getTopNodesByAge.initiate());

    return () => {
      liquid.unsubscribe();
      connect.unsubscribe();
      age.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Container className="my-3 py-2 rounded shadow d-flex flex-column align-items-center">
      <LightningNodeListToggler
        toggleNodeList={(e) => handleNodesChange(e.currentTarget.value)}
      />
      <Card className="p-1 my-5 w-75 lightning-card">
        <Card.Header className="bg-dark fs-5 fw-bold text-center">
          {
            lightningNodes.find(({ listType }) => listType === topNodes)
              .nodeList
          }
        </Card.Header>
        <ListGroup as="ol" numbered>
          {lightningNodes.find(({ listType }) => listType === topNodes)
            .nodes === null ||
          lightningNodes.find(({ listType }) => listType === topNodes).nodes ===
            undefined ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            lightningNodes
              .find(({ listType }) => listType === topNodes)
              .nodes.map((node, idx) => (
                <ListGroup.Item
                  as="li"
                  variant="info"
                  key={idx}
                  className="overflow-auto"
                >
                  <span className="ms-2 font-monospace fs-7 text-break">
                    {node.publicKey}
                  </span>
                  <p className="m-5">{node.alias}</p>
                  {/* <p>{node.city.en}</p> */}
                </ListGroup.Item>
              ))
          )}
        </ListGroup>
      </Card>
    </Container>
  );
};

export default LightningTopNodes;
