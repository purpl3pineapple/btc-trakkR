import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { FiDollarSign } from "react-icons/fi";

const BitcoinPrice = () => {

    const [btcPrice, setBtcPrice] = useState(null);
    
    const [loading, setLoading] = useState(true);

    const { REACT_APP_BTC_WS_URL } = process.env;

    const { lastMessage, readyState } = useWebSocket(REACT_APP_BTC_WS_URL, {
        shouldReconnect: () => true,
    });


    useEffect(() => {

        if (readyState === ReadyState.OPEN){

            setLoading(false);

        } else {

            setLoading(true);
        };

    }, [readyState]);


    useEffect(() => {

        if (lastMessage !== null){

            const { bitcoin } = JSON.parse(lastMessage.data);

            const splitter = bitcoin.split('.');

            splitter[0] = splitter[0]
            .split(/(\d{3})$/g)
            .filter(item => item !== '')
            .join(',')
            
            const BTC = splitter.join('.');

            setBtcPrice(BTC);
        
        } else {

            setBtcPrice(null);
        };

    }, [lastMessage]);


    return (<>
        {loading || btcPrice === null
            ? <Spinner as="span" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>

            : <span className="fs-1 d-inline-flex align-items-center">
                <FiDollarSign />
                <span id="btc-price">{btcPrice}</span>
            </span>
        }
    </>);
};

export default BitcoinPrice;