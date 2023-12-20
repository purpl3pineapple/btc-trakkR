import Container from "react-bootstrap/Container";
import { useGetLightningLatestStatsQuery } from "../api-services/mempool.service";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import sliceLightning from "../context/lightning/lightning.slice";
import Spinner from "react-bootstrap/Spinner";
import { ProgressBar } from "react-bootstrap";

const LightningGeneral = () => {

    const lightningLatest = useGetLightningLatestStatsQuery();

    const dispatch = useDispatch();

    const { id, added, loading } = useSelector(state => state.lightning.latest);

    const { updateLightningLatestID, updateLightningLatestAdded } = sliceLightning.actions;

    const { isSuccess } = lightningLatest;

    useEffect(() => {
    
        dispatch(updateLightningLatestID({
          id: isSuccess ? lightningLatest.data.latest.id : null,
          loading: isSuccess ? false : true
        }));

        dispatch(updateLightningLatestAdded({
            added: isSuccess ? lightningLatest.data.latest.added : null,
            loading: isSuccess ? false : true
        }));
    });

    return (
        <Container className='my-3 py-2 rounded shadow'>
            <Container className="w-100 my-auto py-5 px-5 d-flex flex-row gx-5 justify-content-around align-items-center overflow-auto">{
                loading
                ? <Spinner as="span" animation="border" role="status" className="m-auto">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </Spinner>
            
                : <>
                    <span className="bg-dark me-5 lightning-card-hdr fs-5 fw-bold text-center w-auto p-2 rounded">
                        <span className="me-2 lightning-id-label">
                            ID:
                        </span>
                        <span className="text-reset ms-auto">
                            {id === null ? <ProgressBar animated variant="secondary" now={100} /> : id}
                        </span>
                    </span>
                    <span className="d-flex flex-row justify-content-around align-items-center bg-dark lightning-card-hdr fs-5 fw-bold text-center w-auto p-2 my-auto rounded text-nowrap">
                        <span className="me-2 lightning-id-label">
                            Added:
                        </span>
                        <span className="text-reset ms-auto fs-7">
                            {added === null ? <ProgressBar animated variant="secondary" now={100} /> : new Date(added).toLocaleString('en-US')}
                        </span>
                    </span>
                </>
            }</Container>
        </Container> 
    );
};

export default LightningGeneral;