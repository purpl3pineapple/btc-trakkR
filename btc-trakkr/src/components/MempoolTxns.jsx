import Container from "react-bootstrap/Container";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector, useDispatch } from "react-redux";
import { useGetRecentTxsQuery } from "../api-services/mempool.service";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";
import sliceMempoolTxns from "../context/mempool/mempool.txns.slice";
import ProgressBar from "react-bootstrap/ProgressBar";

/* fiat/fee conversion ===> (sats/100,000,000) * currentPrice */

const MempoolTxns = () => {

    const dispatch = useDispatch();

    const { txns, loading } = useSelector(state => state.mempoolTxns);

    const { currentPrice } = useSelector(state => state.BTC);

    const mempoolTxns = useGetRecentTxsQuery();

    const { updateMempoolTxns } = sliceMempoolTxns.actions;
  
    const { isSuccess: mempoolTxnsFetchSuccess } = mempoolTxns;

    const convertToFiat = amt => ((amt / 100000000) * currentPrice.replace(',', '')).toFixed(2);
  
    useEffect(() => {
  
      dispatch(updateMempoolTxns({
        txns: mempoolTxnsFetchSuccess ? mempoolTxns.data : null,
        loading: false
      }));
    });

    return (
        <MempoolDataSection id="mempool-recent-txs" title="Mempool Recent Transactions" content={
            <Container className="h-100 w-100 p-4 d-flex flex-column align-items-center">{
                loading
                ? <Spinner as="span" animation="border" role="status" className="m-auto">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </Spinner>
                : <ListGroup as="ol" numbered className="mx-3 pe-0 align-items-center container h-100 overflow-auto">
                    {txns === null 
                    ? <ProgressBar animated variant="secondary" now={100} /> 
                    : txns.map((txn, idx) => <ListGroup.Item as="li" key={idx} action className="font-monospace p-4 w-100 d-flex justify-content-between align-items-start" variant="info">
                        <div className="me-auto p-3 d-flex flex-column align-items-start text-break">
                            <div className="fw-bold fs-7 p-2">{txn.txid}</div>
                        </div>
                        <Row className="container m-auto justify-content-around align-items-center">
                            <Badge bg="dark" pill className="w-auto my-2 d-flex justify-content-evenly align-items-center">
                                <span className="mempool-txn-data-hdr me-2 fw-bold">
                                    vSize:
                                </span>
                                <span>
                                    {txn.vsize}<span className="text-secondary fst-italic">vB</span>
                                </span>
                            </Badge>
                            <Badge bg="dark" pill className="w-auto my-2 d-flex justify-content-evenly align-items-center">
                                <span className="mempool-txn-data-hdr me-2 fw-bold">
                                    Fee:
                                </span>
                                {txn.fee}
                                <span className="text-secondary fst-italic ms-1">
                                    sat
                                </span>
                            </Badge>
                            <Badge bg="dark" pill className="w-auto my-2 d-flex justify-content-evenly align-items-center">
                                <span className="mempool-txn-data-hdr me-2 fw-bold">Amount:</span>
                                <span>
                                    {txn.value}
                                    <span className="text-secondary fst-italic ms-1">
                                        sat
                                    </span>
                                </span>
                                <span className="ms-2">{`/ $${convertToFiat(txn.value)}`}</span>
                            </Badge>
                        </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            }</Container>
        }/>
    );
};

export default MempoolTxns;