import ListGroupItem from "react-bootstrap/ListGroupItem";

const MempoolListItem = ({ title, data }) => {
  return (
    <ListGroupItem
      as="li"
      variant="info"
      className="d-flex justify-content-start fs-7"
    >
      <span>
        <span className="me-3 fw-bolder text-nowrap">{title}:</span>
        <span className="text-break font-monospace">{data}</span>
      </span>
    </ListGroupItem>
  );
};

export default MempoolListItem;
