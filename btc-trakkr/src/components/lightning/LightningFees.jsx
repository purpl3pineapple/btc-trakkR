import mempoolAPI from "../../app/services/api/mempool.api.service";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";

const LightningFees = () => {
  const dispatch = useDispatch();

  const {
    avg_fee_rate,
    avg_base_fee_mtokens,
    med_fee_rate,
    med_base_fee_mtokens,
    loading,
  } = useSelector((state) => state.lightning.latest);

  useEffect(() => {
    const fees = dispatch(
      mempoolAPI.endpoints.getLightningLatestStats.initiate()
    );

    return fees.unsubscribe();
  });

  return (
    <>
      {loading ? (
        <ProgressBar animated variant="secondary" now={100} />
      ) : (
        <Col className="p-1 mx-4">
          <Card>
            <Card.Header className="fw-bolder extras-list-hdr text-center">
              Fees
            </Card.Header>
            <ListGroup variant="flush">
              {[
                { title: "Avg. Fee Rate:", value: `${avg_fee_rate} sat/vB` },
                {
                  title: "Avg. Base Fee mTokens:",
                  value: avg_base_fee_mtokens,
                },
                { title: "Med. Fee Rate:", value: `${med_fee_rate} sat/vB` },
                {
                  title: "Med. Base Fee mTokens:",
                  value: med_base_fee_mtokens,
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
                    )}{" "}
                    sat/vB
                  </Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      )}
    </>
  );
};

export default LightningFees;