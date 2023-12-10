import Container from 'react-bootstrap/Container';

const MempoolDataSection = ({ title, content }) => {
  return (
    <Container className="mempool-data-container d-flex flex-column justify-content-center text-center p-3 my-5 bg-body-tertiary rounded">
      <h1 className="mb-3 container-fluid mempool-data-header">
        <span className="bg-info fs-2 fw-bold p-3 my-4 rounded d-inline-block text-decoration-underline shadow text-reset">
          {title}
        </span>
      </h1>
      {content}
    </Container>
  );
};

export default MempoolDataSection;