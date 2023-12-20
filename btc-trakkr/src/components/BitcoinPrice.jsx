import Spinner from 'react-bootstrap/Spinner';
import { FiDollarSign } from "react-icons/fi";
import { useSelector } from "react-redux";

const BitcoinPrice = () => {

    const { currentPrice, increased, decreased, loading } = useSelector(state => state.BTC);

    const result = () => {

        if(increased) return "#07a330";
        else if(decreased) return "crimson";
        else return "white";
    };

    return (<>{
        loading || currentPrice === null
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            : <span className="fs-1 d-inline-flex align-items-center">
                <FiDollarSign />
                <span id="btc-price" style={{ color: result() }}>
                    {currentPrice}
                </span>
            </span>
    }</>);
};

export default BitcoinPrice;