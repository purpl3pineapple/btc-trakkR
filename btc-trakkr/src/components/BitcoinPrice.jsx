import Spinner from 'react-bootstrap/Spinner';
import { FiDollarSign } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import sliceBTC from "../context/BTC-price/btcPrice.slice";

const BTC_WS_URL = process.env.REACT_APP_COINCAP_WS_URL;

const BitcoinPrice = () => {

    const { updatePrice } = sliceBTC.actions;

    const { currentPrice, increased, decreased, loading } = useSelector(state => state.BTC);

    const dispatch = useDispatch();

    useWebSocket(BTC_WS_URL, {

        onMessage: msg => {

            try {

                const current_BTC = currentPrice === null 
                ? currentPrice 
                : Number(currentPrice.replace(/,/g, ''));

                const { bitcoin } = JSON.parse(msg.data);

                const increased = current_BTC === null ? current_BTC : Number(bitcoin) > current_BTC;

                const decreased = current_BTC === null ? current_BTC : Number(bitcoin) < current_BTC;

                const dollars = bitcoin
                .split('.')[0]
                .split(/(\d{3})$/g)
                .filter(item => item !== '')
                .join(',');

                const cents = /\.[0-9]+$/.exec(bitcoin)[0];

                const BTC = dollars.concat(cents);

                dispatch(updatePrice({
                    BTC, 
                    increased, 
                    decreased, 
                    loading: false
                }));

            } catch(error){

                console.log({error});
            };
        },

        shouldReconnect: () => true,
    });

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