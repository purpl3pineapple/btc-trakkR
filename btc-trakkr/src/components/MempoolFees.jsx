import MempoolDataRow from "../components/layout/MempoolDataRow";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";


const MempoolFees = () => {

    const {
        economyFee,
        fastestFee,
        halfHourFee,
        hourFee,
        minimumFee,
        loading
    } = useSelector(state => state.mempool.fees);


    return (
        <Container className='my-3 p-2 rounded bg-dark shadow'>{
            loading
            ? <Spinner as="span" animation="border" role="status" className="m-auto">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>
            : <MempoolDataRow id="mempool-recd-fees" data={[
                { title: 'Fastest Fee', value: fastestFee },
                { title: 'Half-Hour Fee', value: halfHourFee },
                { title: 'Hour Fee', value: hourFee },
                { title: 'Economy Fee', value: economyFee },
                { title: 'Minimum Fee', value: minimumFee },
            ]}/>
        }</Container>
    );
};

export default MempoolFees;