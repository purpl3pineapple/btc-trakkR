import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Spinner from 'react-bootstrap/Spinner';
import useWebSocket, { ReadyState } from 'react-use-websocket';

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