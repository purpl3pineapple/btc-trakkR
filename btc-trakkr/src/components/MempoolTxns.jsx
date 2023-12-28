import Container from "react-bootstrap/Container";
import MempoolDataSection from "../components/layout/MempoolDataSection";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import Stack from "react-bootstrap/Stack";

/* fiat/fee conversion ===> (sats/100,000,000) * currentPrice */

const MempoolTxns = () => {

  const { txs, loading } = useSelector((state) => state.mempool);

  const BTC = useSelector((state) => state.BTC);

  const convertToFiat = (amt) =>
    BTC.currentPrice === null
      ? `-`
      : `$${((amt / 100000000) * BTC.currentPrice.replace(",", "")).toFixed(
          2
        )}`;


  return (
    <MempoolDataSection
      id="mempool-recent-txs"
      title="Mempool Recent Transactions"
      links={[
        {
          title: "Blocks",
          to: "#mempool-blocks",
        },
      ]}
      content={
        <Container className="h-100 w-100 p-4 d-flex flex-column align-items-center">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              role="status"
              className="m-auto"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              <ListGroup
                as="ol"
                numbered
                className="mx-3 pe-0 align-items-center container h-100 w-75 overflow-auto"
              >
                {txs === null ? (
                  <ProgressBar animated variant="secondary" now={100} />
                ) : (
                  txs.map((txn, idx) => (
                    <ListGroup.Item
                      as="li"
                      key={idx}
                      action
                      className="font-monospace p-4 w-100 d-flex flex-sm-column flex-md-row justify-content-between align-items-start"
                      variant="info"
                    >
                      <div className="me-auto p-3 d-flex flex-column align-items-start text-break">
                        <p className="fw-bold fs-6 p-2">{txn.txid}</p>
                      </div>
                      <Stack>
                        <div>
                            <Badge
                            bg="dark"
                            pill
                            className="w-auto my-2"
                            >
                            <span className="mempool-txn-data-hdr me-2 fw-bold">
                                vSize:
                            </span>
                            <span>
                                {txn.vsize}
                                <span className="text-secondary fst-italic">
                                vB
                                </span>
                            </span>
                            </Badge>
                        </div>
                        <div>
                            <Badge
                            bg="dark"
                            pill
                            className="w-auto my-2"
                            >
                            <span className="mempool-txn-data-hdr me-2 fw-bold">
                                Fee:
                            </span>
                            {txn.fee}
                            <span className="text-secondary fst-italic ms-1">
                                sat
                            </span>
                            </Badge>
                        </div>
                        <div>
                            <Badge
                            bg="dark"
                            pill
                            className="w-auto my-2"
                            >
                            <span className="mempool-txn-data-hdr me-2 fw-bold">
                                Amount:
                            </span>
                            <span>
                                {txn.value}
                                <span className="text-secondary fst-italic ms-1">
                                sat
                                </span>
                            </span>
                            <span className="ms-2">{`/ ${convertToFiat(
                                txn.value
                            )}`}</span>
                            </Badge>
                        </div>
                        <div>
                            <Badge
                            bg="dark"
                            pill
                            className="w-auto my-2"
                            >
                            <span className="mempool-txn-data-hdr me-2 fw-bold">
                                Rate:
                            </span>
                            <span>
                                {txn.rate.toFixed(2)}
                                <span className="text-secondary fst-italic ms-1">
                                sat/vB
                                </span>
                            </span>
                            </Badge>
                        </div>
                      </Stack>
                      {/* <Row className="container m-auto justify-content-around align-items-center">
                        
                      </Row> */}
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </>
          )}
        </Container>
      }
    />
  );
};

export default MempoolTxns;
