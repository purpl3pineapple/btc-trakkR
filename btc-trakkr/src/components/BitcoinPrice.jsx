import Spinner from 'react-bootstrap/Spinner';
import { FiDollarSign } from "react-icons/fi";
import { useSelector } from "react-redux";

const BitcoinPrice = () => {

    const { currentPrice, change, loading } = useSelector(state => state.BTC);

    const colors = [
        /* { value: "increased", color: "#07a330" },
        { value: "decreased", color: "crimson" }, */
        { value: "increased", color: "success" },
        { value: "decreased", color: "danger" },
        { value: null, color: "light" }
    ];
    

    return (<>{
        loading || currentPrice === null
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </Spinner>

            : <span id="btc-price" className='font-monospace'>
                <span className='text-secondary'>$</span>
                <span /* style={{ color: colors.find(({value}) => value === change).color }} */ className={`fw-bold text-${colors.find(({value}) => value === change).color}`}>
                    {currentPrice}
                </span>
            </span>
    }</>);
};

export default BitcoinPrice;