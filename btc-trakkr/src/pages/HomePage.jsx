import Card from "react-bootstrap/Card";
import BitcoinPrice from "../components/BitcoinPrice";
import useWebSocket from "react-use-websocket";
import { useDispatch, useSelector } from "react-redux";
import sliceBTC from "../app/slices/BTC.slice";
import { useEffect } from "react";
import coincapAPI from "../app/services/api/coincap.api.service";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

const HomePage = () => {
  const { updatePrice } = sliceBTC.actions;

  const btcCurrent = useSelector((state) => state.BTC);

  const { stats } = btcCurrent;

  const dispatch = useDispatch();

  useWebSocket(process.env.REACT_APP_COINCAP_WS_URL, {
    onMessage: (msg) => {
      const { bitcoin } = JSON.parse(msg.data);

      dispatch(updatePrice({ BTC: bitcoin, ...btcCurrent }));
    },

    shouldReconnect: () => true,
  });

  useEffect(() => {
    const btcStats = dispatch(coincapAPI.endpoints.getBitcoinStats.initiate());

    return btcStats.unsubscribe;
  }, [dispatch]);

  return (
    <Row className="w-100 p-3">
        <Col className="p-1 mx-4">
          <Card className="shadow-lg w-50 mx-auto">
            <Card.Header className="fw-bolder btc-stats-hdr text-center fs-1">
              {stats === null ? '' : stats.symbol}
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item
                variant="info"
                className="py-4 d-flex flex-sm-column flex-md-row justify-content-sm-center justify-content-md-between align-items-md-center"
              >
                <Badge bg="dark" pill className="w-50 px-3 mx-auto fs-2">
                  <BitcoinPrice />
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                variant="dark"
                className="fs-5 d-flex flex-sm-column flex-md-row justify-content-sm-center justify-content-md-between align-items-md-center"
              >
                <span className="me-2 fw-bolder text-center text-nowrap btc-stats-hdr">Supply:</span>
                  <span className="text-break font-monospace">{stats === null ? '' : `~${Number(stats.supply).toFixed()} BTC`}</span>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                variant="dark"
                className="fs-5 d-flex flex-sm-column flex-md-row justify-content-sm-center justify-content-md-between align-items-md-center"
              >
                <span className="me-2 fw-bolder text-center text-nowrap btc-stats-hdr">Market Cap:</span>
                  <span className="text-break font-monospace">{stats === null ? '' : `$${Number(stats.marketCapUsd).toFixed(2)}`}</span>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                variant="dark"
                className="fs-5 d-flex flex-sm-column flex-md-row justify-content-sm-center justify-content-md-between align-items-md-center"
              >
                <span className="me-2 fw-bolder text-center text-nowrap btc-stats-hdr">Market Volume:</span>
                  <span className="text-break font-monospace">{stats === null ? '' : `$${Number(stats.volumeUsd24Hr).toFixed(2)}`}</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
  );
};

export default HomePage;
