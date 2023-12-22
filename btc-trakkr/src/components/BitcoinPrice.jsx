import Spinner from 'react-bootstrap/Spinner';
import { FiDollarSign } from "react-icons/fi";
import { useSelector } from "react-redux";

const BitcoinPrice = () => {

    const { currentPrice, change, loading } = useSelector(state => state.BTC);

    const colors = [
        { value: "increased", color: "#07a330" },
        { value: "decreased", color: "crimson" },
        { value: null, color: "white" }
    ];
    

    return (<>{
        loading || currentPrice === null
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            : <span className="fs-1 d-inline-flex align-items-center">
                <FiDollarSign />
                <span id="btc-price" style={{ color: colors.find(({value}) => value === change).color }}>
                    {currentPrice}
                </span>
            </span>
    }</>);
};

export default BitcoinPrice;