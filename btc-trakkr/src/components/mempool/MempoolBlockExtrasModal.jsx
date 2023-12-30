import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
//import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import sliceMempool from "../../app/slices/mempool.slice";

const MempoolBlockExtrasModal = ({ block }) => {
  const blockModals = useSelector((state) => state.mempool.blocks.modals);

  const modal = blockModals.find(({ id }) => block.id === id);

  const { controlModal } = sliceMempool.actions;

  const dispatch = useDispatch();

  const handleCloseNewestBlock = () =>
    dispatch(controlModal({ id: modal.id, show: false }));

  const handleShowNewestBlock = () =>
    dispatch(controlModal({ id: modal.id, show: true }));

  return (
    <>
      <span
        role="button"
        className="ms-5 py-2 text-break text-center font-monospace fst-italic"
        onClick={handleShowNewestBlock}
      >
        {block.id}
      </span>
      <Modal
        show={[undefined, null].includes(modal) ? false : modal.show}
        onHide={handleCloseNewestBlock}
        size="xl"
        aria-labelledby="mempool-newest-block"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title id="mempool-newest-block" className="fw-bold">
            Extra Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="my-3">
            <Col className="py-2 d-flex justify-content-center mx-4 text-center rounded shadow">
              <span className="fw-bold mempool-data-table-hdr me-2">
                Miner:
              </span>
              <span>{block.extras.pool.name}</span>
            </Col>
            <Col className="py-2 d-flex justify-content-center mx-4 text-center rounded shadow">
              <span className="fw-bold mempool-data-table-hdr me-2">
                Health:
              </span>
              <span>
                {block.extras.similarity}
                {""}%
              </span>
            </Col>
          </Row>
          <Row className="my-5 gx-3">
            <Col className="p-1 mx-4">
              <Card>
                <Card.Header className="fw-bolder extras-list-hdr text-center">
                  I/O
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Inputs:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.totalInputs}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Input Amount:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.totalInputAmt}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Outputs:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.totalOutputs}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Output Amount:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.totalOutputAmt} BTC
                      </span>
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col className="p-1 mx-4">
              <Card>
                <Card.Header className="fw-bolder extras-list-hdr text-center">
                  Size
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Expected Weight:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.expectedWeight} MVU
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">Bits:</span>
                      <span className="text-break font-monospace fs-7">
                        {block.bits}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">vSize:</span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.virtualSize} vB
                      </span>
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="my-5 gx-3">
            <Col className="p-1 mx-4">
              <Card>
                <Card.Header className="fw-bolder extras-list-hdr text-center">
                  SegWit
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Transactions:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.segwitTotalTxs}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Size:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.segwitTotalSize} MB
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Total Weight:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.segwitTotalWeight} MVU
                      </span>
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col className="p-1 mx-4">
              <Card>
                <Card.Header className="fw-bolder extras-list-hdr text-center">
                  Transactions
                </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Avg. Tx Size:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.avgTxSize} sat
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        uTXO Set Change:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.utxoSetChange}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        uTXO Set Size:
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {block.extras.utxoSetSize}
                      </span>
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Container className="my-5">
            <Row className="my-5">
              <Col className="p-2 text-center d-flex flex-column mx-4">
                <h5 className="fw-bold mempool-data-table-hdr">
                  Expected Fees
                </h5>
                <span className="rounded shadow p-3">
                  {block.extras.expectedFees} sat
                </span>
              </Col>
              <Col className="p-2 text-center d-flex flex-column mx-4">
                <h5 className="fw-bold mempool-data-table-hdr">Fee Range</h5>
                <span className="rounded shadow p-3 d-flex flex-column">
                  ~{block.extras.feeRange} sat
                </span>
              </Col>
            </Row>
            <Row className="my-5 gx-5">
              <Col className="p-1 text-center d-flex flex-column mx-3">
                <h5 className="fw-bold mempool-data-table-hdr">Avg. Fee</h5>
                <span className="rounded shadow p-3 text-nowrap fs-6">
                  {block.extras.avgFee} sat
                </span>
              </Col>
              <Col className="p-1 text-center d-flex flex-column mx-3">
                <h5 className="fw-bold mempool-data-table-hdr">
                  Avg. Fee Rate
                </h5>
                <span className="rounded shadow p-3 text-nowrap fs-6">
                  {block.extras.avgFeeRate} sat/vB
                </span>
              </Col>
              <Col className="p-2 text-center d-flex flex-column mx-4">
                <h5 className="fw-bold mempool-data-table-hdr">Total Fees</h5>
                <span className="rounded shadow p-3">
                  {block.extras.totalFees} BTC
                </span>
              </Col>
            </Row>
            <Row className="my-5 gx-5">
              <Col className="p-1 text-center d-flex flex-column mx-4">
                <h5 className="fw-bold mempool-data-table-hdr">
                  Fee Percentiles
                </h5>
                <span className="rounded shadow p-3">
                  {block.extras.feePercentiles === '-' ? '-' : block.extras.feePercentiles.map((fee, idx) => (
                    <span key={idx} className="d-inline-block">
                      {fee} %
                    </span>
                  ))}
                </span>
              </Col>
              <Col className="p-1 text-center d-flex flex-column mx-4">
                <h5 className="fw-bold mempool-data-table-hdr">Match Rate</h5>
                <span className="rounded shadow p-3">
                  {block.extras.matchRate} sat
                </span>
              </Col>
            </Row>
            <ListGroup as="ul" className="my-5 w-auto">
              <ListGroup.Item as="li" variant="info">
                <span>
                  <span className="me-3 fw-bolder text-nowrap">Header:</span>
                  <span className="text-break font-monospace fs-7">
                    {block.extras.header}
                  </span>
                </span>
              </ListGroup.Item>
              <ListGroup.Item as="li" variant="info">
                <span>
                  <span className="me-3 fw-bolder text-nowrap">
                    Coinbase Raw:
                  </span>
                  <span className="text-break font-monospace fs-7">
                    {block.extras.coinbaseRaw}
                  </span>
                </span>
              </ListGroup.Item>
              <ListGroup.Item as="li" variant="info">
                <span>
                  <span className="me-3 fw-bolder">Coinbase Signature:</span>
                  <span className="text-break font-monospace fs-7">
                    {block.extras.coinbaseSignature}
                  </span>
                </span>
              </ListGroup.Item>
              <ListGroup.Item as="li" variant="info">
                <span>
                  <span className="me-3 fw-bolder">Coinbase Address:</span>
                  <span className="text-break font-monospace fs-7">
                    {block.extras.coinbaseAddress}
                  </span>
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNewestBlock}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default MempoolBlockExtrasModal;
