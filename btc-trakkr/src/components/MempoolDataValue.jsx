import React from 'react';
import Card from 'react-bootstrap/Card';

const MempoolDataValue = ({ title, value }) => {
  return (
    <Card className='mempool-card h-auto mx-3 flex-shrink-1 rounded-circle'>
      <Card.Body>
        <Card.Title className="fw-bold fs-6">
          {title}
        </Card.Title>
        <Card.Text className="fs-6">
          {value}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MempoolDataValue;