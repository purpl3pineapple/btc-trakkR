import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ProgressBar from "react-bootstrap/ProgressBar";
import MempoolListItem from "./MempoolListItem";

const MempoolUpcomingBlocks = () => {
  const mempoolBlocks = useSelector((state) => state.mempool.blocks);

  const upcomingBlocks = mempoolBlocks.loading ? null : mempoolBlocks.upcoming;
  return (
    <MempoolDataSection
      id="mempool-upcoming-blocks"
      title="Upcoming Blocks"
      links={[{ title: "Transactions", to: "#mempool-recent-txs" }]}
      content={
        <>
        <Carousel interval={null}>
          {upcomingBlocks === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            upcomingBlocks.map((block, idx) => (
              <Carousel.Item key={idx}>
                <Container className="my-3 py-2">
                  <Col className="m-5 p-5 rounded shadow d-flex flex-column justify-content-center">
                    <Card className="w-75 mx-auto">
                      <Card.Header>
                        <span className="me-3 fw-bolder text-nowrap mempool-data-table-hdr">
                          Transaction Count:
                        </span>
                        <span>{block.nTx}</span>
                      </Card.Header>
                      <ListGroup variant="flush">
                        {[
                          { title: "Block Size", value: block.blockSize },
                          {
                            title: "Block vSize",
                            value: block.blockVSize,
                          },
                          { title: "Total Fee", value: block.totalFees },
                          {
                            title: "Median Fee",
                            value: `${block.medianFee} sat`,
                          },
                          {
                            title: "Fee Range",
                            value: `${block.feeRange} sat`,
                          },
                        ].map(({ title, value }, idx) => (
                          <MempoolListItem
                            key={idx}
                            title={title}
                            data={value}
                          />
                        ))}
                      </ListGroup>
                    </Card>
                    {/* <div className="my-auto container">
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
                              {[
                                { title: "Block Size", value: block.blockSize },
                                {
                                  title: "Block vSize",
                                  value: block.blockVSize,
                                },
                              ].map(({ title, value }, idx) => (
                                <MempoolListItem
                                  key={idx}
                                  title={title}
                                  data={value}
                                />
                              ))}
                            </ListGroup>
                          </Card>
                        </Col>
                        <Col className="p-1 mx-4">
                          <Card>
                            <Card.Header className="fw-bolder extras-list-hdr text-center">
                              Fees
                            </Card.Header>
                            <ListGroup variant="flush">
                              {[
                                { title: "Total Fee", value: block.totalFees },
                                {
                                  title: "Median Fee",
                                  value: `${block.medianFee} sat`,
                                },
                                {
                                  title: "Fee Range",
                                  value: `${block.feeRange} sat`,
                                },
                              ].map(({ title, value }, idx) => (
                                <MempoolListItem
                                  key={idx}
                                  title={title}
                                  data={value}
                                />
                              ))}
                            </ListGroup>
                          </Card>
                        </Col>
                      </Row>
                    </div> */}
                  </Col>
                </Container>
              </Carousel.Item>
            ))
          )}
        </Carousel>
        <Carousel interval={null}>
          {upcomingBlocks === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            upcomingBlocks.map((block, idx) => (
              <Carousel.Item key={idx}>
                <Container className="my-3 py-2">
                  <Col className="m-5 p-5 rounded shadow d-flex flex-column justify-content-center">
                    <Card className="w-75 mx-auto">
                      <Card.Header>
                        <span className="me-3 fw-bolder text-nowrap mempool-data-table-hdr">
                          Transaction Count:
                        </span>
                        <span>{block.nTx}</span>
                      </Card.Header>
                      <ListGroup variant="flush">
                        {[
                          { title: "Block Size", value: block.blockSize },
                          {
                            title: "Block vSize",
                            value: block.blockVSize,
                          },
                          { title: "Total Fee", value: block.totalFees },
                          {
                            title: "Median Fee",
                            value: `${block.medianFee} sat`,
                          },
                          {
                            title: "Fee Range",
                            value: `${block.feeRange} sat`,
                          },
                        ].map(({ title, value }, idx) => (
                          <MempoolListItem
                            key={idx}
                            title={title}
                            data={value}
                          />
                        ))}
                      </ListGroup>
                    </Card>
                    {/* <div className="my-auto container">
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
                              {[
                                { title: "Block Size", value: block.blockSize },
                                {
                                  title: "Block vSize",
                                  value: block.blockVSize,
                                },
                              ].map(({ title, value }, idx) => (
                                <MempoolListItem
                                  key={idx}
                                  title={title}
                                  data={value}
                                />
                              ))}
                            </ListGroup>
                          </Card>
                        </Col>
                        <Col className="p-1 mx-4">
                          <Card>
                            <Card.Header className="fw-bolder extras-list-hdr text-center">
                              Fees
                            </Card.Header>
                            <ListGroup variant="flush">
                              {[
                                { title: "Total Fee", value: block.totalFees },
                                {
                                  title: "Median Fee",
                                  value: `${block.medianFee} sat`,
                                },
                                {
                                  title: "Fee Range",
                                  value: `${block.feeRange} sat`,
                                },
                              ].map(({ title, value }, idx) => (
                                <MempoolListItem
                                  key={idx}
                                  title={title}
                                  data={value}
                                />
                              ))}
                            </ListGroup>
                          </Card>
                        </Col>
                      </Row>
                    </div> */}
                  </Col>
                </Container>
              </Carousel.Item>
            ))
          )}
        </Carousel>
        </>
      }
    />
  );
};

export default MempoolUpcomingBlocks;
