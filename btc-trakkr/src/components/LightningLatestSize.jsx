import mempoolAPI from "../api-services/mempool.service";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const LightningLatestSize = () => {

  const dispatch = useDispatch();

  const { total_capacity, avg_capacity, med_capacity, channel_count, loading } =
    useSelector((state) => state.lightning.latest);

  useEffect(() => {
    const lightningSize = dispatch(
        mempoolAPI.endpoints.getLightningLatestStats.initiate()
      );
  
      return lightningSize.unsubscribe();
  }, [dispatch]);

  return loading ? (
    <Spinner as="span" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  ) : (
    <Col className="p-1 mx-4">
      <Card>
        <Card.Header className="fw-bolder extras-list-hdr text-center">
          Size
        </Card.Header>
        <ListGroup variant="flush">
          {[
            { title: "Total Capacity:", value: total_capacity },
            { title: "Avg. Capacity:", value: avg_capacity },
            { title: "Med. Capacity:", value: med_capacity },
            { title: "Channel Count:",  value: channel_count },
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
  );
};

export default LightningLatestSize;
