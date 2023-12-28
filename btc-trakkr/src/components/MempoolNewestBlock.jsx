import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import mempoolAPI from "../api-services/mempool.service";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ProgressBar from "react-bootstrap/ProgressBar";
import MempoolBlockExtrasModal from "./MempoolBlockExtrasModal";

const MempoolNewestBlock = () => {

  const mempoolBlocks = useSelector((state) => state.mempool.blocks);

  const dispatch = useDispatch();

  const newestBlock = mempoolBlocks.loading
    ? null
    : [mempoolBlocks.newest, mempoolBlocks.current[0]].find(
        (block) => block !== null
      );

  useEffect(() => {
    const currentMempoolBlocks = dispatch(
      mempoolAPI.endpoints.getBlocks.initiate()
    );

    return currentMempoolBlocks.unsubscribe;
  }, [dispatch]);
  return (
    <MempoolDataSection
      id="mempool-newest-block"
      title="Newest Block"
      links={[{ title: "Transactions", to: "#mempool-recent-txs" }]}
      content={
        newestBlock === null ? (
          <ProgressBar animated variant="secondary" now={100} />
        ) : (
          <Container className="py-2 h-50" id={`block-${newestBlock.height}`}>
            <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column">
              <h3 className="mb-3 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr">
                {newestBlock.height}
              </h3>
              <Container className=" position-relative ps-0 h-auto d-flex justify-content-start align-items-center rounded shadow my-5 mempool-blk-id">
                <p className="position-absolute h-100 fw-bold p-2 w-auto me-3 mb-0 rounded-start mempool-block-id-hdr">
                  ID:
                </p>
                <MempoolBlockExtrasModal block={newestBlock} />
              </Container>
              <div className="my-auto container">
                <Row className="my-5">
                  <Col className="p-2 my-3 text-center d-flex flex-column rounded shadow mempool-newest-block-stat mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">
                      Timestamp
                    </h5>
                    <span className="">
                      {new Date(newestBlock.timestamp * 1000).toLocaleString(
                        "en-US"
                      )}
                    </span>
                  </Col>
                </Row>
                <Row className="my-5">
                  <Col className="p-2 my-3 text-center d-flex flex-column rounded shadow mempool-newest-block-stat mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">
                      Transactions
                    </h5>
                    <span>{newestBlock.tx_count}</span>
                  </Col>
                  <Col className="p-2 my-3 text-center d-flex flex-column rounded shadow mempool-newest-block-stat mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">
                      Median Fee
                    </h5>
                    <span className="text-nowrap">
                      ~{newestBlock.extras.medianFee.toFixed()} sat/vB
                    </span>
                  </Col>
                </Row>
                <Row className="my-5 gx-5">
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Size</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {(newestBlock.size / 1000000).toFixed(1)} MB
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Weight</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3 text-nowrap">
                      {(newestBlock.weight / 1000000).toFixed(2)} MVU
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Bits</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newestBlock.bits}
                    </span>
                  </Col>
                </Row>
                <Row className="my-5 gx-5">
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Version</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newestBlock.version}
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Nonce</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newestBlock.nonce}
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Stale</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newestBlock.stale === null
                        ? "-"
                        : newestBlock.stale === false
                        ? "false"
                        : "true"}
                    </span>
                  </Col>
                </Row>
                <ListGroup as="ul" className="my-5 w-auto">
                  <ListGroup.Item
                    as="li"
                    variant="info"
                    className="d-flex justify-content-start fs-7"
                  >
                    <span>
                      <span className="me-3 fw-bolder">Difficulty:</span>
                      <span className="text-break font-monospace">
                        {newestBlock.difficulty}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    variant="info"
                    className="d-flex justify-content-start fs-7"
                  >
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Previous Block Hash:
                      </span>
                      <span className="text-break font-monospace">
                        {newestBlock.previousblockhash}
                      </span>
                    </span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    variant="info"
                    className="d-flex justify-content-start fs-7"
                  >
                    <span>
                      <span className="me-3 fw-bolder text-nowrap">
                        Merkle Root:
                      </span>
                      <span className="text-break font-monospace">
                        {newestBlock.merkle_root}
                      </span>
                    </span>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          </Container>
        )
      }
    />
  );
};

export default MempoolNewestBlock;
