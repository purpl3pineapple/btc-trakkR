import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import mempoolAPI from "../../app/services/api/mempool.api.service";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import MempoolDataSection from "./MempoolDataSection";
import ProgressBar from "react-bootstrap/ProgressBar";
import MempoolBlockExtrasModal from "./MempoolBlockExtrasModal";
import MempoolListItem from "./MempoolListItem";

const MempoolNewestBlock = () => {
  const { newest } = useSelector((state) => state.mempool.blocks);

  const dispatch = useDispatch();

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
        newest === null ? (
          <ProgressBar animated variant="secondary" now={100} />
        ) : (
          <>
          <Container
              key={newest.height}
              className="d-flex justify-content-center"
            >
              <Row className="font-monospace py-3 w-50 rounded my-3 mempool-recent-txs-list-item">
                <Col className="my-3 px-2">
                  <h3 className="fs-3 fw-bolder">{newest.height}</h3>
                  <span className="fs-7 text-nowrap">{`${newest.id.slice(0, 8)}...${newest.id.slice(-8)}`}</span>
                </Col>
                <Col>
                  <Row className="fs-5">
                    <Col className="flex-fill">
                      <Badge bg="dark" pill className="w-auto my-2 text-break">
                        <span className="mempool-txn-data-hdr me-2 fw-bold">
                        Timestamp:
                        </span>
                        <span>
                          {newest.timestamp}
                        </span>
                        {/* <span className="ms-2">{`/ ${convertToFiat(
                            txn.value
                          )}`}</span> */}
                      </Badge>
                    </Col>
                    <Col className="flex-fill">
                      <Badge bg="dark" pill className="w-auto my-2">
                        <span className="mempool-txn-data-hdr me-2 fw-bold">
                          Transactions:
                        </span>
                        {newest.tx_count}
                        {/* <span className="text-secondary fst-italic ms-1">
                          sat
                        </span> */}
                      </Badge>
                    </Col>
                    <Col className="flex-fill">
                      <Badge bg="dark" pill className="w-auto my-2">
                        <span className="mempool-txn-data-hdr me-2 fw-bold">
                          Size:
                        </span>
                        <span>
                          {newest.size}
                          <span className="text-secondary fst-italic">vB</span>
                        </span>
                      </Badge>
                    </Col>
                    <Col className="flex-fill">
                      <Badge bg="dark" pill className="w-auto my-2">
                        <span className="mempool-txn-data-hdr me-2 fw-bold">
                          Median Fee:
                        </span>
                        <span>
                          {newest.extras.medianFee}
                          <span className="text-secondary fst-italic ms-1">
                            sat/vB
                          </span>
                        </span>
                      </Badge>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          <Container className="py-2 h-50" id={`block-${newest.height}`}>
            
            <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column">
              <h3 className="mb-3 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr">
                {newest.height}
              </h3>
              <Container className=" position-relative ps-0 h-auto d-flex justify-content-start align-items-center rounded shadow my-5 mempool-blk-id">
                <p className="position-absolute h-100 fw-bold p-2 w-auto me-3 mb-0 rounded-start mempool-block-id-hdr">
                  ID:
                </p>
                <MempoolBlockExtrasModal block={newest} />
              </Container>
              <div className="my-auto container">
                <Row className="my-5">
                  <Col className="p-2 my-3 text-center d-flex flex-column rounded shadow mempool-newest-block-stat mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">
                      Timestamp
                    </h5>
                    <span className="">{newest.timestamp}</span>
                  </Col>
                </Row>
                <Row className="my-5">
                  <Col className="p-2 my-3 text-center d-flex flex-column rounded shadow mempool-newest-block-stat mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">
                      Transactions
                    </h5>
                    <span>{newest.tx_count}</span>
                  </Col>
                  <Col className="p-2 my-3 text-center d-flex flex-column rounded shadow mempool-newest-block-stat mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">
                      Median Fee
                    </h5>
                    <span className="text-nowrap">
                      ~{""}
                      {newest.extras.medianFee} sat/vB
                    </span>
                  </Col>
                </Row>
                <Row className="my-5 gx-5">
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Size</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newest.size} MB
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Weight</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3 text-nowrap">
                      {newest.weight} MVU
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Bits</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newest.bits}
                    </span>
                  </Col>
                </Row>
                <Row className="my-5 gx-5">
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Version</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newest.version}
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Nonce</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newest.nonce}
                    </span>
                  </Col>
                  <Col className="p-2 text-center d-flex flex-column mx-4">
                    <h5 className="fw-bold mempool-data-table-hdr">Stale</h5>
                    <span className="rounded-pill shadow mempool-newest-block-stat p-3">
                      {newest.stale}
                    </span>
                  </Col>
                </Row>
                <ListGroup as="ul" className="my-5 w-auto">
                  {[
                    { title: "Difficulty", value: newest.difficulty },
                    {
                      title: "Previous Block Hash",
                      value: newest.previousblockhash,
                    },
                    { title: "Merkle Root", value: newest.merkle_root },
                  ].map(({ title, value }, idx) => (
                    <MempoolListItem key={idx} title={title} data={value} />
                  ))}
                </ListGroup>
              </div>
            </div>
          </Container>
          </>
        )
      }
    />
  );
};

export default MempoolNewestBlock;
