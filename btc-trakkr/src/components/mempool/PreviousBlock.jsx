import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ExtrasModal from "./ExtrasModal";
import { useDispatch, useSelector } from "react-redux";
import sliceMempool from "../../app/slices/mempool.slice";

const PreviousBlock = ({ block }) => {
  const blockModals = useSelector((state) => state.mempool.blocks.modals);

  const modal = blockModals.find(({ id }) => block.id === id);

  const { controlBlockModal } = sliceMempool.actions;

  const dispatch = useDispatch();

  const handleShowNewestBlock = () =>
    dispatch(controlBlockModal({ id: modal.id, show: true }));

  return (
    <Container id={block.height} className="d-flex justify-content-center pb-5">
      <Row
        role="button"
        onClick={handleShowNewestBlock}
        className="font-monospace py-3 w-50 rounded shadow-lg my-3 mempool-recent-txs-list-item"
      >
        <Col className="my-3 px-2">
          <h3 className="fs-3 fw-bolder">{block.height}</h3>
          <span className="fs-7 text-nowrap font-monospace">{`${block.id.slice(
            0,
            8
          )}...${block.id.slice(-8)}`}</span>
        </Col>
        <Col>
          <Row className="fs-5 justify-content-center">
            <Col className="flex-fill text-center d-flex justify-content-center">
              <Badge
                bg="dark"
                pill
                className="w-auto my-2 text-break d-inline-flex flex-sm-column flex-md-row flex-lg-row"
              >
                <span className="mempool-txn-data-hdr me-2 fw-bold">
                  Timestamp:
                </span>
                <span className="fs-7">{block.timestamp}</span>
                {/* <span className="ms-2">{`/ ${convertToFiat(
                            txn.value
                          )}`}</span> */}
              </Badge>
            </Col>
            <Col className="flex-fill text-center">
              <Badge
                bg="dark"
                pill
                className="w-auto my-2 d-inline-flex flex-sm-column flex-md-row flex-lg-row"
              >
                <span className="mempool-txn-data-hdr me-2 fw-bold">
                  Transactions:
                </span>
                {block.tx_count}
                {/* <span className="text-secondary fst-italic ms-1">
                          sat
                        </span> */}
              </Badge>
            </Col>
            <Col className="flex-fill text-center">
              <Badge bg="dark" pill className="w-auto my-2">
                <span className="mempool-txn-data-hdr me-2 fw-bold">Size:</span>
                <span>
                  {block.size}
                  <span className="text-secondary fst-italic">vB</span>
                </span>
              </Badge>
            </Col>
            <Col className="flex-fill text-center">
              <Badge
                bg="dark"
                pill
                className="w-auto my-2 d-inline-flex flex-sm-column flex-md-row flex-lg-row"
              >
                <span className="mempool-txn-data-hdr me-2 fw-bold">
                  Median Fee:
                </span>
                <span>
                  {block.extras.medianFee}
                  <span className="text-secondary fst-italic ms-1">sat/vB</span>
                </span>
              </Badge>
            </Col>
          </Row>
        </Col>
      </Row>
      <ExtrasModal block={block} />
    </Container>
  );
};

export default PreviousBlock;
