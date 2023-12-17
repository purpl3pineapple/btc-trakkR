import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

{/* <Card className='mempool-card h-auto m-3 p-2 flex-shrink-1 rounded'>
      <Card.Body>
        <Card.Title className="fw-bold fs-6 text-nowrap text-center text-decoration-underline lh-md">
          {title}
        </Card.Title>
        <Card.Text className="fs-5">
          {value}
        </Card.Text>
      </Card.Body>
    </Card> */}

const MempoolDataValue = ({ title, value }) => {
  return (
    <ListGroup.Item className='d-flex flex-column justify-content-center'>
      <div className="mempool-fee-header ms-2 me-auto fs-6 fw-bold">
        {title}
      </div>
      <Badge bg="dark" pill>
        ${value}
      </Badge>
    </ListGroup.Item>
  );
};

export default MempoolDataValue;