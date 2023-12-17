import Container from 'react-bootstrap/Container';

const MempoolDataSection = ({ id = '', title, content }) => {
  return (
    <Container id={id} className="mempool-data-container d-flex flex-column justify-content-center text-center p-3 my-5 bg-body-tertiary rounded">
      <h1 className="mb-3 container-fluid text-dark mempool-data-header-ctnr">
        <span className="mempool-data-header fs-2 fw-bold p-3 my-4 rounded d-inline-block shadow text-reset">
          {title}
        </span>
      </h1>
      {content}
    </Container>
  );
};

export default MempoolDataSection;