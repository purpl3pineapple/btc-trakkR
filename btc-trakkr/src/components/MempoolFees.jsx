import MempoolDataRow from "../components/layout/MempoolDataRow";
import { useSelector, useDispatch } from "react-redux";
import { useGetRecommendedFeesQuery } from "../api-services/mempool.service";
import Spinner from "react-bootstrap/Spinner";
import { useEffect } from "react";
import sliceMempoolRecommendedFees from "../context/mempool/mempool.fees.slice";
import Container from "react-bootstrap/Container";


const MempoolFees = () => {

    const { updateMempoolFees } = sliceMempoolRecommendedFees.actions;

    const dispatch = useDispatch();

    const { economy, fastest, halfHour, hour, minimum, loading } = useSelector(state => state.mempoolFees);

    const mempoolFees = useGetRecommendedFeesQuery();

    const { isSuccess } = mempoolFees;
    
    useEffect(() => {

        dispatch(updateMempoolFees({ 
            fastest: isSuccess ? mempoolFees.data.fastestFee : null,
            halfHour: isSuccess ? mempoolFees.data.halfHourFee : null,
            hour: isSuccess ? mempoolFees.data.hourFee : null,
            economy: isSuccess ? mempoolFees.data.economyFee : null,
            minimum: isSuccess ? mempoolFees.data.minimumFee : null,
            loading: isSuccess ? false : true
        }));

    });

    return (
        <Container className='my-3 p-0 rounded bg-dark shadow'>{
            loading
            ? <Spinner as="span" animation="border" role="status" className="m-auto">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>
            : <MempoolDataRow id="mempool-recd-fees" data={[
                { title: 'Fastest Fee', value: fastest },
                { title: 'Half-Hour Fee', value: halfHour },
                { title: 'Hour Fee', value: hour },
                { title: 'Economy Fee', value: economy },
                { title: 'Minimum Fee', value: minimum },
            ]}/>
        }</Container>
    );
};

export default MempoolFees;