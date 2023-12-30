import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import mempoolAPI from "../../app/services/api/mempool.api.service";
import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Lightning24Hr = () => {
  const dispatch = useDispatch();

  const {
    added,
    total_capacity,
    channel_count,
    clearnet_nodes,
    clearnet_tor_nodes,
    tor_nodes,
    unannounced_nodes,
    loading,
  } = useSelector((state) => state.lightning.twentyFourHr);

  useEffect(() => {
    const stats = dispatch(
      mempoolAPI.endpoints.getLightning24hStats.initiate()
    );

    return stats.unsubscribe();
  });

  return loading ? (
    <Spinner as="span" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <>
      <Col className="p-1 mx-4">
        <Card>
          <Card.Header className="fw-bolder extras-list-hdr text-center">
            Stats
          </Card.Header>
          <ListGroup variant="flush">
            {[
              { title: "Added:", value: added },
              {
                title: "Total Capacity:",
                value: total_capacity,
              },
              { title: "Channel Count:", value: channel_count },
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
                    <ProgressBar animated variant="secondary" now={100} />
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
              { title: "ClearNet Nodes:", value: clearnet_nodes },
              {
                title: "ClearNet Tor Nodes:",
                value: clearnet_tor_nodes,
              },
              { title: "Tor Nodes:", value: tor_nodes },
              {
                title: "Unannounced Nodes:",
                value: unannounced_nodes,
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
                    <ProgressBar animated variant="secondary" now={100} />
                  ) : (
                    value
                  )}
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Col>
    </>
  );
};

export default Lightning24Hr;
