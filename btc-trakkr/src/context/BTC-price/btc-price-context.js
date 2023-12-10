import { createContext, useReducer } from "react";
import useWebSocket from 'react-use-websocket';
import btcPriceReducer from "./btc-price-reducer";

const BtcPriceContext = createContext();

const BTC_WS_URL = process.env.REACT_APP_BTC_WS_URL;


export const BtcPriceProvider = ({children}) => {

    const init = {
        btcPrice: null,
        loading: true
    };

    const [state, dispatch] = useReducer(btcPriceReducer, init);


    useWebSocket(BTC_WS_URL, {

        onMessage: msg => {

            const { bitcoin } = JSON.parse(msg.data);

            const splitter = bitcoin.split('.');
    
            splitter[0] = splitter[0]
            .split(/(\d{3})$/g)
            .filter(item => item !== '')
            .join(',')
            
            const BTC = splitter.join('.');

            dispatch({
                type: 'GET_BTC_PRICE',
                payload: BTC
            });
        },

        shouldReconnect: () => true,
    });


    return <BtcPriceContext.Provider value={{ 
        btcPrice: state.btcPrice, 
        loading: state.loading
    }}>
        {children}
    </BtcPriceContext.Provider>;
};

export default BtcPriceContext;