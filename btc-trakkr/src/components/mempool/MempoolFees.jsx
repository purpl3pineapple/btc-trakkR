import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MempoolListItem from "./MempoolListItem";

const MempoolFees = () => {
  const { economyFee, fastestFee, halfHourFee, hourFee, minimumFee, loading } =
    useSelector((state) => state.mempool.fees);

  const mempoolFees = [
    { title: "Fastest Fee", value: fastestFee },
    { title: "Half-Hour Fee", value: halfHourFee },
    { title: "Hour Fee", value: hourFee },
    { title: "Economy Fee", value: economyFee },
    { title: "Minimum Fee", value: minimumFee },
  ];

  return (
    <Col className="p-1 mx-4">
      {loading ? (
        <Spinner as="span" animation="border" role="status" className="m-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Card>
          <Card.Header className="fw-bolder extras-list-hdr text-center">
            Fees
          </Card.Header>
          <ListGroup variant="flush">
            {mempoolFees.map(({ title, value }, idx) => (
              <MempoolListItem key={idx} title={title} data={`${value} sat`} />
            ))}
          </ListGroup>
        </Card>
      )}
    </Col>
  );
};

export default MempoolFees;
