import Container from "react-bootstrap/Container";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

/* fiat/fee conversion ===> (sats/100,000,000) * currentPrice */

const MempoolTxns = () => {
  const { txs, loading } = useSelector((state) => state.mempool);

  const BTC = useSelector((state) => state.BTC);

  const convertToFiat = (amt) =>
    BTC.currentPrice === null
      ? `-`
      : `$${((amt / 100000000) * BTC.currentPrice.replace(",", "")).toFixed(
          2
        )}`;

  return loading ? (
    <Spinner as="span" animation="border" role="status" className="m-auto">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <Col className="p-1 mx-4" xs={true} sm={true} md={true} lg={true} xl={true}>
      <Card className="mx-auto">
        <Card.Header className="fw-bolder extras-list-hdr text-center">
          Recent Txs
        </Card.Header>
        <Card.Body className="px-auto">
          <Container fluid>
            <Row xs={1} s={1} md={3} lg={3} xl={6}>
              {txs === null ? (
                <ProgressBar animated variant="secondary" now={100} />
              ) : (
                txs.map((txn, idx) => (
                  <Col
                    /* as="li" */
                    key={idx}
                    /* action */
                    className="d-flex justify-content-center"
                    /* variant="info" */
                  >
                    <Row className="font-monospace py-3 w-100 rounded my-3 mempool-recent-txs-list-item">
                      <Col className="fw-bold fs-7 text-nowrap my-3 px-2">
                        {`${txn.txid.slice(0, 8)}...${txn.txid.slice(-8)}`}
                      </Col>
                      <Col>
                        <Row>
                          <Col>
                            <Badge
                              bg="dark"
                              pill
                              className="w-auto my-2 text-break"
                            >
                              <span className="mempool-txn-data-hdr me-2 fw-bold">
                                Amount:
                              </span>
                              <span>
                                {txn.value}
                                <span className="text-secondary fst-italic ms-1">
                                  sat
                                </span>
                              </span>
                              {/* <span className="ms-2">{`/ ${convertToFiat(
                            txn.value
                          )}`}</span> */}
                            </Badge>
                          </Col>
                          <Col>
                            <Badge bg="dark" pill className="w-auto my-2">
                              <span className="mempool-txn-data-hdr me-2 fw-bold">
                                Fee:
                              </span>
                              {txn.fee}
                              <span className="text-secondary fst-italic ms-1">
                                sat
                              </span>
                            </Badge>
                          </Col>
                          <Col>
                            <Badge bg="dark" pill className="w-auto my-2">
                              <span className="mempool-txn-data-hdr me-2 fw-bold">
                                vSize:
                              </span>
                              <span>
                                {txn.vsize}
                                <span className="text-secondary fst-italic">
                                  vB
                                </span>
                              </span>
                            </Badge>
                          </Col>
                          <Col>
                            <Badge bg="dark" pill className="w-auto my-2">
                              <span className="mempool-txn-data-hdr me-2 fw-bold">
                                Rate:
                              </span>
                              <span>
                                {txn.rate.toFixed(2)}
                                <span className="text-secondary fst-italic ms-1">
                                  sat/vB
                                </span>
                              </span>
                            </Badge>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {/* <Col md={5}>
        <ListGroup
          as="ol"
          numbered
          className="mx-3 p-2 align-items-center container h-100 w-100"
        >
          {txs === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            txs.map((txn, idx) => (
              <ListGroup.Item
                as="li"
                key={idx}
                action
                className="font-monospace p-4 w-100"
                variant="info"
              >
                <Row>
                  <Col className="fw-bold fs-6 py-5 text-break">
                    {txn.txid}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Badge bg="dark" pill className="w-auto my-2">
                      <span className="mempool-txn-data-hdr me-2 fw-bold">
                        Amount:
                      </span>
                      <span>
                        {txn.value}
                        <span className="text-secondary fst-italic ms-1">
                          sat
                        </span>
                      </span>
                      <span className="ms-2">{`/ ${convertToFiat(
                        txn.value
                      )}`}</span>
                    </Badge>
                  </Col>
                  <Col>
                    <Badge bg="dark" pill className="w-auto my-2">
                      <span className="mempool-txn-data-hdr me-2 fw-bold">
                        Fee:
                      </span>
                      {txn.fee}
                      <span className="text-secondary fst-italic ms-1">
                        sat
                      </span>
                    </Badge>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Badge bg="dark" pill className="w-auto my-2">
                      <span className="mempool-txn-data-hdr me-2 fw-bold">
                        vSize:
                      </span>
                      <span>
                        {txn.vsize}
                        <span className="text-secondary fst-italic">
                          vB
                        </span>
                      </span>
                    </Badge>
                  </Col>
                  <Col>
                    <Badge bg="dark" pill className="w-auto my-2">
                      <span className="mempool-txn-data-hdr me-2 fw-bold">
                        Rate:
                      </span>
                      <span>
                        {txn.rate.toFixed(2)}
                        <span className="text-secondary fst-italic ms-1">
                          sat/vB
                        </span>
                      </span>
                    </Badge>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Col> */}
    </Col>
  );
};

export default MempoolTxns;
