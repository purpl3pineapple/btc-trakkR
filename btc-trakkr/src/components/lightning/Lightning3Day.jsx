import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import mempoolAPI from "../../app/services/api/mempool.api.service";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Container from "react-bootstrap/Container";

const Lightning3Day = () => {
  const dispatch = useDispatch();

  const threeDay = useSelector((state) => state.lightning.threeDay);

  useEffect(() => {
    const stats = dispatch(mempoolAPI.endpoints.getLightning3dStats.initiate());

    return stats.unsubscribe();
  });

  return (
    <>
      {threeDay === null ? (
        <Spinner as="span" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        threeDay.map((stat, idx) =>
          stat === null ? (
            <ProgressBar animated variant="secondary" now={100} />
          ) : (
            <Container className="my-3 py-2 rounded shadow">
              <span className="d-inline-block m-2 w-auto fw-bold fs-6 bg-success text-dark p-2 rounded-pill">
                {`Day ${idx + 1}`}
              </span>
              <Row className="my-5">
                <Col className="p-1 mx-4">
                  <Card>
                    <Card.Header className="fw-bolder extras-list-hdr text-center">
                      Stats
                    </Card.Header>
                    <ListGroup variant="flush">
                      {[
                        { title: "Added:", value: stat.added },
                        {
                          title: "Total Capacity:",
                          value: stat.total_capacity,
                        },
                        { title: "Channel Count:", value: stat.channel_count },
                      ].map(({ title, value }, idx) => (
                        <ListGroup.Item
                          key={idx}
                          variant="info"
                          className="d-flex justify-content-start align-items-center"
                        >
                          <h5 className="lightning-stat-header me-3 fs-6 fw-bold">
                            {title}
                          </h5>
                          <Badge bg="dark" pill className="w-auto px-4">
                            {value === null ? (
                              <ProgressBar
                                animated
                                variant="secondary"
                                now={100}
                              />
                            ) : (
                              value
                            )}
                          </Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
                <Col className="p-1 mx-4">
                  <Card>
                    <Card.Header className="fw-bolder extras-list-hdr text-center">
                      Nodes
                    </Card.Header>
                    <ListGroup variant="flush">
                      {[
                        {
                          title: "ClearNet Nodes:",
                          value: stat.clearnet_nodes,
                        },
                        {
                          title: "ClearNet Tor Nodes:",
                          value: stat.clearnet_tor_nodes,
                        },
                        { title: "Tor Nodes:", value: stat.tor_nodes },
                        {
                          title: "Unannounced Nodes:",
                          value: stat.unannounced_nodes,
                        },
                      ].map(({ title, value }, idx) => (
                        <ListGroup.Item
                          key={idx}
                          variant="info"
                          className="d-flex justify-content-start align-items-center"
                        >
                          <h5 className="lightning-stat-header me-3 fs-6 fw-bold">
                            {title}
                          </h5>
                          <Badge bg="dark" pill className="w-auto px-4">
                            {value === null ? (
                              <ProgressBar
                                animated
                                variant="secondary"
                                now={100}
                              />
                            ) : (
                              value
                            )}
                          </Badge>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Container>
          )
        )
      )}
    </>
  );
};

export default Lightning3Day;
