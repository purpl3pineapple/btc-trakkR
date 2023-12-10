import { useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
import { FiDollarSign } from "react-icons/fi";
import BtcPriceContext from "../context/BTC-price/btc-price-context";

const BitcoinPrice = () => {

    const { btcPrice, loading } = useContext(BtcPriceContext);

    return (<>{
        loading || btcPrice === null
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            : <span className="fs-1 d-inline-flex align-items-center">
                <FiDollarSign />
                <span id="btc-price">
                    {btcPrice}
                </span>
            </span>
    }</>);
};

export default BitcoinPrice;