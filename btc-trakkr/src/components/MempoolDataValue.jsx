import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';

const MempoolDataValue = ({ title, value }) => {
  return (
    <ListGroup.Item className='flex-fill d-flex flex-column justify-content-center text-center'>
      <div className="mempool-fee-header fs-6 fw-bold">
        {title}
      </div>
      {value === null ? <ProgressBar animated variant='secondary' now={100} /> : `$${value}`}
    </ListGroup.Item>
  );
};

export default MempoolDataValue;