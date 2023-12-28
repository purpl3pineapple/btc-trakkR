import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ProgressBar from "react-bootstrap/ProgressBar";
import mempoolAPI from "../api-services/mempool.service";
import MempoolBlockExtrasModal from "./MempoolBlockExtrasModal";

const MempoolPreviousBlocks = () => {
  const mempoolBlocks = useSelector((state) => state.mempool.blocks);

  const {newBlockDetected} = mempoolBlocks;

  const dispatch = useDispatch();

  const previousBlocks = mempoolBlocks.loading
    ? null
    : mempoolBlocks.current.slice(1);

  useEffect(() => {
    const prevMempoolBlocks = dispatch(
      mempoolAPI.endpoints.getBlocks.initiate()
    );

    if(newBlockDetected){
      return prevMempoolBlocks.unsubscribe;
    };

    return prevMempoolBlocks.unsubscribe;
  }, [dispatch, newBlockDetected]);

  console.log(newBlockDetected);

  return (
    <MempoolDataSection
      id="mempool-prev-blocks"
      title="Previous Blocks"
      links={[{ title: "Transactions", to: "#mempool-recent-txs" }]}
      content={
        <Carousel interval={null}>
          {previousBlocks === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            previousBlocks.map((block, idx) => (
              <Carousel.Item key={idx}>
                <Container className="my-3 py-2 h-50">
                  <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column justify-content-center">
                    <h3 className="mb-3 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr">
                      {block.height}
                    </h3>
                    <Container className=" position-relative ps-0 h-auto d-flex justify-content-start align-items-center rounded shadow my-5 mempool-blk-id">
                      <p className="position-absolute h-100 fw-bold p-2 w-auto me-3 mb-0 rounded-start mempool-block-id-hdr">
                        ID:
                      </p>
                      <MempoolBlockExtrasModal block={block} />
                    </Container>
                    <div className="my-auto container">
                      <Row className="my-5">
                        <Col className="p-2 text-center d-flex flex-column rounded shadow mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Timestamp
                          </h5>
                          <span>
                            {new Date(block.timestamp * 1000).toLocaleString(
                              "en-US"
                            )}
                          </span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column rounded shadow mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Transactions
                          </h5>
                          <span>{block.tx_count}</span>
                        </Col>
                        <Col className="p-1 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Median Fee
                          </h5>
                          <span className="rounded shadow p-3">
                            ~{block.extras.medianFee.toFixed()} sat/vB
                          </span>
                        </Col>
                      </Row>
                      <Row className="my-5 gx-5">
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Size
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {(block.size / 1000000).toFixed(1)} MB
                          </span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Weight
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {(block.weight / 1000000).toFixed(2)} MVU
                          </span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Bits
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {block.bits}
                          </span>
                        </Col>
                      </Row>
                      <Row className="my-5 gx-5">
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Version
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {block.version}
                          </span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Nonce
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {block.nonce}
                          </span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Stale
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {block.stale === null
                              ? "-"
                              : block.stale === false
                              ? "false"
                              : "true"}
                          </span>
                        </Col>
                      </Row>
                      <ListGroup as="ul" className="my-5 w-auto">
                        <ListGroup.Item as="li" variant="info">
                          <span>
                            <span className="me-3 fw-bolder">Difficulty:</span>
                            <span className="text-break font-monospace fs-7">
                              {block.difficulty}
                            </span>
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" variant="info">
                          <span>
                            <span className="me-3 fw-bolder text-nowrap">
                              Previous Block Hash:
                            </span>
                            <span className="text-break font-monospace fs-7">
                              {block.previousblockhash}
                            </span>
                          </span>
                        </ListGroup.Item>
                        <ListGroup.Item as="li" variant="info">
                          <span>
                            <span className="me-3 fw-bolder text-nowrap">
                              Merkle Root:
                            </span>
                            <span className="text-break font-monospace fs-7">
                              {block.merkle_root}
                            </span>
                          </span>
                        </ListGroup.Item>
                      </ListGroup>
                    </div>
                  </div>
                </Container>
              </Carousel.Item>
            ))
          )}
        </Carousel>
      }
    />
  );
};

export default MempoolPreviousBlocks;
