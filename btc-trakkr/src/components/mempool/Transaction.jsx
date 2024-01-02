import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Transaction = ({ txn }) => {

const copyTxId = async id =>  {
    console.log(id)
    await navigator.clipboard.writeText(id);
};

  return txn === null ? (
    <ProgressBar animated variant="secondary" now={100} />
  ) : (
    <>
      <Col id={txn.txid.slice(-10)} className="d-flex justify-content-center" role="button" onClick={async () => await copyTxId(txn.txid)}>
        <Row className="font-monospace py-3 w-100 rounded my-3 mempool-recent-txs-list-item">
          <Col className="fw-bold fs-7 text-nowrap my-3 px-2">
            {`${txn.txid.slice(0, 8)}...${txn.txid.slice(-8)}`}
          </Col>
          <Col>
            <Row>
              <Col>
                <Badge bg="dark" pill className="w-auto my-2 text-break">
                  <span className="mempool-txn-data-hdr me-2 fw-bold">
                    Amount:
                  </span>
                  <span>
                    {txn.value}
                    <span className="text-secondary fst-italic ms-1">sat</span>
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
                  <span className="text-secondary fst-italic ms-1">sat</span>
                </Badge>
              </Col>
              <Col>
                <Badge bg="dark" pill className="w-auto my-2">
                  <span className="mempool-txn-data-hdr me-2 fw-bold">
                    vSize:
                  </span>
                  <span>
                    {txn.vsize}
                    <span className="text-secondary fst-italic">vB</span>
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
    </>
  );
};

export default Transaction;
