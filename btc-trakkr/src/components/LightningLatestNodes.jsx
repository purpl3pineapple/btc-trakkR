import Container from "react-bootstrap/Container";
import mempoolAPI from "../api-services/mempool.service";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";

const LightningLatestNodes = () => {

    const dispatch = useDispatch();

    const {
        node_count,
        clearnet_nodes,
        clearnet_tor_nodes,
        tor_nodes,
        unannounced_nodes,
        loading
    } = useSelector(state => state.lightning.latest);
    

    useEffect(() => {

        const lightningNodes = dispatch(mempoolAPI.endpoints.getLightningLatestStats.initiate());

        return lightningNodes.unsubscribe();
    });


    return (
        <Container className='my-3 py-2 rounded shadow'>
            {loading 
            ? <Spinner as="span" animation="border" role="status" className="m-auto">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            : <main className="py-3 mb-5 container">
                <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
                    <span className="lightning-id-label">
                        Nodes
                    </span>
                </h2>
                <ListGroup horizontal className="w-100 overflow-auto py-3">
                    <ListGroup.Item variant="info" className='w-auto p-2 mx-auto d-flex flex-column justify-content-center align-items-center lightning-node-count-ctnr'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Node Count
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {node_count === null ? <ProgressBar animated variant="secondary" now={100}/> : node_count}
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup horizontal className="w-100 overflow-auto py-3">
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            ClearNet Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {clearnet_nodes === null ? <ProgressBar animated variant="secondary" now={100}/> : clearnet_nodes}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            ClearNet Tor Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {clearnet_tor_nodes === null ? <ProgressBar animated variant="secondary" now={100}/> : clearnet_tor_nodes}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Tor Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {tor_nodes === null ? <ProgressBar animated variant="secondary" now={100}/> : tor_nodes}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Unannounced Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {unannounced_nodes === null ? <ProgressBar animated variant="secondary" now={100}/> : unannounced_nodes}
                        </Badge>
                </ListGroup.Item>
                </ListGroup>
            </main>}
        </Container>
    );
};

export default LightningLatestNodes;