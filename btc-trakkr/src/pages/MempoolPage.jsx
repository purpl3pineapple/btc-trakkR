import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import MempoolBlocks from "../components/MempoolBlocks";
import MempoolFees from "../components/MempoolFees";
import MempoolTxns from "../components/MempoolTxns";
import useWebSocket from "react-use-websocket";
import sliceMempool from "../context/mempool/mempool.slice";
import { useDispatch } from "react-redux";
import mempoolAPI from "../api-services/mempool.service";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MempoolPage = () => {

  const { REACT_APP_MEMPOOL_WS_URL } = process.env;

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {

    const prevMempoolBlocks = dispatch(mempoolAPI.endpoints.getBlocks.initiate());

    return prevMempoolBlocks.unsubscribe;

  }, [dispatch]);


  const {
    updateInfo,
    updateDiffAdj,
    updateNewestBlock,
    updateTxs,
    updateFees,
    updateConversions,
    updateLiveStats
  } = sliceMempool.actions;


  const { sendJsonMessage } = useWebSocket(REACT_APP_MEMPOOL_WS_URL, {
    onOpen: () => {

      sendJsonMessage({
        "action": "want",
        "data": [
          "blocks",
          "stats",
          "live-2h-chart"
        ]
      });
    },

    onMessage: async msg => {

      const data = JSON.parse(msg.data);


      if(data["live-2h-chart"] !== undefined){

        dispatch(updateLiveStats({ data: data["live-2h-chart"] }));
      };


      if(data.da !== undefined){

        const { da } = data;

        dispatch(updateDiffAdj({ da }));
      };


      if(data.block !== undefined){

        dispatch(updateNewestBlock({ block: data.block }))
      };


      if(data.transactions !== undefined){

        const { transactions } = data;

        dispatch(updateTxs({ transactions }));
      };


      if(data.mempoolInfo !== undefined){

        const { mempoolInfo, vBytesPerSecond } = data;

        dispatch(updateInfo({ mempoolInfo, vBytesPerSecond }));

        if(data.fees !== undefined){

          const { fees } = data;
  
          dispatch(updateFees({ fees, totalFee: mempoolInfo.total_fee }));
        };
      };


      if(data.conversions !== undefined){

        const { conversions } = data;

        dispatch(updateConversions({ conversions }));
      };
    },

    shouldReconnect: () => true,
  });
  

  return (
    <main id="mempool" className="container-fluid d-flex flex-column align-items-center w-100 mh-100 p-5">
      <Container fluid id="mempool-breadcrumbs" className="d-flex flex-row justify-content-around align-items-center p-4">
        <Breadcrumb id="mempool-pg-nav-wrap" className="py-1 bg-dark rounded fs-4 w-50 d-flex justify-content-center align-items-center">
          <Breadcrumb.Item href="#mempool-blocks" className="mempool-bcrmb p-1">
            <span className="mempool-pg-nav-link">
              Blocks
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <MempoolFees />
      <MempoolTxns />
      <MempoolBlocks />
      <Container className='my-3 py-2 h-50 rounded bg-dark mempool-data-container'>
        <h2 className="mb-4 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-data-header shadow">
          NEWEST BLOCK
        </h2>
        <Container className='my-3 py-2 h-50 rounded bg-dark shadow w-75'>
          <Row>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
          </Row>
          <Row>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
          </Row>
          <Row>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
            <Col className="p-2">row item</Col>
          </Row>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum molestias rem voluptas magnam possimus dignissimos aspernatur, enim ipsa laudantium necessitatibus. Saepe deleniti ipsa adipisci quos ad quasi nulla animi dolorum?</p>
        </Container>
        <h2 className="mt-5 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-data-header shadow">
          PREVIOUS BLOCKS
        </h2>
        <Carousel interval={null}>
          <Carousel.Item>
            <Container className='my-3 py-2 h-50 rounded bg-dark'>
              <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column justify-content-center">
                <h3 className="mb-4 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr shadow">
                  Block 1
                </h3>
                <div className="my-4">
                  <Row>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                  </Row>
                  <Row>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                  </Row>
                  <Row>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                    <Col className="p-2">row item</Col>
                  </Row>
                </div>
                <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat odio dolores quisquam rem quaerat at in laudantium praesentium facere harum reiciendis repellat, assumenda obcaecati ad, recusandae ipsum voluptate! Neque!</p>
              </div>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container className='my-3 py-2 h-50 rounded bg-dark'>
              <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column justify-content-center">
                <h3 className="mb-4 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr shadow">
                  Block 2
                </h3>
                <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus non autem, aspernatur aperiam consectetur animi impedit reprehenderit illo hic ad esse facere excepturi pariatur itaque nihil aliquam at? Debitis, ducimus!</p>
                <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat odio dolores quisquam rem quaerat at in laudantium praesentium facere harum reiciendis repellat, assumenda obcaecati ad, recusandae ipsum voluptate! Neque!</p>
              </div>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container className='my-3 py-2 h-50 rounded bg-dark'>
              <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column justify-content-center">
                <h3 className="mb-4 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr shadow">
                  Block 3
                </h3>
                <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus non autem, aspernatur aperiam consectetur animi impedit reprehenderit illo hic ad esse facere excepturi pariatur itaque nihil aliquam at? Debitis, ducimus!</p>
                <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam fugiat odio dolores quisquam rem quaerat at in laudantium praesentium facere harum reiciendis repellat, assumenda obcaecati ad, recusandae ipsum voluptate! Neque!</p>
              </div>
            </Container>
          </Carousel.Item>
          <Carousel.Item>
            <Container className='my-3 py-2 h-50 rounded bg-dark'>
              <div className="m-5 p-5 rounded shadow bg-dark d-flex flex-column justify-content-center">
                <h3 className="mb-3 mx-auto fs-1 fw-bold w-50 rounded text-center mempool-block-crsl-item-hdr">
                  820892
                </h3>
                
                <Container className=" position-relative ps-0 h-auto d-flex justify-content-start align-items-center rounded shadow my-5 mempool-blk-id">
                  <p className="position-absolute h-100 fw-bold p-2 w-auto me-3 mb-0 rounded-start mempool-block-id-hdr">
                    ID:
                  </p>
                  <>
                    <span role="button" className="ms-5 py-2 text-break text-center font-monospace fst-italic" onClick={handleShow}>
                      000000000000000000042c32026736f490312993ed4f2e2b20d1fe25ec3903a6
                    </span>
                    <Modal show={show} onHide={handleClose} size="xl" aria-labelledby="mempool-block" scrollable>
                      <Modal.Header closeButton>
                        <Modal.Title id="mempool-block" className="fw-bold">
                          Extra Info
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p className="rounded shadow p-2">
                          <h4 className="mx-auto fw-bolder text-nowrap text-center mempool-data-table-hdr">
                            Header:
                          </h4>
                          <span>
                            <span className="text-break font-monospace fs-7">
                              00a02724462be9653f09e1b7ba776c70a6dac44c4f37de2c93020300000000000000000095165a10b7febacaa2a54cb0655a3d39566aaa50f064de0d94c0a439443e37c495a67865952e0417984d3fd4
                            </span>
                          </span>
                        </p>
                        <ListGroup as="ul" className="my-5 w-auto">
                          <ListGroup.Item as="li" variant="info">
                            <span>
                              <span className="me-3 fw-bolder text-nowrap">
                                Coinbase Raw:
                              </span>
                              <span className="text-break font-monospace fs-7">
                                039c860c1b4d696e656420627920416e74506f6f6c39353902000c01392f659dfabe6d6ddd9a86911ac98342a5926c872791e75db7b805f0e292ff7b016a0e38777fcf70100000000000000000006d56c702000000000000
                              </span>
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item as="li" variant="info">
                            <span>
                              <span className="me-3 fw-bolder">
                                Coinbase Signature:
                              </span>
                              <span className="text-break font-monospace fs-7">
                                OP_HASH160 OP_PUSHBYTES_20 4b09d828dfc8baaba5d04ee77397e04b1050cc73 OP_EQUAL
                              </span>
                            </span>
                          </ListGroup.Item>
                          <ListGroup.Item as="li" variant="info">
                            <span>
                              <span className="me-3 fw-bolder">
                                Coinbase Address:
                              </span>
                              <span className="text-break font-monospace fs-7">
                                38XnPvu9PmonFU9WouPXUjYbW91wa5MerL
                              </span>
                            </span>
                          </ListGroup.Item>
                        </ListGroup>
                        <Container className="my-5">
                          <Row className="my-5">
                            <Col className="p-2 text-center d-flex flex-column mx-4">
                              <h5 className="fw-bold mempool-data-table-hdr">Expected Fees</h5>
                              <span className="rounded shadow p-3">116031171 sat</span>
                            </Col>
                            <Col className="p-2 text-center d-flex flex-column mx-4">
                              <h5 className="fw-bold mempool-data-table-hdr">Total Fees</h5>
                              <span className="rounded shadow p-3">115615734 sat</span>
                            </Col>
                            <Col className="p-2 text-center d-flex flex-column mx-4">
                              <h5 className="fw-bold mempool-data-table-hdr">Fee Range</h5>
                              <span className="rounded shadow p-3">95 - 516 sat/vB</span>
                            </Col>
                          </Row>
                          <Row className="my-5 gx-5">
                            <Col className="p-1 text-center d-flex flex-column mx-4">
                              <h5 className="fw-bold mempool-data-table-hdr">Avg. Fee</h5>
                              <span className="rounded shadow p-3">29254 sat</span>
                            </Col>
                            <Col className="p-1 text-center d-flex flex-column mx-4">
                              <h5 className="fw-bold mempool-data-table-hdr">Avg. Fee Rate</h5>
                              <span className="rounded shadow p-3">~115 sat/vB</span>
                            </Col>
                            <Col className="p-1 text-center d-flex flex-column mx-4">
                              <h5 className="fw-bold mempool-data-table-hdr">Bits</h5>
                              <span className="rounded shadow p-3">386150037b</span>
                            </Col>
                          </Row>
                          <Row className="my-5 gx-5">
                            <Col className="p-1 text-center d-flex flex-column mx-4">
                              <Card>
                                <Card.Header className="fw-bolder extras-list-hdr text-center">
                                  I/O
                                </Card.Header>
                                <ListGroup variant="flush">
                                  <ListGroup.Item variant="info">Cras justo odio</ListGroup.Item>
                                  <ListGroup.Item variant="info">Dapibus ac facilisis in</ListGroup.Item>
                                  <ListGroup.Item variant="info">Vestibulum at eros</ListGroup.Item>
                                </ListGroup>
                              </Card>
                            </Col>
                            <Col className="p-1 text-center d-flex flex-column mx-4">
                              <Card>
                                <Card.Header className="fw-bolder extras-list-hdr text-center">
                                  I/O
                                </Card.Header>
                                <ListGroup variant="flush">
                                  <ListGroup.Item variant="info">Cras justo odio</ListGroup.Item>
                                  <ListGroup.Item variant="info">Dapibus ac facilisis in</ListGroup.Item>
                                  <ListGroup.Item variant="info">Vestibulum at eros</ListGroup.Item>
                                </ListGroup>
                              </Card>
                            </Col>
                          </Row>
                        </Container>
                      </Modal.Body>
                    </Modal>
                  </>
                </Container>
                <div className="my-auto container">
                  <Row className="my-5">
                    <Col className="p-2 text-center d-flex flex-column rounded shadow mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Timestamp</h5>
                      <span>10/01/10 10:10:10AM UTC</span>
                    </Col>
                    <Col className="p-2 text-center d-flex flex-column rounded shadow mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Transactions</h5>
                      <span>3953</span>
                    </Col>
                  </Row>
                  <Row className="my-5 gx-5">
                    <Col className="p-2 text-center d-flex flex-column mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Size</h5>
                      <span className="rounded-pill shadow p-3">1655406</span>
                    </Col>
                    <Col className="p-2 text-center d-flex flex-column mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Weight</h5>
                      <span className="rounded-pill shadow p-3">3993663</span>
                    </Col>
                    <Col className="p-2 text-center d-flex flex-column mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Bits</h5>
                      <span className="rounded-pill shadow p-3">386150037</span>
                    </Col>
                  </Row>
                  <Row className="my-5 gx-5">
                    <Col className="p-2 text-center d-flex flex-column mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Version</h5>
                      <span className="rounded-pill shadow p-3">606576640</span>
                    </Col>
                    <Col className="p-2 text-center d-flex flex-column mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Nonce</h5>
                      <span className="rounded-pill shadow p-3">3560918424</span>
                    </Col>
                    <Col className="p-2 text-center d-flex flex-column mx-4">
                      <h5 className="fw-bold mempool-data-table-hdr">Stale</h5>
                      <span className="rounded-pill shadow p-3">false</span>
                    </Col>
                  </Row>
                  <ListGroup as="ul" className="my-5 w-auto">
                    <ListGroup.Item as="li" variant="info">
                      <span>
                        <span className="me-3 fw-bolder">Difficulty:</span>
                        <span className="text-break font-monospace fs-7">67305906902031.39</span>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" variant="info">
                      <span>
                        <span className="me-3 fw-bolder text-nowrap">Previous Block Hash:</span>
                        <span className="text-break font-monospace fs-7">0000000000000000000302932cde374f4cc4daa6706c77bab7e1093f65e92b46</span>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" variant="info">
                      <span>
                        <span className="me-3 fw-bolder text-nowrap">Merkle Root:</span>
                        <span className="text-break font-monospace fs-7">c4373e4439a4c0940dde64f050aa6a56393d5a65b04ca5a2cabafeb7105a1695</span>
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </Container>
          </Carousel.Item>
        </Carousel>
      </Container>
    </main>
  );
};

export default MempoolPage;