import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import MempoolDataSection from "./MempoolDataSection";
import ProgressBar from "react-bootstrap/ProgressBar";
import mempoolAPI from "../../app/services/api/mempool.api.service";
import MempoolBlockExtrasModal from "./MempoolBlockExtrasModal";
import MempoolListItem from "./MempoolListItem";

const MempoolPreviousBlocks = () => {
  const { previous } = useSelector(
    (state) => state.mempool.blocks
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const prevMempoolBlocks = dispatch(
      mempoolAPI.endpoints.getBlocks.initiate()
    );

    return prevMempoolBlocks.unsubscribe;
  }, [dispatch]);

  return (
    <MempoolDataSection
      id="mempool-prev-blocks"
      title="Previous Blocks"
      links={[{ title: "Transactions", to: "#mempool-recent-txs" }]}
      content={
        <Carousel interval={null}>
          {previous === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            previous.map((block, idx) => (
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
                          <span>{block.timestamp}</span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column rounded shadow mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Transactions
                          </h5>
                          <span>{block.tx_count}</span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column rounded shadow mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Median Fee
                          </h5>
                          <span className="text-nowrap">
                            ~{block.extras.medianFee} sat/vB
                          </span>
                        </Col>
                      </Row>
                      <Row className="my-5 gx-5">
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Size
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {block.size} MB
                          </span>
                        </Col>
                        <Col className="p-2 text-center d-flex flex-column mx-4">
                          <h5 className="fw-bold mempool-data-table-hdr">
                            Weight
                          </h5>
                          <span className="rounded-pill shadow p-3">
                            {block.weight} MVU
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
                            {block.stale}
                          </span>
                        </Col>
                      </Row>
                      <ListGroup as="ul" className="my-5 w-auto">
                        {[
                          { title: "Difficulty", value: block.difficulty },
                          {
                            title: "Previous Block Hash",
                            value: block.previousblockhash,
                          },
                          { title: "Merkle Root", value: block.merkle_root },
                        ].map(({ title, value }, idx) => (
                          <MempoolListItem
                            key={idx}
                            title={title}
                            data={value}
                          />
                        ))}
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
