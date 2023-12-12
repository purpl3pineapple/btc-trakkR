import Card from 'react-bootstrap/Card';

const MempoolDataValue = ({ title, value }) => {
  return (
    <Card className='mempool-card h-auto m-3 p-2 flex-shrink-1 rounded-circle'>
      <Card.Body>
        <Card.Title className="fw-bold fs-6">
          {title}
        </Card.Title>
        <Card.Text className="fs-7">
          {value}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MempoolDataValue;