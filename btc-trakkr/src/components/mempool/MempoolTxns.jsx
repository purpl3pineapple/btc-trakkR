import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Transaction from "./Transaction";

const MempoolTxns = () => {
  const { txs, loading } = useSelector((state) => state.mempool);

  /* const BTC = useSelector((state) => state.BTC);

  const convertToFiat = (amt) =>
    BTC.currentPrice === null
      ? `-`
      : `$${((amt / 100000000) * BTC.currentPrice.replace(",", "")).toFixed(
          2
        )}`; */

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
                txs.map((txn, idx) => <Transaction key={idx} txn={txn} />)
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MempoolTxns;
