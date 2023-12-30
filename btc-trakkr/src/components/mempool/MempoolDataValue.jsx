import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Col from 'react-bootstrap/Col';

const MempoolDataValue = ({ title, value }) => {
  return (
    <Col className='flex-fill d-flex flex-column justify-content-center text-center py-2'>
      <div className="mempool-fee-header fs-6 fw-bold">
        {title}
      </div>
      {value === null ? <ProgressBar animated variant='secondary' now={100} /> : `${value} sat`}
    </Col>
  );
};

export default MempoolDataValue;