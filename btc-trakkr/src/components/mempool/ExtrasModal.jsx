import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import sliceMempool from "../../app/slices/mempool.slice";
import ListItem from "./ListItem";


const ExtrasModal = ({ block }) => {
  const blockModals = useSelector((state) => state.mempool.blocks.modals);

  const modal = blockModals.find(({ id }) => block.id === id);

  const { controlBlockModal } = sliceMempool.actions;

  const dispatch = useDispatch();

  const handleCloseNewestBlock = () =>
    dispatch(controlBlockModal({ id: modal.id, show: false }));

  return block === null ? (
    <ProgressBar animated variant="secondary" now={100} />
  ) : (
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
      <Modal.Body className="px-5">
        <Row className="rounded shadow bg-dark mb-5">
          <Col>
            <h1>
              <span className="fs-5 fw-bolder mempool-data-table-hdr me-2">
                ID:
              </span>
              <span className="fs-6 font-monospace text-break">{block.id}</span>
            </h1>
          </Col>
        </Row>
        <Row className="my-3">
          {[
            {
              title: "Miner",
              value: block.extras.pool.name,
            },
            {
              title: "Health",
              value: `${block.extras.similarity}%`,
            },
          ].map(({ title, value }, idx) => (
            <Col
              key={idx}
              className="py-2 d-flex justify-content-center mx-4 text-center rounded shadow"
            >
              <span className="fw-bold mempool-data-table-hdr me-2">
                {title}:
              </span>
              <span>{value}</span>
            </Col>
          ))}
        </Row>
        {/* <Row className="my-5 gx-5">
          <Col className="p-2 text-center d-flex flex-column mx-4">
            <h5 className="fw-bold mempool-data-table-hdr">Size</h5>
            <span className="rounded-pill shadow mempool-newest-block-stat p-3">
              {block.size} MB
            </span>
          </Col>
          <Col className="p-2 text-center d-flex flex-column mx-4">
            <h5 className="fw-bold mempool-data-table-hdr">Weight</h5>
            <span className="rounded-pill shadow mempool-newest-block-stat p-3 text-nowrap">
              {block.weight} MVU
            </span>
          </Col>
          <Col className="p-2 text-center d-flex flex-column mx-4">
            <h5 className="fw-bold mempool-data-table-hdr">Bits</h5>
            <span className="rounded-pill shadow mempool-newest-block-stat p-3">
              {block.bits}
            </span>
          </Col>
        </Row> */}
        <Row className="my-5 gx-5">
          {[
            {
              title: "Version",
              value: block.version,
            },
            {
              title: "Nonce",
              value: block.nonce,
            },
            {
              title: "Stale",
              value: block.stale,
            },
          ].map(({ title, value }, idx) => (
            <Col key={idx} className="p-2 text-center d-flex flex-column mx-4">
              <h5 className="fw-bold mempool-data-table-hdr">{title}</h5>
              <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                {value}
              </span>
            </Col>
          ))}
        </Row>
        <Row className="my-5 gx-3">
          <Col className="p-1 mx-4">
            <Card>
              <Card.Header className="fw-bolder extras-list-hdr text-center">
                I/O
              </Card.Header>
              <ListGroup variant="flush">
                {[
                  {
                    title: "Total Inputs:",
                    value: block.extras.totalInputs,
                  },
                  {
                    title: "Total Input Amount:",
                    value: block.extras.totalInputAmt,
                  },
                  {
                    title: "Total Outputs:",
                    value: block.extras.totalOutputs,
                  },
                  {
                    title: "Total Output Amount:",
                    value: `${block.extras.totalOutputAmt} BTC`,
                  },
                ].map(({ title, value }, idx) => (
                  <ListGroup.Item key={idx} variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        {title}
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {value}
                      </span>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col className="p-1 mx-4">
            <Card>
              <Card.Header className="fw-bolder extras-list-hdr text-center">
                Size
              </Card.Header>
              <ListGroup variant="flush">
                {[
                  {
                    title: "Expected Weight:",
                    value: `${block.extras.expectedWeight} MVU`,
                  },
                  {
                    title: "Bits:",
                    value: block.bits,
                  },
                  {
                    title: "vSize:",
                    value: `${block.extras.virtualSize} vB`,
                  },
                ].map(({ title, value }, idx) => (
                  <ListGroup.Item key={idx} variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        {title}
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {value}
                      </span>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row className="my-5">
          <Col className="p-1 mx-4">
            <Card>
              <Card.Header className="fw-bolder extras-list-hdr text-center">
                SegWit
              </Card.Header>
              <ListGroup variant="flush">
                {[
                  {
                    title: "Total Transactions:",
                    value: block.extras.segwitTotalTxs,
                  },
                  {
                    title: "Total Size:",
                    value: `${block.extras.segwitTotalSize} MB`,
                  },
                  {
                    title: "uTXO Set Size:",
                    value: `${block.extras.segwitTotalWeight} MVU`,
                  },
                ].map(({ title, value }, idx) => (
                  <ListGroup.Item key={idx} variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        {title}
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {value}
                      </span>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col className="p-1 mx-4">
            <Card>
              <Card.Header className="fw-bolder extras-list-hdr text-center">
                Transactions
              </Card.Header>
              <ListGroup variant="flush">
                {[
                  {
                    title: "Avg. Tx Size:",
                    value: `${block.extras.avgTxSize} sat`,
                  },
                  {
                    title: "uTXO Set Change:",
                    value: block.extras.utxoSetChange,
                  },
                  {
                    title: "uTXO Set Size:",
                    value: block.extras.utxoSetSize,
                  },
                ].map(({ title, value }, idx) => (
                  <ListGroup.Item key={idx} variant="info">
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        {title}
                      </span>
                      <span className="text-break font-monospace fs-7">
                        {value}
                      </span>
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Container className="my-5">
          <Row className="my-5">
            {[
              {
                title: "Expected Fees",
                value: `${block.extras.expectedFees} sat`,
              },
              {
                title: "Fee Range",
                value: `${block.extras.feeRange} sat`,
              },
            ].map(({ title, value }, idx) => (
              <Col
                key={idx}
                className="p-1 text-center d-flex flex-column mx-3"
              >
                <h5 className="fw-bold mempool-data-table-hdr">{title}</h5>
                <span className="rounded shadow p-3">{value}</span>
              </Col>
            ))}
          </Row>
          <Row className="my-5">
            {[
              {
                title: "Avg. Fee",
                value: `${block.extras.avgFee} sat`,
              },
              {
                title: "Avg. Fee Rate",
                value: `${block.extras.avgFeeRate} sat/vB`,
              },
              {
                title: "Total Fees",
                value: `${block.extras.totalFees} BTC`,
              },
            ].map(({ title, value }, idx) => (
              <Col
                key={idx}
                className="p-1 text-center d-flex flex-column mx-3"
              >
                <h5 className="fw-bold mempool-data-table-hdr">{title}</h5>
                <span className="rounded shadow p-3 text-nowrap fs-6">
                  {value}
                </span>
              </Col>
            ))}
          </Row>
          <Row className="my-5">
            {[
              {
                title: "Fee Percentiles",
                value:
                  block.extras.feePercentiles === "-" || block.extras.feePercentiles === null
                    ? "-"
                    : block.extras.feePercentiles.map((fee, idx) => (
                        <span key={idx} className="d-inline-block">
                          {fee} %
                        </span>
                      )),
              },
              {
                title: "Match Rate",
                value: `${block.extras.matchRate} sat`,
              },
            ].map(({ title, value }, idx) => (
              <Col
                key={idx}
                className="p-1 text-center d-flex flex-column mx-3"
              >
                <h5 className="fw-bold mempool-data-table-hdr">{title}</h5>
                <span className="rounded shadow p-3">{value}</span>
              </Col>
            ))}
          </Row>
          <ListGroup as="ul" className="my-5 w-auto">
            {[
              { title: "Difficulty", value: block.difficulty },
              {
                title: "Previous Block Hash",
                value: block.previousblockhash,
              },
              { title: "Merkle Root", value: block.merkle_root },
              { title: "Header", value: block.extras.header },
              {
                title: "Coinbase Raw",
                value: block.extras.coinbaseRaw,
              },
              {
                title: "Coinbase Signature",
                value: block.extras.coinbaseSignature,
              },
              {
                title: "Coinbase Address",
                value: block.extras.coinbaseAddress,
              },
            ].map(({ title, value }, idx) => (
              <ListItem key={idx} title={title} data={value} />
            ))}
          </ListGroup>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ExtrasModal;
