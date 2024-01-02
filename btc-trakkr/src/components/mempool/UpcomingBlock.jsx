import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import ListItem from "./ListItem";
import Container from "react-bootstrap/Container";

const UpcomingBlock = ({ block }) => {
  return (
    <Container className="my-3 py-2">
      <Col className="px-5 pb-5 rounded d-flex flex-column justify-content-center">
        <Card className="w-75 mx-auto shadow">
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
              <ListItem key={idx} title={title} data={value} />
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
  );
};

export default UpcomingBlock;
