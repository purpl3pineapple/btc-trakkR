import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import MempoolListItem from "./MempoolListItem";

const MempoolLive2HrStats = () => {
  const { liveStats, loading } = useSelector((state) => state.mempool);

  const {
    added,
    count,
    vbytes_per_second,
    mempool_byte_weight,
    total_fee,
    min_fee,
    vsizes,
  } = liveStats;

  const mempoolLiveStats = [
    { title: "Added", value: new Date(added * 1000).toLocaleString('en-US') },
    { title: "Count", value: count },
    { title: "vBytes/sec", value: vbytes_per_second },
    { title: "Byte Weight", value: mempool_byte_weight },
    { title: "Total Fee", value: total_fee },
    { title: "Minimum Fee", value: min_fee },
    { title: "vSizes", value: vsizes },
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
            Live Stats
          </Card.Header>
          <ListGroup variant="flush">
            {mempoolLiveStats.map(({ title, value }, idx) => (
              <MempoolListItem key={idx} title={title} data={value} />
            ))}
          </ListGroup>
        </Card>
      )}
    </Col>
  );
};

export default MempoolLive2HrStats;
