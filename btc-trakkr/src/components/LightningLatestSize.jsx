import Container from "react-bootstrap/Container";
import { useGetLightningLatestStatsQuery } from "../api-services/mempool.service";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sliceLightning from "../context/lightning/lightning.slice";
import { ProgressBar, Spinner } from "react-bootstrap";

const LightningLatestSize = () => {

    const lightningStatsLatest = useGetLightningLatestStatsQuery();

    const dispatch = useDispatch();

    const { total_capacity, avg_capacity, med_capacity, channel_count, loading } = useSelector(state => state.lightning.latest);

    const { updateLightningSize } = sliceLightning.actions;

    const { isSuccess } = lightningStatsLatest;

    useEffect(() => {
    
        dispatch(updateLightningSize({
          total_capacity: isSuccess ? lightningStatsLatest.data.latest.total_capacity : null,
          avg_capacity: isSuccess ? lightningStatsLatest.data.latest.avg_capacity : null,
          med_capacity: isSuccess ? lightningStatsLatest.data.latest.med_capacity : null,
          channel_count: isSuccess ? lightningStatsLatest.data.latest.channel_count : null,
          loading: isSuccess ? false : true
        }))
    });
    
    return (
        <Container className='my-3 py-2 rounded shadow'>{
            loading
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>
            : <Container className="py-3 mb-5">
                <h2 className="bg-dark lightning-card-hdr fs-5 fw-bold text-center w-25 mx-auto py-2 my-3 rounded-pill">
                    <span className="lightning-id-label">Size</span>
                </h2>
                <ListGroup horizontal className="w-100 overflow-auto py-3">
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
                            Avg. Capacity
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {avg_capacity === null ? <ProgressBar animated variant="secondary" now={100} /> : avg_capacity}
                        </Badge>
                    </ListGroup.Item>
                    <ListGroup.Item variant="info" className='d-flex flex-fill flex-column justify-content-center align-items-center p-2'>
                        <div className="lightning-stat-header p-2 fs-6 fw-bold text-center">
                            Med. Capacity
                        </div>
                        <Badge bg="dark" pill className="mb-2 w-auto px-4">
                            {med_capacity === null ? <ProgressBar animated variant="secondary" now={100} /> : med_capacity}
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
    );
};

export default LightningLatestSize;