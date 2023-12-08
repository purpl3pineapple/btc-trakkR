import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';
import useWebSocket, { ReadyState } from 'react-use-websocket';

const BitcoinPrice = () => {

    const [btcPrice, setBtcPrice] = useState(null);
    
    const [loading, setLoading] = useState(true);

    const BTC_PRICE_WEBSOCKET_URL = "wss://ws.coincap.io/prices?assets=bitcoin";

    const { lastMessage, readyState } = useWebSocket(BTC_PRICE_WEBSOCKET_URL, {
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
            setBtcPrice(bitcoin);
        
        } else {

            setBtcPrice(null);
        };

    }, [lastMessage]);


    return (
        <Card.Text className="mh-100 py-5">
            {loading || btcPrice === null
                ? <Spinner as="span" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

                : <span className="fs-1">${btcPrice}</span>
            }
        </Card.Text>
    );
};

export default BitcoinPrice;