import Container from "react-bootstrap/Container";
import mempoolAPI from "../api-services/mempool.service";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const LightningFees = () => {

  const dispatch = useDispatch();

  const {
    avg_fee_rate, 
    avg_base_fee_mtokens, 
    med_fee_rate, 
    med_base_fee_mtokens, 
    loading
  } = useSelector(state => state.lightning.latest);

  useEffect(() => {

    const fees = dispatch(mempoolAPI.endpoints.getLightningLatestStats.initiate());

    return fees.unsubscribe();
  });


  return (<>{
    loading || [avg_fee_rate, avg_base_fee_mtokens, med_fee_rate, med_base_fee_mtokens].some(size => size === null)
    ? <Spinner as="span" animation="border" role="status">
        <span className="visually-hidden">
          Loading...
        </span>
      </Spinner>

    : <Container className='my-3 py-2 rounded shadow'>
      <Container className="py-3 mb-5 d-flex flex-column justify-content-center align-items-center">
        <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
          <span className="lightning-id-label">
            Fees
          </span>
        </h2>
        <ListGroup horizontal className="w-75 py-3">
          <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
            <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
              Avg. Fee Rate
            </div>
            <Badge bg="dark" pill className="mb-2 w-auto px-4">
              {avg_fee_rate} sat/vB
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
            <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
              Avg. Base Fee mTokens
            </div>
            <Badge bg="dark" pill className="mb-2 w-auto px-4">
              {avg_base_fee_mtokens}
            </Badge>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup horizontal className="w-75">
          <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
            <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
              Med. Fee Rate
            </div>
            <Badge bg="dark" pill className="mb-2 w-auto px-4">
              {med_fee_rate} sat/vB
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
            <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
              Med. Base Fee mTokens
            </div>
            <Badge bg="dark" pill className="mb-2 w-auto px-4">
              {med_base_fee_mtokens}
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      </Container>
    </Container>
  }</>);
};

export default LightningFees;








/*  */