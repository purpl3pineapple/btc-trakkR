import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import mempoolAPI from '../api-services/mempool.service';
import { useEffect } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Spinner from 'react-bootstrap/Spinner';

const Lightning24Hr = () => {

    const dispatch = useDispatch();

    const {
        added, 
        total_capacity, 
        channel_count, 
        clearnet_nodes, 
        clearnet_tor_nodes, 
        tor_nodes, 
        unannounced_nodes, 
        loading 
    } = useSelector(state => state.lightning.twentyFourHr);

    
    useEffect(() => {

        const stats = dispatch(mempoolAPI.endpoints.getLightning24hStats.initiate());

        return stats.unsubscribe();
    });


    return (<>
        <Container className='my-3 py-2 rounded shadow'>{
            loading
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            :   <Container className="py-3 mb-5">
                    <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
                        <span className="lightning-id-label">
                            Size
                        </span>
                    </h2>
                <ListGroup horizontal className="w-100 overflow-auto py-3">
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Added
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {added === null ? <ProgressBar animated variant="secondary" now={100} /> : added}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Total Capacity
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {total_capacity === null ? <ProgressBar animated variant="secondary" now={100} /> : total_capacity}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Channel Count
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {channel_count === null ? <ProgressBar animated variant="secondary" now={100} /> : channel_count}
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        }</Container>
        
        <Container className='my-3 py-2 rounded shadow'>{
            loading
                ? <Spinner as="span" animation="border" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </Spinner>

            : <Container className="py-3 mb-5">
                <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
                    <span className="lightning-id-label">
                        Nodes
                    </span>
                </h2>
                <ListGroup horizontal className="w-100 overflow-auto py-3">
                    <ListGroup.Item variant="info" className='w-auto p-2 mx-auto d-flex flex-column justify-content-center align-items-center'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            ClearNet Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {clearnet_nodes === null ? <ProgressBar animated variant="secondary" now={100} /> : clearnet_nodes}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            ClearNet Tor Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {clearnet_tor_nodes === null ? <ProgressBar animated variant="secondary" now={100} /> : clearnet_tor_nodes}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Tor Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {tor_nodes === null ? <ProgressBar animated variant="secondary" now={100} /> : tor_nodes}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Unannounced Nodes
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {unannounced_nodes === null ? <ProgressBar animated variant="secondary" now={100} /> : unannounced_nodes}
                        </Badge>
                    </ListGroup.Item>
                </ListGroup>
            </Container>
        }</Container>
    </>);
};

export default Lightning24Hr;