import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";

const DataSection = ({ id = "", title, content, links = [] }) => {
  return (
    <Container
      id={id}
      className="mempool-data-container d-flex flex-column text-center p-3 my-5 bg-body-tertiary rounded"
    >
      {/* {links.length !== 0 && (
        <Breadcrumb className="fs-6 d-flex justify-content-end align-items-center ">
          {links.map(({title, to}, idx) => (
            <Breadcrumb.Item
              id={`${id}-mempool-pg-nav-to-${title
                .replace(" ", "-")
                .toLowerCase()}`}
              key={idx}
              href={to}
              className="mempool-pg-nav-link mempool-bcrmb py-2 px-3 fw-bold"
            >
              <span>{title}</span>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )} */}
      {/* <h1 className="mb-3 container-fluid text-dark mempool-data-header-ctnr">
        <span className="mempool-data-header fs-2 fw-bold p-3 my-4 rounded d-inline-block shadow text-reset">
          {title}
        </span>
      </h1> */}
      {content}
    </Container>
  );
};

export default DataSection;
