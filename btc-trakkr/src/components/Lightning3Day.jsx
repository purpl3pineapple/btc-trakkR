import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from "react-redux";
import mempoolAPI from '../api-services/mempool.service';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

const Lightning3Day = () => {

    const dispatch = useDispatch();

    const threeDay = useSelector(state => state.lightning.threeDay);
    

    useEffect(() => {

        const stats = dispatch(mempoolAPI.endpoints.getLightning3dStats.initiate());

        return stats.unsubscribe();
    });


    return (<>{
        threeDay === null 
            
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            : threeDay.map((stat, idx) => stat === null 
                ? <Spinner as="span" animation="border" role="status">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </Spinner>
                    
                : <Container className='my-3 py-2 rounded shadow' key={idx}>
                    <Container className="px-5 py-2 my-5">
                        <span className='fw-bold fs-6 bg-success text-dark p-2 rounded-pill'>
                            {`Day ${idx + 1}`}
                        </span>
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
                                    {stat.added}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                                <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                                    Total Capacity
                                </div>
                                <Badge bg="dark" pill className="mb-2 w-auto px-4">
                                    {stat.total_capacity}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                                    <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                                        Channel Count
                                    </div>
                                <Badge bg="dark" pill className="mb-2 w-auto px-4">
                                    {stat.channel_count}
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Container>
                    <Container className="px-5 py-2 mb-5">
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
                                    {stat.clearnet_nodes}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                                <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                                    ClearNet Tor Nodes
                                </div>
                                <Badge bg="dark" pill className="mb-2 w-auto px-4">
                                    {stat.clearnet_tor_nodes}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                                <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                                    Tor Nodes
                                </div>
                                <Badge bg="dark" pill className="mb-2 w-auto px-4">
                                    {stat.tor_nodes}
                                </Badge>
                            </ListGroup.Item>
                            <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                                <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                                    Unannounced Nodes
                                </div>
                                <Badge bg="dark" pill className="mb-2 w-auto px-4">
                                    {stat.unannounced_nodes}
                                </Badge>
                            </ListGroup.Item>
                        </ListGroup>
                    </Container>
                </Container>
            )
    }</>);
};

export default Lightning3Day;