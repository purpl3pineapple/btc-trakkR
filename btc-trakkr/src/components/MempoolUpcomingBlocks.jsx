import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ProgressBar from "react-bootstrap/ProgressBar";

const MempoolUpcomingBlocks = () => {
  const mempoolBlocks = useSelector((state) => state.mempool.blocks);

  const upcomingBlocks = mempoolBlocks.loading ? null : mempoolBlocks.upcoming;
  return (
    <MempoolDataSection
      id="mempool-upcoming-blocks"
      title="Upcoming Blocks"
      links={[{ title: "Transactions", to: "#mempool-recent-txs" }]}
      content={
        <Carousel interval={null}>
          {upcomingBlocks === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            upcomingBlocks.map((block, idx) => (
              <Carousel.Item key={idx}>
                <Container className="my-3 py-2 h-50">
                  <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column justify-content-center">
                    <div className="my-auto container">
                      <Row className="my-5">
                        <Col className="p-2 text-center d-flex justify-content-start align-items-center rounded shadow mx-4">
                          <span className="me-3 fw-bolder text-nowrap mempool-data-table-hdr">
                            Transaction Count:
                          </span>
                          <span>{block.nTx}</span>
                        </Col>
                      </Row>
                      <Row className="my-5 gx-3">
                        <Col className="p-1 mx-4">
                          <Card>
                            <Card.Header className="fw-bolder extras-list-hdr text-center">
                              Size
                            </Card.Header>
                            <ListGroup variant="flush">
                              <ListGroup.Item variant="info">
                                <span>
                                  <span className="me-3 fw-bolder text-nowrap">
                                    Block Size:
                                  </span>
                                  <span className="text-break font-monospace fs-7">
                                    {block.blockSize}
                                  </span>
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item variant="info">
                                <span>
                                  <span className="me-3 fw-bolder text-nowrap">
                                    Block vSize:
                                  </span>
                                  <span className="text-break font-monospace fs-7">
                                    {block.blockVSize}
                                  </span>
                                </span>
                              </ListGroup.Item>
                            </ListGroup>
                          </Card>
                        </Col>
                        <Col className="p-1 mx-4">
                          <Card>
                            <Card.Header className="fw-bolder extras-list-hdr text-center">
                              Fees
                            </Card.Header>
                            <ListGroup variant="flush">
                              <ListGroup.Item variant="info">
                                <span>
                                  <span className="me-3 fw-bolder text-nowrap">
                                    Total Fee:
                                  </span>
                                  <span className="text-break font-monospace fs-7">
                                    {block.totalFees}
                                  </span>
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item variant="info">
                                <span>
                                  <span className="me-3 fw-bolder text-nowrap">
                                    Median Fee:
                                  </span>
                                  <span className="text-break font-monospace fs-7">
                                    {block.medianFee}
                                  </span>
                                </span>
                              </ListGroup.Item>
                              <ListGroup.Item variant="info">
                                <span>
                                  <span className="me-3 fw-bolder text-nowrap">
                                    Fee Range:
                                  </span>
                                  <span className="text-break font-monospace fs-7">
                                    {block.feeRange.map((fee, idx) => (
                                      <span
                                        key={idx}
                                        className="d-inline-block"
                                      >
                                        {fee.toFixed()} sat
                                      </span>
                                    ))}
                                  </span>
                                </span>
                              </ListGroup.Item>
                            </ListGroup>
                          </Card>
                        </Col>
                      </Row>
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

export default MempoolUpcomingBlocks;
